import * as React from "react"
import type { SVGProps } from "react"
const SvgMagnifyingGlass = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 22"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.833 17.417a7.333 7.333 0 1 0 0-14.667 7.333 7.333 0 0 0 0 14.667M20 19.25l-3.942-3.941"
    />
  </svg>
)
export default SvgMagnifyingGlass
