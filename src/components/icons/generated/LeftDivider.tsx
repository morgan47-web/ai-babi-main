import * as React from "react"
import type { SVGProps } from "react"
const SvgLeftDivider = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 104 2"
    {...props}
  >
    <path
      stroke="url(#left-divider_svg__a)"
      strokeWidth={0.5}
      d="M103.395 1H0"
    />
    <defs>
      <linearGradient
        id="left-divider_svg__a"
        x1={51.697}
        x2={27.959}
        y1={1}
        y2={1}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E0E0E0" />
        <stop offset={1} stopColor="#E0E0E0" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgLeftDivider
