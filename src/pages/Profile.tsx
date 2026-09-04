import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AccountCard from "../components/AccountCard";
import EditNameForm from "../components/EditNameForm";

const Profile: React.FC = () => {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <main className="flex-1 bg-white flex items-center justify-center min-h-[500px]">
        <div className="text-[#2c3e50] text-xl">
          Loading profile...
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-white py-6 px-4">
      <div className="bg-white mb-8 text-center">
        {isEditing ? (
          <EditNameForm
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 my-6 text-[#2c3e50]">
              Welcome back
              <br />
              {user.firstName} {user.lastName}!
            </h1>

            <button
              type="button"
              className="bg-[#00bc77] text-white font-bold py-2 px-4 border-none cursor-pointer hover:bg-[#00a568] transition-colors"
              onClick={() => setIsEditing(true)}
            >
              Edit Name
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[1000px] mx-auto mb-10">
        <h2 className="sr-only">Accounts</h2>

        <AccountCard
          id="1"
          title="Argent Bank Checking (x3448)"
          amount="$48,098.43"
          description="Available Balance"
        />

        <AccountCard
          id="2"
          title="Argent Bank Savings (x6712)"
          amount="$48,098.43"
          description="Available Balance"
        />

        <AccountCard
          id="3"
          title="Argent Bank Credit Card (x8349)"
          amount="$48,098.43"
          description="Current Balance"
        />
      </div>
    </main>
  );
};

export default Profile;