"use client"

import React from "react"
import * as ReactCheckbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Input } from "./input"

interface CheckboxProps {
  checked: boolean
  onCheckedChange: (name: string, checked: ReactCheckbox.CheckedState) => void
  name: string
  placeholder?: string
  inputRef?: React.RefObject<HTMLInputElement>
}

const CheckboxInput = ({
  name,
  checked,
  onCheckedChange,
  placeholder,
  inputRef,
}: CheckboxProps) => {
  return (
    <div className="flex space-x-2">
      <ReactCheckbox.Root
        id={name}
        checked={checked}
        name={name}
        onCheckedChange={(checked) => onCheckedChange(name, checked)}
        className={cn(
          "CheckboxRoot h-[25px] w-[28px] rounded-[10px] bg-accent",
          {
            "bg-primary": checked,
          },
        )}
      >
        <ReactCheckbox.Indicator className="CheckboxIndicator">
          <CheckIcon width={28} height={25} />
        </ReactCheckbox.Indicator>
      </ReactCheckbox.Root>
      <Input
        ref={inputRef}
        disabled={!checked}
        variant="underline"
        placeholder={placeholder}
      />
    </div>
  )
}

export default CheckboxInput
