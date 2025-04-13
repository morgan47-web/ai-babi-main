import Email from "@/components/icons/generated/Email"
import EyeCrossed from "@/components/icons/generated/EyeCrossed"
import Key from "@/components/icons/generated/Key"
import { Input } from "@/components/ui/input"
import { useLingui } from "@lingui/react/macro"

export default function CredentialsInput({
  emailRef,
  passwordRef,
}: {
  emailRef: React.RefObject<HTMLInputElement>
  passwordRef: React.RefObject<HTMLInputElement>
}) {
  const { t } = useLingui()

  return (
    <>
      <div className="relative">
        <Email
          color={"#667085"}
          height={22}
          width={22}
          className="absolute left-3 top-[50%] -translate-y-1/2"
        />
        <Input
          type="email"
          className={`
            peer h-12 border-border bg-popover pl-10

            autofill:bg-background autofill:text-secondary
          `}
          placeholder={t`Email`}
          autoComplete="email"
          ref={emailRef}
        />
      </div>
      <div className="relative">
        <Key
          color={"#667085"}
          height={22}
          width={22}
          className="absolute left-3 top-[50%] -translate-y-1/2"
        />
        <Input
          type="password"
          className="h-12 border-border bg-popover pl-10"
          placeholder={t`Password`}
          autoComplete="current-password"
          ref={passwordRef}
        />
        <EyeCrossed
          height={22}
          width={22}
          onClick={(e) => {
            e.preventDefault()
            if (passwordRef.current) {
              passwordRef.current.type =
                passwordRef.current.type === "password" ? "text" : "password"
            }
          }}
          className="absolute right-3 top-[50%] -translate-y-1/2"
        />
      </div>
    </>
  )
}
