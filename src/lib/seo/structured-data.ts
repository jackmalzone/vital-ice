// Structured Data (JSON-LD) for SEO
export interface LocalBusiness extends Record<string, unknown> {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
  sameAs: string[];
  image: string[];
  priceRange: string;
  areaServed: {
    '@type': 'City';
    name: string;
  };
}

export interface Service extends Record<string, unknown> {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'LocalBusiness';
    name: string;
  };
  areaServed: {
    '@type': 'City';
    name: string;
  };
  serviceType: string;
  image?: string;
}

export interface FAQPage extends Record<string, unknown> {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

// Vital Ice business data
export const vitalIceBusiness: LocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Vital Ice',
  description:
    'Recovery and wellness through cold therapy, infrared sauna, and traditional healing practices.',
  url: 'https://vitalicesf.com',
  telephone: '+1-415-555-0123', // Update with actual phone number
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2400 Chestnut St',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94123',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.7999, // Update with actual coordinates
    longitude: -122.434,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Monday',
      opens: '06:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Tuesday',
      opens: '06:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Wednesday',
      opens: '06:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Thursday',
      opens: '06:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '06:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '08:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/vitalice',
    'https://www.facebook.com/vitalice',
    'https://www.linkedin.com/company/vitalice',
  ],
  image: [
    'https://media.vitalicesf.com/seo/desktop-home.png',
    'https://vitalicesf.com/images/logo-dark.png',
  ],
  priceRange: '$$',
  areaServed: {
    '@type': 'City',
    name: 'San Francisco',
  },
};

// Service definitions
export const services: Record<string, Service> = {
  'cold-plunge': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cold Plunge Therapy',
    description:
      '40-50°F immersion therapy for reduced inflammation, mental acuity, and enhanced recovery.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    areaServed: {
      '@type': 'City',
      name: 'San Francisco',
    },
    serviceType: 'Cold Therapy',
    image: 'https://media.vitalicesf.com/coldplunge_woman.jpg',
  },
  'infrared-sauna': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Infrared Sauna Therapy',
    description:
      '120-150°F deep tissue heating for detoxification, pain relief, and stress reduction.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    areaServed: {
      '@type': 'City',
      name: 'San Francisco',
    },
    serviceType: 'Heat Therapy',
    image: 'https://media.vitalicesf.com/sauna-infraredwide.jpg',
  },
  'traditional-sauna': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Traditional Sauna Therapy',
    description:
      '160-200°F heat therapy for cardiovascular health, muscle recovery, and immune support.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    areaServed: {
      '@type': 'City',
      name: 'San Francisco',
    },
    serviceType: 'Heat Therapy',
    image: 'https://media.vitalicesf.com/sauna-traditional.jpg',
  },
  'red-light-therapy': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Red Light Therapy',
    description:
      'Low-level red and near-infrared light therapy for cellular regeneration, skin health, and anti-aging benefits.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    areaServed: {
      '@type': 'City',
      name: 'San Francisco',
    },
    serviceType: 'Light Therapy',
    image: 'https://media.vitalicesf.com/redlight_jellyfish.jpg',
  },
  'compression-boots': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Compression Boot Therapy',
    description:
      'Sequential compression therapy for improved circulation, muscle recovery, and lymphatic drainage.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    areaServed: {
      '@type': 'City',
      name: 'San Francisco',
    },
    serviceType: 'Compression Therapy',
  },
  'percussion-massage': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Percussion Massage Therapy',
    description:
      'Deep tissue percussion therapy for muscle recovery, pain relief, and improved mobility.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    areaServed: {
      '@type': 'City',
      name: 'San Francisco',
    },
    serviceType: 'Massage Therapy',
  },
};

// FAQ structured data
export const faqData: FAQPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is cold plunge therapy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cold plunge therapy involves immersing your body in cold water (40-50°F) for 2-5 minutes to activate the vagus nerve, reduce inflammation, and enhance mental clarity.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should I stay in the cold plunge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend 2-5 minutes for cold plunge therapy. Start with shorter durations and gradually increase as your body adapts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of infrared sauna?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Infrared sauna therapy provides deep tissue heating at 120-150°F, offering detoxification, pain relief, stress reduction, and improved circulation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to book in advance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we recommend booking in advance to ensure availability. You can book online through our website or call us directly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I bring to my session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide towels and robes. You may want to bring a swimsuit for cold plunge therapy and comfortable clothing for other services.',
      },
    },
  ],
};

// Helper function to generate structured data script
export function generateStructuredData(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}
