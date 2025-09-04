import React, { useState } from "react";
import UserRegistrationForm from "./UserRegistrationForm";
import GymRegistrationForm from "./GymRegistrationForm";
import { UserType } from "@/types";

const Registration: React.FC = () => {
  const [userType, setUserType] = useState<UserType | null>("person");

  return (
    <div className="">
      {userType === "person" ? (
        <UserRegistrationForm setUserType={setUserType} />
      ) : (
        <GymRegistrationForm setUserType={setUserType} />
      )}
    </div>
  );
};

export default Registration;
