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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    whyJoin: '',
    resume: null as File | null,
  });

  const teamMembers = [
    {
      name: 'Sean',
      role: 'Co-Founder & Operations',
      bio: 'Sean leads our day-to-day operations and facility management. With a background in wellness and community building, he ensures every aspect of Vital Ice runs smoothly. Sean is passionate about creating spaces where people can truly disconnect and reconnect with themselves.',
      image: '/images/founder-sean.png',
      accent: '#00b7b5',
    },
    {
      name: 'Stephen',
      role: 'Co-Founder & Strategy',
      bio: 'Stephen drives our strategic vision and business development. His expertise in scaling wellness businesses and understanding of the recovery space has been instrumental in building Vital Ice from concept to reality. Stephen believes in making elite recovery accessible to everyone.',
      image: '/images/founders-seanstephen.png',
      accent: '#f56f0d',
    },
    {
      name: 'Barry',
      role: 'Co-Founder & Community',
      bio: 'Barry focuses on community engagement and member experience. His background in hospitality and passion for human connection ensures that every member feels welcome and supported. Barry believes that recovery is better when shared with others.',
      image: '/images/founders-seanstephen.png',
      accent: '#8b4513',
    },
  ];

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsFormOpen(true);
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
        resume: formData.resume,
      };

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
          resume: null,
        });
        setIsFormOpen(false);
        setSelectedJob('');

        alert('Thank you for your application! We&apos;ll be in touch soon.');
      } else {
        // Fallback to email link
        const emailLink = createEmailLink(application);
        window.open(emailLink, '_blank');

        // Reset form and close modal
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          experience: '',
          whyJoin: '',
          resume: null,
        });
        setIsFormOpen(false);
        setSelectedJob('');

        alert(
          'Your application has been prepared. Please send the email that opened in your email client.'
        );
      }
    } catch (error) {
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
      title: 'Front Desk Associate',
      type: 'Part-time',
      location: 'San Francisco, CA',
      description:
        "Join our team as the first point of contact for our members. You'll help with check-ins, answer questions, and ensure everyone has a great experience.",
      requirements: [
        'Customer service experience',
        'Passion for wellness and recovery',
        'Flexible schedule including weekends',
        'Strong communication skills',
      ],
      responsibilities: [
        'Greet and check in members',
        'Answer questions about services',
        'Maintain facility cleanliness',
        'Assist with booking and payments',
      ],
    },
    {
      title: 'Recovery Specialist',
      type: 'Full-time',
      location: 'San Francisco, CA',
      description:
        "Help guide members through their recovery journey. You'll provide education on contrast therapy, assist with equipment, and ensure safety protocols.",
      requirements: [
        'Background in fitness, wellness, or healthcare',
        'Knowledge of cold therapy and sauna benefits',
        'CPR certification preferred',
        'Strong attention to safety protocols',
      ],
      responsibilities: [
        'Guide members through recovery protocols',
        'Monitor facility safety',
        'Provide education on recovery techniques',
        'Maintain equipment and facilities',
      ],
    },
    {
      title: 'Facility Maintenance',
      type: 'Part-time',
      location: 'San Francisco, CA',
      description:
        "Keep our facility running smoothly. You'll handle cleaning, maintenance, and ensure everything is in perfect condition for our members.",
      requirements: [
        'Experience with facility maintenance',
        'Attention to detail',
        'Reliable and punctual',
        'Ability to work independently',
      ],
      responsibilities: [
        'Daily cleaning and maintenance',
        'Equipment upkeep',
        'Inventory management',
        'Safety inspections',
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

        {/* Team Section */}
        <motion.section
          className={styles.teamSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className={styles.sectionTitle}>Meet Our Founders</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className={styles.teamMember}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className={styles.memberImage}>
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    width={200}
                    height={200}
                    className={styles.memberPhoto}
                  />
                  <div className={styles.memberAccent} style={{ backgroundColor: member.accent }} />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Job Openings Section */}
        <motion.section
          className={styles.jobsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className={styles.sectionTitle}>Current Openings</h2>
          <div className={styles.jobsList}>
            {jobOpenings.map((job, index) => (
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

                <p className={styles.jobDescription}>{job.description}</p>

                <div className={styles.jobDetails}>
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
                        <li key={respIndex}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <motion.button
                  className={styles.applyButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplyClick(job.title)}
                >
                  Apply Now
                </motion.button>
              </motion.div>
            ))}
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
            We&apos;re always looking for passionate individuals who share our vision for
            accessible, high-quality recovery experiences.
          </p>
          <div className={styles.contactInfo}>
            <a href="mailto:careers@vitalicesf.com" className={styles.contactLink}>
              careers@vitalicesf.com
            </a>
            <a href="tel:+14155551234" className={styles.contactLink}>
              (415) 555-1234
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
