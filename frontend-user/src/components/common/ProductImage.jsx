import React, { useEffect, useState } from 'react';

const fallbackImage = '/images/hero-latte.png';

const ProductImage = ({ src, alt, className, ...props }) => {
  const [imageSource, setImageSource] = useState(src || fallbackImage);

  useEffect(() => {
    setImageSource(src || fallbackImage);
  }, [src]);

  return (
    <img
      {...props}
      className={className}
      src={imageSource}
      alt={alt}
      onError={() => {
        if (imageSource !== fallbackImage) setImageSource(fallbackImage);
      }}
    />
  );
};

export default ProductImage;
