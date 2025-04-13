import * as React from "react"
import type { SVGProps } from "react"
const SvgEye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#0F0F1B"
      stroke="#667085"
      strokeWidth={1.375}
      d="M2.183 10.198c-.567-.736-.85-1.105-.85-2.198s.283-1.46.85-2.197C3.314 4.333 5.212 2.667 8 2.667s4.685 1.667 5.816 3.136c.567.737.85 1.105.85 2.197 0 1.094-.283 1.461-.85 2.198-1.131 1.469-3.028 3.136-5.816 3.136s-4.686-1.667-5.817-3.136Z"
    />
    <path
      stroke="#667085"
      strokeWidth={1.375}
      d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </svg>
)
export default SvgEye
