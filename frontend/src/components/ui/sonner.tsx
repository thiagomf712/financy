import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--success-bg': 'var(--success)',
          '--success-text': 'var(--white)',
          '--success-border': 'var(--success)',
          '--error-bg': 'var(--danger)',
          '--error-text': 'var(--white)',
          '--error-border': 'var(--danger)',
          '--warning-bg': 'var(--yellow-base)',
          '--warning-text': 'var(--white)',
          '--warning-border': 'var(--yellow-base)',
          '--info-bg': 'var(--blue-base)',
          '--info-text': 'var(--white)',
          '--info-border': 'var(--blue-base)',
          '--normal-bg': 'var(--white)',
          '--normal-text': 'var(--gray-700)',
          '--normal-border': 'var(--white)',
        } as React.CSSProperties
      }
      richColors
      {...props}
    />
  )
}

export { Toaster }
