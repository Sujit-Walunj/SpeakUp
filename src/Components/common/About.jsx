import React from 'react';
import { Footer } from './Footer';

const aboutUsData = [
  {
    title: "Our Mission",
    content: "At SpeakUp, our mission is to create a platform where individuals can voice their concerns and feedback in a secure, confidential, and constructive manner. We believe in empowering users by providing them with a robust system for reporting issues and making suggestions, thereby fostering a culture of transparency and accountability within organizations."
  },
  {
    title: "Our Vision",
    content: "We envision a world where every individual’s voice is heard and valued. Our goal is to be the leading platform that bridges the gap between users and organizations, making it easier for everyone to participate in meaningful dialogue. We strive to enhance organizational effectiveness and personal satisfaction by facilitating open communication and actionable insights."
  },
  {
    title: "Our Story",
    content: "Founded in [Year], SpeakUp was born out of a need for a more effective way to handle feedback and complaints within organizations. Our team of passionate individuals came together with a shared vision to build a platform that would not only address issues but also empower users to contribute to positive change. Since then, we've grown and evolved, continuously improving our services to better meet the needs of our users."
  },
  {
    title: "Our Values",
    content: "Our core values are at the heart of everything we do:\n- Integrity: We operate with honesty and transparency, ensuring that all feedback and concerns are handled with the utmost confidentiality.\n- Empowerment: We empower users by giving them a platform to voice their concerns and contribute to improvements.\n- Innovation: We are committed to continuously innovating and enhancing our platform to meet the evolving needs of our users.\n- Excellence: We strive for excellence in every aspect of our service, from user experience to technical performance."
  },
  {
    title: "Our Team",
    content: "Our team comprises dedicated professionals with diverse expertise in technology, user experience, and organizational development. Each member brings a unique perspective and skill set to the table, ensuring that we deliver a comprehensive and effective solution. We work collaboratively to achieve our mission and uphold our values, constantly seeking new ways to improve and grow."
  },
  {
    title: "Our Approach",
    content: "We take a user-centered approach to design and development, focusing on creating a seamless and intuitive experience for our users. Our platform is built with robust security measures to protect user data and ensure confidentiality. We also prioritize regular feedback and updates to continuously refine and enhance our services based on user input and emerging trends."
  },
  {
    title: "Join Us",
    content: "We invite you to join us on our journey towards creating a more transparent and accountable world. Whether you’re an organization looking to improve your internal communication or an individual wanting to make your voice heard, SpeakUp is here to support you. Explore our platform, get involved, and be a part of the positive change we are striving to achieve."
  }
];

function About() {
  return (
    <div className='flex flex-col items-center mt-[10vh]'>
      {aboutUsData.map((data, index) => (
        <section
          key={index}
          className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} mx-auto w-full max-w-screen-lg my-6 px-4 transition-transform transform hover:scale-105 duration-300`}
        >
          <div className='w-full md:w-1/2 bg-slate-50 p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl md:text-3xl font-bold mb-3 text-slate-800'>{data.title}</h2>
            <p className='text-slate-600'>{data.content}</p>
          </div>
        </section>
      ))}
      <Footer />
    </div>
  );
}

export default About;
