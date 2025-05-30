import Image from "next/image";

function TokenIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/icons/coin-icon.svg"
      alt="token icon"
      width={20}
      height={20}
      className={className}
      priority
    />
  );
}
export default TokenIcon;
