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

interface ReceivedEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ReceivedEmail: React.FC<ReceivedEmailProps> = ({
  name,
  email,
  subject,
  message,
}) => {
  const previewText = `Hi ${name}, Don&apos;t Forget to Document Your Thoughts!`;

  return (
    <Html>
      <Head>
        <title> Don&apos;t Forget to Document Your Thoughts!</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Img src="/Logo.webp" width="130" alt="" className="mx-auto my-0" />

            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-purple-600">
                Hi, {name}! 🌟
              </Heading>
              <Text className="mt-6 text-base">
                Thank you for reaching out to me! 💌 I&apos;ve received your
                message, and I&apos;ll get back to you as soon as possible.
                Here&apos;s a copy of what you sent me:
              </Text>
              <Hr className="my-4" />
              <Section className="text-black">
                <Text className="text-lg font-semibold">Name:</Text>
                <Text className="text-lg">{name}</Text>
                <Hr className="my-4" />
                <Text className="text-lg font-semibold">Email:</Text>
                <Text className="text-lg">{email}</Text>
                <Hr className="my-4" />
                <Text className="text-lg font-semibold">Subject:</Text>
                <Text className="text-lg">{subject}</Text>
                <Hr className="my-4" />
                <Text className="text-lg font-semibold">Message:</Text>
                <Text className="text-lg">{message}</Text>
                <Hr className="my-4" />
              </Section>
            </Section>
            <Section className="mt-4 text-center text-zinc-400">
              <Text>If you have any questions or need further assistance,</Text>
              <Text className="-mt-4">
                please feel free to contact me at{" "}
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
  );
};

export default ReceivedEmail;
