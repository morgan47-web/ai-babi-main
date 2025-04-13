import * as React from "react"
import type { SVGProps } from "react"
const SvgCoinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path fill="url(#coin-icon_svg__a)" d="M8 8.021H0l8 7.98z" />
    <path fill="url(#coin-icon_svg__b)" d="M8 8.022V.043l8 7.979z" />
    <path fill="url(#coin-icon_svg__c)" d="M8 8.02V16l8-7.98z" />
    <path fill="url(#coin-icon_svg__d)" d="M8 8.021H0L8 .042z" />
    <path
      fill="url(#coin-icon_svg__e)"
      d="M0 0h5.649v5.649H0z"
      transform="rotate(-44.925 11.7 -.827)"
    />
    <path
      fill="url(#coin-icon_svg__f)"
      fillRule="evenodd"
      d="M3.882 8.021 8 3.914l4.118 4.107L8 12.13zm.236 0L8 11.893l3.882-3.872L8 4.15z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="coin-icon_svg__a"
        x1={7.614}
        x2={5.339}
        y1={10.468}
        y2={13.076}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#65B5FF" />
        <stop offset={1} stopColor="#64E4FF" />
      </linearGradient>
      <linearGradient
        id="coin-icon_svg__b"
        x1={18.322}
        x2={14.802}
        y1={10.052}
        y2={-0.288}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.146} stopColor="#8EECFF" />
        <stop offset={1} stopColor="#A8EFFF" />
      </linearGradient>
      <linearGradient
        id="coin-icon_svg__c"
        x1={15.37}
        x2={12.652}
        y1={7.412}
        y2={18.322}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2E3DB0" />
        <stop offset={1} stopColor="#55C1F2" />
      </linearGradient>
      <linearGradient
        id="coin-icon_svg__d"
        x1={9.446}
        x2={-0.277}
        y1={-0.07}
        y2={2.083}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2354C0" />
        <stop offset={1} stopColor="#A3E9FF" />
      </linearGradient>
      <linearGradient
        id="coin-icon_svg__e"
        x1={-1.219}
        x2={7.005}
        y1={2.305}
        y2={1.927}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.02} stopColor="#2A67C4" />
        <stop offset={0.349} stopColor="#2E3AB0" />
        <stop offset={1} stopColor="#79E8FF" />
      </linearGradient>
      <linearGradient
        id="coin-icon_svg__f"
        x1={8.032}
        x2={8.035}
        y1={3.879}
        y2={11.511}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D7F8FF" />
        <stop offset={0.177} stopColor="#9EEDFF" />
        <stop offset={0.432} stopColor="#66E3FF" />
        <stop offset={0.686} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgCoinIcon
