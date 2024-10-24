import { useState } from "react";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const response = await fetch("/api/send-email", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="mb-5 max-w-[200px]">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-black"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full rounded-md border bg-base-100 px-4 py-3"
        />
      </div>

      <div className="mb-5 max-w-[300px]">
        <label
          htmlFor="email"
          className="mb-3 block text-base font-medium text-black"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full rounded-md border bg-base-100 px-4 py-3"
        />
      </div>

      <div className="mb-5 max-w-[400px]">
        <label
          htmlFor="subject"
          className="mb-3 block text-base font-medium text-black"
        >
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          className="w-full rounded-md border bg-base-100 px-4 py-3"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="message"
          className="mb-3 block text-base font-medium text-black"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          className="w-full rounded-md border bg-base-100 px-4 py-3"
        ></textarea>
      </div>

      <button
        type="submit"
        className="rounded-full border-2 border-secondary p-4 px-6 py-3"
      >
        Send
      </button>

      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
