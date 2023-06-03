import Image from "next/image";
import PaymentModal from "./PaymentModal";
const Hero = () => {
  return (
    <>
      <div
        style={{
          zIndex: -1,
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Image
          src="/sun-tornado.png"
          className="rounded"
          alt="Mountains with snow"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <PaymentModal/>
    </>
  );
};

export default Hero;
