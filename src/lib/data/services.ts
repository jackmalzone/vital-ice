export interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  heroImage: string;
  textureImage?: string;
  accentColor: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  process: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  ctaTitle: string;
  ctaText: string;
}

export const servicesData: Record<string, ServiceData> = {
  'cold-plunge': {
    id: 'cold-plunge',
    title: 'Cold Plunge Therapy',
    subtitle:
      'Experience the transformative power of controlled cold exposure for enhanced recovery, mental resilience, and overall wellness',
    description:
      'Cold plunge therapy involves immersing your body in cold water (typically 50-60°F) for short periods to trigger a range of physiological responses. This ancient practice has been used for centuries across cultures and is now backed by modern science. At Vital Ice, we provide a safe, controlled environment for cold exposure therapy, combining traditional wisdom with modern technology to deliver optimal results.',
    backgroundImage: '/images/coldplunge_woman.jpg',
    heroImage: '/images/ice-vitalblue.jpg',
    textureImage: '/images/ice_vertical-texture.jpg',
    accentColor: '#4A90E2',
    benefits: [
      {
        title: 'Enhanced Recovery',
        description:
          'Accelerate muscle recovery and reduce inflammation through controlled cold exposure',
      },
      {
        title: 'Mental Resilience',
        description: 'Build mental toughness and improve stress response through cold adaptation',
      },
      {
        title: 'Improved Sleep',
        description: 'Regulate circadian rhythms and enhance sleep quality through cold therapy',
      },
      {
        title: 'Immune Support',
        description: 'Strengthen immune function and increase white blood cell production',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Preparation',
        description:
          'Begin with a brief consultation and safety briefing. Our team will guide you through proper breathing techniques.',
      },
      {
        step: '02',
        title: 'Gradual Exposure',
        description:
          'Start with a 30-second to 2-minute immersion in our 50°F cold plunge, gradually building tolerance.',
      },
      {
        step: '03',
        title: 'Breathing Focus',
        description:
          'Practice controlled breathing to manage the cold shock response and maximize benefits.',
      },
      {
        step: '04',
        title: 'Recovery',
        description:
          'Warm up gradually and hydrate. Many clients pair this with our infrared sauna for contrast therapy.',
      },
    ],
    ctaTitle: 'Ready to Experience Cold Plunge?',
    ctaText: 'Book your first session and discover the transformative benefits of cold therapy',
  },
  'infrared-sauna': {
    id: 'infrared-sauna',
    title: 'Infrared Sauna',
    subtitle: 'Deep tissue warming with infrared technology for detoxification and relaxation',
    description:
      'Infrared sauna therapy uses advanced infrared technology to penetrate deep into your tissues, providing a more effective and comfortable heat therapy experience than traditional saunas. The infrared waves directly heat your body rather than the air around you, creating a more intense therapeutic effect at lower temperatures. This modern approach to heat therapy offers numerous health benefits while being gentle on your cardiovascular system.',
    backgroundImage: '/images/sauna-infraredwide.jpg',
    heroImage: '/images/sauna-infraredwide.jpg',
    textureImage: '/images/embers_closeup.jpg',
    accentColor: '#E74C3C',
    benefits: [
      {
        title: 'Deep Detoxification',
        description: 'Penetrate deep into tissues to release toxins and promote cellular cleansing',
      },
      {
        title: 'Pain Relief',
        description: 'Reduce muscle tension and alleviate chronic pain through deep tissue warming',
      },
      {
        title: 'Stress Reduction',
        description: 'Promote relaxation and reduce cortisol levels for improved mental wellbeing',
      },
      {
        title: 'Improved Circulation',
        description: 'Enhance blood flow and oxygen delivery throughout the body',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Preparation',
        description:
          'Arrive hydrated and remove any metal jewelry. Our staff will explain the session and safety guidelines.',
      },
      {
        step: '02',
        title: 'Session',
        description:
          'Enjoy 20-30 minutes in our infrared sauna at 120-140°F, much lower than traditional saunas.',
      },
      {
        step: '03',
        title: 'Hydration',
        description:
          "Stay well-hydrated throughout your session and listen to your body's signals.",
      },
      {
        step: '04',
        title: 'Cool Down',
        description:
          'Gradually cool down and consider pairing with our cold plunge for contrast therapy.',
      },
    ],
    ctaTitle: 'Ready to Experience Infrared Sauna?',
    ctaText:
      'Book your session and experience the deep therapeutic benefits of infrared heat therapy',
  },
  'traditional-sauna': {
    id: 'traditional-sauna',
    title: 'Traditional Sauna',
    subtitle: 'Classic Finnish-style sauna experience with dry heat therapy',
    description:
      'Experience the authentic Finnish sauna tradition with our traditional dry heat sauna. This time-honored practice uses high temperatures and low humidity to create an intense therapeutic environment. Traditional saunas operate at higher temperatures than infrared, typically 160-200°F, providing a more intense heat experience that has been used for centuries to promote health and wellness.',
    backgroundImage: '/images/sauna-traditional.jpg',
    heroImage: '/images/sauna-traditional.jpg',
    textureImage: '/images/lavastones.jpg',
    accentColor: '#F39C12',
    benefits: [
      {
        title: 'Cardiovascular Health',
        description: 'Improve heart health and circulation through intense heat exposure',
      },
      {
        title: 'Muscle Recovery',
        description: 'Relax muscles and accelerate recovery through deep heat penetration',
      },
      {
        title: 'Immune Support',
        description: 'Strengthen immune system response through heat stress adaptation',
      },
      {
        title: 'Mental Clarity',
        description: 'Clear the mind and reduce stress through traditional heat therapy',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Preparation',
        description:
          'Shower and arrive hydrated. Remove all jewelry and metal objects before entering.',
      },
      {
        step: '02',
        title: 'Heat Session',
        description:
          "Spend 10-15 minutes in the sauna at 160-200°F, listening to your body's signals.",
      },
      {
        step: '03',
        title: 'Cool Down',
        description: 'Exit the sauna and cool down gradually, either with a cold shower or plunge.',
      },
      {
        step: '04',
        title: 'Rest',
        description:
          'Rest and rehydrate between sessions, typically 2-3 rounds for optimal benefits.',
      },
    ],
    ctaTitle: 'Ready to Experience Traditional Sauna?',
    ctaText: 'Book your session and experience the authentic Finnish sauna tradition',
  },
  'compression-boots': {
    id: 'compression-boots',
    title: 'Compression Boots',
    subtitle: 'Advanced compression therapy for enhanced circulation and recovery',
    description:
      'Compression boot therapy uses advanced pneumatic compression technology to enhance circulation and accelerate recovery. This non-invasive treatment applies rhythmic pressure to your legs, mimicking the natural muscle pump action to improve blood flow and lymphatic drainage. Perfect for athletes, active individuals, or anyone seeking improved circulation and faster recovery.',
    backgroundImage: '/images/cells-bloodcells.jpg',
    heroImage: '/images/texture_vitalice-blue.jpg',
    textureImage: '/images/ripples-emberblue.jpg',
    accentColor: '#9B59B6',
    benefits: [
      {
        title: 'Improved Circulation',
        description: 'Enhance blood flow and oxygen delivery to muscles and tissues',
      },
      {
        title: 'Faster Recovery',
        description: 'Accelerate muscle recovery and reduce soreness after intense activity',
      },
      {
        title: 'Reduced Swelling',
        description: 'Promote lymphatic drainage and reduce fluid retention',
      },
      {
        title: 'Enhanced Performance',
        description: 'Improve athletic performance through better circulation and recovery',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Assessment',
        description:
          'Our staff will assess your needs and explain the compression therapy process.',
      },
      {
        step: '02',
        title: 'Session',
        description:
          'Relax for 20-30 minutes while the compression boots provide rhythmic pressure therapy.',
      },
      {
        step: '03',
        title: 'Monitoring',
        description:
          'The system automatically adjusts pressure levels for optimal therapeutic effect.',
      },
      {
        step: '04',
        title: 'Recovery',
        description: 'Feel immediate relief and improved circulation after your session.',
      },
    ],
    ctaTitle: 'Ready to Experience Compression Therapy?',
    ctaText: 'Book your session and accelerate your recovery with advanced compression technology',
  },
  'percussion-massage': {
    id: 'percussion-massage',
    title: 'Percussion Massage',
    subtitle: 'Deep tissue percussion therapy for muscle recovery and tension relief',
    description:
      'Percussion massage therapy uses advanced percussive technology to deliver deep tissue massage that targets muscle tension and promotes recovery. This innovative therapy combines the benefits of traditional massage with modern technology to provide more consistent and effective treatment. The percussive action helps break up muscle knots, improve blood flow, and accelerate recovery.',
    backgroundImage: '/images/texture_blackmarble-cracks.jpg',
    heroImage: '/images/texture_blackmarble-cracks.jpg',
    textureImage: '/images/texture_blackrock.jpg',
    accentColor: '#2ECC71',
    benefits: [
      {
        title: 'Muscle Recovery',
        description: 'Accelerate muscle recovery and reduce post-workout soreness',
      },
      {
        title: 'Tension Relief',
        description: 'Break up muscle knots and release chronic tension patterns',
      },
      {
        title: 'Improved Range of Motion',
        description: 'Enhance flexibility and joint mobility through deep tissue work',
      },
      {
        title: 'Enhanced Performance',
        description: 'Improve athletic performance through better muscle function',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Consultation',
        description: 'Discuss your specific needs and areas of concern with our therapist.',
      },
      {
        step: '02',
        title: 'Treatment',
        description: 'Receive targeted percussion therapy to your specific muscle groups.',
      },
      {
        step: '03',
        title: 'Adjustment',
        description: 'The therapist adjusts pressure and speed based on your comfort and needs.',
      },
      {
        step: '04',
        title: 'Recovery',
        description: 'Experience immediate relief and improved muscle function.',
      },
    ],
    ctaTitle: 'Ready to Experience Percussion Therapy?',
    ctaText:
      'Book your session and experience deep tissue relief with advanced percussion technology',
  },
  'red-light-therapy': {
    id: 'red-light-therapy',
    title: 'Red Light Therapy',
    subtitle: 'Therapeutic light treatment for cellular regeneration and skin health',
    description:
      "Red light therapy uses specific wavelengths of light to penetrate deep into your skin and tissues, promoting cellular regeneration and healing. This non-invasive treatment stimulates the production of collagen and elastin, improves skin health, and accelerates the body's natural healing processes. Red light therapy is backed by extensive research and provides numerous benefits for skin health, pain relief, and overall wellness.",
    backgroundImage: '/images/redlight_jellyfish.jpg',
    heroImage: '/images/redlight_jellyfish.jpg',
    textureImage: '/images/light_blurryhues.jpg',
    accentColor: '#E91E63',
    benefits: [
      {
        title: 'Cellular Regeneration',
        description: 'Stimulate cellular repair and regeneration for improved tissue health',
      },
      {
        title: 'Skin Health',
        description: 'Improve skin texture, tone, and reduce signs of aging',
      },
      {
        title: 'Pain Relief',
        description: 'Reduce inflammation and alleviate chronic pain conditions',
      },
      {
        title: 'Anti-Aging',
        description: 'Promote collagen production and improve skin elasticity',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Preparation',
        description: 'Remove any makeup or lotions and ensure skin is clean and dry.',
      },
      {
        step: '02',
        title: 'Treatment',
        description:
          'Sit or lie comfortably while the red light penetrates your skin for 10-20 minutes.',
      },
      {
        step: '03',
        title: 'Protection',
        description: 'No special protection needed - red light therapy is safe and non-damaging.',
      },
      {
        step: '04',
        title: 'Results',
        description: 'Experience gradual improvements in skin health and pain relief over time.',
      },
    ],
    ctaTitle: 'Ready to Experience Red Light Therapy?',
    ctaText: 'Book your session and discover the regenerative power of therapeutic light treatment',
  },
};
