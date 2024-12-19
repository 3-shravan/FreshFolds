import React from 'react';
import styles from './Contact.module.css';
import Footer from "../../Components/Footer"

const ContactPage = () => {
  return (
    <>
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>We'd love to hear from you!</p>
      
      <form className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input type="text" className={styles.input} placeholder="Your Name" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input type="email" className={styles.input} placeholder="Your Email" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Message</label>
          <textarea className={styles.textarea} placeholder="Your Message"></textarea>
        </div>
        <button className={styles.submitButton}>Send Message</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;
