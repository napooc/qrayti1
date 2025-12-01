import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Qrayti Custom Variants
        hero: "bg-gradient-to-r from-[hsl(18,75%,55%)] to-[hsl(38,55%,60%)] text-[hsl(0,0%,100%)] shadow-lg hover:shadow-[0_0_40px_hsl(18,75%,55%,0.25)] hover:-translate-y-1 hover:scale-105",
        heroOutline: "border-2 border-[hsl(18,75%,55%)] bg-transparent text-[hsl(18,75%,55%)] hover:bg-[hsl(18,75%,55%)] hover:text-[hsl(0,0%,100%)] shadow-md hover:-translate-y-0.5",
        navy: "bg-gradient-to-r from-[hsl(215,60%,25%)] to-[hsl(215,50%,35%)] text-[hsl(40,33%,98%)] shadow-md hover:shadow-lg hover:-translate-y-0.5",
        gold: "bg-[hsl(38,55%,60%)] text-[hsl(215,50%,18%)] shadow-md hover:bg-[hsl(38,55%,55%)] hover:shadow-lg hover:-translate-y-0.5",
        coral: "bg-[hsl(18,75%,55%)] text-[hsl(0,0%,100%)] shadow-md hover:bg-[hsl(18,75%,50%)] hover:shadow-lg",
        glass: "backdrop-blur-md bg-[hsl(0,0%,100%,0.8)] text-[hsl(215,50%,18%)] border border-[hsl(38,25%,85%,0.5)] hover:bg-[hsl(0,0%,100%,0.9)] shadow-sm hover:shadow-md",
        success: "bg-[hsl(145,65%,42%)] text-[hsl(0,0%,100%)] shadow-md hover:bg-[hsl(145,65%,38%)]",
        quiz: "bg-gradient-to-r from-[hsl(215,60%,25%)] to-[hsl(215,50%,35%)] text-[hsl(40,33%,98%)] shadow-lg hover:shadow-[0_0_40px_hsl(18,75%,55%,0.25)] hover:-translate-y-1 border-2 border-[hsl(38,55%,60%,0.3)]",
        resume: "bg-gradient-to-r from-[hsl(38,55%,60%)] to-[hsl(38,65%,75%)] text-[hsl(215,50%,18%)] shadow-lg hover:shadow-[0_0_40px_hsl(18,75%,55%,0.25)] hover:-translate-y-1 border-2 border-[hsl(215,60%,25%,0.2)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
        iconSm: "h-9 w-9 rounded-lg",
        iconLg: "h-14 w-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
