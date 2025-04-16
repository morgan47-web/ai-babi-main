"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function ExploreBannerDesktop() {
  return (
    <div className="relative w-full bg-[#181b1c] text-white px-10 py-6 flex items-center justify-between overflow-hidden ">
      {/* Background user avatars */}
      <div className="absolute right-6 top-0 bottom-0 z-0 opacity-90 ">
        <Image
          src="/images/explore-banner-icons.png" // circular avatars background
          alt="users"
          width={320}
          height={320}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-[500px] text-left space-y-2 w-[50%] pl-[3.5vw] ">
        <h2 className="text-[24px]  leading-tight text-[#C4C4C4] outfit">
          Join our community of{" "}
          <span className="text-white font-extrabold">+130 000 users</span>
        </h2>
        <p className="text-[#9B9FA4] text-sm ">
          Upgrade to Elite or Deluxe today and enjoy access to generating
          <br />
          limitless images with your own perfect companion!
        </p>
      </div>

      {/* Awards and ratings */}
      <div className="relative z-10 flex items-center  w-[50%]">
        {/* Award Image + Text */}
        <div className="relative w-[200px] h-[80px] ">
          <Image
            src="/images/award.png"
            alt="AI After Dark Award"
            fill
            className="obeject-contain w-[90%]"
          />
        </div>
        <svg width="0" height="0">
          <defs>
            <linearGradient
              id="gold-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#E6C644" />
              <stop offset="46.5%" stopColor="#AD8B2B" />
              <stop offset="100%" stopColor="#6C470E" />
            </linearGradient>
          </defs>
        </svg>
        {/* Trustpilot */}
        <div className="text-center space-y-1 mr-[3.5vw]">
          <p className="font-medium text-white ">Trustpilot</p>
          <div className="flex justify-center">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill="url(#gold-gradient)"
                stroke="url(#gold-gradient)"
              />
            ))}
            <Star size={16} fill="white" />
          </div>
          <p className="text-sm font-medium ">4.5/5</p>
        </div>

        {/* Our Users */}
        <div className="text-center space-y-1">
          <p className=" font-medium text-white ">Our Users</p>
          <div className="flex justify-center">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill="url(#gold-gradient)"
                stroke="url(#gold-gradient)"
              />
            ))}
            <Star size={16} fill="white" />
          </div>
          <p className="text-sm font-medium  ">4.8/5</p>
        </div>
      </div>
    </div>
  );
}
