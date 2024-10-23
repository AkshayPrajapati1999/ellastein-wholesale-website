import { url } from "inspector";
import React, { useState, useEffect } from "react";

function Slider(props) {
  const images = props.images;

  const [selectedImage, setSelectedImage] = useState(
    images && images.length > 0 ? images[0] : null
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const maxVisibleImages = 3;

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setSelectedIndex(images.indexOf(image));
  };

  const handleNextImage = () => {
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handlePrevImage = () => {
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    if (selectedIndex >= maxVisibleImages) {
      setShowAllImages(true);
    } else {
      setShowAllImages(false);
    }
  }, [selectedIndex]);

  return (
    <div className="w-full m-auto">
      <img className=" w-56 m-auto" src={selectedImage} alt="Selected Image" />
      <div className="flex w-full mt-5 gap-3">
        <button onClick={handlePrevImage} className="Previous">
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            className=" w-10 "
            {...props}
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5z"
            />
          </svg>
        </button>

        <div className="flex w-full overflow-scroll overflow-y-hidden gap-4">
          {images?.map((image) => (
            <img
              key={image}
              id={`image${image}`}
              src={image}
              alt={`Image ${image}`}
              onClick={() => handleImageClick(image)}
              className={
                selectedImage === image ? "w-16 border-black border-2" : "w-16"
              }
            />
          ))}
        </div>
        <button onClick={handleNextImage} className="">
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            className=" w-10 "
            {...props}
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Slider;
