interface EmailTemplateProps {
    firstName: string;
  }
  
  export const EmailTemplatedelete: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
  }) => (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
  <h1 className="text-2xl font-semibold mb-4">¡Tu reserva ha sido registrada!</h1>
  <p className="text-lg mb-4">
    Hola {firstName},
  </p>
  <p className="text-lg mb-4">
    Te informamos que tu reservación ha sido registrada para eliminar y está lista para ser atendida. Si necesitas realizar alguna modificación o cancelación, por favor comunícate con nuestros empleados lo antes posible.
  </p>
  <p>
    Para más información de nuestros términos y condiciones porfavor revisa el siguiente enlace
    {/* <a href="https://hotel-reservation-opal.vercel.app/tyc"> Terminos Y Condiciones</a> */}
  </p>
  <p className="text-lg mb-4">
    ¡Esperamos verte pronto!
  </p>
  <p className="text-lg mb-4">
    Atentamente,
    <br />
    El equipo de Hotel copo de Nieve
  </p>
</div>

  );
  