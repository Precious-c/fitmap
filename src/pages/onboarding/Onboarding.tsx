import logo from "../../../public/onboarding-1.jpg";
// import onboardingImg1 from "../../assets/images/onboarding-1.png";
import OnboardingContent from "../../components/OnboardingContent";

const OnboardingPage = () => {
  return (
    <div className=" bg-accent min-h-screen flex flex-col justify-center items-center">
      <img src={logo} alt="fitmap-logo" />
      <p className="font-poppins text-3xl font-medium">FitMap</p>
    </div>
  );
};

export const Onboardingpage2 = () => {
  return (
    <div className="bg-[url('../../../public/onboarding-1.jpg')] min-h-screen bg-cover bg-center ">
      <OnboardingContent />
    </div>
  );
};

export default OnboardingPage;
