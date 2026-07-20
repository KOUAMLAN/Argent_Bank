import React from 'react';

interface FeatureItemProps {
  iconUrl: string;
  altText: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ iconUrl, altText, title, description }) => {
  return (
    <div className="flex flex-col items-center p-10 text-center flex-1">
      <div className="w-[150px] h-[150px] rounded-full border-[10px] border-[#00bc77] flex items-center justify-center p-4 mb-4">
        <img src={iconUrl} alt={altText} className="w-full" />
      </div>
      <h3 className="text-[#222] text-xl font-bold mb-2">{title}</h3>
      <p className="text-[#222]">{description}</p>
    </div>
  );
};

export default FeatureItem;