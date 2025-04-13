import Link from "next/link"
import Image from "next/image"

function Logo({
  height,
  width,
  className,
}: {
  height: number
  width: number
  className?: string
}) {
  return (
    <Link href="/">
      <Image
        width={width}
        height={height}
        src="/mybabes.svg"
        alt="MyBabes Logo"
        className={className}
      />
    </Link>
  )
}

export default Logo
