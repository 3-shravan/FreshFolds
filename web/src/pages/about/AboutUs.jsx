import React from "react";
import styles from "./AboutUs.module.css";
import Footer from "../../Components/Footer"

const AboutUs = () => {
  return (
    <>
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Fresh and Folds</h1>
        <p className={styles.description}>
          Welcome to Fresh and Folds, your trusted partner for all your laundry
          needs. We are committed to providing top-notch laundry services that
          ensure your clothes look fresh and feel great. With our modern
          facilities, eco-friendly detergents, and dedicated staff, we offer
          laundry solutions tailored to your lifestyle.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h2 className={styles.featureTitle}>Our Mission</h2>
            <p className={styles.featureDescription}>
              At Fresh and Folds, our mission is to streamline your laundry
              experience by offering convenient, reliable, and efficient
              services that give you more time for what truly matters.
            </p>
          </div>

          <div className={styles.feature}>
            <h2 className={styles.featureTitle}>Eco-Friendly Practices</h2>
            <p className={styles.featureDescription}>
              We care about the environment, which is why we use biodegradable
              detergents and energy-efficient machines to ensure that we
              minimize our carbon footprint while delivering excellent results.
            </p>
          </div>

          <div className={styles.feature}>
            <h2 className={styles.featureTitle}>Customer Satisfaction</h2>
            <p className={styles.featureDescription}>
              Our commitment to customer satisfaction is unwavering. From easy
              scheduling and order tracking to on-time delivery, we strive to
              exceed your expectations every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default AboutUs;
