import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = ComponentProps<'button'>

export default function Button({className,...props}:ButtonProps) {
    return (
        <button 
            {...props}
            className={twMerge(
                "bg-red-600 rounded px-2 py-2 transition-colors hover:bg-red-400 disabled:opacity-30 disabled:cursor-not-allowed",
                className
            )}
        />
    )
}
