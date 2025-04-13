import * as React from "react"
import type { SVGProps } from "react"
const SvgEditText = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 34 26"
    {...props}
  >
    <rect width={33} height={25} x={0.5} y={0.5} fill="#222224" rx={12.5} />
    <rect width={33} height={25} x={0.5} y={0.5} stroke="#4B4B4B" rx={12.5} />
    <path
      fill="#C4C4C4"
      d="m19.25 16-3 3h6c.825 0 1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5zm-2.205-6.608-6.578 6.578a.76.76 0 0 0-.217.525v1.755c0 .412.338.75.75.75h1.755c.202 0 .39-.083.532-.218l6.578-6.577zm4.987.638a.747.747 0 0 0 0-1.058l-1.755-1.755a.747.747 0 0 0-1.057 0L17.848 8.59l2.812 2.812z"
    />
  </svg>
)
export default SvgEditText
