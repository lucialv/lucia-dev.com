import { Resend } from "resend";
import type { APIRoute } from "astro";

const resend = new Resend("re_TbLeV9BG_MAULaAwxThdhsfLxP6BP9n2o"); // Asegúrate de usar tu clave API

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    // Asegurar que los valores sean strings
    const name = data.get("name")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const subject = data.get("subject")?.toString() || "";
    const message = data.get("message")?.toString() || "";

    // Validar que todos los campos estén presentes
    if (!name || !email || !subject || !message) {
      console.error("Campos faltantes:", { name, email, subject, message });
      return new Response(
        JSON.stringify({ message: "Todos los campos son requeridos." }),
        { status: 400 },
      );
    }

    // Enviar correo con toda la información a tu correo
    const { error: myError } = await resend.emails.send({
      from: "Lucía Álvarez <noreply@lucia-dev.com>",
      to: ["lucia.alvrzt@gmail.com"],
      subject: `Nuevo mensaje de ${name} - ${subject}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (myError) {
      console.error("Error al enviar el correo a ti:", myError);
      return new Response(
        JSON.stringify({ message: "Error al enviarte el correo." }),
        { status: 500 },
      );
    }

    // Enviar una copia simple al usuario
    const { error: userError } = await resend.emails.send({
      from: "Lucía Álvarez <noreply@lucia-dev.com>",
      to: [email],
      subject: `Copia de tu mensaje: ${subject}`,
      html: `
        <p>Hola ${name},</p>
        <p>Gracias por tu mensaje. Aquí tienes una copia de lo que me enviaste:</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
        <p>Me pondré en contacto contigo pronto.</p>
      `,
    });

    if (userError) {
      console.error("Error al enviar el correo al usuario:", userError);
      return new Response(
        JSON.stringify({ message: "Error al enviar la copia al usuario." }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({ message: "¡Correo enviado exitosamente!" }),
      { status: 200 },
    );
  } catch (err) {
    console.error("Error en el servidor:", err);
    return new Response(JSON.stringify({ message: "Error en el servidor." }), {
      status: 500,
    });
  }
};
