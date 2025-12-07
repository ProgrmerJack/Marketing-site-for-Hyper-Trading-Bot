/**
 * Email Service
 * Handles automated email confirmations
 * 
 * This is a mock implementation. Replace with your actual email provider:
 * - Resend (recommended for Next.js): https://resend.com
 * - SendGrid: https://sendgrid.com
 * - AWS SES: https://aws.amazon.com/ses/
 * - Postmark: https://postmarkapp.com
 */

export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
    // Mock implementation - logs to console
    console.log('[Email Service] Sending email:', {
        to: options.to,
        subject: options.subject,
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // TODO: Replace with actual email service integration
    // Example with Resend:
    // 
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // 
    // await resend.emails.send({
    //   from: 'HyperTrader <noreply@hypertrader.io>',
    //   to: options.to,
    //   subject: options.subject,
    //   html: options.html,
    // });
}

export async function sendContactConfirmation(email: string, company: string): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #4ff4cf 0%, #00b3ff 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Message Received</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Thank you for contacting us!</h2>
          
          <p>We've received your inquiry from <strong>${company}</strong> and our compliance team will review your request.</p>
          
          <p>What happens next:</p>
          <ul style="color: #666;">
            <li>Our team will review your compliance requirements</li>
            <li>We'll assess fit for your jurisdiction and mandate</li>
            <li>You'll receive a follow-up within 2-3 business days</li>
          </ul>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #4ff4cf; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Need immediate assistance?</strong><br>
              Email us directly at <a href="mailto:compliance@hypertrader.io" style="color: #00b3ff;">compliance@hypertrader.io</a>
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated confirmation. Please do not reply to this email.<br>
            HyperTrader | Algorithmic Trading Automation<br>
            <a href="https://hypertrader.io/privacy" style="color: #00b3ff;">Privacy Policy</a> | 
            <a href="https://hypertrader.io/terms" style="color: #00b3ff;">Terms of Service</a>
          </p>
        </div>
      </body>
    </html>
  `;

    await sendEmail({
        to: email,
        subject: "We've received your message - HyperTrader",
        html,
    });
}
