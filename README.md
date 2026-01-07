# Kepler Next.js Form

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwindcss)

A secure, server-side contact form pattern for Next.js applications using the Keplers Email API.

---

## 🧠 Philosophy

**This is not an npm package.** It's a collection of copy-pasteable files designed to give you full control over styling, validation, and logic—similar to [Shadcn UI](https://ui.shadcn.com/).

Instead of installing a black-box dependency, you copy the files you need into your project and customize them to fit your exact requirements. No bloat, no magic, just clean, readable code you own.

---

## 📦 Installation

### Step 1: Dependencies

Ensure you have the following installed:

```bash
npm install next react react-dom tailwindcss
```

This starter requires **Next.js 14+** with the App Router and **Tailwind CSS 4+**.

---

### Step 2: The Logic (Copy these files)

Copy the following files into your project to handle types, API communication, and server-side form submission:

- [`types/index.ts`](./types/index.ts) - TypeScript interfaces for form state and API payloads
- [`lib/kepler.ts`](./lib/kepler.ts) - Lightweight Keplers Email API client
- [`app/actions.ts`](./app/actions.ts) - Next.js Server Action for secure form processing

---

### Step 3: The UI (Copy these files)

Copy the following React components to render the contact form:

- [`components/kepler/contact-form.tsx`](./components/kepler/contact-form.tsx) - Main contact form component
- [`components/kepler/submit-button.tsx`](./components/kepler/submit-button.tsx) - Submit button with loading state

---

### Step 4: Configuration

Create a `.env.local` file in your project root:

```bash
# Kepler Email API Configuration
KEPLER_API_KEY=sk_your_kepler_api_key_here
CONTACT_EMAIL=your-email@example.com
```

**Required Variables:**

- `KEPLER_API_KEY` - Your Keplers Email API key ([Get one here](https://keplers.email))
- `CONTACT_EMAIL` - The email address where form submissions will be sent

> [!IMPORTANT]
> Never commit `.env.local` to version control. Add it to your `.gitignore`.

---

## 🚀 Usage

Import and use the `ContactForm` component in any page:

```tsx
import { ContactForm } from "@/components/kepler/contact-form";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ContactForm />
    </div>
  );
}
```

That's it! The form will handle validation, submission, and email delivery automatically.

---

## ✨ Features

- **🔒 Server-Side Security** - API keys never exposed to the client (uses Next.js Server Actions)
- **⚡ Instant Delivery** - Uses Keplers' instant email endpoint for immediate sending
- **📦 Zero-Dependency Validation** - No Zod, no React Hook Form—just clean, native validation
- **📘 Fully Typed** - Complete TypeScript support for type safety
- **🎨 Customizable** - Own the code, modify styles and logic as needed
- **🪶 Lightweight** - Minimal dependencies, maximum control

---

## 📁 Project Structure

```
kepler-starter/
├── app/
│   ├── actions.ts          # Server Actions - handles form submission
│   ├── page.tsx            # Main page with contact form
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   └── kepler/             # Kepler UI components
│       ├── contact-form.tsx    # Main contact form component
│       ├── submit-button.tsx   # Form submit button with loading state
│       └── index.ts            # Barrel exports
├── lib/
│   └── kepler.ts           # Kepler API client wrapper
├── types/
│   └── index.ts            # TypeScript type definitions
├── .env.local              # Environment variables (not committed)
├── package.json
└── README.md
```

### 🏗️ Architecture Overview

This starter follows a clean, modular architecture:

- **🌉 The Bridge** (`app/actions.ts`)  
  Next.js Server Actions that securely handle form submissions. This is where your API key lives, safely on the server.

- **🎨 The UI Library** (`components/kepler/`)  
  Reusable React components styled with Tailwind CSS. These components are framework-agnostic and can be easily copied to other projects.

- **🔌 The SDK** (`lib/kepler.ts`)  
  A lightweight wrapper around the Keplers Email API. Handles all HTTP communication with proper error handling.

- **📜 The Contract** (`types/index.ts`)  
  TypeScript interfaces and types that define the shape of your data. Ensures type safety across your application.

---

## 🛠️ Built With

- [Next.js 16](https://nextjs.org/) - React framework with Server Actions
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [Keplers Email API](https://keplers.email) - Email delivery service

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/JOSEPH-Inalegwu/kepler-starter/issues).

---

## 💡 Need Help?

- [Keplers Documentation](https://docs.keplers.email)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Made with ❤️ for developers who value security and simplicity.**
