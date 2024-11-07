import { Resend } from "resend";
import type { APIRoute } from "astro";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const name = data.get("name")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const subject = data.get("subject")?.toString() || "";
    const message = data.get("message")?.toString() || "";

    if (!name || !email || !subject || !message) {
      console.error("Campos faltantes:", { name, email, subject, message });
      return new Response(
        JSON.stringify({
          success: false,
          message: "Todos los campos son requeridos.",
        }),
        { status: 400 },
      );
    }

    const { error: myError } = await resend.emails.send({
      from: "Lucía Álvarez <contact@lucia-dev.com>",
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
        JSON.stringify({
          success: false,
          message: "Error al enviarte el correo.",
        }),
        { status: 500 },
      );
    }

    const { error: userError } = await resend.emails.send({
      from: "Lucía Álvarez <contact@lucia-dev.com>",
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
        JSON.stringify({
          success: false,
          message: "Error al enviar la copia al usuario.",
        }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "¡Correo enviado exitosamente!",
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error("Error en el servidor:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Error en el servidor." }),
      { status: 500 },
    );
  }
};
