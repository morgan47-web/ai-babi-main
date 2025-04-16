"use client";

import * as Avatar from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import { Trans } from "@lingui/react/macro";

type Feedback = {
  name: string;
  feedback: string;
  imageUrl?: string;
  rating: number;
};

const reviews: Feedback[] = [
  {
    name: "RedNeck",
    feedback:
      "Elisabeth is warm, nurturing, and deeply empathetic, always attuned to the needs of others and ready to provide comfort and support. Elisabeth work as",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    name: "Anna",
    feedback:
      "Anna is incredibly thoughtful and always goes out of her way to make others feel comfortable. Her positivity is contagious!",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Leo",
    feedback:
      "Leo is a great team player. Always listens and brings insightful solutions to the table.",
    imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4,
  },
  {
    name: "Rhea",
    feedback:
      "Rhea has a very calming presence. She’s supportive and highly understanding in all situations.",
    imageUrl: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
  },
];

export default function FeedbackCard() {
  return (
    <div className="my-[2vh]">
      <div className=" text-center">
        <h1 className="text-[25px] text-[#FAFCFF] font-medium">
          <Trans>Community Feedback</Trans>
        </h1>
        <h3 className="text-border/60 text-center text-[12px]">
          <Trans>Here's what users say about us!</Trans>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 py-[10px]">
        {reviews.map(({ name, feedback, imageUrl, rating }, i) => (
          <div
            key={i}
            className="rounded-2xl bg-[#0F0F0F] p-4 shadow-sm border border-zinc-800 w-full max-w-md text-white flex flex-col justify-between gap-4"
          >
            {/* Top section */}
            <div>
              <p className="text-[12px] leading-relaxed">{feedback}</p>
            </div>

            {/* Bottom section */}
            <div className="flex items-center justify-between">
              {/* Avatar and name */}
              <div className="flex items-center gap-2">
                <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full align-middle bg-zinc-600">
                  {imageUrl ? (
                    <Avatar.Image
                      className="h-full w-full object-cover"
                      src={imageUrl}
                      alt={name}
                    />
                  ) : (
                    <Avatar.Fallback className="text-white font-medium">
                      {name.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
                <span className="font-bold">{name}</span>
              </div>

              {/* Stars */}
              <div className="flex gap-[2px]">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className={j < rating ? "text-yellow-400" : "text-white"}
                    fill={j < rating ? "#facc15" : "#ffffff"}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
