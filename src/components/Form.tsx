import { useState, useEffect } from "react";
import { getI18N } from "../i18n";

export default function ContactForm({ currentLocale }) {
  const i18n = getI18N({ currentLocale });
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });

  function validateForm(formData: FormData) {
    let formIsValid = true;
    let newErrors = { email: "", message: "" };

    // Validación del email
    const email = formData.get("email") as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "El email no es válido.";
      formIsValid = false;
    }

    // Validación del mensaje
    const message = formData.get("message") as string;
    if (message.length < 30) {
      newErrors.message = "El mensaje debe tener al menos 30 carácteres.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Obtener el token de reCAPTCHA
    const token = await grecaptcha.execute(
      "6LdcWmsqAAAAAP2HNw8DU_6BjOmIdyaDvrQ7qFYK",
      {
        action: "submit",
      },
    );
    formData.append("recaptcha", token); // Añadir el token al FormData

    // Si las validaciones fallan, no se envía el formulario
    if (!validateForm(formData)) {
      return;
    }

    // Enviar el token a la API de reCAPTCHA para verificarlo
    const recaptchaResponse = await fetch("/api/re-captcha", {
      method: "POST",
      body: formData,
    });

    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success) {
      setResponseMessage("Error en la verificación de reCAPTCHA.");
      return;
    }

    // Enviar el correo a la API de send-email
    const emailResponse = await fetch("/api/send-email", {
      method: "POST",
      body: formData,
    });

    const emailData = await emailResponse.json();
    if (emailData.success) {
      setResponseMessage("Mensaje enviado con éxito.");
    } else {
      setResponseMessage("Error al enviar el mensaje.");
    }
  }

  // Cargar el script de reCAPTCHA
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6LdcWmsqAAAAAP2HNw8DU_6BjOmIdyaDvrQ7qFYK";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={submit} className="p-8 rounded-xl max-w-lg w-full">
        <label htmlFor="name" className="form-control mx-auto w-full max-w-xs">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="h-[12px]"></span>
          </div>
        </label>

        <label htmlFor="email" className="form-control mx-auto w-full max-w-xs">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="h-[12px]">
              {errors.email ? (
                <p className="text-red-500 text-xs">{errors.email}</p>
              ) : (
                <p className="text-red-500 hidden">El email no es válido.</p>
              )}
            </span>
          </div>
        </label>

        <label
          htmlFor="subject"
          className="form-control mx-auto w-full max-w-xs"
        >
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="h-[12px]"></span>
          </div>
        </label>

        <label
          htmlFor="message"
          className="form-control mx-auto w-full max-w-xs"
        >
          <textarea
            placeholder="Tu mensaje aquí..."
            name="message"
            id="message"
            className="textarea resize-none textarea-bordered textarea-lg bg-[#fafaff] w-full h-32 p-3 rounded-lg"
          ></textarea>
          <div className="label">
            <span className="h-[16px]">
              {errors.message ? (
                <p className="text-red-500 text-xs">{errors.message}</p>
              ) : (
                <p className="text-red-500 hidden">El mensaje no es válido.</p>
              )}
            </span>
          </div>
        </label>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="group w-[150px] relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-secondary p-4 px-6 py-3 font-medium drop-shadow-[0_0_0.6rem_#b393d670] transition duration-300 ease-out"
          >
            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-secondary text-white duration-300 group-hover:translate-x-0">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="ease absolute flex h-full w-full transform items-center justify-center text-black transition-all duration-300 group-hover:translate-x-full">
              {i18n.SEND}
            </span>
            <span className="invisible relative">{i18n.SEND}</span>
          </button>
        </div>

        {responseMessage && (
          <p className="mt-4 text-center text-green-600">{responseMessage}</p>
        )}
      </form>
    </div>
  );
}
