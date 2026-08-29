import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none cursor-pointer text-sm font-bold uppercase tracking-wide border-[3px] border-foreground transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0_0_var(--foreground)]",
        destructive:
          "bg-brutal-pink text-foreground brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px]",
        outline:
          "border-[3px] border-foreground bg-background brutal-shadow hover:bg-muted",
        secondary:
          "bg-brutal-cyan text-foreground brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px]",
        ghost: "border-transparent shadow-none hover:bg-muted",
        link: "border-transparent shadow-none text-foreground underline-offset-4 hover:underline font-semibold normal-case tracking-normal",
        brutalYellow:
          "bg-brutal-yellow text-foreground brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px]",
        brutalLime:
          "bg-brutal-lime text-foreground brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px]",
        brutalOrange:
          "bg-brutal-orange text-foreground brutal-shadow hover:translate-x-[-1px] hover:translate-y-[-1px]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
