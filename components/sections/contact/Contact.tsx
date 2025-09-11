import React from 'react';
import { ContactForm } from './ContactForm';

export default function Contact() {
  return (
    <>
      <section id="contact-section" className="mt-30 mb-10 p-6 flex flex-col text-center gap-8">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <ContactForm />
        <p className="text-lg text-muted-foreground">Reach out! Let&apos;s collaborate or just chat!</p>
      </section>
    </>
  );
}