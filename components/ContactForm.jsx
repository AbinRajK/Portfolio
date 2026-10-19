'use client';

import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  // Hide the success or error message after 4 seconds
  useEffect(() => {
    if (!status.success && !status.error) return;
    const timer = setTimeout(() => {
      setStatus((s) => ({ ...s, success: false, error: '' }));
    }, 4000);
    return () => clearTimeout(timer);
  }, [status.success, status.error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('failed to send message');

      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <section id="contact" className="py-10">
      <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        get in touch
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
        <div>
          <input
            type="text"
            required
            placeholder="sender name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>

        <div>
          <input
            type="email"
            required
            placeholder="sender email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>

        <div>
          <textarea
            rows={4}
            required
            placeholder="sender's message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold px-4 py-2 rounded transition-colors disabled:opacity-50"
        >
          {status.loading ? 'sending...' : 'send message'}
        </button>

        {status.success && <p className="text-emerald-400 mt-2">message sent successfully.</p>}
        {status.error && <p className="text-rose-400 mt-2">{status.error}</p>}
      </form>
    </section>
  );
}