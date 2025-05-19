// api/contact.ts
export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, message } = await req.json();

  // Prepare the Resend payload
  const payload = {
    from: `${name} <${process.env.MY_EMAIL!}>`,
    to: ['aephyxen@gmail.com'], // set via Vercel Environment Variables
    subject: `New message from ${name}`,
    html: `<p>${message}</p>`,
  };

  // Call Resend API
  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY!}`,
    },
    body: JSON.stringify(payload),
  });

  if (!resendRes.ok) {
    const errorText = await resendRes.text();
    return new Response(JSON.stringify({ error: errorText }), {
      status: resendRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
