import React from "react";
import logo from "../assets/img/argentBankLogo.png";

const ArgentBankLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img
        className="max-w-[200px] w-full"
        src={logo}
        alt="Argent Bank Logo"
      />
    </div>
  );
};

export default ArgentBankLogo;