import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Email to hospital/admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">This email was sent from Hisar Medical Contact Form</p>
        </div>
      `,
    };

    // Auto-reply to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Hisar Medical',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">Thank You for Contacting Us</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to Hisar Medical Diagnostic & Hospitals. We have received your inquiry and will get back to you within 24 hours.</p>
          
          <h3 style="color: #1e3a8a;">Your Message Summary:</h3>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <h3 style="color: #1e3a8a;">Emergency Contact:</h3>
          <p>If this is an emergency, please call our 24/7 helpline: <strong>1066 / 112</strong></p>
          
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          
          <div style="background-color: #1e3a8a; color: white; padding: 20px; border-radius: 5px;">
            <h4 style="margin: 0 0 10px 0;">Hisar Medical Diagnostic & Hospitals</h4>
            <p style="margin: 5px 0;">SCF 79 Red Square Market Hisar-125001</p>
            <p style="margin: 5px 0;">Phone: +91 9812166286</p>
            <p style="margin: 5px 0;">Email: rajindersinghmalik@gmail.com</p>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}