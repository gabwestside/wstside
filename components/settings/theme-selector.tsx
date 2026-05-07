"use client"

import { CheckCircle2, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { WSTSIDE_THEMES } from "@/lib/themes"
import { cn } from "@/lib/utils"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {WSTSIDE_THEMES.map((item) => (
          <div
            key={item.value}
            className="h-36 animate-pulse rounded-[1.75rem] border ws-border ws-surface-muted"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {WSTSIDE_THEMES.map((item) => {
        const isActive = theme === item.value

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setTheme(item.value)}
            className={cn(
              "group rounded-[1.75rem] border p-4 text-left transition ws-surface hover:-translate-y-0.5",
              isActive
                ? "border-[var(--ws-primary)] ring-2 ring-[var(--ws-primary)]/25"
                : "ws-border"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl ws-primary-soft">
                <Palette className="size-5" />
              </div>

              {isActive ? (
                <CheckCircle2 className="size-5 text-[var(--ws-primary)]" />
              ) : (
                <span className="rounded-full border px-2 py-1 text-[0.65rem] font-black uppercase tracking-wide ws-border ws-muted">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="mt-4">
              <p className="font-black ws-heading">{item.label}</p>
              <p className="mt-1 text-sm leading-6 ws-muted">
                {item.description}
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              {item.preview.map((color) => (
                <span
                  key={color}
                  className="size-7 rounded-full border border-white/40 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        )
      })}
    </div>
  )
}