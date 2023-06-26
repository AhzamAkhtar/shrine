import Image from "next/image";
import {PaymentModal} from '../pages/cryptochat/[slug]'
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
        
        {/* <Image
          src="/sun-tornadodnn.png"
          className="rounded"
          alt="Mountains with snow"
          layout="fill"
          objectFit="cover"
        /> */}
      </div>
   
      
    </>
  );
};

export default Hero;
