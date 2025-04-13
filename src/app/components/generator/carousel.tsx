"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { cn } from "@/lib/utils"
import { ListChatbotItem } from "@/app/lib/generated/models/ListChatbotItem"
import CarouselSkeleton from "../skeletons/carousel"
import ProfilePicture from "../character/profile-picture"

const CarouselCard = ({
  height,
  children,
  idx,
  onClick,
  selectedClassName,
}: {
  height: number
  children: React.ReactNode
  idx: number
  onClick: () => void
  selectedClassName?: string
}) => {
  let style = {}

  if (idx === 0)
    style = {
      transform: "translateX(-70%) scale(0.8)",
      zIndex: 0,
    }
  if (idx === 1)
    style = {
      transform: "translateX(-35%) scale(0.9)",
      zIndex: 1,
    }
  if (idx === 3)
    style = {
      transform: "translateX(35%) scale(0.9)",
      zIndex: 1,
    }
  if (idx === 4)
    style = {
      transform: "translateX(70%) scale(0.8)",
      zIndex: 0,
    }

  return (
    <div
      className={cn(
        `
          absolute left-0 right-0 m-auto h-[250px] w-[45%] rounded-2xl
          transition-all duration-100
        `,
        idx === 2 && "z-[2] border border-primary" + selectedClassName,
      )}
      style={{ ...style, height: height }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface Props {
  characters: Array<ListChatbotItem>
  setSelected: (id: ListChatbotItem) => void
  height?: number
}

export default function Carousel({ height, characters, setSelected }: Props) {
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const innerHeight = height || 250
  const list = characters
  const [arr, setArr] = useState(list.slice(0, 5))
  const [rest, setRest] = useState(list.slice(5))
  const [scrollDebounce, setScrollDebounce] = useState(false)

  // ↓ And a new function that will be used to rotate the arr
  const updateArr = useCallback(
    (idx: number) => {
      const [a, b, c, d, e] = arr

      if (idx === 0 || idx === 1) {
        // It will basically dispose of the last item in both arrays, and insert
        // it in front of the other array
        const lastRestItem = rest[rest.length - 1]
        const newArr = [lastRestItem, a, b, c, d]
        const newRest = [e, ...rest.slice(0, rest.length - 1)]
        setArr(newArr)
        setRest(newRest)
        setSelected(newArr[2])
      } else {
        // It will basically dispose of the first item in both arrays, and add it
        // to the end of the other array.
        const firstRestItem = rest[0]
        const newArr = [b, c, d, e, firstRestItem]
        const newRest = [...rest.slice(1), a]
        setArr(newArr)
        setRest(newRest)
        setSelected(newArr[2])
      }
    },
    [arr, rest, setSelected],
  )

  const handlers = useSwipeable({
    onSwipedLeft: () => updateArr(3),
    onSwipedRight: () => updateArr(1),
    trackMouse: true,
  })

  const refPassthrough = (el: HTMLElement | null) => {
    // call useSwipeables ref prop with el
    handlers.ref(el)
    // set the el to a ref you can access yourself
    carouselRef.current = el as HTMLDivElement | null
  }

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()

      if (scrollDebounce) return

      if (event.deltaY > 0) {
        updateArr(3)
        setScrollDebounce(true)
      }
      if (event.deltaY < 0) {
        updateArr(1)
        setScrollDebounce(true)
      }

      setTimeout(() => {
        setScrollDebounce(false)
      }, 200)
    }

    const carouselElement = carouselRef.current
    if (carouselElement) {
      carouselElement.addEventListener("wheel", handleScroll)
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("wheel", handleScroll)
      }
    }
  }, [updateArr, handlers, scrollDebounce])

  useEffect(() => {
    if (characters.length < 5) {
      return
    }
    setArr(characters.slice(0, 5))
    setRest(characters.slice(5))
    setSelected(characters[2])
  }, [characters, setSelected])

  if (characters.length < 5) {
    return <CarouselSkeleton />
  }

  return (
    <div
      {...handlers}
      ref={refPassthrough}
      className="relative flex max-w-lg"
      style={{
        height: innerHeight,
      }}
    >
      <div className="absolute bottom-0 h-full flex-1" />
      {arr.map((item, idx) => (
        <CarouselCard
          key={item.id} // ← Note, do not use "idx" for key
          idx={idx}
          onClick={() => updateArr(idx)}
          height={innerHeight}
          selectedClassName={item.unlocked ? " border-primary" : " border-none"}
        >
          <ProfilePicture
            chatbot={item}
            href={""}
            locked={!item.unlocked && idx === 2}
            className="h-full rounded-2xl"
          />
          <div
            className={`
              absolute bottom-1 left-2 rounded-xl border border-primary
              bg-background/60 px-2 py-[2px] text-center
            `}
          >
            {item.displayName}
          </div>
        </CarouselCard>
      ))}
    </div>
  )
}
