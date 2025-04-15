"use client";

import { Volume2, Phone, ImageIcon, SmileIcon, AudioLines } from "lucide-react";
import { Toggle } from "@radix-ui/react-toggle";
import Image from "next/image";

export default function VideoCallUI() {
  // Define control icons to reduce repetition
  const CONTROL_ICONS = [
    { Icon: AudioLines, label: "Audio Effects" },
    { Icon: ImageIcon, label: "Image" },
    { Icon: "LipIcon", label: "Lip Icon" },
  ];

  return (
    <div className="relative h-[85vh] w-full max-w-[380px] mx-auto overflow-hidden rounded-3xl border bg-black shadow-xl sm:h-[700px]">
      {/* Video Background */}
      <video
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://cuberto.com/assets/showreel/short.mp4"
          type="video/mp4"
        />
      </video>
      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between text-white text-xs opacity-80">
          <span>22:27</span>
          <div className="flex gap-1">
            <div className="h-[6px] w-[6px] rounded-full bg-white" />
            <div className="h-[6px] w-[6px] rounded-full bg-white" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4">
          {/* Token count */}
          <div className="flex items-center gap-2 text-white"></div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 z-10 flex w-[95%] max-w-[400px] -translate-x-1/2 items-center justify-between rounded-full bg-[#111111] px-4 py-2">
            <Toggle className="rounded-full p-2 text-white hover:bg-[#2c2c2c]">
              <Volume2 size={20} />
            </Toggle>
            <Toggle className="flex items-center gap-1 rounded-full bg-[#1f1f1f] px-3 py-2 text-white hover:bg-[#2c2c2c]">
              <Image
                src="/icons/coin-icon.svg"
                alt="token"
                width={16}
                height={16}
              />
              <span className="text-sm font-semibold">26</span>
            </Toggle>

            <button className="rounded-full bg-red-600 p-3 text-white hover:bg-red-700">
              <Phone size={20} className="rotate-90" />
            </button>
            <div className="flex rounded-full bg-[#262629] p-2">
              {CONTROL_ICONS.map(({ Icon, label }, index) => (
                <Toggle
                  key={index}
                  className="flex items-center justify-center p-1 text-white hover:bg-[#2c2c2c] rounded-full focus:outline-none  focus:bg-blue-500"
                  aria-label={label}
                >
                  {Icon === "LipIcon" ? (
                    <img src="/images/lips.png" alt={label} />
                  ) : (
                    <Icon size={20} />
                  )}
                </Toggle>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
