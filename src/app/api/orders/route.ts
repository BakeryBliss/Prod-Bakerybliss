import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createServerClient } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

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

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get('orderId');
    const profileId = url.searchParams.get('profileId');
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleAvailable = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    const customerProfile = serviceRoleAvailable
      ? createServerClient().schema('customer_profile')
      : (accessToken && supabaseUrl && supabaseAnonKey
          ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
              global: {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
              auth: {
                persistSession: false,
                autoRefreshToken: false,
              },
            }).schema('customer_profile')
          : createServerClient().schema('customer_profile'));

    const { data: order, error: orderError } = await customerProfile
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('GET /api/orders order lookup failed', { orderId, profileId, hasAccessToken: !!accessToken, serviceRoleAvailable, orderError });
      return NextResponse.json(
        { error: 'Could not load order details' },
        { status: 404 }
      );
    }

    if (profileId && order.profile_id !== profileId) {
      console.error('GET /api/orders profile mismatch', { orderId, profileId, actualProfileId: order.profile_id, hasAccessToken: !!accessToken, serviceRoleAvailable });
      return NextResponse.json(
        { error: 'You do not have access to this order' },
        { status: 403 }
      );
    }

    const { data: items, error: itemsError } = await customerProfile
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    if (itemsError) {
      console.error('GET /api/orders items lookup failed', { orderId, profileId, hasAccessToken: !!accessToken, serviceRoleAvailable, itemsError });
      return NextResponse.json(
        { error: 'Could not load order items', order, items: [] },
        { status: 500 }
      );
    }

    console.debug('GET /api/orders success', { orderId, profileId, hasAccessToken: !!accessToken, serviceRoleAvailable, itemsCount: items?.length || 0 });

    return NextResponse.json({ order, items: items || [] });
  } catch (error) {
    console.error('GET /api/orders unexpected error', error);
    return NextResponse.json(
      { error: 'Failed to load order details' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      customerName, 
      phoneNumber, 
      email,
      address, 
      deliveryDate,
      cartItems,
      summary,
      additionalNotes
    } = await request.json();

    // Validate required fields
    if (!customerName || customerName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!phoneNumber || phoneNumber.trim().length === 0) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!address || address.trim().length === 0) {
      return NextResponse.json(
        { error: 'Delivery address is required' },
        { status: 400 }
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
    const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;

    if (!indianPhoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian mobile number' },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `BB-${Date.now().toString(36).toUpperCase()}`;

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Build cart items HTML
    const cartItemsHtml = (cartItems as CartItem[]).map((item, index) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${index + 1}. ${item.name}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: left;">
          ${item.size ? `Size: ${item.size}<br>` : ''}
          ${item.flavor ? `Flavor: ${item.flavor}` : ''}
          ${item.customization ? `<br><em>Note: ${item.customization}</em>` : ''}
        </td>
        <td style="padding: 12px; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const orderSummary = summary as OrderSummary;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'Bakeryblissindia@gmail.com',
      subject: `🎂 New Order #${orderNumber} from BakeryBliss Website`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fff;">
          <div style="background-color: #8B4513; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🎂 New Order Received!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Order #${orderNumber}</p>
          </div>

          <div style="padding: 20px;">
            <h2 style="color: #8B4513; border-bottom: 2px solid #8B4513; padding-bottom: 10px;">Customer Details</h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td>
                <td style="padding: 8px 0;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">${phoneNumber}</td>
              </tr>
              ${email ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Delivery Address:</td>
                <td style="padding: 8px 0; white-space: pre-line;">${address}</td>
              </tr>
              ${deliveryDate ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Preferred Delivery:</td>
                <td style="padding: 8px 0;">${deliveryDate}</td>
              </tr>
              ` : ''}
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
              <tbody>
                ${cartItemsHtml}
              </tbody>
            </table>

            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
              <h3 style="color: #8B4513; margin-top: 0;">Order Summary</h3>
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 5px 0;">Subtotal:</td>
                  <td style="padding: 5px 0; text-align: right;">₹${orderSummary.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">Tax (8%):</td>
                  <td style="padding: 5px 0; text-align: right;">₹${orderSummary.tax.toFixed(2)}</td>
                </tr>
                ${orderSummary.discount > 0 ? `
                <tr style="color: green;">
                  <td style="padding: 5px 0;">Discount:</td>
                  <td style="padding: 5px 0; text-align: right;">-₹${orderSummary.discount.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 5px 0;">Delivery Fee:</td>
                  <td style="padding: 5px 0; text-align: right;">${orderSummary.deliveryFee === 0 ? 'FREE' : '₹' + orderSummary.deliveryFee.toFixed(2)}</td>
                </tr>
                <tr style="font-size: 18px; font-weight: bold; border-top: 2px solid #8B4513;">
                  <td style="padding: 15px 0 5px 0;">Total:</td>
                  <td style="padding: 15px 0 5px 0; text-align: right; color: #8B4513;">₹${orderSummary.total.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            ${additionalNotes ? `
            <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-radius: 8px;">
              <strong>Additional Notes:</strong>
              <p style="margin: 10px 0 0 0; white-space: pre-line;">${additionalNotes}</p>
            </div>
            ` : ''}

            <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
              This order was placed via the BakeryBliss website on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        message: 'Order placed successfully! We will contact you shortly to confirm your order.',
        orderNumber 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending order email:', error);
    return NextResponse.json(
      { error: 'Failed to place order. Please try again later.' },
      { status: 500 }
    );
  }
}
