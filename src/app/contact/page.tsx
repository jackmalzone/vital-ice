'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const ContactPage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - integrate with email service
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      title: 'Email',
      value: 'hello@vitalice.com',
      link: 'mailto:hello@vitalice.com',
      icon: '✉️',
    },
    {
      title: 'Phone',
      value: '(415) 555-1234',
      link: 'tel:+14155551234',
      icon: '📞',
    },
    {
      title: 'Address',
      value: '2400 Chestnut St\nSan Francisco, CA 94123',
      link: 'https://maps.google.com',
      icon: '📍',
    },
  ];

  const hours = [
    { day: 'Monday - Friday', time: '6:00 AM - 10:00 PM' },
    { day: 'Saturday', time: '7:00 AM - 9:00 PM' },
    { day: 'Sunday', time: '8:00 AM - 8:00 PM' },
  ];

  return (
    <main className={styles.main}>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get in touch with our team and start your wellness journey
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className={styles.contact}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.contact__container}>
          <div className={styles.contact__grid}>
            <motion.div
              className={styles.contact__info}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.contact__infoTitle}>Get in Touch</h2>
              <p className={styles.contact__infoText}>
                Have questions about our services or want to learn more? We'd love to hear from you.
              </p>

              <div className={styles.contact__details}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className={styles.contact__detail}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={styles.contact__detailIcon}>{info.icon}</div>
                    <div className={styles.contact__detailContent}>
                      <h3 className={styles.contact__detailTitle}>{info.title}</h3>
                      <a
                        href={info.link}
                        className={styles.contact__detailValue}
                        target={info.title === 'Address' ? '_blank' : undefined}
                        rel={info.title === 'Address' ? 'noopener noreferrer' : undefined}
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className={styles.contact__hours}>
                <h3 className={styles.contact__hoursTitle}>Hours of Operation</h3>
                <div className={styles.contact__hoursList}>
                  {hours.map((hour, index) => (
                    <motion.div
                      key={hour.day}
                      className={styles.contact__hour}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className={styles.contact__hourDay}>{hour.day}</span>
                      <span className={styles.contact__hourTime}>{hour.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.contact__form}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.contact__formTitle}>Send us a Message</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form__group}>
                  <label htmlFor="name" className={styles.form__label}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.form__input}
                    required
                  />
                </div>

                <div className={styles.form__group}>
                  <label htmlFor="email" className={styles.form__label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.form__input}
                    required
                  />
                </div>

                <div className={styles.form__group}>
                  <label htmlFor="phone" className={styles.form__label}>
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.form__input}
                  />
                </div>

                <div className={styles.form__group}>
                  <label htmlFor="message" className={styles.form__label}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.form__textarea}
                    rows={5}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className={styles.form__button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.map}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.map__container}>
          <h2 className={styles.map__title}>Find Us</h2>
          <div className={styles.map__content}>
            <div className={styles.map__placeholder}>
              <p>Interactive map will be embedded here</p>
              <p>2400 Chestnut St, San Francisco, CA 94123</p>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default ContactPage;
