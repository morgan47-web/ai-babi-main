import * as React from "react"
import type { SVGProps } from "react"
const SvgImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 12 13"
    {...props}
  >
    <path
      fill="#fff"
      d="M2 3.5v6h8v-6zm0-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1M3.75 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M3.5 7.5l1-1 1 1 2-2L9 7v1.5H3.5z"
    />
  </svg>
)
export default SvgImageIcon
