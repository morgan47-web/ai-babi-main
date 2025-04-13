import * as React from "react"
import type { SVGProps } from "react"
const SvgRightDivider = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 105 2"
    {...props}
  >
    <path
      stroke="url(#right-divider_svg__a)"
      strokeWidth={0.5}
      d="M.55 1H105"
    />
    <defs>
      <linearGradient
        id="right-divider_svg__a"
        x1={52.776}
        x2={84.427}
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
export default SvgRightDivider
