"use client"

import React from "react"
import * as ReactCheckbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  label: React.ReactNode
  checked: boolean
  onChange: (name: string, checked: ReactCheckbox.CheckedState) => void
  name: string
  disabled?: boolean
}

const Checkbox = ({
  label,
  checked,
  onChange,
  name,
  disabled,
}: CheckboxProps) => {
  return (
    <div className="flex space-x-2">
      <ReactCheckbox.Root
        id={name}
        checked={checked}
        name={name}
        disabled={disabled}
        onCheckedChange={(checked) => onChange(name, checked)}
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
      <label className="Label" htmlFor="c1">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
