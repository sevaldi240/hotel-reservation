interface EmailTemplateProps {
    firstName: string;
  }
  
  export const EmailTemplatedelete: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
  }) => (
    <div>
      <h1>Tu reservación ha sido registrada para eliminar, por favor comunícate con los empleados para eliminar {firstName}!</h1>
    </div>
  );
  