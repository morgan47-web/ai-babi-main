import * as React from "react"
import type { SVGProps } from "react"
const SvgPaperPlane = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.322 10.5h4.95m8.482.071C18.872 7.372 3.224-.15 1.75 1.343.08 3.035 4.076 8.066 4.976 9.668c.54.964.526 1.381-.09 2.343C2.1 16.37.718 18.542 1.577 19.48c1.37 1.497 17.062-5.788 17.178-8.909"
    />
  </svg>
)
export default SvgPaperPlane
