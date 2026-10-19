import { resend } from '@/lib/resend';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'all fields are required' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.YOUR_EMAIL_ADDRESS,
      subject: `new recruiter inquiry from ${name}`,
      reply_to: email,
      html: `
        <h2>new message from your portfolio</h2>
        <p><strong>name:</strong> ${name}</p>
        <p><strong>email:</strong> ${email}</p>
        <p><strong>message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: 'failed to send message' }, { status: 500 });
  }
}