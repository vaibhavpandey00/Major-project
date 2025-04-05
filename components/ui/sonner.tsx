"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps[ "theme" ]}
      className="toaster group"
      style={
        {
          "--sonner-z-index": "9999",
          "background": "#A14CDA",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
