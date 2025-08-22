import { Metadata } from 'next';

// Base metadata configuration
export const baseMetadata: Metadata = {
  title: {
    default: 'Vital Ice | Recovery & Wellness Through Cold Therapy',
    template: '%s | Vital Ice',
  },
  description:
    'Experience transformative recovery and wellness through cold therapy, infrared sauna, and traditional healing practices. Located in San Francisco.',
  keywords: [
    'cold therapy',
    'cold plunge',
    'infrared sauna',
    'traditional sauna',
    'recovery',
    'wellness',
    'San Francisco',
    'red light therapy',
    'compression therapy',
    'percussion massage',
  ],
  authors: [{ name: 'Vital Ice' }],
  creator: 'Vital Ice',
  publisher: 'Vital Ice',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vitalicesf.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vitalicesf.com',
    siteName: 'Vital Ice',
    title: 'Vital Ice | Recovery & Wellness Through Cold Therapy',
    description:
      'Experience transformative recovery and wellness through cold therapy, infrared sauna, and traditional healing practices. Located in San Francisco.',
    images: [
      {
        url: 'https://media.vitalicesf.com/seo/desktop-home.png',
        width: 1200,
        height: 630,
        alt: 'Vital Ice - Recovery and wellness through cold therapy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vital Ice | Recovery & Wellness Through Cold Therapy',
    description:
      'Experience transformative recovery and wellness through cold therapy, infrared sauna, and traditional healing practices. Located in San Francisco.',
    images: ['https://media.vitalicesf.com/seo/desktop-home.png'],
    creator: '@vitalice',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

// Page-specific metadata configurations
export const pageMetadata: Record<string, Metadata> = {
  home: {
    title: 'Vital Ice | Recovery & Wellness Through Cold Therapy',
    description:
      'Experience transformative recovery and wellness through cold therapy, infrared sauna, and traditional healing practices. Located in San Francisco.',
    openGraph: {
      title: 'Vital Ice | Recovery & Wellness Through Cold Therapy',
      description:
        'Experience transformative recovery and wellness through cold therapy, infrared sauna, and traditional healing practices. Located in San Francisco.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-home.png',
          width: 1200,
          height: 630,
          alt: 'Vital Ice - Recovery and wellness through cold therapy',
        },
      ],
    },
    twitter: {
      title: 'Vital Ice | Recovery & Wellness Through Cold Therapy',
      description:
        'Experience transformative recovery and wellness through cold therapy, infrared sauna, and traditional healing practices. Located in San Francisco.',
      images: ['https://media.vitalicesf.com/seo/desktop-home.png'],
    },
  },
  about: {
    title: 'About Vital Ice | Our Story & Mission',
    description:
      'Discover the story behind Vital Ice. Learn about our founders, mission, and commitment to bringing ancient healing practices to modern wellness.',
    openGraph: {
      title: 'About Vital Ice | Our Story & Mission',
      description:
        'Discover the story behind Vital Ice. Learn about our founders, mission, and commitment to bringing ancient healing practices to modern wellness.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-about.png',
          width: 1200,
          height: 630,
          alt: 'About Vital Ice - Our story and mission',
        },
      ],
    },
    twitter: {
      title: 'About Vital Ice | Our Story & Mission',
      description:
        'Discover the story behind Vital Ice. Learn about our founders, mission, and commitment to bringing ancient healing practices to modern wellness.',
      images: ['https://media.vitalicesf.com/seo/desktop-about.png'],
    },
  },
  services: {
    title: 'Wellness Services | Cold Therapy, Sauna & Recovery',
    description:
      'Explore our comprehensive wellness services including cold plunge therapy, infrared sauna, traditional sauna, red light therapy, compression boots, and percussion massage.',
    openGraph: {
      title: 'Wellness Services | Cold Therapy, Sauna & Recovery',
      description:
        'Explore our comprehensive wellness services including cold plunge therapy, infrared sauna, traditional sauna, red light therapy, compression boots, and percussion massage.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-services.png',
          width: 1200,
          height: 630,
          alt: 'Vital Ice wellness services',
        },
      ],
    },
    twitter: {
      title: 'Wellness Services | Cold Therapy, Sauna & Recovery',
      description:
        'Explore our comprehensive wellness services including cold plunge therapy, infrared sauna, traditional sauna, red light therapy, compression boots, and percussion massage.',
      images: ['https://media.vitalicesf.com/seo/desktop-services.png'],
    },
  },
  contact: {
    title: 'Contact Vital Ice | Book Your Recovery Session',
    description:
      'Contact Vital Ice to book your recovery session. Located in San Francisco. Call us or book online for cold therapy, sauna, and wellness services.',
    openGraph: {
      title: 'Contact Vital Ice | Book Your Recovery Session',
      description:
        'Contact Vital Ice to book your recovery session. Located in San Francisco. Call us or book online for cold therapy, sauna, and wellness services.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-contact.png',
          width: 1200,
          height: 630,
          alt: 'Contact Vital Ice - Book your recovery session',
        },
      ],
    },
    twitter: {
      title: 'Contact Vital Ice | Book Your Recovery Session',
      description:
        'Contact Vital Ice to book your recovery session. Located in San Francisco. Call us or book online for cold therapy, sauna, and wellness services.',
      images: ['https://media.vitalicesf.com/seo/desktop-contact.png'],
    },
  },
  'cold-plunge': {
    title: 'Cold Plunge Therapy | Vital Ice San Francisco',
    description:
      'Experience the benefits of cold plunge therapy at Vital Ice. 40-50°F immersion therapy for reduced inflammation, mental acuity, and enhanced recovery.',
    openGraph: {
      title: 'Cold Plunge Therapy | Vital Ice San Francisco',
      description:
        'Experience the benefits of cold plunge therapy at Vital Ice. 40-50°F immersion therapy for reduced inflammation, mental acuity, and enhanced recovery.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-cold-plunge.png',
          width: 1200,
          height: 630,
          alt: 'Cold plunge therapy at Vital Ice',
        },
      ],
    },
    twitter: {
      title: 'Cold Plunge Therapy | Vital Ice San Francisco',
      description:
        'Experience the benefits of cold plunge therapy at Vital Ice. 40-50°F immersion therapy for reduced inflammation, mental acuity, and enhanced recovery.',
      images: ['https://media.vitalicesf.com/seo/desktop-cold-plunge.png'],
    },
  },
  'infrared-sauna': {
    title: 'Infrared Sauna | Vital Ice San Francisco',
    description:
      'Experience infrared sauna therapy at Vital Ice. 120-150°F deep tissue heating for detoxification, pain relief, and stress reduction.',
    openGraph: {
      title: 'Infrared Sauna | Vital Ice San Francisco',
      description:
        'Experience infrared sauna therapy at Vital Ice. 120-150°F deep tissue heating for detoxification, pain relief, and stress reduction.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-infrared-sauna.png',
          width: 1200,
          height: 630,
          alt: 'Infrared sauna therapy at Vital Ice',
        },
      ],
    },
    twitter: {
      title: 'Infrared Sauna | Vital Ice San Francisco',
      description:
        'Experience infrared sauna therapy at Vital Ice. 120-150°F deep tissue heating for detoxification, pain relief, and stress reduction.',
      images: ['https://media.vitalicesf.com/seo/desktop-infrared-sauna.png'],
    },
  },
  'traditional-sauna': {
    title: 'Traditional Sauna | Vital Ice San Francisco',
    description:
      'Experience traditional sauna therapy at Vital Ice. 160-200°F heat therapy for cardiovascular health, muscle recovery, and immune support.',
    openGraph: {
      title: 'Traditional Sauna | Vital Ice San Francisco',
      description:
        'Experience traditional sauna therapy at Vital Ice. 160-200°F heat therapy for cardiovascular health, muscle recovery, and immune support.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-traditional-sauna.png',
          width: 1200,
          height: 630,
          alt: 'Traditional sauna therapy at Vital Ice',
        },
      ],
    },
    twitter: {
      title: 'Traditional Sauna | Vital Ice San Francisco',
      description:
        'Experience traditional sauna therapy at Vital Ice. 160-200°F heat therapy for cardiovascular health, muscle recovery, and immune support.',
      images: ['https://media.vitalicesf.com/seo/desktop-traditional-sauna.png'],
    },
  },
  'red-light-therapy': {
    title: 'Red Light Therapy | Vital Ice San Francisco',
    description:
      'Experience red light therapy at Vital Ice. Low-level red and near-infrared light therapy for cellular regeneration, skin health, and anti-aging benefits.',
    openGraph: {
      title: 'Red Light Therapy | Vital Ice San Francisco',
      description:
        'Experience red light therapy at Vital Ice. Low-level red and near-infrared light therapy for cellular regeneration, skin health, and anti-aging benefits.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-red-light-therapy.png',
          width: 1200,
          height: 630,
          alt: 'Red light therapy at Vital Ice',
        },
      ],
    },
    twitter: {
      title: 'Red Light Therapy | Vital Ice San Francisco',
      description:
        'Experience red light therapy at Vital Ice. Low-level red and near-infrared light therapy for cellular regeneration, skin health, and anti-aging benefits.',
      images: ['https://media.vitalicesf.com/seo/desktop-red-light-therapy.png'],
    },
  },
  'compression-boots': {
    title: 'Compression Boots | Vital Ice San Francisco',
    description:
      'Experience compression boot therapy at Vital Ice. Sequential compression therapy for improved circulation, muscle recovery, and lymphatic drainage.',
    openGraph: {
      title: 'Compression Boots | Vital Ice San Francisco',
      description:
        'Experience compression boot therapy at Vital Ice. Sequential compression therapy for improved circulation, muscle recovery, and lymphatic drainage.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-compression-boots.png',
          width: 1200,
          height: 630,
          alt: 'Compression boot therapy at Vital Ice',
        },
      ],
    },
    twitter: {
      title: 'Compression Boots | Vital Ice San Francisco',
      description:
        'Experience compression boot therapy at Vital Ice. Sequential compression therapy for improved circulation, muscle recovery, and lymphatic drainage.',
      images: ['https://media.vitalicesf.com/seo/desktop-compression-boots.png'],
    },
  },
  'percussion-massage': {
    title: 'Percussion Massage | Vital Ice San Francisco',
    description:
      'Experience percussion massage therapy at Vital Ice. Deep tissue percussion therapy for muscle recovery, pain relief, and improved mobility.',
    openGraph: {
      title: 'Percussion Massage | Vital Ice San Francisco',
      description:
        'Experience percussion massage therapy at Vital Ice. Deep tissue percussion therapy for muscle recovery, pain relief, and improved mobility.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-percussion-massage.png',
          width: 1200,
          height: 630,
          alt: 'Percussion massage therapy at Vital Ice',
        },
      ],
    },
    twitter: {
      title: 'Percussion Massage | Vital Ice San Francisco',
      description:
        'Experience percussion massage therapy at Vital Ice. Deep tissue percussion therapy for muscle recovery, pain relief, and improved mobility.',
      images: ['https://media.vitalicesf.com/seo/desktop-percussion-massage.png'],
    },
  },
  book: {
    title: 'Book Now | Vital Ice Recovery Sessions',
    description:
      'Book your recovery session at Vital Ice. Schedule cold therapy, sauna sessions, red light therapy, compression boots, and percussion massage online.',
    openGraph: {
      title: 'Book Now | Vital Ice Recovery Sessions',
      description:
        'Book your recovery session at Vital Ice. Schedule cold therapy, sauna sessions, red light therapy, compression boots, and percussion massage online.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-book.png',
          width: 1200,
          height: 630,
          alt: 'Book your recovery session at Vital Ice',
        },
      ],
    },
    twitter: {
      title: 'Book Now | Vital Ice Recovery Sessions',
      description:
        'Book your recovery session at Vital Ice. Schedule cold therapy, sauna sessions, red light therapy, compression boots, and percussion massage online.',
      images: ['https://media.vitalicesf.com/seo/desktop-book.png'],
    },
  },
  faq: {
    title: 'FAQ | Frequently Asked Questions | Vital Ice',
    description:
      'Find answers to frequently asked questions about Vital Ice services, cold therapy, sauna sessions, booking, and wellness practices.',
    openGraph: {
      title: 'FAQ | Frequently Asked Questions | Vital Ice',
      description:
        'Find answers to frequently asked questions about Vital Ice services, cold therapy, sauna sessions, booking, and wellness practices.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-faq.png',
          width: 1200,
          height: 630,
          alt: 'FAQ - Frequently asked questions about Vital Ice',
        },
      ],
    },
    twitter: {
      title: 'FAQ | Frequently Asked Questions | Vital Ice',
      description:
        'Find answers to frequently asked questions about Vital Ice services, cold therapy, sauna sessions, booking, and wellness practices.',
      images: ['https://media.vitalicesf.com/seo/desktop-faq.png'],
    },
  },
  partners: {
    title: 'Partners | Vital Ice Collaborations',
    description:
      'Discover Vital Ice partnerships and collaborations. Working with leading wellness brands and professionals to enhance your recovery experience.',
    openGraph: {
      title: 'Partners | Vital Ice Collaborations',
      description:
        'Discover Vital Ice partnerships and collaborations. Working with leading wellness brands and professionals to enhance your recovery experience.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-partners.png',
          width: 1200,
          height: 630,
          alt: 'Vital Ice partners and collaborations',
        },
      ],
    },
    twitter: {
      title: 'Partners | Vital Ice Collaborations',
      description:
        'Discover Vital Ice partnerships and collaborations. Working with leading wellness brands and professionals to enhance your recovery experience.',
      images: ['https://media.vitalicesf.com/seo/desktop-partners.png'],
    },
  },
  'performance-demo': {
    title: 'Performance Demo | Vital Ice Experience',
    description:
      'Experience the Vital Ice performance demo. See our cutting-edge wellness technology and recovery solutions in action.',
    openGraph: {
      title: 'Performance Demo | Vital Ice Experience',
      description:
        'Experience the Vital Ice performance demo. See our cutting-edge wellness technology and recovery solutions in action.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-performance-demo.png',
          width: 1200,
          height: 630,
          alt: 'Vital Ice performance demo and experience',
        },
      ],
    },
    twitter: {
      title: 'Performance Demo | Vital Ice Experience',
      description:
        'Experience the Vital Ice performance demo. See our cutting-edge wellness technology and recovery solutions in action.',
      images: ['https://media.vitalicesf.com/seo/desktop-performance-demo.png'],
    },
  },
  experience: {
    title: 'Choose Your Experience | Vital Ice Services',
    description:
      'Choose your wellness experience at Vital Ice. Interactive service selection for cold therapy, sauna, red light therapy, and more recovery options.',
    openGraph: {
      title: 'Choose Your Experience | Vital Ice Services',
      description:
        'Choose your wellness experience at Vital Ice. Interactive service selection for cold therapy, sauna, red light therapy, and more recovery options.',
      images: [
        {
          url: 'https://media.vitalicesf.com/seo/desktop-experience.png',
          width: 1200,
          height: 630,
          alt: 'Choose your Vital Ice experience',
        },
      ],
    },
    twitter: {
      title: 'Choose Your Experience | Vital Ice Services',
      description:
        'Choose your wellness experience at Vital Ice. Interactive service selection for cold therapy, sauna, red light therapy, and more recovery options.',
      images: ['https://media.vitalicesf.com/seo/desktop-experience.png'],
    },
  },
};

// Helper function to merge metadata
export function mergeMetadata(pageKey: string, customMetadata?: Partial<Metadata>): Metadata {
  const pageMeta = pageMetadata[pageKey] || {};
  return {
    ...baseMetadata,
    ...pageMeta,
    ...customMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      ...pageMeta.openGraph,
      ...customMetadata?.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...pageMeta.twitter,
      ...customMetadata?.twitter,
    },
  };
}
