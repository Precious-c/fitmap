import React from "react";
import { UserType } from "@/types.ts";

interface UserTypeSelectionProps {
  onSelectUserType: (userType: UserType) => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({
  onSelectUserType,
}) => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4 max-w-md mx-auto">
      <h2 className="text-4xl font-bold text-center">Register as...</h2>

      <button
        onClick={() => onSelectUserType("person")}
        className="p-6 border-2 border-gray-200 rounded-4xl hover:border-accent transition-colors"
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🏃‍♂️</div>
          <h3 className="text-xl font-semibold">Individual</h3>
          <p className="text-gray-600">
            Looking to find gyms and fitness opportunities
          </p>
        </div>
      </button>

      <button
        onClick={() => onSelectUserType("gym")}
        className="p-6 border-2 border-gray-200 rounded-4xl hover:border-accent transition-colors"
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🏋️‍♂️</div>
          <h3 className="text-xl font-semibold">Gym Owner</h3>
          <p className="text-gray-600">
            Want to list your gym and attract members
          </p>
        </div>
      </button>
    </div>
  );
};

export default UserTypeSelection;
