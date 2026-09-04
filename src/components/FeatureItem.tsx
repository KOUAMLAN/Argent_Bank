import React from "react";

interface FeatureItemProps {
  iconUrl: string;
  altText: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  iconUrl,
  altText,
  title,
  description,
}) => {
  return (
    <article className="flex-1 text-center px-6 py-6">
      <img
        src={iconUrl}
        alt={altText}
        width="147"
        height="147"
        loading="lazy"
        decoding="async"
        className="mx-auto mb-4 w-[147px] h-[147px] object-contain"
      />

      <h3 className="text-xl font-bold text-[#2c3e50] mb-3">
        {title}
      </h3>

      <p className="text-[#2c3e50] leading-relaxed max-w-md mx-auto">
        {description}
      </p>
    </article>
  );
};

export default FeatureItem;