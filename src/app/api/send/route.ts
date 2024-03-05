
import { EmailTemplate } from '@/components/EmailTemplate/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['sebastian_guaman26@hotmail.com'],
      subject: 'Eliminación de Reserva',
      react: EmailTemplate({ firstName: 'Sergio' }),
      text:""
    });

    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
