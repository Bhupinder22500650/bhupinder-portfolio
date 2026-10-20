import { EMAILJS_CONFIG } from './config';

export interface ContactMessage {
  from_name: string;
  from_email: string;
  message: string;
}

export function normalizeContactMessage(input: ContactMessage): ContactMessage {
  const message = {
    from_name: input.from_name.trim(),
    from_email: input.from_email.trim(),
    message: input.message.trim(),
  };
  if (!message.from_name || !message.message) throw new Error('Please enter your name and a message.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.from_email)) throw new Error('Please enter a valid email address.');
  if (message.from_name.length > 100 || message.from_email.length > 254 || message.message.length > 5000) throw new Error('Please shorten your message and try again.');
  return message;
}

export async function sendContactMessage(message: ContactMessage): Promise<void> {
  const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;
  if (!serviceId || !templateId || !publicKey) throw new Error('Email service is not configured.');
  const emailjs = (await import('@emailjs/browser')).default;
  await emailjs.send(serviceId, templateId, { ...normalizeContactMessage(message) }, { publicKey });
}
