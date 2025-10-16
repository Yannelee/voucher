import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const mailOptions = {
    from: {name: 'Comunidad', address: 'comunidad@example.com'},
    to: body.to,
    subject: body.subject || "Aquí tienes tu PDF",
    html: body.html || "Adjunto encontrarás tu PDF generado.",
    ...(body.attachments && {         // Archivos adjuntos opcionales
      attachments: body.attachments//attachments: body.attachments || [],
    }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, message: "Correo enviado", info };
  } catch (error) {
    return { success: false, message: "Error al enviar el correo", error };
  }
});
