"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function ExploreBannerMobile() {
  return (
    <div className="relative w-full bg-[#181b1c] text-white px-4 py-5 overflow-hidden ">
      {/* Blurred background icons */}
      <div className="absolute inset-0 left-[200px] z-10 opacity-90 ">
        <Image
          src="/images/explore-banner-icons.png"
          alt="background icons"
          fill
          className=" h-full w-full object-cover"
        />
      </div>

      {/* Main content with text on left, award on right */}
      <div className="relative z-10 flex items-start justify-between outfit w-full">
        {/* Left: Text content */}
        <div className="w-[60%] space-y-2">
          <h2 className="text-[20px] font-extrabold leading-tight text-[#C4C4C4]">
            Join our community <br />
            of
            <span className="text-white font-extrabold"> +130 000 users</span>
          </h2>
          <p className="text-[12px] text-[#9B9FA4] leading-relaxed font-normal">
            Upgrade to Premium or Deluxe today and enjoy access to generating
            limitless images with your own perfect companion!
          </p>
        </div>

        {/* Right: Award + Rating */}
        <div className="flex flex-col items-center justify-center w-[40%]">
          <div className="relative w-[200px] h-[80px] ">
            <Image
              src="/images/award.png"
              alt="AI After Dark Award"
              fill
              className="object-contain"
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

          <div className="flex gap-[4px] mb-1">
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

          <p className="text-white font-normal text-[14px]">4.8/5</p>
        </div>
      </div>
    </div>
  );
}
