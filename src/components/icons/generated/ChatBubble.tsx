import * as React from "react"
import type { SVGProps } from "react"
const SvgChatBubble = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.75}
      d="M8 15.5a7.5 7.5 0 1 0-6.717-4.16c.378.758-.147 1.783-.347 2.53a.975.975 0 0 0 1.194 1.194c.748-.2 1.772-.725 2.53-.347A7.5 7.5 0 0 0 8 15.5"
    />
  </svg>
)
export default SvgChatBubble
