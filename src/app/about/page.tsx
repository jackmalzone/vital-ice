'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './page.module.css';

const AboutPage: React.FC = () => {
  const values = [
    {
      title: 'Contrast Therapy',
      description: 'Every session leaves you feeling restored and focused',
      color: '#00b7b5',
    },
    {
      title: 'Community',
      description:
        "We believe we live better, together. Our space is built for connection and shared goals. Whether you're seeking personal rejuvenation or shared experiences, our members find belonging here.",
      color: '#9ec7c5',
    },
    {
      title: 'Wellness',
      description:
        "It's more than recovery. It's a core ritual for balance, longevity and wellbeing",
      color: '#ebede5',
    },
    {
      title: 'Integrity & Simplicity',
      description:
        'With thoughtfully chosen materials, sustainable operations, flexible and transparent service, we strive for integrity in every detail.',
      color: '#7a9e9d',
    },
  ];

  const team = [
    {
      name: 'Stephen',
      role: 'Co-Founder',
      bio: "I am an Irish immigrant and a hairstylist by trade, and I've always loved helping people feel better — whether that's through a great haircut or simply offering small moments of calm in the midst of busy lives. Fitness has been part of my life from a young age, but as I got older I realized that recovery matters just as much.\n\nVital Ice started because I needed it myself. Life gets a little chaotic sometimes, and contrast therapy became my way to slow things down, clear my head, and hit the reset button. I never imagined it would grow into this — a space where people come together to feel better.\n\nMy personal goal is to create a space where recovery feels accessible, ritual— and shared by the community",
      image: '/images/founder-sean.png',
    },
    {
      name: 'Sean',
      role: 'Co-Founder',
      bio: "I'm a Chicago native, born and raised. At 16, my family relocated to Ireland, where I completed my degree in Electrical Engineering. My journey ultimately brought me to San Francisco, where I now work in business development within the physical security industry.\n\nMy passion for health and wellness is deeply tied to how I spend my free time. In Ireland, I discovered Gaelic Football and went on to compete at the highest level before returning to the States. Today, I still play in the local league here in SF. Sport inspired me to relentlessly pursue the optimization of my health. Contrast therapy—especially cold exposure—has long been a cornerstone of recovery for elite athletes around the world. I have consistently relied on it to stay strong and healthy.\n\nIn a world full of toxins and distractions, I believe more than ever in the importance of accessible recovery—and meaningful connection. We thrive when we feel good, and even more so when we do it together. I hope Vital Ice creates that space and makes a lasting, positive impact on everyone who walks through our doors.",
      image: '/images/founder-stephen.png',
    },
    {
      name: 'Barry',
      role: 'Co-Founder',
      bio: "Barry is a proud Irish immigrant, lifelong athlete, secretary of a local Gaelic football team and the founder & operator of a successful general contracting business here in the Bay Area. A husband, a father, and a tireless worker, Barry brings a rare mix of grit, heart, and craftsmanship to everything he does.\n\nHis passion for sports and physical performance has shaped much of his life, and that same drive shows up in his work ethic today. As someone who understands the demands of building—both physically and professionally—he's a firm believer in the power of recovery and routine.\n\nBarry is the force behind the construction of the Vital Ice studio. His hands-on involvement ensures every inch of the space reflects intention, durability, and care. He's building more than walls—he's helping shape a space that gives back to the body, the mind, and the community.",
      image: '/images/founders-seanstephen.png',
    },
  ];

  return (
    <main className={styles.main}>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Video Background */}
        <div className={styles.hero__videoContainer}>
          <video autoPlay muted loop playsInline className={styles.hero__video}>
            <source
              src="https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/sf_marina.webm"
              type="video/webm"
            />
            <source
              src="https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/sf_marina.mp4"
              type="video/mp4"
            />
          </video>
          <div className={styles.hero__videoOverlay} />
        </div>

        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Vital Ice
          </motion.h1>
          <motion.p
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where ancient wisdom meets modern wellness
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className={styles.story}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.story__container}>
          <motion.div
            className={styles.story__content}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.story__title}>Our Story</h2>
            <p className={styles.story__text}>
              Behind the name, we&apos;re just three local enthusiasts who wanted something simple:
              a place to cold plunge with our friends, close to home. When we couldn&apos;t find
              anything that felt right—affordable, high-quality, and built around community—we
              decided to create it ourselves. Vital Ice was built to bridge the gap between
              high-performance recovery and everyday accessibility.
            </p>
            <p className={styles.story__text}>
              This started as a personal need and turned into something bigger: a space where people
              can reset, recover, and connect. No pressure. No BS. Just cold water, hot air, and the
              pride that comes with prioritizing your health and wellness.
            </p>
            <p className={styles.story__text}>
              We built this for the early risers, the post-work plungers, the weekend warriors, and
              anyone trying to take care of their body and mind in a way that feels real. Whether
              you&apos;re here to get centered, recover from a hard workout, or just share a moment
              of peace—we&apos;re glad you&apos;re here.
            </p>
            <p className={styles.story__text}>Recovery isn&apos;t a luxury — it&apos;s a ritual.</p>
            <p className={styles.story__text}>— The Vital Ice Team</p>
          </motion.div>
          <motion.div
            className={styles.story__image}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/founders-seanstephen.png"
              alt="Vital Ice founders"
              width={500}
              height={400}
              className={styles.story__imageElement}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className={styles.values}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.values__container}>
          <motion.h2
            className={styles.values__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          <div className={styles.values__grid}>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className={styles.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.value__accent} style={{ backgroundColor: value.color }} />
                <h3 className={styles.value__title}>{value.title}</h3>
                <p className={styles.value__description}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.team}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.team__container}>
          <motion.h2
            className={styles.team__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Meet Our Founders
          </motion.h2>
          <div className={styles.team__grid}>
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className={styles.team__member}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.team__image}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className={styles.team__imageElement}
                  />
                </div>
                <div className={styles.team__info}>
                  <h3 className={styles.team__name}>{member.name}</h3>
                  <p className={styles.team__role}>{member.role}</p>
                  <div className={styles.team__bio}>
                    {member.bio.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.mission}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.mission__container}>
          <motion.h2
            className={styles.mission__title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className={styles.mission__text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Challenge your limits. <em>Join The Ritual</em>
          </motion.p>
          <motion.button
            className={styles.mission__button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://mindbody.com', '_blank')}
          >
            Join Our Community
          </motion.button>
        </div>
      </motion.section>
    </main>
  );
};

export default AboutPage;
