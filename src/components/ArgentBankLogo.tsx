import React from "react";
import logo from "../assets/img/argentBankLogo.png";

const ArgentBankLogo: React.FC = () => {
  return (
    <img
      src={logo}
      alt="Argent Bank"
      width="200"
      height="50"
      className="block w-[200px] h-auto"
    />
  );
};

export default ArgentBankLogo;