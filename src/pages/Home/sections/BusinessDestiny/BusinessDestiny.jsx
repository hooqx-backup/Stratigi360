import React from 'react';
import './BusinessDestiny.css';


const BusinessDestiny = () => {
  // Content as JSON
  const content = {
    heading: "Master Your Business Destiny with Stratigi360's Expertise.",
    subHeading: "Get the real services and constant and support you need to set up your business",
    skylineImage: "https://i.imgur.com/your-skyline-placeholder.png" // Replace with your local asset
  };

  return (
    <section className="destiny-container">
      <div className="red-banner">
        <div className="text-content">
          <h2 className="heading">{content.heading}</h2>
          <p className="subheading">{content.subHeading}</p>
        </div>
      </div>
    </section>
  );
};

export default BusinessDestiny;