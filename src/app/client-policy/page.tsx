'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

const ClientPolicyPage: React.FC = () => {
  const policies = [
    {
      id: 'welcome',
      title: 'Welcome to Vital Ice',
      content: `We're excited to have you as part of our recovery community. At Vital Ice, we're committed to creating a safe, respectful, and results-driven space for contrast therapy and wellness. Please take a moment to review the following client policies. They're designed to protect your experience, clarify expectations, and ensure we can deliver consistent, high-quality service. If you have any questions, we're always here to help — just reach out to our team. We're glad you're here.`,
      isWelcome: true
    },
    {
      id: 'liability-waiver',
      title: 'Liability Waiver and Release of Claims',
      effectiveDate: '8/1/2025',
      content: `By checking the box and signing below, I acknowledge and agree to the following terms related to my participation in services offered by Vital Ice, located at 2400 Chestnut St, San Francisco, CA 94123.

**Assumption of Risk**
I understand that services provided by Vital Ice — including but not limited to cold plunges, sauna use, and contrast therapy — involve physical activity that carries inherent risks. These may include, but are not limited to:
- Fainting, dizziness, cardiovascular stress, or physical injury
- Risk of cold-related illness or heat-related issues
- Aggravation of pre-existing medical conditions

I voluntarily assume full responsibility for any risk of injury, illness, or death that may result from my use of Vital Ice's facilities and services.

**Health Certification**
I certify that:
- I am in good physical condition and mentally capable of participating in contrast therapy.
- I have consulted a healthcare provider regarding any concerns, or I voluntarily accept full responsibility for any health risks associated with my participation.
- I have fully disclosed any relevant medical conditions to Vital Ice staff.
- Vital Ice is not responsible for verifying my health status.

**No Medical Supervision Disclaimer**
I understand that Vital Ice does not provide medical advice or supervision and that staff are not licensed healthcare professionals.

**Waiver and Release**
In consideration for being allowed to use the services and facilities of Vital Ice, I hereby release, waive, and discharge Vital Ice, its owners, staff, contractors, and affiliates from any and all claims, demands, liabilities, or causes of action, whether known or unknown, arising from personal injury, illness, property damage, or death resulting from participation.

**California Civil Code Section 1542 Waiver**
I expressly waive any rights under Section 1542 of the California Civil Code, which states: "A general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release, and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party."

**Indemnification**
I agree to indemnify and hold harmless Vital Ice from any claims or liabilities resulting from my actions, participation, or failure to disclose relevant health information.

**Media Release (Optional)**
Unless I notify staff in writing, I grant permission for Vital Ice to use any photos or video taken during my participation for promotional or marketing purposes.

**Acknowledgment and Consent**
By signing electronically, I confirm that I have read this waiver in its entirety, understand its terms, and voluntarily agree to be bound by them.`
    },
    {
      id: 'cancellation',
      title: 'Cancellation Policy',
      effectiveDate: '8/1/2025',
      content: `<strong>Membership Cancellations</strong>
- Members may cancel their membership at any time, effective at the end of their current billing cycle.
- Cancellation requests must be submitted through the member portal or via email to info@vitalicesf.com before the next billing date.
- No future charges will be applied after cancellation is processed, but no prorated refunds will be issued for unused time within the current cycle.

<strong>Appointment Cancellations and No-Shows</strong>
- Contrast Therapy (cold plunge + sauna): $20 fee for cancellations within 24 hours or no-shows.
- Recovery Amenities (e.g., red light, compression): $10 fee for cancellations within 24 hours or no-shows.
- These fees are non-refundable and automatically charged to the account or card on file.

<strong>Late Arrival Policy</strong>
- If you arrive more than 15 minutes late without notice, your session may be treated as a no-show. Late arrivals may result in shortened sessions. Full session fees apply.

<strong>How to Cancel</strong>
- To avoid fees, cancel or reschedule at least 24 hours in advance via your Vital Ice online account or by emailing info@vitalicesf.com. If technical issues prevent timely cancellation, notify us immediately to document the situation.

<strong>Refunds</strong>
- All sales are final. Vital Ice does not offer refunds for missed sessions or unused services.
- In exceptional cases, refund or credit requests may be reviewed by management. Please email info@vitalicesf.com within 7 days.
- See Refund Policy for further detail

<strong>Exceptions</strong>
- Fee waivers may be granted in exceptional cases (e.g., medical emergencies) when communicated promptly. Vital Ice reserves the right to grant or deny such requests at its sole discretion.`
    },
    {
      id: 'refund',
      title: 'Refund Policy',
      effectiveDate: '8/1/2025',
      content: `At Vital Ice, we are committed to providing high-quality wellness services and clear expectations around payments and refunds. By purchasing any membership, session, or package, you acknowledge and agree to the following refund terms:

<strong>All Sales Are Final</strong>
- All purchases are non-refundable, including memberships, single sessions, packages, gift cards, and promotions.
- We do not offer refunds for missed, unused, or partially used services.

<strong>No Refunds for Cancellations or No-Shows</strong>
- Cancellation or no-show fees (e.g., $20 for contrast therapy or $10 for recovery amenities) are non-refundable.
- These charges apply regardless of reason unless otherwise waived by management.

<strong>Refund Requests (Exceptional Circumstances Only)</strong>
- In rare, exceptional situations such as documented medical emergencies or major service disruptions, you may submit a written refund request to info@vitalicesf.com.
- Requests must be submitted within 7 days of the incident and will be reviewed on a case-by-case basis.
- Approved refunds may be issued as account credit or original payment method at our discretion.

<strong>Non-Transferability</strong>
- All services are non-transferable and may only be used by the original purchaser or named account holder.
- Exceptions may be granted for gift cards or pre-approved transfers.

<strong>Service Disruptions</strong>
- If a session is canceled by Vital Ice due to technical, staffing, or facility issues, a replacement session or account credit will be issued — no cash refunds.

<strong>Chargebacks and Disputes</strong>
- Clients are encouraged to resolve any billing concerns directly with us. Unauthorized chargebacks may result in temporary account suspension.`
    },
    {
      id: 'purchase-payment',
      title: 'Purchase & Payment Policy',
      effectiveDate: '8/1/2025',
      content: `By purchasing a membership, package, or single session, I acknowledge and agree to the following terms:

<strong>Payment Authorization</strong>
- By booking services, purchasing memberships or packages, or storing a payment method on file, I authorize Vital Ice to charge my card for all services rendered and applicable fees, including late cancellation or no-show charges.

<strong>Package Expiration</strong>
- Packages expire 6 months from the date of purchase unless otherwise stated.
- Expired sessions are non-refundable and non-transferable.

<strong>Membership Terms</strong>
- Memberships renew monthly and benefits reset each billing cycle.
- Memberships cannot be transferred or shared and unused sessions do not roll over unless otherwise noted.

<strong>Membership Holds</strong>
- Members may place memberships on hold for up to 1 month per year in 7-day increments with prior written approval. Email info@vitalicesf.com to request a hold.

<strong>Gift Cards and Credits</strong>
- Gift cards expire 12 months after purchase and are non-refundable.
- Store credits issued as goodwill or service recovery expire 6 months from issue and are non-transferable.

<strong>Promotions and Discounts</strong>
- Promotional rates, gift cards, or discounts may include limitations or expiration dates. Vital Ice reserves the right to modify or discontinue promotional pricing.

<strong>Right to Refuse Service</strong>
- Vital Ice may refuse or revoke service for anyone violating policies, demonstrating unsafe behavior, or disrupting the client experience.

<strong>No Guarantee of Results</strong>
- We make no guarantee of health, wellness, or recovery outcomes. Participation is voluntary and at your own risk. Results vary by individual.`
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      effectiveDate: '8/1/2025',
      content: `At Vital Ice, your privacy matters. This Privacy Policy explains how we collect, use, share, and protect your personal information when you visit our location, book services, or interact with us online. By using our services, you consent to the data practices described below.

<strong>Information We Collect</strong>
We may collect the following types of personal information:
- Contact Information: Name, email, phone number, address
- Booking Details: Service history, appointment times, membership status
- Payment Information: Card on file, billing details (stored securely via our payment processor)
- Health Information: Voluntarily disclosed conditions relevant to wellness services (e.g., injuries, contraindications)
- Device/Usage Data: IP address, browser type, interactions with our website or booking software (e.g., Mindbody)

<strong>How We Use Your Information</strong>
We use your information to:
- Schedule and manage appointments
- Process payments and maintain memberships
- Communicate with you (e.g., confirmations, cancellations, promotions)
- Provide customer support
- Maintain internal records and analytics
- Comply with legal and safety obligations

We do not sell or rent your personal information to third parties.

<strong>How We Share Your Information</strong>
We may share your data only with:
- Trusted vendors (e.g., Mindbody, payment processors, email platforms) for service delivery
- Legal authorities if required by law, court order, or government request
- Vital Ice employees who need access to deliver services

All third parties are expected to uphold confidentiality and use your information only as needed to fulfill their duties.

<strong>Data Security</strong>
We take data security seriously. We use secure software, encrypted connections, and limited access protocols to protect your personal data. However, no online system is ever completely secure — you acknowledge this risk by using our services.

<strong>Your Rights (California Residents)</strong>
If you reside in California, you have the right to:
- Request a copy of the personal information we hold about you
- Request that we delete your personal information (with some legal exceptions)
- Opt out of promotional communications at any time

To exercise any of these rights, email us at info@vitalicesf.com with your request.

<strong>Marketing and Communication</strong>
You may receive occasional emails or texts from Vital Ice about bookings, offers, or updates. You can opt out at any time using the unsubscribe link or by contacting us directly.

<strong>Cookies and Website Tools</strong>
Our website and booking system may use cookies or similar technologies to track usage, improve performance, and support user experience. You may adjust your browser settings to decline cookies if you prefer.

<strong>Policy Updates</strong>
This Privacy Policy may be updated periodically. Changes will be posted on our website and are effective immediately upon posting. Your continued use of our services signifies your acceptance of any changes.`
    },
    {
      id: 'terms',
      title: 'Terms and Conditions',
      effectiveDate: '8/1/2025',
      content: `Welcome to Vital Ice. These Terms and Conditions ("Terms") govern your access to and use of our services, facilities, and website. By booking an appointment, purchasing a membership, or entering our studio, you agree to be bound by these Terms. If you do not agree, please do not use our services.

<strong>Use of Services</strong>
Vital Ice offers wellness and recovery services including cold plunge therapy, sauna sessions, red light therapy, and other recovery modalities. You agree to use all services responsibly and in accordance with posted rules and staff guidance.

<strong>Eligibility</strong>
You must be at least 18 years old to use Vital Ice services. Clients aged 14–17 may participate with written parental consent and may require adult supervision unless otherwise approved. We do not accept guests accompanying members at this time.

<strong>Minors Policy</strong>
Vital Ice services are designed primarily for adult use. However, minors aged 14 to 17 may participate under the following conditions:
- A parent or legal guardian must provide written consent via our waiver form.
- Minors must be accompanied by a parent or guardian during their first visit unless pre-approved by management.
- We reserve the right to require adult supervision for all appointments depending on the service type.
- Children under 14 are not permitted to use Vital Ice services or enter recovery areas, even with parental accompaniment.
- Parents or guardians accept full responsibility for the minor's safety, behavior, and adherence to all facility rules.

<strong>Health Acknowledgment</strong>
You confirm that you are in suitable physical and mental condition to use wellness services and that you have consulted a healthcare provider as needed. Vital Ice staff are not medical professionals and do not provide diagnosis or treatment. You participate voluntarily and accept all risks associated with use.

<strong>Bookings, Cancellations, and No-Shows</strong>
- You are responsible for booking and managing your sessions through your online account or by contacting us.
- Late cancellation and no-show fees apply per our Cancellation Policy.
- If you arrive more than 15 minutes late without notice, your session may be canceled or shortened without refund.

<strong>Payments, Memberships, and Expiration</strong>
- All services must be prepaid. Memberships renew automatically and can be canceled before your next billing cycle.
- Sessions and packages expire 6 months from the purchase date unless otherwise noted.
- Unused sessions do not roll over.
- See our Purchase Policy and Refund Policy for full details.

<strong>Facility Use and Etiquette</strong>
To ensure a relaxing and respectful environment, all clients must:
- Arrive on time and follow posted service durations
- Shower before using cold plunges. Shower before using saunas if visibly sweaty or soiled
- Use provided towels and sit covers as required
- Speak quietly and respect others' space
- Avoid photography of other clients without consent
- Follow staff instructions and posted signage

Failure to follow etiquette may result in removal or suspension.

<strong>Photo/Media Release</strong>
We may occasionally take photos or video in public areas for promotional use. By using our facility, you consent to reasonable use of such media unless you opt out in writing. We will never use media that clearly identifies you without your express consent.

<strong>Gift Cards and Credits</strong>
- Gift cards are non-refundable and expire 12 months after purchase unless otherwise stated.
- Store credits (e.g., issued in lieu of refund) expire 6 months from issue.
- Credits and gift cards are non-transferable.

<strong>Termination of Access</strong>
Vital Ice reserves the right to suspend or terminate your access to services, with or without notice, for behavior that is unsafe, disruptive, abusive to staff or other clients, or in violation of these Terms or other posted policies.

<strong>Third-Party Tools and Booking Software</strong>
Vital Ice uses third-party platforms (e.g., Mindbody) to manage scheduling, payments, and communication. While we partner with trusted providers, we are not responsible for technical errors, downtime, or data handling issues caused by these platforms.

<strong>Force Majeure</strong>
Vital Ice is not liable for service delays, interruptions, or closures due to events outside our control, including natural disasters, public health emergencies, power failures, or facility damage.

<strong>No Guarantee of Results</strong>
Vital Ice makes no claims or guarantees regarding therapeutic, health, or wellness outcomes. Results vary by individual and participation is at your own discretion and risk.

<strong>Intellectual Property</strong>
All content on the Vital Ice website, promotional materials, and brand assets — including logos, written content, images, and videos — are the property of Vital Ice. You may not copy, reproduce, or redistribute them without prior written consent.

<strong>Limitation of Liability</strong>
You agree that Vital Ice, its owners, staff, and contractors are not liable for any injuries, illnesses, or damages resulting from the use of services, equipment, or facilities, to the fullest extent allowed by law. See our separate Liability Waiver for full details.

<strong>Modifications to Terms</strong>
Vital Ice reserves the right to update these Terms and related policies at any time. Changes will be posted on our website and will become effective upon posting. Continued use of our services constitutes acceptance of any updates.

<strong>Governing Law</strong>
These Terms are governed by the laws of the State of California. Any disputes shall be resolved in the courts of San Francisco County.

<strong>Linked Policies</strong>
The following additional policies are incorporated by reference into these Terms:
- Cancellation Policy
- Refund Policy
- Purchase & Payment Policy
- Privacy Policy
- Liability Waiver & Release of Claims

These are available at vitalicesf.com or by request via info@vitalicesf.com.`
    }
  ];

  return (
    <div className={styles.policyPage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Client Policy Packet</h1>
          <p className={styles.subtitle}>
            Please review our policies to ensure a safe and enjoyable experience
          </p>
        </motion.div>

        <div className={styles.policies}>
          {policies.map((policy, index) => (
            <motion.div
              key={policy.id}
              className={`${styles.policy} ${policy.isWelcome ? styles.welcome : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className={styles.policyHeader}>
                <h2 className={styles.policyTitle}>{policy.title}</h2>
                {policy.effectiveDate && (
                  <p className={styles.effectiveDate}>
                    Effective Date: {policy.effectiveDate}
                  </p>
                )}
              </div>
              <div 
                className={styles.policyContent}
                dangerouslySetInnerHTML={{ 
                  __html: policy.content.split('\n\n').map(paragraph => 
                    `<p class="${styles.paragraph}">${paragraph}</p>`
                  ).join('')
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.contact}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3>Contact Us</h3>
          <p>
            For questions about these policies or your personal information, contact:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>Vital Ice</strong></p>
            <p>2400 Chestnut St, San Francisco, CA 94123</p>
            <p>info@vitalicesf.com</p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClientPolicyPage; 