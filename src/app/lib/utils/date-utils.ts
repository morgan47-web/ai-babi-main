import { getTime } from "date-fns"

export const resetsAtToLocaleString = (resets_at: number): string => {
  const currentUtcTime = Math.floor(new Date().getTime() / 1000)
  const timeDifference = resets_at - currentUtcTime
  const localTime = new Date(
    getTime(new Date()) + timeDifference * 1000,
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  return localTime
}
