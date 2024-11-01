import { useState, useEffect } from "react";
import { getI18N } from "../i18n";
import toast, { Toaster } from "react-hot-toast";

export default function ContactForm({ currentLocale }) {
  const i18n = getI18N({ currentLocale });
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });

  function validateForm(formData) {
    let formIsValid = true;
    let newErrors = { email: "", message: "" };

    const message = formData.get("message");
    if (message.length === 0) {
      newErrors.message = i18n.FORM.ERROR_NAME_REQUIRED;
      toast.error(i18n.FORM.ERROR_NAME_REQUIRED);
      formIsValid = false;
    } else if (message.length < 30) {
      newErrors.message = i18n.FORM.ERROR_MESSAGE_LENGTH;
      toast.error(i18n.FORM.ERROR_MESSAGE_LENGTH);
      formIsValid = false;
    }
    const subjet = formData.get("subject");
    if (subjet.length === 0) {
      newErrors.message = i18n.FORM.ERROR_SUBJECT_REQUIRED;
      toast.error(i18n.FORM.ERROR_SUBJECT_REQUIRED);
      formIsValid = false;
    } else if (subjet.length < 5) {
      newErrors.message = i18n.FORM.ERROR_SUBJECT_LENGTH;
      toast.error(i18n.FORM.ERROR_SUBJECT_LENGTH);
      formIsValid = false;
    }

    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      newErrors.email = i18n.FORM.ERROR_EMAIL_REQUIRED;
      toast.error(i18n.FORM.ERROR_EMAIL_REQUIRED);
      formIsValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = i18n.FORM.ERROR_EMAIL_VALIDATE;
      toast.error(i18n.FORM.ERROR_EMAIL_VALIDATE);
      formIsValid = false;
    }

    const name = formData.get("name");
    if (name.length === 0) {
      newErrors.message = i18n.FORM.ERROR_NAME_REQUIRED;
      toast.error(i18n.FORM.ERROR_NAME_REQUIRED);
      formIsValid = false;
    } else if (name.length < 2) {
      newErrors.message = i18n.FORM.ERROR_NAME_LENGTH;
      toast.error(i18n.FORM.ERROR_NAME_LENGTH);
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  }

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const token = await grecaptcha.execute(
      "6LdcWmsqAAAAAP2HNw8DU_6BjOmIdyaDvrQ7qFYK",
      { action: "submit" },
    );
    formData.append("recaptcha", token);

    if (!validateForm(formData)) {
      return;
    }

    toast.promise(
      (async () => {
        const recaptchaResponse = await fetch("/api/re-captcha", {
          method: "POST",
          body: formData,
        });
        const recaptchaData = await recaptchaResponse.json();
        if (!recaptchaData.success) throw new Error(i18n.FORM.ERROR_RECAPTCHA);

        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          body: formData,
        });
        const emailData = await emailResponse.json();
        if (!emailData.success) throw new Error(i18n.FORM.ERROR);

        setResponseMessage(i18n.FORM.SUCCESS);
      })(),
      {
        loading: i18n.FORM.LOADING,
        success: i18n.FORM.SUCCESS,
        error: i18n.FORM.ERROR,
      },
    );
  }

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
      <form onSubmit={submit} className="p-8 rounded-x l max-w-lg w-full">
        <label
          htmlFor="name"
          className="form-control mb-4 mx-auto w-full max-w-xs"
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder={i18n.FORM.NAME_PLACEHOLDER}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label
          htmlFor="email"
          className="form-control mb-4 mx-auto w-full max-w-xs"
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder={i18n.FORM.EMAIL_PLACEHOLDER}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label
          htmlFor="subject"
          className="form-control mb-4 mx-auto w-full max-w-xs"
        >
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder={i18n.FORM.SUBJECT_PLACEHOLDER}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label
          htmlFor="message"
          className="form-control mb-4 mx-auto w-full max-w-xs"
        >
          <textarea
            placeholder={i18n.FORM.MESSAGE_PLACEHOLDER}
            name="message"
            id="message"
            className="textarea resize-none textarea-bordered textarea-lg bg-[#fafaff] w-full h-32 p-3 rounded-lg"
          ></textarea>
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
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 9999,
            minWidth: "250px",
          },
        }}
      />
    </div>
  );
}
