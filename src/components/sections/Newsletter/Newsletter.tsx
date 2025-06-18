"use client";
import { useState } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Integrate with your email service
  }

  return (
    <section id="newsletter" className={styles.newsletter}>
      <div className={styles.container}>
        <h2 className={styles.title}>Stay in the Loop</h2>
        <p className={styles.subtext}>
          Sign up to get updates on our opening, exclusive offers, and wellness tips. No spam, ever.
        </p>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="newsletter-email" className={styles.label}>
            <span className="visually-hidden">Email address</span>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="Your email address"
              required
              autoComplete="email"
              disabled={submitted}
            />
          </label>
          <button
            type="submit"
            className={styles.button}
            disabled={submitted}
            aria-live="polite"
          >
            Notify Me
          </button>
        </form>
        <div
          className={styles.feedback}
          aria-live="polite"
          style={{ opacity: submitted ? 1 : 0, pointerEvents: "none" }}
        >
          Thanks, you're on the list.
        </div>
      </div>
    </section>
  );
} 