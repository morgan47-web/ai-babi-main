"use client"

import { useEffect, useRef } from "react"
import loadingAnimation from "./loadingAnimation.json"
import chatImageLoadingAnimation from "./chatAnimation2.json"

// Dynamically import lottie-web with SSR disabled

export default function LoadingAnimation() {
  const animationContainer = useRef(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    import("lottie-web").then((Lottie) => {
      if (animationContainer.current) {
        const animationInstance = Lottie.default.loadAnimation({
          container: animationContainer.current,
          renderer: "canvas",
          loop: true,
          autoplay: true,
          animationData: loadingAnimation,
        })

        // Cleanup function to destroy the animation instance when the component unmounts
        return () => {
          animationInstance.destroy()
        }
      }
    })
  }, [])

  return (
    <div
      className={`
        h-[400px] w-[400px]

        md:h-[600px] md:w-[600px]
      `}
    >
      <div ref={animationContainer} className="h-full w-full" />
    </div>
  )
}

export function ChatImageLoadingAnimation() {
  const animationContainer = useRef(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true
    import("lottie-web").then((Lottie) => {
      if (animationContainer.current) {
        const animationInstance = Lottie.default.loadAnimation({
          container: animationContainer.current,
          renderer: "canvas",
          loop: true,
          autoplay: true,
          animationData: chatImageLoadingAnimation,
        })

        // Cleanup function to destroy the animation instance when the component unmounts
        return () => {
          animationInstance.destroy()
        }
      }
    })
  }, [])

  return (
    <div className={`h-[100px] w-[100px]`}>
      <div ref={animationContainer} className="h-full w-full" />
    </div>
  )
}
