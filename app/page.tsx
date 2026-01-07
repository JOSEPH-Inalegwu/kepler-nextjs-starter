import { ContactForm } from "@/components/kepler/contact-form";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <main className="w-full max-w-6xl py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
            Kepler Next.js Starter
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A secure, lightweight contact form powered by{" "}
            <a
              href="https://kepler.email"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-black underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-black dark:text-white dark:decoration-zinc-700 dark:hover:decoration-white"
            >
              Kepler Email API
            </a>
          </p>
        </div>

        <div className="flex justify-center">
          <ContactForm />
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Built with Next.js Server Actions • Zero client-side API keys • TypeScript ready
          </p>
        </div>
      </main>
    </div>
  );
}
