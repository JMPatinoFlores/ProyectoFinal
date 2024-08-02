import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleRegisterButton = () => {
  const handleGoogleRegister = () => {
    signIn("google");
  };

  return (
    <div className="flex justify-center items-center border border-[#f8263a] rounded-md w-full p-2 mb-5">
      <button onClick={handleGoogleRegister} className="flex">
        <Image
          src={"/google.png"}
          alt="google"
          width={24}
          height={24}
          className="mr-2"
        />
        <h2>Registrarse con Google</h2>
      </button>
    </div>
  );
};

export default GoogleRegisterButton;
