import * as React from "react"
import type { SVGProps } from "react"
const SvgKey = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 23"
    {...props}
  >
    <path
      fill="currentColor"
      d="M14.938 2.193a6.186 6.186 0 0 0-5.921 7.984l-7.142 7.141v4.125H6l7.142-7.141a6.188 6.188 0 1 0 1.796-12.109m0 11c-.474 0-.945-.07-1.398-.207l-.788-.24-.582.583-2.187 2.187-.948-.948-.973.973.949.947-1.09 1.09-.949-.947-.972.972.948.948-1.517 1.517H3.25v-2.18l6.739-6.74.583-.582-.24-.788a4.813 4.813 0 1 1 4.605 3.415"
    />
    <path
      fill="currentColor"
      d="M15.625 9.068a1.375 1.375 0 1 0 0-2.75 1.375 1.375 0 0 0 0 2.75"
    />
  </svg>
)
export default SvgKey
