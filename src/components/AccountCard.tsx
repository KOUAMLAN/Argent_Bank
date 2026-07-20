
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AccountCardProps {
  id: string;
  title: string;
  amount: string;
  description: string;
}

const AccountCard: React.FC<AccountCardProps> = ({ id, title, amount, description }) => {
  const navigate = useNavigate();

  const handleTransactionClick = () => {
    navigate(`/transactions/${id}`);
  };

  return (
    <section className="flex justify-between items-center bg-[#343a40] text-white p-6 mb-6 w-full rounded-md shadow-sm box-border">
      <div className="text-left flex-1">
        <h3 className="m-0 text-base md:text-lg font-normal">{title}</h3>
        <p className="m-0 text-[2.5rem] font-bold my-2">{amount}</p>
        <p className="m-0 text-base font-normal">{description}</p>
      </div>
      <div className="flex items-center cursor-pointer px-4" onClick={handleTransactionClick}>
        {/* Grande flèche blanche (Chevron) cliquable */}
        <i className="fa-solid fa-chevron-right text-4xl md:text-5xl text-white hover:text-[#00bc77] transition-colors"></i>
      </div>
    </section>
  );
};

export default AccountCard;