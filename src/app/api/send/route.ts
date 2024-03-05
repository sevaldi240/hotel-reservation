
import { EmailTemplate } from '@/components/EmailTemplate/EmailTemplate';
import { EmailTemplatedelete } from '@/components/EmailTemplateDelete/EmailTemplateDelete';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['scaizatamayoregion169@gmail.com'],
      subject: 'Eliminación de Reserva',
      react: EmailTemplatedelete({ firstName: 'Sergio' }),
      text:""
    });

    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
