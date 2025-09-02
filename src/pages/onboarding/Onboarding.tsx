import { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show splash screen for 2 seconds
    setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(1);
        setIsAnimating(false);
      }, 500);
    }, 1500);
  }, []);

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleFinish = () => {
    navigate("/auth");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div
            className={`bg-[url('../../../public/onboarding-1.jpg')] min-h-screen flex items-center justify-center bg-cover bg-center ${
              isAnimating ? "opacity-0" : "animate-fadeIn"
            }`}
          >
            <div className="font-poppins text-center h-screen md:h-auto w-full max-w-[600px] md:w-[70%] md:rounded-4xl pb-28 px-6 md:py-20 md:px-8 backdrop-blur-sm flex flex-col justify-end md:justify-center md:items-center text-white backdrop-brightness-50">
              <div className="flex flex-col justify-center items-center gap-8">
                <div className="flex flex-col">
                  <h4 className="text-3xl font-light">Welcome to</h4>
                  <h2 className="font-semibold text-[40px]">Fit Map</h2>
                  <p>
                    Get ready to embark on a journey of real-time fitness
                    challenges, social interactions and rewarding experiences.
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="rounded-full bg-accent w-4 h-4"></div>
                  <div className="rounded-full bg-white w-4 h-4"></div>
                  <div className="rounded-full bg-white w-4 h-4"></div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleNext}
                    className="h-[50px] w-[220px] bg-accent rounded-[20px] p-[10px] text-black font-medium text[20px] cursor-pointer hover:bg-accent/90 transition-all duration-300 transform hover:scale-105"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div
            className={`bg-[url('../../../public/onboarding-2.jpg')] min-h-screen flex items-center justify-center bg-cover bg-center ${
              isAnimating ? "opacity-0" : "animate-fadeIn"
            }`}
          >
            <div className="font-poppins text-center h-screen md:h-auto w-full max-w-[600px] md:w-[70%] md:rounded-4xl pb-28 px-6 md:py-20 md:px-8 backdrop-blur-sm flex flex-col justify-end md:justify-center md:items-center text-white backdrop-brightness-50">
              <div className="flex flex-col justify-center items-center gap-8">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-[40px]">
                    Elevate Your Fitness Journey
                  </h2>
                  <p>
                    Perfect for anyone striving to turn healthy intentions into
                    real habits
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="rounded-full bg-white w-4 h-4"></div>
                  <div className="rounded-full bg-accent w-4 h-4"></div>
                  <div className="rounded-full bg-white w-4 h-4"></div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePrevious}
                    className="h-[50px] w-[100px] border border-white rounded-[20px] p-[10px] text-white font-medium text[20px] cursor-pointer hover:bg-white/10 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="h-[50px] w-[220px] bg-accent rounded-[20px] p-[10px] text-black font-medium text[20px] cursor-pointer hover:bg-accent/90 transition-all duration-300 transform hover:scale-105"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div
            className={`bg-[url('../../../public/onboarding-3.jpg')] min-h-screen flex items-center justify-center bg-cover bg-center ${
              isAnimating ? "opacity-0" : "animate-fadeIn"
            }`}
          >
            <div className="font-poppins text-center h-screen md:h-auto w-full max-w-[600px] md:w-[70%] md:rounded-4xl pb-28 px-6 md:py-20 md:px-8 backdrop-blur-sm flex flex-col justify-end md:justify-center md:items-center text-white backdrop-brightness-50">
              <div className="flex flex-col justify-center items-center gap-8">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-[40px]">
                    Fuel your Fitness Journey
                  </h2>
                  <p>Nourish your body, Amplify Your Performance</p>
                </div>

                <div className="flex gap-2">
                  <div className="rounded-full bg-white w-4 h-4"></div>
                  <div className="rounded-full bg-white w-4 h-4"></div>
                  <div className="rounded-full bg-accent w-4 h-4"></div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePrevious}
                    className="h-[50px] w-[100px] border border-white rounded-[20px] p-[10px] text-white font-medium text[20px] cursor-pointer hover:bg-white/10 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinish}
                    className="h-[50px] w-[220px] bg-accent rounded-[20px] p-[10px] text-black font-medium text[20px] cursor-pointer hover:bg-accent/90 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const SplashScreen = () => {
    return (
      <div
        className={`bg-accent min-h-screen flex flex-col justify-center items-center transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="animate-bounce flex flex-col justify-center items-center">
          <img src={logo} alt="fitmap-logo" />
          <p className="font-poppins text-3xl font-medium">FitMap</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-accent">
      {currentStep === 0 ? <SplashScreen /> : renderStep()}
    </div>
  );
};

export default OnboardingPage;
