# Email Setup for Job Applications

## Overview

The careers page now includes a professional application form that sends job applications via email. Here are the setup options:

## Option 1: Gmail (Recommended for Small Business)

### Setup Steps:

1. **Create Gmail Account**: Set up `careers@vitalicesf.com` or use an existing Gmail account
2. **Enable 2-Factor Authentication**: Go to Google Account > Security > 2-Step Verification
3. **Create App Password**:
   - Go to Google Account > Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
4. **Environment Variables**: Create a `.env.local` file in your project root:
   ```
   EMAIL_USER=careers@vitalicesf.com
   EMAIL_PASSWORD=your_app_password_here
   ```

## Option 2: Email Service Providers

### SendGrid

1. Create account at [sendgrid.com](https://sendgrid.com)
2. Get API key from dashboard
3. Environment variables:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=your_sendgrid_api_key
   ```

### Mailgun

1. Create account at [mailgun.com](https://mailgun.com)
2. Get API key from dashboard
3. Environment variables:
   ```
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=your_mailgun_username
   SMTP_PASSWORD=your_mailgun_password
   ```

## Option 3: EmailJS (No Backend Required)

### Setup Steps:

1. **Install EmailJS**: `npm install @emailjs/browser`
2. **Create Account**: Sign up at [emailjs.com](https://emailjs.com)
3. **Create Email Template**: Set up a template for job applications
4. **Update Code**: Replace the API call with EmailJS in `src/lib/email.ts`

```typescript
import emailjs from '@emailjs/browser';

export const sendJobApplication = async (application: JobApplication): Promise<boolean> => {
  try {
    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        job_title: application.jobTitle,
        first_name: application.firstName,
        last_name: application.lastName,
        email: application.email,
        phone: application.phone,
        experience: application.experience,
        why_join: application.whyJoin,
      },
      'YOUR_PUBLIC_KEY'
    );

    return result.status === 200;
  } catch (error) {
    console.error('Error sending application:', error);
    return false;
  }
};
```

## Fallback System

The current implementation includes a fallback system:

1. **Primary**: Tries to send via API/email service
2. **Fallback**: If API fails, opens user's email client with pre-filled application
3. **User Experience**: Always provides a way for applications to be submitted

## Security Considerations

- **Environment Variables**: Never commit email passwords to version control
- **Rate Limiting**: Consider adding rate limiting to prevent spam
- **Validation**: Server-side validation is recommended
- **File Uploads**: For resume uploads, consider using cloud storage (AWS S3, etc.)

## Testing

1. **Local Testing**: Use a test email address
2. **Production**: Ensure environment variables are set on your hosting platform
3. **Monitoring**: Check email delivery and spam folders

## Troubleshooting

### Common Issues:

- **Authentication Failed**: Check app password/API key
- **Email Not Received**: Check spam folder
- **Form Not Submitting**: Check browser console for errors
- **File Upload Issues**: Ensure file size limits and type restrictions

### Debug Steps:

1. Check browser console for errors
2. Verify environment variables are loaded
3. Test email service credentials
4. Check server logs for API errors
