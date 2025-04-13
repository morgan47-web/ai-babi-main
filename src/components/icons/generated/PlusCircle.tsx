import * as React from "react"
import type { SVGProps } from "react"
const SvgPlusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11 1.375A9.744 9.744 0 0 0 1.375 11 9.744 9.744 0 0 0 11 20.625 9.744 9.744 0 0 0 20.625 11 9.744 9.744 0 0 0 11 1.375m5.5 10.313h-4.812V16.5h-1.376v-4.812H5.5v-1.376h4.813V5.5h1.374v4.813H16.5z"
    />
  </svg>
)
export default SvgPlusCircle
