import * as React from "react"
import type { SVGProps } from "react"
const SvgLandscape = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.75 10.085a1.833 1.833 0 1 0 0-3.667 1.833 1.833 0 0 0 0 3.667Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      d="M18.333 16.133 16.296 14.3a2.75 2.75 0 0 0-3.421-.207l-.274.193a1.83 1.83 0 0 1-2.35-.203L6.317 10.15a2.11 2.11 0 0 0-2.879-.095l-1.347 1.178"
    />
    <path
      stroke="currentColor"
      d="M11 20.167a9.167 9.167 0 1 0 0-18.333 9.167 9.167 0 0 0 0 18.333Z"
    />
  </svg>
)
export default SvgLandscape
