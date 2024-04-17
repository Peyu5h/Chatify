import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GridImageSlider = ({ images }) => {
  const settings = {
    speed: 1000,
    scrollToShow: 1,
    slidesToScroll: 4,
    slidesPerRow: 1,
    draggable: true,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <Slider className="flex h-screen " {...settings}>
      {images.map((imageArray, outerIndex) => (
        <div key={outerIndex} className="">
          {Array.isArray(imageArray) &&
            imageArray.map((image, innerIndex) => (
              <img
                key={innerIndex}
                className="object-contain mb-8 h-[75vh] w-[100%] rounded-md cursor-pointer"
                src={image.file.secure_url}
                alt=""
              />
            ))}
        </div>
      ))}
    </Slider>
  );
};

export default GridImageSlider;
