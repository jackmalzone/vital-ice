// Email utility for handling form submissions
export interface JobApplication {
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  experience: string;
  whyJoin: string;
  resume?: File | null;
}

export const sendJobApplication = async (application: JobApplication): Promise<boolean> => {
  try {
    // Using EmailJS for client-side email sending
    const emailjs = await import('@emailjs/browser');
    
    const result = await emailjs.default.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
      {
        job_title: application.jobTitle,
        first_name: application.firstName,
        last_name: application.lastName,
        email: application.email,
        phone: application.phone || 'Not provided',
        experience: application.experience,
        why_join: application.whyJoin,
      },
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS Public Key
    );
    
    return result.status === 200;
  } catch (error) {
    console.error('Error sending application:', error);
    return false;
  }
};

// Alternative: Direct email using mailto (fallback)
export const createEmailLink = (application: JobApplication): string => {
  const subject = encodeURIComponent(`Job Application: ${application.jobTitle}`);
  const body = encodeURIComponent(`
Job Application Details:

Position: ${application.jobTitle}
Name: ${application.firstName} ${application.lastName}
Email: ${application.email}
Phone: ${application.phone || 'Not provided'}

Relevant Experience:
${application.experience}

Why they want to join Vital Ice:
${application.whyJoin}

Resume: ${application.resume ? application.resume.name : 'Not provided'}
  `);

  return `mailto:careers@vitalicesf.com?subject=${subject}&body=${body}`;
};
