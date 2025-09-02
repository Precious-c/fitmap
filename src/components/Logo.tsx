import logo from "@/assets/images/logo.png";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`${className} flex flex-col justify-center items-center`}>
      <img src={logo} alt="fitmap-logo" />
      <p className="font-poppins text-3xl font-medium">FitMap</p>
    </div>
  );
};

export default Logo;
