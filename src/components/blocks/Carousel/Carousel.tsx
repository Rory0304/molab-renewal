'use client';

import React from 'react';
import { useRafState } from 'react-use';

type PaginationVariantType = 'slider' | 'number';

interface CarouselProps {
  children: React.ReactNode;
  paginationVariant?: PaginationVariantType;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  paginationVariant = 'number',
}) => {
  const [activeItemIdx, setActiveItemIdx] = useRafState(0);

  const carouselRef = React.useRef<HTMLUListElement>(null);

  const carouselItems = React.Children.toArray(children);

  //
  //
  //
  React.useEffect(() => {
    const checkActiveItem = () => {
      const carouselScrollLeft = carouselRef?.current?.scrollLeft;
      const carouselWidth = carouselRef?.current?.clientWidth;

      if (carouselScrollLeft !== undefined && carouselWidth !== undefined) {
        const currentIdx = Math.floor(carouselScrollLeft / carouselWidth);
        setActiveItemIdx(currentIdx);
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', checkActiveItem);
    }

    return () =>
      carouselRef.current?.removeEventListener('scroll', checkActiveItem);
  }, [carouselRef]);

  //
  //
  //
  const handleCarouselButtonClick = (index: number) => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.clientWidth;
      const targetElement = carouselWidth * index;
      carouselRef.current.scrollTo(targetElement, 0);
    }
  };

  //
  //
  //
  const renderPaginiation = (
    items: typeof carouselItems,
    paginationVariant: PaginationVariantType
  ) => {
    switch (paginationVariant) {
      case 'number':
        return (
          <div className="flex justify-center w-full gap-2 pt-5">
            {items.map((_, index) => (
              <button
                key={`#review-${index}`}
                aria-label={`슬라이드 ${index + 1}번째로 이동`}
                className={`btn btn-xs ${
                  index === activeItemIdx ? 'btn-active' : ''
                }`}
                onClick={() => handleCarouselButtonClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="flex justify-center absolute w-fit bottom-0 right-[8px]">
            {items.map((_, index) => (
              <button
                key={`#review-${index}`}
                aria-label={`슬라이드 ${index + 1}번째로 이동`}
                className={`bg-gray-700 fbtn carousel-slider-control  ${
                  index === activeItemIdx ? 'opacity-100	' : 'opacity-30	'
                }`}
                onClick={() => handleCarouselButtonClick(index)}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <ul className="flex w-full carousel carousel-center" ref={carouselRef}>
        {children}
      </ul>
      {renderPaginiation(carouselItems, paginationVariant)}
    </div>
  );
};

export default Carousel;
