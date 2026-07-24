import React from "react";
import { useNavigate } from "react-router-dom";

interface AccountCardProps {
  id: string;
  title: string;
  amount: string;
  description: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  id,
  title,
  amount,
  description,
}) => {
  const navigate = useNavigate();

  const handleTransactionClick = () => {
    navigate(`/transactions/${id}`);
  };

  return (
    <section
      className="
        w-full
        bg-[#343a40]
        text-white
        rounded-md
        shadow-sm
        p-5
        sm:p-6
        mb-6
      "
    >
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
        "
      >
        <div className="flex-1 min-w-0">

          <h3
            className="
              text-base
              sm:text-lg
              font-normal
              break-words
            "
          >
            {title}
          </h3>

          <p
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              my-3
              break-words
            "
          >
            {amount}
          </p>

          <p
            className="
              text-sm
              sm:text-base
            "
          >
            {description}
          </p>

        </div>


        <button
          type="button"
          onClick={handleTransactionClick}
          className="
            w-full
            md:w-auto
            self-center
            flex
            items-center
            justify-center
            gap-3
            bg-[#00bc77]
            hover:bg-[#009e60]
            active:scale-95
            transition
            rounded-md
            px-5
            py-3
            min-h-[44px]
            font-bold
            touch-manipulation
          "
        >
          View transactions

          <i
            className="
              fa-solid
              fa-chevron-right
              text-xl
            "
            aria-hidden="true"
          />

        </button>

      </div>
    </section>
  );
};

export default AccountCard;