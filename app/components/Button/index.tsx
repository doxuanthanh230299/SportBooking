import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
    [
        "inline-flex items-center justify-center",
        "rounded-xl font-medium transition-all",
        "disabled:pointer-events-none disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                primary: "bg-primary-500 text-white hover:bg-primary-600",

                secondary:
                    "bg-primary-100 text-primary-700 hover:bg-primary-200",

                outline:
                    "border border-primary-500 text-primary-500 hover:bg-primary-50",

                ghost: "bg-transparent text-text-primary hover:bg-gray-100",

                success: "bg-green-500 text-white hover:bg-green-600",

                danger: "bg-red-500 text-white hover:bg-red-600",

                warning: "bg-amber-500 text-white hover:bg-amber-600",
            },

            size: {
                sm: "h-9 px-3 text-sm gap-1.5",
                md: "h-11 px-4 text-base gap-2",
                lg: "h-13 px-6 text-lg gap-2.5",
            },

            fullWidth: {
                true: "w-full",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            leftIcon,
            rightIcon,
            children,
            fullWidth,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        fullWidth,
                    }),
                    className,
                )}
                {...props}
            >
                {leftIcon && (
                    <span className="flex items-center">{leftIcon}</span>
                )}

                <span>{children}</span>

                {rightIcon && (
                    <span className="flex items-center">{rightIcon}</span>
                )}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
