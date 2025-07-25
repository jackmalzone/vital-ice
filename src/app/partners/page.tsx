'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import {
  GiSnowflake1,
  GiFire,
  GiCampfire,
  GiLightningTrio,
  GiLeg,
  GiVibratingBall,
  GiMuscleUp,
  GiWaterRecycling,
  GiBrain,
  GiMushroom,
  GiWeightLiftingUp,
  GiCoffeeCup,
  GiHeartWings,
  GiSleepingBag,
  GiBeerStein,
  GiMedallist,
  GiTrophy,
  GiCrown,
  GiDiamonds,
  GiGems,
  GiRing,
  GiNecklace,
  GiCrownCoin,
  GiGoldBar,
  GiSilverBullet,
  GiRuneSword,
  GiMedal,
  GiTrophyCup,
  GiDiamondRing,
  GiGemNecklace,
} from 'react-icons/gi';
import Footer from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

// Partner data structure
interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  tier: 'gold' | 'silver' | 'bronze';
  icon: React.ReactNode;
}

// Gold tier partners (full-width or 2-column layout)
const goldPartners: Partner[] = [
  {
    id: 'hyperice',
    name: 'Hyperice',
    logo: '/images/partners/hyperice-logo.png',
    description: 'Cutting-edge recovery tools we trust and use on site',
    website: 'https://hyperice.com',
    tier: 'gold',
    icon: <GiVibratingBall size={32} />,
  },
  {
    id: 'onsen',
    name: 'Onsen',
    logo: '/images/partners/onsen-logo.png',
    description: 'Sustainable towel & robe company with Japanese craftsmanship roots',
    website: 'https://onsen.co',
    tier: 'gold',
    icon: <GiWaterRecycling size={32} />,
  },
  {
    id: 'kion',
    name: 'Kion',
    logo: '/images/partners/kion-logo.png',
    description: 'High-quality amino acids & recovery-focused supplements',
    website: 'https://getkion.com',
    tier: 'gold',
    icon: <GiMuscleUp size={32} />,
  },
  {
    id: 'therabody',
    name: 'Therabody',
    logo: '/images/partners/therabody-logo.png',
    description: 'Technology-forward recovery partner offering percussion tools',
    website: 'https://therabody.com',
    tier: 'gold',
    icon: <GiLeg size={32} />,
  },
  {
    id: 'clearlight',
    name: 'Clearlight Saunas',
    logo: '/images/partners/clearlight-logo.png',
    description: 'Infrared sauna provider aligned with our standards',
    website: 'https://infraredsauna.com',
    tier: 'gold',
    icon: <GiFire size={32} />,
  },
];

// Silver tier partners (3-4 per row with hover details)
const silverPartners: Partner[] = [
  {
    id: 'bala',
    name: 'Bala',
    logo: '/images/partners/bala-logo.png',
    description: 'Weighted fitness accessories for pre-heat routines',
    website: 'https://balabala.com',
    tier: 'silver',
    icon: <GiWeightLiftingUp size={28} />,
  },
  {
    id: 'elemental-labs',
    name: 'Elemental Labs',
    logo: '/images/partners/elemental-labs-logo.png',
    description: 'Electrolytes & hydration science',
    website: 'https://elementallabs.com',
    tier: 'silver',
    icon: <GiWaterRecycling size={28} />,
  },
  {
    id: 'natural-stacks',
    name: 'Natural Stacks',
    logo: '/images/partners/natural-stacks-logo.png',
    description: 'Brain-forward supplements with clean sourcing',
    website: 'https://naturalstacks.com',
    tier: 'silver',
    icon: <GiBrain size={28} />,
  },
  {
    id: 'four-sigmatic',
    name: 'Four Sigmatic',
    logo: '/images/partners/four-sigmatic-logo.png',
    description: 'Mushroom-based wellness drinks',
    website: 'https://foursigmatic.com',
    tier: 'silver',
    icon: <GiMushroom size={28} />,
  },
  {
    id: 'alo-moves',
    name: 'Alo Moves',
    logo: '/images/partners/alo-moves-logo.png',
    description: 'At-home yoga & mobility sessions we recommend',
    website: 'https://alomoves.com',
    tier: 'silver',
    icon: <GiCampfire size={28} />,
  },
];

