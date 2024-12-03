// src/app/page.tsx
import Wraper from "@/components/Wraper";
import Image from "next/image";
import Navbar from "@/components/nav/Navbar";

export default function Page() {
  return (
    <Wraper>
      <Navbar />
      <div className="h-[85vh] w-full box-border px-8 rounded-2xl relative mt-10">
        {/* Gradient overlay */}
        <div className="absolute inset-0 mx-6 bg-custom-gradient opacity-60 rounded-3xl z-10"></div>

        {/* Image */}
        <Image
          src="/images/windrisesbackground.png"
          width={1000}
          height={10000}
          alt="Background Image"
          className="object-cover rounded-3xl h-full w-full"
        />

        {/* Text */}
        <div className="absolute p-4 top-0 z-20 text-9xl w-3/5 font-light text-white h-full">
        <div className="h-full w-full bg-DarkPrimary-200 ">
          <h1>Hitting a Snag?</h1>
        </div>
        </div>
      </div>
    </Wraper>
  );
}
