'use client'
import { useState } from 'react'
import { send } from '@emailjs/browser'

interface ContactFormProps {
  businessName: string
  contactEmail: string
  emailjsServiceId: string
  emailjsTemplateId: string
  emailjsPublicKey: string
  primaryColor: string
}

export default function ContactForm({
  businessName,
  contactEmail,
  emailjsServiceId,
  emailjsTemplateId,
  emailjsPublicKey,
  primaryColor,
}: ContactFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await send(
        emailjsServiceId,
        emailjsTemplateId,
        { from_name: name, phone, message, to_email: contactEmail, business_name: businessName },
        emailjsPublicKey
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="px-6 py-12 bg-gray-50 text-center">
        <p className="text-xl font-semibold text-green-600">Thank you! We&apos;ll be in touch soon.</p>
      </section>
    )
  }

  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2
        style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '12px' }}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex flex-col gap-4">
        <input
          required
          type="text"
          placeholder="Your name"
          aria-label="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
        />
        <input
          required
          type="tel"
          placeholder="Your phone number"
          aria-label="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
        />
        <textarea
          placeholder="Message (optional)"
          aria-label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 resize-none"
        />
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center">Something went wrong. Please call us directly.</p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{ backgroundColor: primaryColor }}
          className="rounded-full py-4 text-white font-semibold text-lg shadow-md disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </section>
  )
}
