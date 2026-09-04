import React from "react";
import FeatureItem from "../components/FeatureItem";

import bankTreeImage from "../assets/img/bank-tree.jpeg";
import chatIcon from "../assets/img/icon-chat.png";
import moneyIcon from "../assets/img/icon-money.png";
import securityIcon from "../assets/img/icon-security.png";

const Home: React.FC = () => {
  const features = [
    {
      id: 1,
      iconUrl: chatIcon,
      altText: "Chat Icon",
      title: "You are our #1 priority",
      description:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      id: 2,
      iconUrl: moneyIcon,
      altText: "Money Icon",
      title: "More savings means higher rates",
      description:
        "The more you save with us, the higher your interest rate will be!",
    },
    {
      id: 3,
      iconUrl: securityIcon,
      altText: "Security Icon",
      title: "Security you can trust",
      description:
        "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  return (
    <main className="flex-1">
      <div
        className="relative h-[300px] md:h-[400px] bg-cover bg-no-repeat bg-[#12002b]"
        style={{
          backgroundImage: `url(${bankTreeImage})`,
          backgroundPosition: "center",
        }}
      >
        <section className="absolute top-8 right-8 w-[200px] md:w-[300px] bg-white p-8 shadow-md">
          <h2 className="sr-only">Promoted Content</h2>

          <p className="font-bold text-xl">No fees.</p>

          <p className="font-bold text-xl">
            No minimum deposit.
          </p>

          <p className="font-bold text-xl">
            High interest rates.
          </p>

          <p className="mt-4">
            Open a savings account with Argent Bank today!
          </p>
        </section>
      </div>

      <section className="flex flex-col md:flex-row bg-white py-12">
        <h2 className="sr-only">Features</h2>

        {features.map((feature) => (
          <FeatureItem
            key={feature.id}
            iconUrl={feature.iconUrl}
            altText={feature.altText}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;