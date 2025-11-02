/**
 * CAN-SPAM Compliant Email Template
 * Required elements:
 * 1. Physical postal address
 * 2. Clear identification as advertisement
 * 3. One-click unsubscribe link (prominent)
 * 4. No misleading subject lines
 * 5. Company identification
 * 
 * Note: This generates HTML strings for email, not React components.
 * Use with your email sending library (Resend, SendGrid, Mailchimp, etc.)
 */

interface EmailTemplateOptions {
  recipientEmail: string;
  unsubscribeToken: string;
  subject: string;
  preheader?: string;
  content: string; // HTML content for email body
}

/**
 * Generate CAN-SPAM compliant email HTML
 * Returns a string suitable for email clients
 */
export function renderEmailTemplate({
  recipientEmail,
  unsubscribeToken,
  subject,
  preheader,
  content,
}: EmailTemplateOptions): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hypertradingautomation.com";
  const unsubscribeUrl = `${baseUrl}/api/email/unsubscribe?email=${encodeURIComponent(recipientEmail)}&token=${unsubscribeToken}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <title>${subject}</title>
  ${preheader ? `<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>` : ""}
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <!-- Advertisement Label (CAN-SPAM) -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1f2937;padding:8px 0;">
    <tr>
      <td align="center">
        <span style="color:#9ca3af;font-size:12px;">
          This is a promotional email from Hyper Trading Automation
        </span>
      </td>
    </tr>
  </table>

  <!-- Main Content Container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;max-width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px;background-color:#1e40af;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;">
                Hyper Trading Automation
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:40px;">${content}</td>
          </tr>

          <!-- Unsubscribe Section (Prominent) -->
          <tr>
            <td style="padding:20px 40px;background-color:#f9fafb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${unsubscribeUrl}" style="display:inline-block;padding:12px 24px;background-color:#ef4444;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">
                      Unsubscribe from Marketing Emails
                    </a>
                    <p style="margin:12px 0 0 0;font-size:12px;color:#6b7280;">
                      You will be removed within 10 business days
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer with Physical Address (CAN-SPAM Requirement) -->
          <tr>
            <td style="padding:32px 40px;background-color:#1f2937;color:#9ca3af;font-size:12px;line-height:1.6;">
              <p style="margin:0 0 12px 0;font-weight:600;color:#ffffff;">
                Hyper Trading Automation
              </p>
              
              <!-- Physical Postal Address (CAN-SPAM Required) -->
              <p style="margin:0 0 12px 0;">
                123 Trading Plaza, Suite 456<br />
                Financial District<br />
                New York, NY 10004<br />
                United States
              </p>

              <p style="margin:0 0 12px 0;">
                You are receiving this email because you opted in to receive updates from Hyper Trading Automation.
              </p>

              <p style="margin:0 0 12px 0;">
                If you no longer wish to receive these emails, you can <a href="${unsubscribeUrl}" style="color:#60a5fa;text-decoration:underline;">unsubscribe here</a>.
              </p>

              <p style="margin:0;">
                © ${new Date().getFullYear()} Hyper Trading Automation. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generate secure unsubscribe token
 * In production, use HMAC with secret key
 */
export function generateUnsubscribeToken(email: string): string {
  // TODO: Implement HMAC signature
  // For now, simple base64 encoding (NOT SECURE for production)
  return Buffer.from(`${email}:${Date.now()}`).toString("base64url");
}

/**
 * Validate unsubscribe token
 */
export function validateUnsubscribeToken(email: string, token: string): boolean {
  // TODO: Implement HMAC verification
  // For now, simple decode check
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    return decoded.startsWith(email);
  } catch {
    return false;
  }
}
