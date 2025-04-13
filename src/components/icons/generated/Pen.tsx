import * as React from "react"
import type { SVGProps } from "react"
const SvgPen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      fill="#C4C4C4"
      d="m13.75 14.667-3.667 3.666h9.167v-3.666zM11.055 6.59 2.75 14.896v3.437h3.438l8.305-8.305zm6.096.78c.357-.358.357-.954 0-1.293l-2.145-2.145a.916.916 0 0 0-1.293 0L12.036 5.61l3.437 3.438z"
    />
  </svg>
)
export default SvgPen
