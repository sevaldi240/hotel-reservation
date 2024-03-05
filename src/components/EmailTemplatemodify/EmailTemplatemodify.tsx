interface EmailTemplateProps {
    firstName: string;
  }
  
  export const EmailTemplatemodify: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
  }) => (
    <div className="bg-blue-100 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">¡Bienvenido!</h1>
        <p className="text-lg mb-4">
            Hola {firstName},
        </p>
        <p className="text-lg mb-4">
            Nos complace informarte que hemos recibido tu solicitud para modificar tu reserva. El valor diferencial, si corresponde, será cobrado en los próximos 15 días laborables.
        </p>
        <p className="text-lg mb-4">
            Por favor, mantente atento/a a cualquier comunicación adicional de nuestra parte. Para más información por favor visita nuestros términos y condiciones
            {/* <a href="https://hotel-reservation-opal.vercel.app/tyc"> Terminos Y Condiciones</a> */}
        </p>
        <p className="text-lg mb-4">
            ¡Gracias por tu confianza y esperamos que disfrutes de tu experiencia con nosotros!
        </p>
        <p className="text-lg mb-4">
            Atentamente,
            <br />
            El equipo de Hotel Copo de nieve
        </p>
    </div>

  );
  

  