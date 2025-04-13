import * as React from "react"
import type { SVGProps } from "react"
const SvgSpeaker = (props: SVGProps<SVGSVGElement>) => (
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.375}
      d="M17.875 6.875s1.375 1.375 1.375 3.667-1.375 3.666-1.375 3.666"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.375}
      d="M1.833 12.702V9.297a1.833 1.833 0 0 1 1.834-1.833h2.658c.18 0 .355-.053.504-.151l5.5-3.627a.917.917 0 0 1 1.421.766v13.095a.916.916 0 0 1-1.42.766l-5.5-3.627a.9.9 0 0 0-.505-.151H3.667a1.833 1.833 0 0 1-1.834-1.833Z"
    />
  </svg>
)
export default SvgSpeaker
