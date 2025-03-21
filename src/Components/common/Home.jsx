import React from 'react';
import TextHighLighter from '../Home/textHighLighter';
import CTAButton from '../Home/Button';
import { TypeAnimation } from 'react-type-animation';
import ComplaintBox from "../../assets/Complaintbox.jpg";
import { Footer } from './Footer';
import { useSelector } from 'react-redux';

export const Home = () => {
  const { token } = useSelector(state => state.auth);

  return (
    <div className='flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 mt-[12vh]'>
      <div className='flex flex-col items-center justify-center text-center'>
        
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-10 sm:mt-14 md:mt-16'>
          Empower Your Voice with <TextHighLighter text="SpeakUp" />
        </h2>

        <p className='text-slate-600 mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl max-w-[85%] sm:max-w-[75%] md:max-w-[65%]'>
          <TypeAnimation
            sequence={["A platform for transparent communication and effective complaint management", 2000, ""]}
            wrapper="span"
            speed={60}
            repeat={Infinity}
            omitDeletionAnimation={true}
          />
        </p>

        <div className="mt-6 sm:mt-8 md:mt-10">
          <img src={ComplaintBox} alt="Complaint box" className='w-[150px] sm:w-[180px] md:w-[200px] h-auto' />
        </div>

        <div className='flex gap-3 font-bold my-6 sm:my-8 md:my-10 text-black'>
          <CTAButton active={true} linkto={"signup"}>
            Get Started
          </CTAButton>
          <CTAButton active={false} linkto={"/learnMore"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={`${token ? "/viewGroup" : "/login"}`}>
            Login
          </CTAButton>
        </div>

      </div>

      <Footer />
    </div>
  );
}
