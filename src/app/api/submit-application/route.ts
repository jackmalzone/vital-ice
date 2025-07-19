import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { application } = body;

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      // Option 1: Gmail (requires app password)
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // careers@vitalicesf.com
        pass: process.env.EMAIL_PASSWORD, // App password from Gmail
      },

      // Option 2: Custom SMTP (like SendGrid, Mailgun, etc.)
      // host: 'smtp.sendgrid.net',
      // port: 587,
      // secure: false,
      // auth: {
      //   user: process.env.SMTP_USER,
      //   pass: process.env.SMTP_PASSWORD,
      // },
    });

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'careers@vitalicesf.com',
      to: 'careers@vitalicesf.com',
      subject: `Job Application: ${application.jobTitle}`,
      html: `
        <h2>New Job Application</h2>
        <h3>Position: ${application.jobTitle}</h3>
        
        <h4>Applicant Information:</h4>
        <p><strong>Name:</strong> ${application.firstName} ${application.lastName}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone || 'Not provided'}</p>
        
        <h4>Relevant Experience:</h4>
        <p>${application.experience.replace(/\n/g, '<br>')}</p>
        
        <h4>Why they want to join Vital Ice:</h4>
        <p>${application.whyJoin.replace(/\n/g, '<br>')}</p>
        
        <p><strong>Resume:</strong> ${application.resume ? application.resume.name : 'Not provided'}</p>
        
        <hr>
        <p><em>This application was submitted through the Vital Ice careers page.</em></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending application:', error);
    return NextResponse.json({ error: 'Failed to send application' }, { status: 500 });
  }
}
