import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createOrder } from '@/services/orders';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  flavor?: string;
  customization?: string;
}

interface OrderSummary {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay key secret not configured' },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = await request.json();

    // --- Step 1: Verify the payment signature ---
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { error: 'Payment verification failed. Signature mismatch.' },
        { status: 400 }
      );
    }

    // --- Step 2: Payment is verified, generate order number ---
    const orderNumber = `BB-${Date.now().toString(36).toUpperCase()}`;

    // --- Step 3: Create order in database ---
    const {
      customerName,
      phoneNumber,
      email,
      address,
      deliveryDate,
      cartItems,
      summary,
      additionalNotes,
      userId,
      addressId,
    } = orderDetails;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user identity for order creation. Please login and retry.' },
        { status: 400 }
      );
    }

    const orderSummary = summary as OrderSummary;

    // Create order items from cart items
    const orderItems = (cartItems as CartItem[]).map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }));

    // Create order in database
    const { order, error: orderCreateError } = await createOrder(
      {
        profile_id: userId,
        address_id: addressId || undefined,
        status: 'paid',
        total_amount: orderSummary.total,
      },
      orderItems,
      accessToken
    );

    if (!order) {
      console.error('Database order creation failed', {
        userId,
        addressId,
        itemsCount: orderItems.length,
        orderCreateError,
      });
      return NextResponse.json(
        {
          error:
            orderCreateError ||
            'Payment was verified but order could not be saved. Please contact support with payment ID.',
        },
        { status: 500 }
      );
    }

    const savedOrderId = order.id;

    // --- Step 4: Send order confirmation email ---

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const cartItemsHtml = (cartItems as CartItem[])
      .map(
        (item, index) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${index + 1}. ${item.name}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: left;">
          ${item.size ? `Size: ${item.size}<br>` : ''}
          ${item.flavor ? `Flavor: ${item.flavor}` : ''}
          ${item.customization ? `<br><em>Note: ${item.customization}</em>` : ''}
        </td>
        <td style="padding: 12px; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
      )
      .join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'Bakeryblissindia@gmail.com',
      subject: `✅ Paid Order #${orderNumber} — ₹${orderSummary.total.toFixed(2)} via Razorpay`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fff;">
          <div style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">✅ Payment Received!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Order #${orderNumber}</p>
          </div>

          <div style="padding: 20px;">
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
              <strong style="color: #16a34a;">💳 Payment Confirmed</strong>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #333;">
                Razorpay Payment ID: <code>${razorpay_payment_id}</code><br>
                Razorpay Order ID: <code>${razorpay_order_id}</code>
              </p>
            </div>

            <h2 style="color: #8B4513; border-bottom: 2px solid #8B4513; padding-bottom: 10px;">Customer Details</h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${customerName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${phoneNumber}</td></tr>
              ${email ? `<tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${email}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Address:</td><td style="white-space: pre-line;">${address}</td></tr>
              ${deliveryDate ? `<tr><td style="padding: 8px 0; font-weight: bold;">Preferred Delivery:</td><td>${deliveryDate}</td></tr>` : ''}
            </table>

            <h2 style="color: #8B4513; border-bottom: 2px solid #8B4513; padding-bottom: 10px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 12px; text-align: left;">Item</th>
                  <th style="padding: 12px; text-align: center;">Qty</th>
                  <th style="padding: 12px; text-align: left;">Details</th>
                  <th style="padding: 12px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>${cartItemsHtml}</tbody>
            </table>

            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
              <h3 style="color: #8B4513; margin-top: 0;">Order Summary</h3>
              <table style="width: 100%;">
                <tr><td style="padding: 5px 0;">Subtotal:</td><td style="text-align: right;">₹${orderSummary.subtotal.toFixed(2)}</td></tr>
                <tr><td style="padding: 5px 0;">Tax (8%):</td><td style="text-align: right;">₹${orderSummary.tax.toFixed(2)}</td></tr>
                ${orderSummary.discount > 0 ? `<tr style="color: green;"><td style="padding: 5px 0;">Discount:</td><td style="text-align: right;">-₹${orderSummary.discount.toFixed(2)}</td></tr>` : ''}
                <tr><td style="padding: 5px 0;">Delivery Fee:</td><td style="text-align: right;">${orderSummary.deliveryFee === 0 ? 'FREE' : '₹' + orderSummary.deliveryFee.toFixed(2)}</td></tr>
                <tr style="font-size: 18px; font-weight: bold; border-top: 2px solid #8B4513;">
                  <td style="padding: 15px 0 5px 0;">Total Paid:</td>
                  <td style="padding: 15px 0 5px 0; text-align: right; color: #16a34a;">₹${orderSummary.total.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            ${additionalNotes ? `
            <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-radius: 8px;">
              <strong>Additional Notes:</strong>
              <p style="margin: 10px 0 0 0; white-space: pre-line;">${additionalNotes}</p>
            </div>` : ''}

            <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
              This order was placed and paid via the BakeryBliss website on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error('Order confirmation email failed:', mailError);
      // Email failure should not mark paid order creation as failed.
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order confirmed!',
      orderNumber,
      paymentId: razorpay_payment_id,
      orderId: savedOrderId,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed. Please contact support.' },
      { status: 500 }
    );
  }
}
