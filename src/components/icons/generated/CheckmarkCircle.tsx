import * as React from "react"
import type { SVGProps } from "react"
const SvgCheckmarkCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 33 32"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.25 31.942C7.505 31.942.417 24.854.417 16.11S7.505.275 16.25.275 32.083 7.364 32.083 16.11 24.995 31.942 16.25 31.942m-1.864-12.445-4.377-4.381-1.676 1.675 4.939 4.942a1.583 1.583 0 0 0 2.239 0l9.424-9.421-1.682-1.682z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgCheckmarkCircle
