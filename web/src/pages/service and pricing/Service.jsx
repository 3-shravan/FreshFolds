

import React from 'react';
import styles from './Service.module.css';
import Footer from '../../Components/Footer';

const ServicesAndPricing = () => {
  const services = [
    {
      name: 'Wash & Fold',
      price: '$15 / Bag',
      description: 'High-quality wash, dry, and fold services with pickup and delivery options.',
    },
    {
      name: 'Dry Cleaning',
      price: '$5 / Item',
      description: 'Premium dry cleaning service for your delicate garments.',
    },
    {
      name: 'Ironing Service',
      price: '$2 / Item',
      description: 'Wrinkle-free ironing service to keep your clothes crisp and fresh.',
    },
    {
      name: 'Premium Laundry Care',
      price: '$20 / Bag',
      description: 'Customizable laundry care with eco-friendly detergents.',
    },
  ];

  return (
    <>
    <div className={styles.container}>
      <h2 className={styles.heading}>Our Services & Pricing</h2>
      <div className={styles.services}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <h3 className={styles.serviceTitle}>{service.name}</h3>
            <p className={styles.servicePrice}>{service.price}</p>
            <p className={styles.serviceDescription}>{service.description}</p>
            <button className={styles.orderButton}>Order Now</button>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ServicesAndPricing;
