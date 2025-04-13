import * as React from "react"
import type { SVGProps } from "react"
const SvgMastercard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 46 32"
    {...props}
  >
    <g clipPath="url(#mastercard_svg__a)">
      <path
        fill="#fff"
        stroke="#D9D9D9"
        d="M42.057.334H3.943C1.947.334.329 1.976.329 4.001v24c0 2.025 1.618 3.666 3.614 3.666h38.114c1.996 0 3.614-1.641 3.614-3.666V4c0-2.025-1.618-3.667-3.614-3.667Z"
      />
      <path
        fill="#ED0006"
        fillRule="evenodd"
        d="M23.26 23.174a8.8 8.8 0 0 1-5.818 2.199c-4.953 0-8.968-4.121-8.968-9.204s4.015-9.204 8.968-9.204a8.8 8.8 0 0 1 5.817 2.199 8.8 8.8 0 0 1 5.818-2.2c4.953 0 8.968 4.122 8.968 9.205s-4.015 9.204-8.968 9.204a8.8 8.8 0 0 1-5.818-2.199"
        clipRule="evenodd"
      />
      <path
        fill="#F9A000"
        fillRule="evenodd"
        d="M23.26 23.174a9.28 9.28 0 0 0 3.15-7.005 9.28 9.28 0 0 0-3.15-7.005 8.8 8.8 0 0 1 5.817-2.2c4.953 0 8.968 4.122 8.968 9.205s-4.015 9.204-8.968 9.204a8.8 8.8 0 0 1-5.818-2.199"
        clipRule="evenodd"
      />
      <path
        fill="#FF5E00"
        fillRule="evenodd"
        d="M23.26 9.164a9.28 9.28 0 0 1 3.15 7.005 9.28 9.28 0 0 1-3.15 7.005 9.28 9.28 0 0 1-3.152-7.005 9.28 9.28 0 0 1 3.151-7.005"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="mastercard_svg__a">
        <path fill="#fff" d="M0 0h46v32H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgMastercard
