import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'chandanpathakssa@gmail.com',
      replyTo: email,
      subject: `New message from ${name} via Portfolio`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8f8f8; border-radius: 16px;">
          <h2 style="font-size: 24px; font-weight: 900; color: #000; margin-bottom: 8px; text-transform: uppercase; letter-spacing: -0.05em;">New Contact Message</h2>
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 24px;">Someone reached out via your portfolio contact form.</p>
          <div style="background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 12px; font-size: 14px;"><strong style="color: #000;">Name:</strong> <span style="color: #374151;">${name}</span></p>
            <p style="margin: 0 0 12px; font-size: 14px;"><strong style="color: #000;">Email:</strong> <a href="mailto:${email}" style="color: #374151;">${email}</a></p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="margin: 0; font-size: 14px;"><strong style="color: #000;">Message:</strong></p>
            <p style="margin: 8px 0 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px; text-align: center;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
