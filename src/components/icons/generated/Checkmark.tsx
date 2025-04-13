import * as React from "react"
import type { SVGProps } from "react"
const SvgCheckmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 14 12"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.667 12 0 6.894l1.633-1.788 3.034 3.32L12.367 0 14 1.787z"
    />
  </svg>
)
export default SvgCheckmark
