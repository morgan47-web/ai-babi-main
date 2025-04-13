import * as React from "react"
import type { SVGProps } from "react"
const SvgFranceFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    imageRendering="optimizeQuality"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 512 356.18"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="#E1000F"
      d="M345.04 0h139C499.44.1 512 12.72 512 28.13v299.91c0 15.47-12.65 28.13-28.13 28.14H345.04zM5.57 344.8"
    />
    <path
      fill="#fff"
      d="M27.96 0h317.08v356.18H27.98C12.57 356.09 0 343.46 0 328.04V28.14C0 12.72 12.56.1 27.96 0"
    />
    <path
      fill="#273375"
      d="M27.96 0h138.99v356.18H28c-15.42-.08-28-12.71-28-28.14V28.14C0 12.72 12.56.1 27.96 0"
    />
  </svg>
)
export default SvgFranceFlag