// Bronze tier partners (logo grid only)
const bronzePartners: Partner[] = [
  {
    id: 'equinox',
    name: 'Equinox',
    logo: '/images/partners/equinox-logo.png',
    description: '',
    website: '',
    tier: 'bronze',
    icon: <GiTrophy size={24} />,
  },
  {
    id: 'laird-superfood',
    name: 'Laird Superfood',
    logo: '/images/partners/laird-superfood-logo.png',
    description: '',
    website: '',
    tier: 'bronze',
    icon: <GiCoffeeCup size={24} />,
  },
  {
    id: 'whoop',
    name: 'WHOOP',
    logo: '/images/partners/whoop-logo.png',
    description: '',
    website: '',
    tier: 'bronze',
    icon: <GiHeartWings size={24} />,
  },
  {
    id: 'calm',
    name: 'Calm',
    logo: '/images/partners/calm-logo.png',
    description: '',
    website: '',
    tier: 'bronze',
    icon: <GiSleepingBag size={24} />,
  },
  {
    id: 'vuori',
    name: 'Vuori',
    logo: '/images/partners/vuori-logo.png',
    description: '',
    website: '',
    tier: 'bronze',
    icon: <GiLeg size={24} />,
  },
  {
    id: 'seed',
    name: 'Seed',
    logo: '/images/partners/seed-logo.png',
    description: '',
    website: '',
    tier: 'bronze',
    icon: <GiBrain size={24} />,
  },
  {
    id: 'eight-sleep',
    name: 'Eight Sleep',
    logo: '/images/partners/eight-sleep-logo.png',
    description: '',
    website: '',
    tier: 'bronze',
    icon: <GiSleepingBag size={24} />,
  },
  {
    id: 'athletic-brewing',
    name: 'Athletic Brewing Co.',
    logo: '/images/partners/athletic-brewing-logo.png',
    description: '',
    website: '',
    tier: 'bronze',
    icon: <GiBeerStein size={24} />,
  },
];

// Carousel partners for bottom marquee
const carouselPartners = [
  'Oura',
  'Whoop',
  'Hyperice',
  'Onsen',
  'Elemental Labs',
  'Rhythmia',
  'Aubrey Marcus Podcast',
  'Melin Hats',
  'Peak Design',
  'Public Goods',
  'Shakti Warrior',
];

const PartnersPage: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.partnersPage}>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Partners & Recommendations
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Wellness is amplified by community.
            <br />
            These are the brands, healers, and craftspeople we trust to support your recovery
            journey.
          </motion.p>
        </div>
      </motion.section>

      {/* Gold Tier Section */}
      <motion.section
        className={`${styles.tierSection} ${styles.goldTier}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className={styles.tierHeader} variants={itemVariants}>
          <h2 className={styles.tierTitle}>Gold Partners</h2>
          <p className={styles.tierDescription}>
            Our closest collaborators, trusted for their exceptional quality and alignment with our
            mission.
          </p>
        </motion.div>

        <motion.div className={styles.partnersGrid} variants={containerVariants}>
          {goldPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className={styles.goldPartnerCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.partnerLogo}>
                <div className={styles.logoPlaceholder}>{partner.icon}</div>
              </div>
              <h3 className={styles.partnerName}>{partner.name}</h3>
              <p className={styles.partnerDescription}>{partner.description}</p>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.partnerLink}
                >
                  Visit Site →
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Silver Tier Section */}
      <motion.section
        className={`${styles.tierSection} ${styles.silverTier}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className={styles.tierHeader} variants={itemVariants}>
          <h2 className={styles.tierTitle}>Silver Partners</h2>
          <p className={styles.tierDescription}>
            Quality brands we recommend for your wellness journey.
          </p>
        </motion.div>

        <motion.div className={styles.partnersGrid} variants={containerVariants}>
          {silverPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className={styles.silverPartnerCard}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.partnerLogo}>
                <div className={styles.logoPlaceholder}>{partner.icon}</div>
              </div>
              <h3 className={styles.partnerName}>{partner.name}</h3>
              <p className={styles.partnerDescription}>{partner.description}</p>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.partnerLink}
                >
                  Learn More →
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Bronze Tier Section */}
      <motion.section
        className={`${styles.tierSection} ${styles.bronzeTier}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className={styles.tierHeader} variants={itemVariants}>
          <h2 className={styles.tierTitle}>Bronze Partners</h2>
          <p className={styles.tierDescription}>Brands we appreciate and recommend.</p>
        </motion.div>

        <motion.div className={styles.bronzeGrid} variants={containerVariants}>
          {bronzePartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className={styles.bronzePartnerCard}
              variants={itemVariants}
              whileHover={{ scale: 1.1, filter: 'brightness(1.2)' }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.bronzeLogo}>
                <div className={styles.logoPlaceholder}>{partner.icon}</div>
              </div>
              <h3 className={styles.bronzePartnerName}>{partner.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Carousel Section */}
      <motion.section
        className={styles.carouselSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.carouselContainer}>
          <motion.div
            className={styles.carousel}
            animate={{
              x: [0, -50],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...carouselPartners, ...carouselPartners].map((partner, index) => (
              <div key={index} className={styles.carouselItem}>
                {partner}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default PartnersPage;
