import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Props = {};

const Features = (props: Props) => {
  return (
    <>
      <div id="features">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-primary-500">
          Features
        </h2>
      </div>

      <div className="flex flex-col md:flex-row px-5 justify-around gap-3 md:mb-10">
        {/*=====================================card-1=================================== */}
        <div className="p-6 bg-surface-200 border-gray-200 rounded-lg shadow-inner shadow-gray-400">
          <h5 className="mb-3 text-xl text-center text-primary-500 font-bold tracking-tight">
            Explore Diverse Workouts
          </h5>
          <p className="mb-3 font-normal text-center text-white dark:text-gray-400">
            Discover a world of workouts tailored to your preferences. From
            strength training to yoga, find the perfect workout for your fitness
            journey.
          </p>
          <div className="flex justify-center items-center mt-4">
            <Link
              to="/user"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue bg-primary-500 rounded-lg hover:bg-primary-300 focus:ring-1 focus:outline-none focus:ring-blue-300"
            >
              Explore
              <ArrowForwardIcon className="ml-2 mt-0.5 " />
            </Link>
          </div>
        </div>

        {/*======================================= card-2======================================= */}
        <div className="p-6 bg-surface-200 border-gray-200 rounded-lg shadow-inner shadow-gray-400">
          <h5 className="mb-3 text-xl text-center text-primary-500 font-bold tracking-tight">
            Seamless Progress Tracking
          </h5>
          <p className="mb-3 font-normal text-center text-white dark:text-gray-400">
            Effortlessly monitor your fitness journey and crush your goals with
            our intuitive progress tracking feature. Stay motivated and focuses
            as you conquer new milestones.
          </p>
          <div className="flex justify-center items-center mt-4">
            <Link
              to="/user"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue bg-primary-500 rounded-lg hover:bg-primary-300 focus:ring-1 focus:outline-none focus:ring-blue-300"
            >
              Explore
              <ArrowForwardIcon className="ml-2 mt-0.5" />
            </Link>
          </div>
        </div>

        {/*======================================= card-3=========================================== */}

        <div className="p-6 bg-surface-200 border-gray-200 rounded-lg shadow-inner shadow-gray-400">
          <h5 className="mb-3 text-xl text-center text-primary-500 font-bold tracking-tight">
            Inspiring Articles & Blogs
          </h5>
          <p className="mb-3 font-normal text-center text-white dark:text-gray-400">
            Stay motivated and informed with our curated collection of inspiring
            articles and blogs. Get expert advice and stay on top of the latest
            fitness trends.
          </p>
          <div className="flex justify-center items-center mt-4">
            <Link
              to="/user"
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-center text-black bg-primary-500 rounded-lg hover:bg-primary-300 focus:ring-1 focus:outline-none focus:ring-blue-300 "
            >
              Explore
              <ArrowForwardIcon className="ml-2 mt-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
