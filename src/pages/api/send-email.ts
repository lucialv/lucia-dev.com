import { Resend } from "resend";
import React from "react";
import type { APIRoute } from "astro";
import Email from "../../components/Email.tsx";
import { getI18N } from "../../i18n";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const name = data.get("name")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const subject = data.get("subject")?.toString() || "";
    const message = data.get("message")?.toString() || "";
    const idioma = data.get("language")?.toString() || "";
    const verdadero = true;
    const i18n = getI18N({ currentLocale: idioma });

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
      to: "lucia.alvrzt@gmail.com",
      subject: `Mensaje recibido de ${name} - ${subject}`,
      react: React.createElement(Email, {
        name,
        email,
        subject,
        message,
        currentLocale: idioma,
        enviado: !verdadero,
      }),
    });

    if (myError) {
      console.error("Error al enviarte el correo:", myError);
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
      subject: i18n.EMAIL_INBOX.THANKS_FOR_THE_MESSAGE,
      react: React.createElement(Email, {
        name,
        email,
        subject,
        message,
        currentLocale: idioma,
        enviado: verdadero,
      }),
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
