import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { query, phoneNumber, requestCallback } = await request.json();

    // Validate required fields
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    if (requestCallback && (!phoneNumber || phoneNumber.trim().length === 0)) {
      return NextResponse.json(
        { error: 'Phone number is required when requesting a callback' },
        { status: 400 }
      );
    }

    // Validate phone number format if callback is requested
    if (requestCallback && phoneNumber) {
      const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
      const indianPhoneRegex = /^(\+91|91)?[6-9]\d{9}$/;

      if (!indianPhoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          { error: 'Please enter a valid 10-digit Indian mobile number' },
          { status: 400 }
        );
      }
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER ,
        pass: process.env.EMAIL_APP_PASSWORD, // You'll need to set this
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER ,
      to: 'Bakeryblissindia@gmail.com',
      subject: 'New Contact Query from BakeryBliss Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">New Contact Query</h2>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Query Details:</h3>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd;">${query}</p>

            ${requestCallback ? `
              <h3 style="color: #333;">Callback Requested:</h3>
              <p style="background-color: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd;">
                <strong>Phone Number:</strong> ${phoneNumber}
              </p>
            ` : ''}

            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              This message was sent from the BakeryBliss contact form.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Query submitted successfully! We will get back to you soon.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send query. Please try again later.' },
      { status: 500 }
    );
  }
}