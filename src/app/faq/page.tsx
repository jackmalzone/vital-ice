'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "What services does Vital Ice offer?",
      answer: "Vital Ice offers a comprehensive recovery experience including cold plunge therapy, traditional sauna, infrared sauna, red light therapy, compression boots, and percussion massage. Our contrast therapy combines cold and heat for optimal recovery benefits."
    },
    {
      question: "How do I book a session?",
      answer: "You can book sessions through our Mindbody online portal, by calling us directly, or by visiting our location. We recommend booking in advance, especially for peak hours. Members have priority booking access."
    },
    {
      question: "What should I bring for my first visit?",
      answer: "Bring comfortable workout clothes, a towel, and a water bottle. We provide towels, but you're welcome to bring your own. Lockers are available for your belongings. Shower facilities are provided."
    },
    {
      question: "Are there any health restrictions?",
      answer: "While our services are generally safe, we recommend consulting with your healthcare provider if you have cardiovascular conditions, are pregnant, or have other health concerns. Our staff can help guide you to appropriate services."
    },
    {
      question: "How long should I stay in the cold plunge?",
      answer: "Start with 1-3 minutes and gradually increase your tolerance. Listen to your body and never force yourself to stay longer than comfortable. Our staff can provide guidance based on your experience level."
    },
    {
      question: "What's the difference between traditional and infrared sauna?",
      answer: "Traditional saunas use heated air to warm your body, while infrared saunas use light waves to directly heat your body tissues. Infrared saunas typically operate at lower temperatures but can provide deeper tissue penetration."
    },
    {
      question: "Do you offer memberships?",
      answer: "Yes! We offer various membership options including unlimited community access and private room memberships. Memberships include priority booking, exclusive events, and additional amenities. You can view and purchase memberships through our Mindbody portal or contact us for current pricing and availability."
    },
    {
      question: "Can I bring a guest?",
      answer: "Guest policies vary by membership type. Private room memberships include monthly guest passes. Community members can purchase guest passes for friends and family through our Mindbody portal. All guests must complete our waiver form."
    },
    {
      question: "What's your cancellation policy?",
      answer: "We require 24-hour notice for cancellations. Late cancellations or no-shows may incur fees: $20 for contrast therapy sessions and $10 for recovery amenities. You can cancel or reschedule appointments through your Mindbody account. See our full cancellation policy for details."
    },
    {
      question: "Do you offer gift cards?",
      answer: "Yes! Gift cards are available for any amount and make perfect gifts for wellness enthusiasts. You can purchase them through our Mindbody portal or in person. They expire 12 months after purchase and can be used for any of our services or memberships."
    },
    {
      question: "Is there an age requirement?",
      answer: "You must be at least 18 years old to use our services. Minors aged 14-17 may participate with written parental consent and may require adult supervision. Children under 14 are not permitted."
    },
    {
      question: "What are your hours of operation?",
      answer: "We're open daily from 6:00 AM to 10:00 PM. Peak hours are typically 6:00-9:00 AM and 5:00-8:00 PM. Members have access to extended hours and priority booking during busy times."
    },
    {
      question: "Do you provide towels and amenities?",
      answer: "Yes, we provide towels, shower amenities, and locker storage. We also offer recovery amenities like compression boots and percussion massage. Premium amenities may have additional fees for non-members."
    },
    {
      question: "Can I use the facilities if I'm not feeling well?",
      answer: "We ask that you stay home if you're experiencing any illness symptoms. This helps protect our community and staff. You can reschedule your session without penalty if you're feeling unwell."
    },
    {
      question: "Do you offer corporate memberships?",
      answer: "Yes! We offer corporate wellness programs and group memberships. These can include team building events, wellness workshops, and discounted rates for companies. Contact us to discuss your organization's needs."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={styles.faqPage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Find answers to common questions about our services, policies, and facilities
          </p>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                className={`${styles.faqQuestion} ${openItems.includes(index) ? styles.active : ''}`}
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.includes(index)}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <motion.span
                  className={styles.arrow}
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    className={styles.faqAnswer}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.contact}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3>Still have questions?</h3>
          <p>
            Can't find what you're looking for? We're here to help!
          </p>
          <div className={styles.contactInfo}>
            <a href="mailto:info@vitalicesf.com" className={styles.contactLink}>
              info@vitalicesf.com
            </a>
            <a href="tel:+14155551234" className={styles.contactLink}>
              (415) 555-1234
            </a>
            <p className={styles.address}>
              2400 Chestnut St<br />
              San Francisco, CA 94123
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQPage; 