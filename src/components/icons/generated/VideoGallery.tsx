import * as React from "react"
import type { SVGProps } from "react"
const SvgVideoGallery = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 23"
    {...props}
  >
    <g fill="#fff" clipPath="url(#video-gallery_svg__a)">
      <path d="M19.629 6.611H2.37a1.15 1.15 0 0 0-1.149 1.15v11.146a1.15 1.15 0 0 0 1.15 1.149h17.257a1.15 1.15 0 0 0 1.149-1.15V7.76a1.15 1.15 0 0 0-1.15-1.149m-.073 12.223H2.444v-11h17.112zM18.419 2.334a.61.61 0 0 0-.611-.611H4.363a.61.61 0 0 0-.61.61v.612h14.666zM19.629 4.777a.61.61 0 0 0-.611-.611H3.128a.61.61 0 0 0-.61.611v.611h17.11z" />
      <path d="M7.834 16.872c.17.11.367.17.569.171.145 0 .289-.032.421-.092l5.971-2.664a1.032 1.032 0 0 0 0-1.895l-5.97-2.664a1.04 1.04 0 0 0-1.461.947v5.33a1.04 1.04 0 0 0 .47.867m.385-6.197a.18.18 0 0 1 .086-.152.2.2 0 0 1 .098 0 .2.2 0 0 1 .073 0l5.97 2.658a.18.18 0 0 1 .11.171.17.17 0 0 1-.11.165l-5.97 2.664a.17.17 0 0 1-.171 0 .19.19 0 0 1-.086-.152z" />
    </g>
    <defs>
      <clipPath id="video-gallery_svg__a">
        <path fill="#fff" d="M0 .5h22v22H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgVideoGallery
