import { Resend } from "resend";
import type { APIRoute } from "astro";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

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

    // Enviar el correo usando Resend
    const { data: resendData, error } = await resend.emails.send({
      from: "Your Company <noreply@yourdomain.com>",
      to: [email],
      subject,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    if (error) {
      console.error("Error al enviar el correo:", error);
      return new Response(
        JSON.stringify({ message: "Error al enviar el correo." }),
        { status: 500 },
      );
    }

    console.log("Correo enviado con éxito:", resendData);
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
