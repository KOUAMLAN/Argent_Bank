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
      altText: "Chat",
      title: "You are our #1 priority",
      description:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      id: 2,
      iconUrl: moneyIcon,
      altText: "Money",
      title: "More savings means higher rates",
      description:
        "The more you save with us, the higher your interest rate will be!",
    },
    {
      id: 3,
      iconUrl: securityIcon,
      altText: "Security",
      title: "Security you can trust",
      description:
        "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  return (
    <main className="flex-1">
      <section
        className="relative min-h-[300px] bg-cover bg-center bg-no-repeat sm:min-h-[400px]"
        style={{
          backgroundImage: `url(${bankTreeImage})`,
        }}
      >
        <div className="absolute right-4 top-8 w-[280px] bg-white p-8 shadow-md sm:right-8 sm:w-[360px]">
          <h1 className="sr-only">Argent Bank</h1>

          <p className="text-xl font-bold">
            No fees.
          </p>

          <p className="text-xl font-bold">
            No minimum deposit.
          </p>

          <p className="text-xl font-bold">
            High interest rates.
          </p>

          <p className="mt-4">
            Open a savings account with Argent Bank today!
          </p>
        </div>
      </section>

      <section className="flex flex-col bg-white py-12 md:flex-row">
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