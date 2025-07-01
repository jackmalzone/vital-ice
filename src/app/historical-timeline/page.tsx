'use client';

import { FC, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './page.module.css';

const HistoricalTimeline: FC = () => {
  const [currentEra, setCurrentEra] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Background transforms for parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0.8]);

  // Timeline eras with background images and colors
  const timelineEras = [
    {
      id: 0,
      period: '~2500 BCE',
      title: 'Water as Medicine in Early Civilizations',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'Even the earliest civilizations recognized the healing power of water. The Great Bath of Mohenjo-daro (Indus Valley) is one of the oldest public bathing pools, suggesting ritual bathing was practiced 4,500 years ago.'
    },
    {
      id: 1,
      period: '~500–300 BCE',
      title: 'Ancient Greek Bathhouses and Hydrotherapy',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #1e3a5f 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'Ancient Greece birthed many principles of modern spa culture. Public bathhouses (often part of gymnasia) and natural hot springs were used for relaxation, socializing, and health.'
    },
    {
      id: 2,
      period: '1st–4th Century CE',
      title: 'Roman Thermae: The Golden Age of Public Baths',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #8b4513 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'The Roman Empire elevated communal bathing to a grand scale. Building on Greek ideas, Romans made bathing a daily regimen for health and social life.'
    },
    {
      id: 3,
      period: '737 CE',
      title: "Japan's Onsen Hot Springs Emerge",
      background: 'linear-gradient(135deg, #1a1a1a 0%, #4a1c40 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'In East Asia, natural hot springs have been used for healing for over a thousand years. In Japan, onsen (hot spring baths) became an integral wellness practice by the 8th century.'
    },
    {
      id: 4,
      period: '800–1500',
      title: 'Temazcal & Sweat Lodges: Indigenous Healing Baths',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d4a3e 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'Across the ocean, indigenous peoples of the Americas developed their own sweat bathing rituals. In Mesoamerica, the temazcal – from the Nahuatl word for "house of heat" – was a domed adobe or stone sweat lodge.'
    },
    {
      id: 5,
      period: '15th Century',
      title: 'Ottoman Hammams Continue the Bathhouse Legacy',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #5d4e75 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'After the fall of Rome, public bathing in Europe waned for a time, but the tradition was preserved and reinvented in the Middle East. The Islamic hammam (Turkish bath) evolved from Roman-Byzantine bathhouses.'
    },
    {
      id: 6,
      period: '12th Century onward',
      title: 'Sauna Culture in Northern Europe',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'In the far north, the sauna has been a way of life for over a millennia. The sauna tradition – essentially a wooden sweat bath heated by a stove – took root in Finland and surrounding regions in ancient times.'
    },
    {
      id: 7,
      period: '18th–19th Century',
      title: 'Spa Resorts and Sea Bathing Craze',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #1e4d2b 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'By the 1700s and 1800s, a resurgence in "taking the waters" swept through Europe. Mineral spring resorts (spas) became fashionable as the upper classes sought cures for ailments.'
    },
    {
      id: 8,
      period: '1896',
      title: 'Sutro Baths in San Francisco: A Gilded Age Bathing Palace',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #3d5a80 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'By the late 19th century, public bathing had made its way to the American West Coast in spectacular fashion. In 1896, San Francisco unveiled the Sutro Baths, an enormous indoor bathhouse and swimming facility.'
    },
    {
      id: 9,
      period: '2010s',
      title: 'The Cold Comeback and Wim Hof Method',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'In the 2010s, ancient wisdom about hot-cold therapy found a charismatic modern champion: Wim Hof, a Dutch athlete nicknamed "The Iceman."'
    },
    {
      id: 10,
      period: '2020s',
      title: 'Modern Revival: Communal Saunas and Bathhouses in San Francisco',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #00b7b5 100%)',
      image: '/images/hero-ambient-water.jpg',
      content: 'Today, we are in the midst of a bathhouse renaissance, blending old traditions with new innovations. Particularly in cities like San Francisco – where our story takes off – communal wellness spaces are making a striking comeback.'
    }
  ];

  // Update current era based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollProgress = scrollPosition / documentHeight;
      
      const eraIndex = Math.floor(scrollProgress * timelineEras.length);
      setCurrentEra(Math.max(0, Math.min(eraIndex, timelineEras.length - 1)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.main}>
      {/* Dynamic Background */}
      <motion.div 
        className={styles.background}
        style={{
          y: backgroundY,
          scale: backgroundScale,
          background: timelineEras[currentEra]?.background || timelineEras[0].background
        }}
      >
        {timelineEras[currentEra]?.image && (
          <div 
            className={styles.backgroundImage}
            style={{
              backgroundImage: `url(${timelineEras[currentEra].image})`
            }}
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

      {/* Timeline Content */}
      <section className={styles.timeline}>
        <div className={styles.timeline__container}>
          {timelineEras.map((era, index) => (
            <motion.div
              key={era.id}
              className={styles.timeline__era}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.timeline__content}>
                <div className={styles.timeline__period}>
                  {era.period}
                </div>
                <h2 className={styles.timeline__title}>
                  {era.title}
                </h2>
                <p className={styles.timeline__description}>
                  {era.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Conclusion Section */}
      <motion.section 
        className={styles.conclusion}
        style={{ opacity: textOpacity }}
      >
        <div className={styles.conclusion__container}>
          <h2 className={styles.conclusion__title}>
            The Full Circle Moment
          </h2>
          <p className={styles.conclusion__text}>
            From the ancient Greek gymnasiums to the Irish seaweed baths, from Roman thermae to Finnish saunas, 
            nearly every culture in history found that the simple acts of heating, cooling, and cleansing the body 
            in water could bring profound benefits. These practices have ebbed and flowed in popularity, but never disappeared. 
            Today, backed by modern science and a yearning for authentic experiences, they are resurging vividly.
          </p>
          <p className={styles.conclusion__text}>
            The timeline of communal bathing and wellness has truly come full circle – reminding us that sometimes 
            the path to innovation leads right back to the wisdom of the ancients. Whether in a rustic sweat lodge 
            or a state-of-the-art city spa, the elemental ritual of "heat, sweat, cold, rest" continues to heal, 
            connect, and inspire people as it has for thousands of years.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default HistoricalTimeline; 