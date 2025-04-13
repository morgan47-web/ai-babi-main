import * as React from "react"
import type { SVGProps } from "react"
const SvgUserActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 49 49"
    {...props}
  >
    <rect width={49} height={49} fill="#0079FF" rx={24.5} />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M20.333 19.292a4.167 4.167 0 1 1 8.334 0 4.167 4.167 0 0 1-8.334 0m0 6.25a5.21 5.21 0 0 0-5.208 5.208 3.125 3.125 0 0 0 3.125 3.125h12.5a3.125 3.125 0 0 0 3.125-3.125 5.21 5.21 0 0 0-5.208-5.208z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgUserActive
