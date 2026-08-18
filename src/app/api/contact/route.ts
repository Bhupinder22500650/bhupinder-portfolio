import { NextResponse } from 'next/server';
import { PERSONAL_INFO } from '@/lib/constants';

// In-memory rate limiting: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps outside the sliding window
  const recentTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let body: Record<string, string> = {};

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData();
      body = Object.fromEntries(
        Array.from(formData.entries()).map(([k, v]) => [k, typeof v === 'string' ? v : ''])
      );
    }

    const { from_name, from_email, message, website } = body;
    const isFormSubmit = !contentType.includes('application/json');

    // 1. Honeypot check (hidden website field filled by bots)
    if (website && website.trim() !== '') {
      // Silently accept bot submission without processing or sending email
      if (isFormSubmit) {
        return NextResponse.redirect(new URL('/#contact?status=success', request.url));
      }
      return NextResponse.json({ success: true, message: 'Message sent!' });
    }

    // 2. Rate limiting check
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (isRateLimited(clientIp)) {
      const errorMessage = `Too many requests. Please email me directly at ${PERSONAL_INFO.email}.`;
      if (isFormSubmit) {
        return NextResponse.redirect(
          new URL(`/#contact?status=error&msg=${encodeURIComponent(errorMessage)}`, request.url)
        );
      }
      return NextResponse.json(
        { success: false, error: 'RATE_LIMITED', message: errorMessage },
        { status: 429 }
      );
    }

    // 3. Server-side Input Validation
    const name = (from_name || '').trim();
    const email = (from_email || '').trim();
    const msg = (message || '').trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !name ||
      name.length < 2 ||
      name.length > 100 ||
      !email ||
      !emailRegex.test(email) ||
      !msg ||
      msg.length < 5 ||
      msg.length > 5000
    ) {
      const errorMessage = 'Please provide a valid name, email address, and message.';
      if (isFormSubmit) {
        return NextResponse.redirect(
          new URL(`/#contact?status=error&msg=${encodeURIComponent(errorMessage)}`, request.url)
        );
      }
      return NextResponse.json(
        { success: false, error: 'INVALID_INPUT', message: errorMessage },
        { status: 400 }
      );
    }

    // 4. Configuration Check
    const serviceId = process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const errorMessage = `The form is temporarily unavailable. Please email me directly at ${PERSONAL_INFO.email}.`;
      if (isFormSubmit) {
        return NextResponse.redirect(
          new URL(`/#contact?status=error&msg=${encodeURIComponent(errorMessage)}`, request.url)
        );
      }
      return NextResponse.json(
        { success: false, error: 'CONFIG_MISSING', message: errorMessage },
        { status: 503 }
      );
    }

    // 5. Send email via EmailJS REST API
    const emailjsRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey || undefined,
        template_params: {
          from_name: name,
          from_email: email,
          message: msg,
        },
      }),
    });

    if (!emailjsRes.ok) {
      const errorMessage = `The form is temporarily unavailable. Please email me directly at ${PERSONAL_INFO.email}.`;
      if (isFormSubmit) {
        return NextResponse.redirect(
          new URL(`/#contact?status=error&msg=${encodeURIComponent(errorMessage)}`, request.url)
        );
      }
      return NextResponse.json(
        { success: false, error: 'SEND_FAILED', message: errorMessage },
        { status: 502 }
      );
    }

    // Success confirmation
    const successMessage = 'Message sent! I\'ll be in touch soon.';
    if (isFormSubmit) {
      return NextResponse.redirect(new URL('/#contact?status=success', request.url));
    }
    return NextResponse.json({ success: true, message: successMessage });
  } catch {
    const errorMessage = `The form is temporarily unavailable. Please email me directly at ${PERSONAL_INFO.email}.`;
    return NextResponse.json(
      { success: false, error: 'SERVER_ERROR', message: errorMessage },
      { status: 500 }
    );
  }
}
