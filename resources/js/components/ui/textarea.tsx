import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
  "border-input placeholder:text-muted-foreground focus-visible:border-blue-500 focus-visible:ring-blue-500/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent dark:bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-gray-900 dark:text-gray-100 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
