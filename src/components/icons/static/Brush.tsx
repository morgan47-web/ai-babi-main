import * as React from "react"
import type { SVGProps } from "react"

interface SvgBrushProps extends SVGProps<SVGSVGElement> {
  color1?: string // Start color of the gradient
  color2?: string // End color of the gradient
}

const SvgBrush: React.FC<SvgBrushProps> = ({
  color1 = "hsl(var(--border))",
  color2 = "hsl(var(--primary))",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 33 36"
    {...props}
  >
    <defs>
      {/* Define the linear gradient */}
      <linearGradient id="brushGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="30%" stopColor={color1} />
        <stop offset="100%" stopColor={color2} />
      </linearGradient>
    </defs>
    <path
      fill="url(#brushGradient)"
      d="m21.404 12.265.748 2.302a4.73 4.73 0 0 0 3.008 3.004l2.303.748.045.013a.909.909 0 0 1 0 1.715l-2.303.749a4.73 4.73 0 0 0-3.007 3.003l-.749 2.3a.91.91 0 0 1-1.715 0l-.75-2.3a4.73 4.73 0 0 0-3.006-3.016l-2.303-.748a.91.91 0 0 1 0-1.716l2.303-.748a4.73 4.73 0 0 0 2.96-3.004l.748-2.3a.909.909 0 0 1 1.718-.002M31.95 29.318l-1.647-.533a3.4 3.4 0 0 1-2.146-2.146l-.537-1.644a.65.65 0 0 0-1.226 0l-.533 1.644a3.4 3.4 0 0 1-2.115 2.146l-1.645.533a.652.652 0 0 0-.314.99.65.65 0 0 0 .314.236l1.645.535a3.4 3.4 0 0 1 2.15 2.154l.533 1.643a.649.649 0 0 0 1.225 0l.536-1.642a3.4 3.4 0 0 1 2.147-2.148l1.645-.534a.65.65 0 0 0 0-1.225zM10.917.908v5.375a1.075 1.075 0 0 0 2.15 0V.908h2.15v7.53a1.075 1.075 0 0 0 2.15 0V.907h3.224a1.075 1.075 0 0 1 1.075 1.075v7.74a3.06 3.06 0 0 0-4.007 1.828l-.009.025-.754 2.325a2.58 2.58 0 0 1-1.604 1.634l-1.307.423H.167V1.983A1.075 1.075 0 0 1 1.242.908zm.193 17.2H.167v2.159a4.3 4.3 0 0 0 4.3 4.3h3.225v7.516a3.225 3.225 0 0 0 6.45 0v-7.52h2.831l-.03-.093v-.004a2.6 2.6 0 0 0-.765-1.144 2.6 2.6 0 0 0-.873-.499l-2.322-.752-.024-.011a3.06 3.06 0 0 1-1.849-3.952"
    />
  </svg>
)
export default SvgBrush
