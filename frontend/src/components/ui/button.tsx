import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: 'font-medium bg-brand-base text-white hover:bg-brand-dark',
        outline:
          'font-medium border bg-white shadow-xs hover:bg-gray-200 text-gray-700 border-gray-300',
        ghost:
          'hover:bg-gray-200 text-gray-700 border border-gray-300 shadow-xs',
        link: 'font-medium text-brand-base underline-offset-4 hover:underline',
        input:
          'font-medium border bg-white hover:bg-gray-200 text-gray-500 border-gray-300 justify-start',
      },
      size: {
        default: 'h-12 px-4 py-3',
        sm: 'h-9 px-3 py-2 text-sm',
        icon: 'size-8 p-2',
        input: 'px-3 py-3.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
