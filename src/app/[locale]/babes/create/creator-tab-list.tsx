import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PostCustomChatBotPayloadOptional,
  tabFilter,
  TABS,
} from "./creator-tabs"
import { testTabGuard } from "@/app/components/babes/tabs/tab-guards"
import { Skeleton } from "@/components/ui/skeleton"

export default function CreatorTabList({
  request,
}: {
  request: PostCustomChatBotPayloadOptional
}) {
  return (
    <TabsList
      id="creator-tabs"
      className={`
        justify-between

        2xl:px-[25%]

        md:px-[15%]
      `}
    >
      {Object.keys(request).length === 0 ? (
        <>
          {Array.from({ length: Object.values(TABS).length }).map((_, idx) => (
            <Skeleton key={idx} className="h-full w-full" />
          ))}
        </>
      ) : (
        Object.values(TABS)
          .filter(tabFilter(request))
          .map((tab, idx) => (
            <TabsTrigger
              variant={"circle"}
              key={tab}
              value={tab}
              className={`
                h-6 w-6

                disabled:opacity-50

                lg:h-10 lg:w-10

                md:h-8 md:w-8
              `}
              disabled={!testTabGuard(tab, request)}
            >
              <p
                className={`
                  px-2 text-center font-bold capitalize

                  md:text-lg
                `}
              >
                {idx + 1}
              </p>
            </TabsTrigger>
          ))
      )}
    </TabsList>
  )
}
