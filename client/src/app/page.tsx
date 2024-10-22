// src/app/page.tsx
import Wraper from "@/components/Wraper";
import Image from "next/image";

export default function Page() {
  return (
    <Wraper>
      <div className="h-[85vh] w-full box-border px-8 rounded-2xl relative">
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
        <div className="absolute top-[10%] z-20 text-9xl font-light text-white">
          <h1>Hitting a Snag?</h1>
        </div>
      </div>
    </Wraper>
  );
}
