import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { submitEnquiry } from '#/lib/leadStore'

export const Route = createFileRoute('/contact')({ component: ContactPage })

const STUDIO_WHATSAPP = '8801870478944'

function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    // Real delivery: a lead record on this device can't reach the studio, so
    // the actual message travels via a pre-filled WhatsApp message. The local
    // record exists so the Studio OS demo has a live enquiry to show.
    submitEnquiry(form)

    const text = encodeURIComponent(
      `Hi Golpo Greehoo Films — I'm ${form.name}${form.company ? ` from ${form.company}` : ''}.\n\n${form.message}\n\n(${form.email}${form.phone ? ` · ${form.phone}` : ''})`,
    )
    window.open(`https://wa.me/${STUDIO_WHATSAPP}?text=${text}`, '_blank', 'noreferrer')
    setSent(true)
  }

  return (
    <div className="max-w-[1600px] mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32">
      <div className="grid sm:grid-cols-2 gap-14 sm:gap-24">
        <div>
          <h1 className="t-display" style={{ color: 'var(--text-1)' }}>
            Let&rsquo;s talk.
          </h1>
          <p className="t-body mt-6 max-w-[42ch]" style={{ color: 'var(--text-3)' }}>
            Briefs, pitches, availability — tell us what you&rsquo;re building. We&rsquo;ll reply
            from the studio directly.
          </p>

          <div className="mt-14 flex flex-col gap-3">
            <div className="t-slate" style={{ color: 'var(--text-4)' }}>
              Direct
            </div>
            <a href="mailto:golpogreehoo.films@gmail.com" className="t-h2" style={{ fontSize: '1.375rem', color: 'var(--text-1)' }}>
              golpogreehoo.films@gmail.com
            </a>
            <a href="tel:+8801870478944" className="t-body" style={{ color: 'var(--text-2)' }}>
              01870-478944 · WhatsApp
            </a>
            <p className="t-body mt-1" style={{ color: 'var(--text-4)' }}>
              House 2, Road 5, Block D, Level 5, Niketon, Gulshan 1, Dhaka
            </p>
          </div>
        </div>

        <div>
          {sent ? (
            <div data-reveal className="py-10">
              <div className="t-slate mb-3" style={{ color: 'var(--korobi)' }}>
                Sent
              </div>
              <p className="t-h2" style={{ color: 'var(--text-1)' }}>
                WhatsApp is open with your message ready to send.
              </p>
              <p className="t-body mt-3" style={{ color: 'var(--text-3)' }}>
                If it didn&rsquo;t open, reach us directly at{' '}
                <a href="mailto:golpogreehoo.films@gmail.com" className="underline">
                  golpogreehoo.films@gmail.com
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="field"
                />
              </Field>
              <Field label="Company / Agency">
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="field"
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="field"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="field"
                  />
                </Field>
              </div>
              <Field label="What are you building?">
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="field resize-none"
                />
              </Field>
              <button
                type="submit"
                className="t-slate-lg mt-2 self-start px-7 py-3.5 transition-colors duration-300"
                style={{ background: 'var(--korobi)', color: 'var(--ink)' }}
              >
                Send via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .field {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--rule-strong);
          padding: 0.6rem 0;
          color: var(--text-1);
          font-family: var(--font-display);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .field:focus { border-color: var(--korobi); }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="t-slate" style={{ color: 'var(--text-4)' }}>
        {label}
      </span>
      {children}
    </label>
  )
}
