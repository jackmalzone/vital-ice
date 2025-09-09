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
    'Live Better — Together. Recovery and wellness through cold therapy, red light therapy, sauna, and traditional healing practices.',
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
    'https://media.vitalicesf.com/logo-dark.png',
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

// Additional schema interfaces
export interface Organization extends Record<string, unknown> {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string;
  };
}

export interface Review extends Record<string, unknown> {
  '@context': 'https://schema.org';
  '@type': 'Review';
  itemReviewed: {
    '@type': 'LocalBusiness';
    name: string;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: number;
  };
  reviewBody: string;
  datePublished: string;
}

export interface BreadcrumbList extends Record<string, unknown> {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

// FAQ structured data - Enhanced with more comprehensive content
export const faqData: FAQPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is cold plunge therapy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cold plunge therapy involves immersing your body in cold water (40-50°F) for 2-5 minutes to activate the vagus nerve, reduce inflammation, and enhance mental clarity. This ancient practice has been used for centuries to improve recovery and overall wellness.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should I stay in the cold plunge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend 2-5 minutes for cold plunge therapy. Start with shorter durations (30 seconds to 1 minute) and gradually increase as your body adapts. Listen to your body and never push beyond your comfort level.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of infrared sauna?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Infrared sauna therapy provides deep tissue heating at 120-150°F, offering detoxification, pain relief, stress reduction, and improved circulation. Unlike traditional saunas, infrared penetrates deeper into tissues for more effective results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to book in advance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we recommend booking in advance to ensure availability. You can book online through our website or call us directly. Walk-ins are welcome but subject to availability.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I bring to my session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide towels and robes. You may want to bring a swimsuit for cold plunge therapy and comfortable clothing for other services. We also recommend bringing water to stay hydrated.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is cold plunge therapy safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cold plunge therapy is generally safe for healthy individuals. However, if you have cardiovascular conditions, are pregnant, or have other health concerns, please consult with your healthcare provider before trying cold therapy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between infrared and traditional sauna?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Infrared saunas use light to heat your body directly, while traditional saunas heat the air around you. Infrared provides deeper tissue penetration at lower temperatures, making it more comfortable and effective for many people.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should I use these services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Frequency depends on your goals and tolerance. We recommend starting with 1-2 sessions per week and gradually increasing. Many clients benefit from 2-3 sessions weekly for optimal results.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is red light therapy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Red light therapy uses low-level red and near-infrared light to stimulate cellular regeneration, improve skin health, reduce inflammation, and promote healing. It's a non-invasive treatment with no downtime.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer memberships?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer various membership options to suit different needs and budgets. Our memberships provide access to all services with discounted rates and priority booking. Contact us for current membership details.',
      },
    },
  ],
};

// Organization schema data
export const vitalIceOrganization: Organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vital Ice',
  description:
    'Live Better — Together. Leading wellness and recovery center in San Francisco specializing in cold therapy, red light therapy, sauna, and holistic healing practices.',
  url: 'https://vitalicesf.com',
  logo: 'https://media.vitalicesf.com/logo-dark.png',
  sameAs: [
    'https://www.instagram.com/vitalice',
    'https://www.facebook.com/vitalice',
    'https://www.linkedin.com/company/vitalice',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-415-555-0123',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
};

// Sample reviews for the business
export const businessReviews: Review[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    author: {
      '@type': 'Person',
      name: 'Sarah Johnson',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
    },
    reviewBody:
      'Amazing experience! The cold plunge therapy has completely transformed my recovery routine. The staff is knowledgeable and the facility is immaculate. Highly recommend!',
    datePublished: '2024-01-15',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    author: {
      '@type': 'Person',
      name: 'Michael Chen',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
    },
    reviewBody:
      'The infrared sauna sessions have been incredible for my stress relief and muscle recovery. The atmosphere is so relaxing and the benefits are noticeable immediately.',
    datePublished: '2024-01-20',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Vital Ice',
    },
    author: {
      '@type': 'Person',
      name: 'Emma Rodriguez',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
    },
    reviewBody:
      'Red light therapy has done wonders for my skin and overall wellness. The staff is professional and the results speak for themselves. This place is a game-changer!',
    datePublished: '2024-01-25',
  },
];

// Breadcrumb schemas for different pages
export const breadcrumbSchemas: Record<string, BreadcrumbList> = {
  home: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
    ],
  },
  services: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://vitalicesf.com/services',
      },
    ],
  },
  'cold-plunge': {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://vitalicesf.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cold Plunge Therapy',
        item: 'https://vitalicesf.com/services/cold-plunge',
      },
    ],
  },
  about: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://vitalicesf.com/about',
      },
    ],
  },
  contact: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
    ],
  },
  'infrared-sauna': {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://vitalicesf.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Infrared Sauna Therapy',
        item: 'https://vitalicesf.com/services/infrared-sauna',
      },
    ],
  },
  'traditional-sauna': {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://vitalicesf.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Traditional Sauna Therapy',
        item: 'https://vitalicesf.com/services/traditional-sauna',
      },
    ],
  },
  'red-light-therapy': {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://vitalicesf.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Red Light Therapy',
        item: 'https://vitalicesf.com/services/red-light-therapy',
      },
    ],
  },
  'compression-boots': {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://vitalicesf.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Compression Boot Therapy',
        item: 'https://vitalicesf.com/services/compression-boots',
      },
    ],
  },
  'percussion-massage': {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://vitalicesf.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Percussion Massage Therapy',
        item: 'https://vitalicesf.com/services/percussion-massage',
      },
    ],
  },
  experience: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Choose Your Experience',
        item: 'https://vitalicesf.com/experience',
      },
    ],
  },
  book: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Book Now',
        item: 'https://vitalicesf.com/book',
      },
    ],
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vitalicesf.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: 'https://vitalicesf.com/faq',
      },
    ],
  },
};

// Helper function to generate structured data script
export function generateStructuredData(
  data: Record<string, unknown> | Record<string, unknown>[]
): string {
  return JSON.stringify(data);
}

// Helper function to get combined schema data for a page
export function getPageSchema(pageKey: string): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [vitalIceBusiness, vitalIceOrganization];

  // Add breadcrumbs for all pages
  if (breadcrumbSchemas[pageKey]) {
    schemas.push(breadcrumbSchemas[pageKey]);
  }

  // Add service schema for service pages
  if (services[pageKey]) {
    schemas.push(services[pageKey]);
  }

  // Add FAQ schema for FAQ page
  if (pageKey === 'faq') {
    schemas.push(faqData);
  }

  // Add reviews for main pages
  if (['home', 'services', 'about'].includes(pageKey)) {
    schemas.push(...businessReviews);
  }

  // Add WebSite schema for all pages
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vital Ice',
    url: 'https://vitalicesf.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://vitalicesf.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  });

  return schemas;
}
