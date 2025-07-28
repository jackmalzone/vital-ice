'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Footer from '@/components/layout/Footer/Footer';
import { sendJobApplication, createEmailLink } from '@/lib/email';
import styles from './page.module.css';

const CareersPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    whyJoin: '',
    availability: '',
    resume: null as File | null,
  });



  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsFormOpen(true);
  };

  const handleToggleJobExpansion = (jobTitle: string) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobTitle)) {
        newSet.delete(jobTitle);
      } else {
        newSet.add(jobTitle);
      }
      return newSet;
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare application data
      const application = {
        jobTitle: selectedJob,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        whyJoin: formData.whyJoin,
        availability: formData.availability,
        resume: formData.resume,
      };

      console.log('Form data:', formData);
      console.log('Application data:', application);

      // Try to send via API first
      const success = await sendJobApplication(application);

      if (success) {
        // Success - reset form and close modal
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          experience: '',
          whyJoin: '',
          availability: '',
          resume: null,
        });
        setIsFormOpen(false);
        setSelectedJob('');

        alert('Thank you for your application! We\'ll be in touch soon.');
      } else {
        // Fallback to email link
        const emailLink = createEmailLink(application);
        console.log('Opening email link:', emailLink);
        window.open(emailLink, '_blank');

        // Reset form and close modal
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          experience: '',
          whyJoin: '',
          availability: '',
          resume: null,
        });
        setIsFormOpen(false);
        setSelectedJob('');

        alert(
          'Your application has been prepared. Please send the email that opened in your email client to info@vitalicesf.com.'
        );
      }

      // Reset form and close modal
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        whyJoin: '',
        availability: '',
        resume: null,
      });
      setIsFormOpen(false);
      setSelectedJob('');

      alert(
        'Your application has been prepared. Please send the email that opened in your email client to info@vitalicesf.com.'
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting application:', error);
      alert(
        'There was an error submitting your application. Please try again or contact us directly.'
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const jobOpenings = [
    {
      title: 'Vital Ice Wellness & Operations Coordinator',
      type: 'Full-time or Part-time',
      location: 'San Francisco, CA',
      description:
        "A pivotal, hands-on role responsible for ensuring the smooth daily operation of our facility, delivering outstanding client service, driving sales, and actively contributing to our partnership growth strategy.",
      requirements: [
        'Minimum 2-3 years of experience in a customer-facing role, preferably in hospitality, retail, wellness, or a service-oriented environment',
        'Demonstrated experience in sales or business development is highly desirable',
        'Experience with administrative tasks and scheduling software',
        'Exceptional interpersonal and communication skills (verbal and written)',
        'Strong organizational abilities and attention to detail',
        'Proficiency with Google Workspace (Docs, Sheets, Calendar) and familiarity with POS/scheduling software',
        'Proactive problem-solver with a positive, can-do attitude',
        'Ability to work independently and manage multiple priorities effectively',
        'Comfortable with light cleaning duties and maintaining high hygiene standards',
        'Genuine passion for health, wellness, and recovery',
        'Professional demeanor and appearance',
        'Reliable, punctual, and highly dependable',
        'Ability to adapt quickly in a fast-paced, evolving environment',
        'A keen eye for opportunities to improve client experience and business growth',
      ],
      responsibilities: [
        'On-Site Reception & Client Experience (40%): Warmly greet and welcome all clients, partners, and visitors to the Vital Ice facility. Manage client check-ins, bookings, and inquiries (in-person, phone, email) using our scheduling system. Provide comprehensive information about Vital Ice services, pricing, benefits, and safety protocols. Assist clients with waivers, onboarding, and preparing for their cold therapy sessions. Ensure a comfortable, safe, and positive atmosphere for all individuals before, during, and after sessions. Address client feedback, concerns, and special requests promptly and professionally.',
        'Administrative & Operational Support (25%): Maintain accurate client records, sales data, and administrative files. Process payments, manage point-of-sale (POS) transactions, and reconcile daily revenue. Assist with inventory management of retail products and operational supplies. Manage incoming and outgoing correspondence and communications. Support management with various administrative tasks as needed, including report generation and data entry. Oversee facility schedule optimization to maximize capacity and client flow.',
        'Sales & Partnership Strategy & Execution (20%): Actively engage clients to understand their needs and recommend appropriate Vital Ice services, packages, and retail products. Identify and cultivate potential partnership opportunities with local wellness businesses (e.g., massage therapists, physical therapists, nutritionists, gyms) for reciprocal referrals, rebates, discounts, and freebies. Assist in outreach efforts, scheduling introductory meetings, and preparing presentation materials for potential partners. Track and report on sales performance and partnership pipeline development. Collaborate with management to refine sales techniques and partnership strategies.',
        'General Light Cleaning & Facility Maintenance (15%): Ensure the facility, including reception area, changing rooms, restrooms, and common areas, is consistently clean, tidy, and well-maintained. Perform routine cleaning tasks such as wiping surfaces, vacuuming/mopping, emptying trash, and restocking supplies. Monitor cleanliness of the cold plunge areas and ensure they meet hygiene standards (specific technical cleaning of plunge units will be handled by specialized staff, but general area cleanliness is key). Report any maintenance issues or equipment malfunctions promptly to management.',
      ],
      benefits: [
        'Competitive hourly wage or salary',
        'Opportunities for performance-based bonuses related to sales and partnerships',
        'Complimentary Vital Ice sessions and employee discounts on services/retail',
        'A dynamic, supportive, and health-focused work environment',
        'Significant opportunity for growth and professional development as Vital Ice expands',
        'The chance to be a key player in shaping the client experience and strategic direction of a pioneering wellness business',
      ],
    },
  ];

  return (
    <div className={styles.careersPage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Join Our Team</h1>
          <p className={styles.subtitle}>Help us build the future of recovery and wellness</p>
        </motion.div>



        {/* Job Openings Section */}
        <motion.section
          className={styles.jobsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className={styles.sectionTitle}>Current Openings</h2>
          <div className={styles.jobsList}>
            {jobOpenings.map((job, index) => {
              const isExpanded = expandedJobs.has(job.title);
              return (
                <motion.div
                  key={job.title}
                  className={styles.jobCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <div className={styles.jobHeader}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.jobMeta}>
                      <span className={styles.jobType}>{job.type}</span>
                      <span className={styles.jobLocation}>{job.location}</span>
                    </div>
                  </div>

                  <p className={styles.jobDescription} style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
                    {job.description}{' '}
                    <motion.button
                      className={styles.seeMoreButton}
                      onClick={() => handleToggleJobExpansion(job.title)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isExpanded ? 'See Less.' : 'See More.'}
                    </motion.button>
                  </p>

                  {/* Expandable Details Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className={styles.jobDetails}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className={styles.jobSection}>
                          <h4 className={styles.jobSectionTitle}>Requirements</h4>
                          <ul className={styles.jobList}>
                            {job.requirements.map((req, reqIndex) => (
                              <li key={reqIndex}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.jobSection}>
                          <h4 className={styles.jobSectionTitle}>Responsibilities</h4>
                          <ul className={styles.jobList}>
                            {job.responsibilities.map((resp, respIndex) => (
                              <li key={respIndex}>
                                <strong>{resp.split(':')[0]}:</strong>
                                {resp.includes(':') ? resp.split(':').slice(1).join(':') : resp}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {job.benefits && (
                          <div className={styles.jobSection}>
                            <h4 className={styles.jobSectionTitle}>What We Offer</h4>
                            <ul className={`${styles.jobList} ${styles.benefitsList}`}>
                              {job.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex}>
                                  ✓ {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    className={styles.applyButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApplyClick(job.title)}
                  >
                    Apply Now
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.div
          className={styles.contact}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3>Interested in joining our team?</h3>
          <p>
            We&apos;re looking for passionate individuals who share our vision.
          </p>
          <div className={styles.contactInfo}>
            <a href="mailto:info@vitalicesf.com" className={styles.contactLink}>
              info@vitalicesf.com
            </a>
            <p className={styles.address}>
              2400 Chestnut St
              <br />
              San Francisco, CA 94123
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Application Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>Apply for {selectedJob}</h2>
                <button className={styles.closeButton} onClick={() => setIsFormOpen(false)}>
                  ×
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className={styles.applicationForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="experience">Relevant Experience *</label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your relevant experience..."
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="whyJoin">Why do you want to join Vital Ice? *</label>
                  <textarea
                    id="whyJoin"
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Share your motivation for joining our team..."
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="availability">Availability *</label>
                  <textarea
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Please describe your availability (e.g., full-time, part-time, specific hours, start date, etc.)..."
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="resume">Resume/CV (PDF, DOC, DOCX)</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setIsFormOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareersPage;
