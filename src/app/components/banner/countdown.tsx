"use client"
import Countdown from "react-countdown"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function SubscriptionCountdown() {
  const [countdownDate, setCountdownDate] = useState<number | null>(null)

  useEffect(() => {
    let countDownDate = Date.now() + 10 * 60000
    const cookieValue = Cookies.get("subscription-countdown")
    if (cookieValue) {
      const cookieCountDownDate = new Date(cookieValue).getTime()
      if (cookieCountDownDate > Date.now()) {
        countDownDate = cookieCountDownDate
      }
    } else {
      // Set the cookie with the countdown datetime
      Cookies.set(
        "subscription-countdown",
        new Date(countDownDate).toISOString(),
        { expires: countDownDate },
      )
    }
    setCountdownDate(countDownDate)
  }, [])
  if (countdownDate === null) {
    return null // or a loading spinner
  }

  return (
    <div
      className={`flex gap-1 rounded-lg p-0.5 p-1 text-[12px] leading-[17px]`}
    >
      <div className="">Limited Time Offer</div>
      <Countdown
        date={countdownDate}
        precision={2}
        intervalDelay={0}
        renderer={({ minutes, seconds, milliseconds }) => (
          <div className="flex flex-row gap-0.5">
            <div className="flex flex-col items-center">
              <div className="flex-row">
                {minutes.toString().padStart(2, "0")}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex-row">:</div>
              <div className="flex-row" />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex-row">
                {seconds.toString().padStart(2, "0")}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex-row">:</div>
              <div className="flex-row" />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex-row">
                {milliseconds.toString().padStart(3, "0")}
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}
