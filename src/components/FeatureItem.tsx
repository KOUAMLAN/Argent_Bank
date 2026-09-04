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
    <article className="flex-1 px-6 py-8 text-center">
      <img
        src={iconUrl}
        alt={altText}
        width="147"
        height="147"
        loading="lazy"
        decoding="async"
        className="mx-auto mb-4 h-[147px] w-[147px] object-contain"
      />

      <h3 className="mb-3 text-xl font-bold text-[#2c3e50]">
        {title}
      </h3>

      <p className="mx-auto max-w-md leading-relaxed text-[#2c3e50]">
        {description}
      </p>
    </article>
  );
};

export default FeatureItem;