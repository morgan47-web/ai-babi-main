"use client"

import { useUser } from "@/app/context/user"
import { rateApp } from "@/app/lib/server/actions/actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Star } from "lucide-react"
import React, { useState } from "react"
import StarRatingComponent from "react-star-rating-component"
import { Trans, useLingui } from "@lingui/react/macro"
import Image from "next/image"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"

interface Props {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}

export default function AppRatingDialog({ dialogOpen, setDialogOpen }: Props) {
  const { t } = useLingui()
  const user = useUser()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [loading, setLoading] = React.useState(false)
  const [ratings, setRatings] = useState({
    girls: 0,
    anime: 0,
    enoughContent: 0,
    chat: 0,
    other: "",
  })

  const onSubmit = async () => {
    setLoading(true)
    for (const key in ratings) {
      if (key == "other") {
        continue
      }
      if (!ratings[key as keyof typeof ratings]) {
        alert("Please rate all categories")
        setLoading(false)
        return
      }
    }
    const resp = await rateApp(ratings)
    user?.setUser((prev) => {
      return {
        ...prev,
        feedback_given: true,
        subscription: {
          ...prev.subscription,
          tokens: resp.data?.newBalance || prev.subscription.tokens,
        },
      }
    })
    setDialogOpen(false)
    setLoading(false)
  }

  const onStarClick = (nextValue: number, prevValue: number, name: string) => {
    setRatings((prevRatings) => {
      return {
        ...prevRatings,
        [name]: nextValue,
      }
    })
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {isDesktop ? (
          <Image
            id="get-free-tokens"
            src="/images/rate-app.jpg"
            alt="Get Free Tokens"
            className="cursor-pointer rounded-[16px] object-cover"
            fill
            sizes="80vw"
          />
        ) : (
          <Image
            id="get-free-tokens"
            src="/images/rate-app-mobile.jpg"
            alt="Get Free Tokens"
            className="cursor-pointer rounded-[16px] object-cover"
            fill
            sizes="100vw"
          />
        )}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="mx-4 flex w-full flex-col rounded-lg py-4">
          <DialogTitle className="mx-4 text-center text-xl font-bold">
            <Trans>Help us improve! Rate the app.</Trans>
          </DialogTitle>
          <div className="flex flex-col space-y-2 p-4">
            <Label>
              <Trans>Is there enough content?</Trans>
            </Label>
            <div className="flex items-center justify-center">
              <StarRatingComponent
                value={ratings["enoughContent"]}
                name="enoughContent"
                starCount={5}
                onStarClick={onStarClick}
                renderStarIcon={() => <Star size={32} fill="currentColor" />}
              />
            </div>
            <Label>
              <Trans>Was the chat engaging?</Trans>
            </Label>
            <div className="flex items-center justify-center">
              <StarRatingComponent
                value={ratings["chat"]}
                name="chat"
                starCount={5}
                onStarClick={onStarClick}
                renderStarIcon={() => <Star size={32} fill="currentColor" />}
              />
            </div>
            <Label>
              <Trans>Are realistic girls attractive?</Trans>
            </Label>
            <div className="flex items-center justify-center">
              <StarRatingComponent
                value={ratings["girls"]}
                name="girls"
                starCount={5}
                onStarClick={onStarClick}
                renderStarIcon={() => <Star size={32} fill="currentColor" />}
              />
            </div>
            <Label>
              <Trans>Are anime girls attractive?</Trans>
            </Label>
            <div className="flex items-center justify-center">
              <StarRatingComponent
                value={ratings["anime"]}
                name="anime"
                starCount={5}
                onStarClick={onStarClick}
                renderStarIcon={() => <Star size={32} fill="currentColor" />}
              />
            </div>
            <Label>
              <Trans>What should we improve?</Trans>
            </Label>
            <Input
              ref={inputRef}
              onChange={() => {
                setRatings({ ...ratings, other: inputRef.current?.value || "" })
              }}
              variant="underline"
              placeholder={t`Type here`}
            />
          </div>
          <Button size="lg" className="w-full" type="submit" onClick={onSubmit}>
            {loading ? (
              <Spinner loading={loading} />
            ) : (
              <Trans>Send feedback</Trans>
            )}
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
