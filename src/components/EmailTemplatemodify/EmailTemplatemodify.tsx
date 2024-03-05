interface EmailTemplateProps {
    firstName: string;
  }
  
  export const EmailTemplatemodify: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
  }) => (
    <div>
      <h1>Bienvendio, hemos recibido tu solicitud para modificar tu reserva, el valor diferencial será cobrado en los próximos 15 días laborables {firstName}!</h1>
    </div>
  );
  