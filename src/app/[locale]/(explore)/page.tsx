import { Suspense } from "react";
import { PostsGridSkeleton } from "@/app/components/skeletons/posts";
import ExploreTabs from "@/app/components/explore/explore-tabs";
import { getChatbots } from "@/app/lib/server/actions/actions";
import ExplorePageBanner from "@/app/components/banner/start-flirting";
import Footer from "@/app/components/explore/footer";
import { initLingui } from "@/app/initLingui";
import { Trans } from "@lingui/react/macro";
import TokenPricing from "@/app/components/dialog/token-pricing";
import SubscriptionTabs from "../(authenticated)/subscription/tabs";

import GetTokensDesktop from "../(authenticated)/subscription/get-tokens-desktop";
import BuyTokensDialog from "@/app/components/dialog/buy-tokens";
import GeneratorNotifications from "@/app/components/notifications/generator-notifications";
import GetTokensMobile from "../(authenticated)/subscription/get-tokens-mobile";
import FeedbackCard from "@/app/[locale]/(authenticated)/subscription/community-feedback";
import FaqSection from "@/app/[locale]/(authenticated)/subscription/faq";

export const dynamic = "force-dynamic";

async function ExploreContent() {
  const resp = await getChatbots();
  if (!resp.ok || !resp.data) {
    return <PostsGridSkeleton />;
  }

  const chatbots = resp.data;

  return <ExploreTabs chatbots={chatbots} />;
}

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  initLingui(locale);

  return (
    <>
      <div
        className={`
           flex w-full flex-col items-center gap-1
           h-auto
          md:gap-4
        `}
      >
        <ExplorePageBanner />
        <div
          className={`
            relative flex w-full flex-col items-center

            md:gap-4 md:px-4 md:pb-4
          `}
        >
          <Suspense fallback={<PostsGridSkeleton />}>
            <SubscriptionTabs defaultTab="monthly" />
            {/* Buy token desktop section
            <div className="hidden lg:block w-full">
              <GetTokensDesktop />
            </div>
            {/*  Buy token mobile section */}
            {/* <div className="block lg:hidden w-full">
              <GetTokensMobile />
            </div> */}
            {/* Feedback section */}
            <FeedbackCard />
            {/* Faq section */}
            {/* <div className="md:w-[80%]"> */}
            <FaqSection />
            {/* </div> */}
          </Suspense>
        </div>
      </div>
      <Footer displayImage />
    </>
  );
}
``;
