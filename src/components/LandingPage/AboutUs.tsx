import React from "react";
import Image from "../../images/about.jpg";

const AboutUs = () => {
  return (
    <>
      <div id="about">
        <h2 className="text-2xl md:text-4xl font-bold text-center mt-6 text-primary-500 mb-4">
          About Us
        </h2>
      </div>
      <div className="flex flex-col md:flex-row-reverse items-center mb-4">
        <div className="w-full md:w-1/2 xs:p-4 md:pt-3 md:pr-6 flex lg:justify-end justify-center">
          <img
            src={Image}
            alt="About Us"
            className="w-[90vh] h-[50vh] object-cover rounded-xl"
          />
        </div>

        <div className="w-full md:w-1/2 pt-4 px-8 md:pl-12 flex justify-center item-center">
          <div className="text-center">
            <p className="text-lg md:text-xl text-white mb-4 ">
              "Welcome to Flexfit, your premier destination for achieving your
              fitness goals! "{" "}
            </p>
            <p className="text-sm lg:text-base text-justify tracking-wide text-white mb-8">
              At Flexfit, we're dedicated to helping you unlock your full potential through personalized workout plans, customized meal plans, and intuitive progress tracking tools. Whether you're aiming to lose weight, build muscle, or enhance your overall health. 
              Join us today and take the first step towards a healthier, happier you with Flexfit!"
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
