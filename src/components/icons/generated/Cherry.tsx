import * as React from "react"
import type { SVGProps } from "react"
const SvgCherry = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <path fill="url(#cherry_svg__a)" d="M0 .5h24v24H0z" />
    <defs>
      <pattern
        id="cherry_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#cherry_svg__b" transform="scale(.01389)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="cherry_svg__b"
        width={72}
        height={72}
      />
    </defs>
  </svg>
)
export default SvgCherry
