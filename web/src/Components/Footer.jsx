import React from "react";
import styles from "./Footer.module.css";
import {Link} from "react-router-dom"
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <h1 className={styles.logo}>
          Fresh<span className={styles.accent}>&</span>Folds
        </h1>
        <p>
          India’s leading Laundry and Dry Clean chain with 1000+ stores across
          360+ cities, trusted by 15 lakh+ customers.
        </p>
      </div>

      <div className={styles.linksSection}>
        <Link to="/about">About Us</Link>
        <a href="#faqs">FAQs</a>
        <a href="#terms">Terms</a>
        <a href="#blogs">Blogs</a>
        <Link to="/contact">Contact Us</Link>
      </div>

      <div className={styles.socialSection}>
        <FaFacebook className={styles.icon} />
        <FaInstagram className={styles.icon} />
        <FaYoutube className={styles.icon} />
        <FaTwitter className={styles.icon} />
        <FaLinkedin className={styles.icon} />
        <FaWhatsapp className={styles.icon} />
      </div>

      <div className={styles.copyright}>
        <p>©2024 Fresh & Folds. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
