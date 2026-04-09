import React from 'react';
import { motion } from 'framer-motion'
import './BusinessDestiny.css';
import { fadeLeft, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const content = {
  heading: "Master Your Business Destiny with Stratigi360's Expertise.",
  subHeading: "Get the real services and constant and support you need to set up your business",
  skylineImage: "https://i.imgur.com/your-skyline-placeholder.png"
};

const BusinessDestiny = () => {
  return (
    <section className="destiny-container">
      <motion.div
        className="red-banner"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div className="text-content" variants={fadeLeft}>
          <h2 className="heading">{content.heading}</h2>
          <p className="subheading">{content.subHeading}</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BusinessDestiny;
