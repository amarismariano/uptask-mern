import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8a1c7b3db255d2",
      pass: "768612d1dddc37",
    },
  });

  //Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `<p>Hola: ${name} Comprueba tu cuenta en UpTask</p>
      <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar Cuenta </a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
      </p>
      
      
      `,
  });
};

export const emailForgotPassword = async (data) => {
  const { email, name, token } = data;

  // TODO: Mover hacia variables de entorno
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8a1c7b3db255d2",
      pass: "768612d1dddc37",
    },
  });

  //Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Reestablece tu contraseña",
    text: "Reestablece tu contraseña",
    html: `<p>Hola: ${name} has solicitado reestablecer tu contraseña</p>
      <p>Sigue el siguiente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> Reestablecer contraseña </a>

        <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
      </p>
      
      
      `,
  });
};
