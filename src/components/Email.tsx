import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { getI18N } from "../i18n";

interface EmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  currentLocale: string;
  enviado: boolean;
}

const Email: React.FC<EmailProps> = ({
  name,
  email,
  subject,
  message,
  currentLocale,
  enviado,
}) => {
  const i18n = getI18N({ currentLocale });
  return (
    <>
      {enviado ? (
        <Html>
          <Head>
            <title>{i18n.EMAIL_INBOX.THANKS_FOR_THE_MESSAGE}</title>
          </Head>
          <Preview>{i18n.EMAIL_INBOX.VIEW_THIS_EMAIL}</Preview>
          <Tailwind>
            <Body className="mx-auto font-sans">
              <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
                <Img
                  src="https://raw.githubusercontent.com/lucialv/lucia-dev.com/refs/heads/main/public/logo-lucia.png"
                  width="130"
                  alt=""
                  className="mx-auto my-0"
                />
                <Hr className="my-4" />
                <Section className="mt-4">
                  <Heading className="text-center text-2xl font-semibold text-purple-600">
                    {i18n.HI}, {name}! 🌟
                  </Heading>
                  <Text className="mt-6 text-base text-center">
                    {i18n.EMAIL_INBOX.SUBHEADING}
                  </Text>
                  <Hr className="my-4" />
                  <Section className="text-black">
                    <Text className="text-lg font-semibold">
                      {i18n.FULL_NAME}:
                    </Text>
                    <Text className="text-lg">{name}</Text>
                    <Hr className="my-4" />
                    <Text className="text-lg font-semibold">{i18n.EMAIL}:</Text>
                    <Text className="text-lg">{email}</Text>
                    <Hr className="my-4" />
                    <Text className="text-lg font-semibold">
                      {i18n.SUBJECT}:
                    </Text>
                    <Text className="text-lg">{subject}</Text>
                    <Hr className="my-4" />
                    <Text className="text-lg font-semibold">
                      {i18n.MESSAGE}:
                    </Text>
                    <Text className="text-lg">{message}</Text>
                    <Hr className="my-4" />
                  </Section>
                </Section>
                <Section className="mt-4 text-center text-zinc-400">
                  <Text>
                    {i18n.EMAIL_INBOX.FURTHER},
                    <br />
                    {i18n.EMAIL_INBOX.FURTHER_TWO}{" "}
                    <Link
                      href={`mailto:support@lucia-dev.com`}
                      className="text-blue-500 underline"
                    >
                      support@lucia-dev.com
                    </Link>
                  </Text>

                  <Text className="mb-0 mt-4">
                    @ Lucía Álvarez {new Date().getFullYear()}
                  </Text>
                </Section>
              </Container>
            </Body>
          </Tailwind>
        </Html>
      ) : (
        <Html>
          <Head>
            <title>Correo recibido de lucia-dev.com</title>
          </Head>
          <Preview>Ver el mensaje</Preview>
          <Tailwind>
            <Body className="mx-auto font-sans">
              <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
                <Img
                  src="https://raw.githubusercontent.com/lucialv/lucia-dev.com/refs/heads/main/public/logo-lucia.png"
                  width="130"
                  alt=""
                  className="mx-auto my-0"
                />
                <Hr className="my-4" />
                <Section className="mt-4">
                  <Heading className="text-center text-2xl font-semibold text-purple-600">
                    Hola, Lucía Álvarez! 🌟
                  </Heading>
                  <Text className="mt-6 text-base text-center">
                    Este es el mensaje que recibiste de tu formulario de
                    contacto
                  </Text>
                  <Hr className="my-4" />
                  <Section className="text-black">
                    <Text className="text-lg font-semibold">Nombre:</Text>
                    <Text className="text-lg">{name}</Text>
                    <Hr className="my-4" />
                    <Text className="text-lg font-semibold">Email:</Text>
                    <Text className="text-lg">{email}</Text>
                    <Hr className="my-4" />
                    <Text className="text-lg font-semibold">Asunto:</Text>
                    <Text className="text-lg">{subject}</Text>
                    <Hr className="my-4" />
                    <Text className="text-lg font-semibold">Mensaje:</Text>
                    <Text className="text-lg">{message}</Text>
                    <Hr className="my-4" />
                  </Section>
                </Section>
                <Section className="mt-4 text-center text-zinc-400">
                  <Text>
                    Correo enviado desde{" "}
                    <Link
                      href={`mailto:support@lucia-dev.com`}
                      className="text-blue-500 underline"
                    >
                      lucia-dev.com
                    </Link>
                  </Text>

                  <Text className="mb-0 mt-4">
                    @ Lucía Álvarez {new Date().getFullYear()}
                  </Text>
                </Section>
              </Container>
            </Body>
          </Tailwind>
        </Html>
      )}
    </>
  );
};

export default Email;
