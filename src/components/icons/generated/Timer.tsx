import * as React from "react"
import type { SVGProps } from "react"
const SvgTimer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 12 13"
    {...props}
  >
    <g clipPath="url(#timer_svg__a)">
      <mask
        id="timer_svg__b"
        width={10}
        height={13}
        x={1}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <path
          fill="#fff"
          stroke="#fff"
          strokeWidth={1.833}
          d="M6 11.488a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        />
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.833}
          d="M7 1.488H5m1 0v2m2.75 1 .75-.75"
        />
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.833}
          d="M6 5.988v1.5H4.5"
        />
      </mask>
      <g mask="url(#timer_svg__b)">
        <path fill="#949494" d="M0 .488h12v12H0z" />
      </g>
    </g>
    <defs>
      <clipPath id="timer_svg__a">
        <path fill="#fff" d="M0 .488h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgTimer
