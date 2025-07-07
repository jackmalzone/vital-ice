'use client';

import { FC, useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AdaptiveMedia from '@/components/ui/AdaptiveMedia/AdaptiveMedia';
import styles from './page.module.css';

const HistoricalTimeline: FC = () => {
  const [currentEra, setCurrentEra] = useState(0);
  const [activeEra, setActiveEra] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { scrollYProgress } = useScroll();
  const timelineRef = useRef<HTMLDivElement>(null);
  const lastEraRef = useRef(0);

  // Helper functions for adaptive text colors
  const getTextColorForBackground = (background: string): string => {
    if (background.includes('#00b7b5') || background.includes('arctic')) {
      return '#ffffff'; // White for arctic/blue backgrounds
    } else if (background.includes('#f56f0d') || background.includes('orange')) {
      return '#ffffff'; // White for orange backgrounds
    } else if (background.includes('#2d1810') || background.includes('brown')) {
      return '#ffffff'; // White for brown backgrounds
    } else if (background.includes('#1e3a5f') || background.includes('blue')) {
      return '#ffffff'; // White for blue backgrounds
    } else {
      return '#ffffff'; // Default white
    }
  };

  const getTextShadowForBackground = (background: string): string => {
    if (background.includes('#00b7b5') || background.includes('arctic')) {
      return '0 2px 8px rgba(0, 0, 0, 0.6)'; // Stronger shadow for light backgrounds
    } else if (background.includes('#f56f0d') || background.includes('orange')) {
      return '0 2px 8px rgba(0, 0, 0, 0.6)'; // Stronger shadow for orange backgrounds
    } else {
      return '0 2px 8px rgba(0, 0, 0, 0.5)'; // Default shadow
    }
  };

  // Text opacity for conclusion section
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0.8]);

  // Timeline eras with adaptive media sources
  const timelineEras: Array<{
    id: number;
    period: string;
    title: string;
    background: string;
    image: string;
    videoSources?: {
      high?: string;
      medium?: string;
      low?: string;
    };
    content: string;
  }> = [
    {
      id: 0,
      period: '~2500 BCE',
      title: 'Water as Medicine in Early Civilizations',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%)',
      image: '/images/indusValley.png',
      videoSources: {
        high: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/ancient_hot-spring.mp4',
        medium: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/ancient_hot-spring.mp4',
        low: 'https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/ancient_hot-spring.mp4',
      },
      content:
        'Even the earliest civilizations recognized the healing power of water. The Great Bath of Mohenjo-daro (Indus Valley) is one of the oldest public bathing pools, suggesting ritual bathing was practiced 4,500 years ago.',
    },
    {
      id: 1,
      period: '~500–300 BCE',
      title: 'Ancient Greek Bathhouses and Hydrotherapy',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #1e3a5f 100%)',
      image: '/images/origins_mohenjo-daro.jpg',
      content:
        'Ancient Greece birthed many principles of modern spa culture. Public bathhouses (often part of gymnasia) and natural hot springs were used for relaxation, socializing, and health.',
    },
    {
      id: 2,
      period: '1st–4th Century CE',
      title: 'Roman Thermae: The Golden Age of Public Baths',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #8b4513 100%)',
      image: '/images/romanThermae.jpg',
      content:
        'The Roman Empire elevated communal bathing to a grand scale. Building on Greek ideas, Romans made bathing a daily regimen for health and social life.',
    },
    {
      id: 3,
      period: '737 CE',
      title: "Japan's Onsen Hot Springs Emerge",
      background: 'linear-gradient(135deg, #1a1a1a 0%, #4a1c40 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'In East Asia, natural hot springs have been used for healing for over a thousand years. In Japan, onsen (hot spring baths) became an integral wellness practice by the 8th century.',
    },
    {
      id: 4,
      period: '800–1500',
      title: 'Temazcal & Sweat Lodges: Indigenous Healing Baths',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d4a3e 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'Across the ocean, indigenous peoples of the Americas developed their own sweat bathing rituals. In Mesoamerica, the temazcal – from the Nahuatl word for "house of heat" – was a domed adobe or stone sweat lodge.',
    },
    {
      id: 5,
      period: '15th Century',
      title: 'Ottoman Hammams Continue the Bathhouse Legacy',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #5d4e75 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'After the fall of Rome, public bathing in Europe waned for a time, but the tradition was preserved and reinvented in the Middle East. The Islamic hammam (Turkish bath) evolved from Roman-Byzantine bathhouses.',
    },
    {
      id: 6,
      period: '12th Century onward',
      title: 'Sauna Culture in Northern Europe',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'In the far north, the sauna has been a way of life for over a millennia. The sauna tradition – essentially a wooden sweat bath heated by a stove – took root in Finland and surrounding regions in ancient times.',
    },
    {
      id: 7,
      period: '18th–19th Century',
      title: 'Spa Resorts and Sea Bathing Craze',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #1e4d2b 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'By the 1700s and 1800s, a resurgence in "taking the waters" swept through Europe. Mineral spring resorts (spas) became fashionable as the upper classes sought cures for ailments.',
    },
    {
      id: 8,
      period: '18th–19th Century',
      title: 'Irish Sweathouses: A Folk Sauna Tradition',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #3a5f3a 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'In rural Ireland, communities had their own distinct take on sweat bathing. Small stone huts known as sweathouses were used widely in Ireland up until the late 19th century.',
    },
    {
      id: 9,
      period: '1896',
      title: 'Sutro Baths in San Francisco: A Gilded Age Bathing Palace',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #3d5a80 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'By the late 19th century, public bathing had made its way to the American West Coast in spectacular fashion. In 1896, San Francisco unveiled the Sutro Baths, an enormous indoor bathhouse and swimming facility.',
    },
    {
      id: 10,
      period: '20th Century',
      title: 'From Bathhouse Decline to Wellness Rebirth',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'During much of the 20th century, especially mid-century, communal bathhouses in the West saw a decline. Yet, the idea of hot water therapy never truly vanished – it lived on in different forms.',
    },
    {
      id: 11,
      period: '2010s',
      title: 'The Cold Comeback and Wim Hof Method',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'In the 2010s, ancient wisdom about hot-cold therapy found a charismatic modern champion: Wim Hof, a Dutch athlete nicknamed "The Iceman."',
    },
    {
      id: 12,
      period: '2020s',
      title: 'Modern Revival: Communal Saunas and Bathhouses in San Francisco',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #00b7b5 100%)',
      image: '/images/hero-ambient-water.jpg',
      content:
        'Today, we are in the midst of a bathhouse renaissance, blending old traditions with new innovations. Particularly in cities like San Francisco – where our story takes off – communal wellness spaces are making a striking comeback.',
    },
  ];

  const timelineErasLength = timelineEras.length;

  // Smooth era transitions with throttling and debouncing
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    let debounceTimer: NodeJS.Timeout;
    let lastEraChange = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrollProgress = scrollPosition / documentHeight;

          // Smoother era calculation with interpolation
          const eraIndex = scrollProgress * (timelineErasLength - 1);
          const newEra = Math.max(0, Math.min(Math.round(eraIndex), timelineErasLength - 1));

          // Only update if changed significantly, debounce rapid changes, and respect minimum time between changes
          const now = Date.now();
          if (
            Math.abs(scrollPosition - lastScrollY) > 150 &&
            !isTransitioning &&
            now - lastEraChange > 1200 &&
            newEra !== lastEraRef.current
          ) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              setIsTransitioning(true);
              setCurrentEra(newEra);
              lastEraRef.current = newEra;
              lastEraChange = now;
              // Reset transition state after animation completes
              setTimeout(() => setIsTransitioning(false), 1500);
            }, 200);
            lastScrollY = scrollPosition;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debounceTimer);
    };
  }, [isTransitioning, timelineErasLength]);

  // Enhanced scroll tracking for active era detection with smoother transitions
  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
      rootMargin: '-15% 0px -15% 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const eraIndex = parseInt(entry.target.getAttribute('data-era') || '0');
          // Smooth transition with delay
          setTimeout(() => {
            setActiveEra(eraIndex);
          }, 100);
        }
      });
    }, observerOptions);

    const eraElements = document.querySelectorAll('[data-era]');
    eraElements.forEach(element => observer.observe(element));

    return () => {
      eraElements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div className={styles.main}>
      {/* Dynamic Background with Adaptive Media */}
      <motion.div
        className={styles.background}
        style={{
          background: timelineEras[currentEra]?.background || timelineEras[0].background,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        {timelineEras[currentEra]?.image && (
          <AdaptiveMedia
            videoSources={timelineEras[currentEra].videoSources || {}}
            imageSource={timelineEras[currentEra].image}
            alt={`Background for ${timelineEras[currentEra].title}`}
            className={styles.backgroundImage}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
          />
        )}
      </motion.div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Timeline of Communal Wellness Bathing
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From Ancient Rituals to Modern Revival
          </motion.p>
        </div>
      </section>

      {/* Timeline Thread */}
      <div className={styles.timeline__thread} />

      {/* Progress Tracker */}
      <div className={styles.timeline__progress}>
        {timelineEras.map((era, index) => (
          <div
            key={`progress-${era.id}`}
            className={`${styles['timeline__progress-dot']} ${activeEra === index ? styles.active : ''}`}
            onClick={() => {
              const element = document.querySelector(`[data-era="${index}"]`);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {/* Timeline Content */}
      <section className={styles.timeline} ref={timelineRef}>
        <div className={styles.timeline__container}>
          {timelineEras.map((era, index) => (
            <motion.div
              key={era.id}
              className={`${styles.timeline__era} ${activeEra === index ? styles.active : ''}`}
              data-era={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              viewport={{ once: true, margin: '-25% 0px -25% 0px' }}
            >
              {/* Timeline Marker */}
              <div className={styles.timeline__marker} />

              <div className={styles.timeline__content}>
                <div className={styles.timeline__period}>{era.period}</div>
                <h2
                  className={styles.timeline__title}
                  style={{
                    color: getTextColorForBackground(era.background),
                    textShadow: getTextShadowForBackground(era.background),
                  }}
                >
                  {era.title}
                </h2>
                <p className={styles.timeline__description}>{era.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Conclusion Section */}
      <motion.section className={styles.conclusion} style={{ opacity: textOpacity }}>
        <div className={styles.conclusion__container}>
          <h2 className={styles.conclusion__title}>The Full Circle Moment</h2>
          <p className={styles.conclusion__text}>
            From the ancient Greek gymnasiums to the Irish seaweed baths, from Roman thermae to
            Finnish saunas, nearly every culture in history found that the simple acts of heating,
            cooling, and cleansing the body in water could bring profound benefits. These practices
            have ebbed and flowed in popularity, but never disappeared. Today, backed by modern
            science and a yearning for authentic experiences, they are resurging vividly.
          </p>
          <p className={styles.conclusion__text}>
            The timeline of communal bathing and wellness has truly come full circle – reminding us
            that sometimes the path to innovation leads right back to the wisdom of the ancients.
            Whether in a rustic sweat lodge or a state-of-the-art city spa, the elemental ritual of
            &quot;heat, sweat, cold, rest&quot; continues to heal, connect, and inspire people as it
            has for thousands of years.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default HistoricalTimeline;
