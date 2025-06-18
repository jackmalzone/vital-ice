import styles from './OurValues.module.css';

export default function OurValues() {
  return (
    <section id="contact" className={styles.ourValues}>
      <h2>Our Values</h2>
      <ul>
        <li><strong>Wellness:</strong> Recovery isn't optional—it's essential. We're here to make it accessible, enjoyable, and impactful.</li>
        <li><strong>Community:</strong> We're stronger together. Our space is built for connection and shared goals.</li>
        <li><strong>Innovation:</strong> Elevating the recovery experience with cutting-edge methods and spaces.</li>
        <li><strong>Sustainability:</strong> Caring for the planet as much as we care for our community.</li>
      </ul>
    </section>
  );
} 