import { useState, useRef, useEffect } from "react";
import { getI18N } from "../i18n";
import toast, { Toaster } from "react-hot-toast";
import { Mail, User, MessageSquare, Send } from "lucide-react";

export default function ContactForm({ currentLocale }) {
  const i18n = getI18N({ currentLocale });
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  function getLanguageFromUrl() {
    const path = window.location.pathname;
    if (path.startsWith("/en")) return "en";
    if (path.startsWith("/ca")) return "ca";
    return "es";
  }

  function validateForm(formData) {
    let formIsValid = true;
    let newErrors = { email: "", message: "" };

    const message = formData.get("message");
    if (message.length === 0) {
      newErrors.message = i18n.FORM.ERROR_MESSAGE_REQUIRED;
      toast.error(i18n.FORM.ERROR_MESSAGE_REQUIRED);
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

    const language = getLanguageFromUrl();
    formData.append("language", language);

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
        nameRef.current.value = "";
        emailRef.current.value = "";
        subjectRef.current.value = "";
        messageRef.current.value = "";
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
    <section className=" py-16 md:pb-24 relative overflow-hidden min-w-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[500px] bg-secondary rounded-full opacity-10 blur-3xl"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className=" backdrop-blur-sm shadow-lg rounded-lg p-8 border border-secondary transition-all duration-300 relative z-10 ">
            <form onSubmit={submit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-600"
                  >
                    {i18n.FORM.NAME}
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary transition-all duration-300 ease-in-out group-hover:text-primary"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder={i18n.FORM.NAME_PLACEHOLDER}
                      className="pl-10 w-full input border-2 border-secondary focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 rounded-lg  transition-all duration-300 ease-in-out  focus:bg-white"
                      ref={nameRef}
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-600"
                  >
                    {i18n.FORM.EMAIL}
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary transition-all duration-300 ease-in-out group-hover:text-primary"
                      size={18}
                    />
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder={i18n.FORM.EMAIL_PLACEHOLDER}
                      className="pl-10 w-full input border-2 border-secondary focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 rounded-lg  transition-all duration-300 ease-in-out  focus:bg-white"
                      ref={emailRef}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 group">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-600"
                >
                  {i18n.FORM.SUBJECT}
                </label>
                <div className="relative">
                  <MessageSquare
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary transition-all duration-300 ease-in-out group-hover:text-primary"
                    size={18}
                  />
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder={i18n.FORM.SUBJECT_PLACEHOLDER}
                    className="pl-10 w-full input border-2 border-secondary focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 rounded-lg  transition-all duration-300 ease-in-out  focus:bg-white"
                    ref={subjectRef}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-600"
                >
                  {i18n.FORM.MESSAGE}
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder={i18n.FORM.MESSAGE_PLACEHOLDER}
                  className="w-full h-32 textarea border-2 border-secondary focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 rounded-lg transition-all duration-300 ease-in-out  focus:bg-white resize-none p-3"
                  ref={messageRef}
                ></textarea>
              </div>

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
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              {i18n.REACH_OUT}
            </h3>
            <div className="flex justify-center space-x-6">
              {/* Link to Discord */}
              <a
                href="https://discord.gg/Ye9tPdBu6X"
                target="_blank"
                className="text-primary hover:text-secondary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                </svg>
              </a>
              {/* Link to Instagram */}
              <a
                href="https://www.instagram.com/lucialvnet/ "
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-6 w-6"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Link to X */}
              <a
                href="https://x.com/lucialvr13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  stroke="currentColor"
                >
                  <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
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
    </section>
  );
}
