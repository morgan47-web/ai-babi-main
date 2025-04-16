"use client";

import { useUser } from "@/app/context/user";
import Image from "next/image";
import AppRatingDialog from "../dialog/app-rating";
import { useState } from "react";
import {
  isInitialized,
  isSignedUp,
  isSubscribed,
  isSubscribedOrTrial,
  signupGuard,
} from "@/app/lib/user-guard";
import BecomePremiumHeading from "../profile/premium-heading";
import { useDialogs } from "@/app/context/dialog";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import ExploreBanner from "@/app/[locale]/(authenticated)/subscription/explore-banner-desktop";
import ExploreBannerDesktop from "@/app/[locale]/(authenticated)/subscription/explore-banner-desktop";
import ExploreBannerMobile from "@/app/[locale]/(authenticated)/subscription/explore-banner-mobile";

const StartFlirting = () => {
  const { user } = useUser();
  const isDesktop = useMediaQuery("(min-width: 724px)");
  const dialogs = useDialogs();
  const router = useRouter();

  return (
    <>
      {isDesktop ? (
        <Image
          id="start-flirting-banner"
          src="/images/explore-banner.jpg"
          alt="Start Flirting"
          className={`
            cursor-pointer object-cover

            
          `}
          onClick={() => {
            if (!signupGuard(user, dialogs)) return;
            router.push("/babes/create");
          }}
          fill
          sizes="80vw"
        />
      ) : (
        <Image
          id="start-flirting-banner"
          src="/images/explore-banner-mobile.jpg"
          alt="Start Flirting"
          className={`
            cursor-pointer object-contain
 
          
          `}
          onClick={() => {
            dialogs.setSignupOpen(true);
          }}
          fill
          sizes="100vw"
        />
      )}
    </>
  );
};

export default function ExplorePageBanner() {
  const user = useUser();
  const [appRatingDialog, setAppRatingDialog] = useState(false);
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const getBanner = () => {
    if (!isInitialized(user?.user))
      return <Skeleton className="h-full w-full" />;

    if (!isSignedUp(user?.user)) {
      return isDesktop ? <ExploreBannerDesktop /> : <ExploreBannerMobile />;
    } else if (!isSubscribedOrTrial(user?.user))
      return (
        <BecomePremiumHeading onclick={() => router.push("/subscription")} />
      );
    else if (!user?.user.feedback_given && isSubscribed(user?.user)) {
      return (
        <AppRatingDialog
          dialogOpen={appRatingDialog}
          setDialogOpen={setAppRatingDialog}
        />
      );
    } else {
      return isDesktop ? <ExploreBannerDesktop /> : <ExploreBannerMobile />;
    }
  };

  return (
    <div
      className={cn(
        `relative  w-full `,
        isSignedUp(user?.user) && !isSubscribedOrTrial(user?.user)
          ? isDesktop
            ? "h-[400px]"
            : "h-[160px]"
          : `
            h-[200px]
      
      

          `
      )}
    >
      {getBanner()}
    </div>
  );
}
