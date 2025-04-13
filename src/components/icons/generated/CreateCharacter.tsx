import * as React from "react"
import type { SVGProps } from "react"
const SvgCreateCharacter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 2.002 10.5 2C6.022 2 3.782 2 2.391 3.391S1 7.021 1 11.5c0 4.478 0 6.718 1.391 8.109S6.021 21 10.5 21c4.478 0 6.718 0 8.109-1.391S20 15.979 20 11.5q0-.795-.002-1.5"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 16.5c2.332-2.442 6.643-2.557 9 0M17.5 1l.258.697c.338.914.507 1.371.84 1.704.334.334.791.503 1.705.841L21 4.5l-.697.258c-.914.338-1.371.507-1.704.84-.334.334-.503.791-.841 1.705L17.5 8l-.258-.697c-.338-.914-.507-1.371-.84-1.704-.334-.334-.791-.503-1.705-.841L14 4.5l.697-.258c.914-.338 1.371-.507 1.704-.84.334-.334.503-.791.841-1.705zm-4.505 8a2.502 2.502 0 0 1-3.46 2.31 2.5 2.5 0 0 1 .957-4.81A2.5 2.5 0 0 1 12.995 9"
    />
  </svg>
)
export default SvgCreateCharacter
