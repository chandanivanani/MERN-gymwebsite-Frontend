import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SliderData } from "../../utils/SliderData";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Hero = () => {
  return (
    <div className="relative md:h-[90vh] sm:h-[70vh] xs:h-[70vh] overflow-hidden mt-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }} // Ensuring pagination is clickable
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-full"
      >
        {SliderData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full md:h-[90vh] sm:h-[70vh] xs:h-[70vh]">
              <img
                src={item.bgImg}
                className="object-cover w-full h-full opacity-25 brightness-75"
                alt="..."
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
                <h1 className="text-white md:text-6xl sm:text-5xl text-2xl pb-3 font-bold text-center">
                  {item.slogan}
                </h1>
                <h1 className="text-white md:text-6xl sm:text-5xl text-2xl pb-4 font-bold text-center">
                  {item.title}
                </h1>
                <p className="text-white sm:text-lg text-base text-center">
                  {item.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="custom-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-600/50 hover:bg-gray-800 text-white p-3 rounded-full cursor-pointer z-10">
        <ArrowBackIosNewIcon fontSize="small" />
      </div>
      <div className="custom-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-600/50 hover:bg-gray-800 text-white p-3 rounded-full cursor-pointer z-10">
        <ArrowForwardIosIcon fontSize="small" />
      </div>

      {/* <div className="custom-pagination absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 bg-gray-600/50 hover:bg-gray-800 text-white p-2 rounded-full z-10"></div> */}
    </div>
  );
};

export default Hero;
