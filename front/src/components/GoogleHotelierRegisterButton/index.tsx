import Image from "next/image";

const GoogleHotelierRegisterButton = () => {
  const handleGoogleRegister = () => {
    // Redirigir directamente si se maneja todo en el backend
    window.location.href =
      "http://localhost:3000/api/auth/callback/google/register/hotelAdmin";
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

export default GoogleHotelierRegisterButton;
