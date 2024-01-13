import React, { useEffect, useState } from 'react'

const CarouselComponent = () => {
    const images = [
        'https://icms-image.slatic.net/images/ims-web/a5ece0b3-54d4-4464-a455-d1f8b8089760.png_1200x1200.jpg',
        'https://icms-image.slatic.net/images/ims-web/3a7ed04e-1a15-4ebd-9f4d-c3e02575fd88.jpeg',
        'https://icms-image.slatic.net/images/ims-web/0041b7c3-0524-4f5c-a817-7c61bdccee6e.jpg',
        'https://icms-image.slatic.net/images/ims-web/1eec747d-83e7-4ba3-8d19-24f6425401c7.jpg',
        'https://icms-image.slatic.net/images/ims-web/2a7761e6-9111-4db4-a797-8e91cc9fdb3b.jpg'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevSlide = () => {
        const index = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(index);
    };

    const goToNextSlide = () => {
        const index = (currentIndex + 1) % images.length;
        setCurrentIndex(index);
    };

    // Autoplay functionality
    useEffect(() => {
        const interval = setInterval(() => {
            goToNextSlide();
        }, 3000); // Change slide every 3 seconds (adjust this value as needed)

        return () => clearInterval(interval);
    }, [currentIndex]);


    return (
        <div className="relative w-full h-40 md:h-[19rem] overflow-hidden">
            <div className="flex w-full h-full">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`w-full h-full absolute top-0 transform transition-transform duration-500 ${index === currentIndex ? 'left-0' : '-left-full'
                            }`}
                    >
                        <img src={img} alt={`slide ${index + 1}`} className="w-full h-full object-fill" />
                    </div>
                ))}
            </div>
            <button
                onClick={goToPrevSlide}
                className="absolute top-[44%] left-3 text-white bg-black/30 hover:bg-gray-600 rounded-full p-2"
            >
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute top-[44%] right-3 text-white bg-black/30 hover:bg-gray-600 rounded-full p-2"
            >
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    );
}

export default CarouselComponent