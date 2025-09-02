import logo from "@/assets/images/logo.png";

export const ForgottenPassword = () => {
  return (
    <div className="min-h-screen  max-w-md bg-white flex flex-col justify-center items-center pt-8">
      <div className="flex flex-col items-center justify-center gap-0 mb-6">
        <img src={logo} alt="fitmap-logo" className="w-36 h-36" />
        <p className="font-poppins text-3xl font-semibold mb-2">Fit Map</p>
        <h3 className="text-2xl font-medium">Forgotten Password</h3>
      </div>

      <div className="relative mx-auto w-[350px] flex flex-col items-center  gap-6">
        <div className="w-full">
          <label
            htmlFor="newPassword"
            className=" flex text-lg mb-2 font-medium"
          >
            Enter New Password
          </label>
          <input
            type="password"
            className="w-full h-12 rounded-[20px] border border-gray-300 px-4"
          />
        </div>
        <div className="w-full relative">
          <label htmlFor="password" className="flex mb-2 font-medium ">
            Re-Enter Password
          </label>
          <input
            type="password"
            className="w-full h-12 r rounded-[20px]  border border-gray-300 px-4"
          />
        </div>

        <button className="w-[220px] h-[50px] p-[10px] text-xl font-medium bg-accent rounded-2xl my-4 mt-8">
          Confirm
        </button>
      </div>
    </div>
  );
};
