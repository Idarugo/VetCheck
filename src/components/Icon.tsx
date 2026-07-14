/** Iconos SVG (línea, 24x24) — sin emojis, según guía de diseño. */

type IconName =
  | 'search'
  | 'shield-check'
  | 'shield-alert'
  | 'clock'
  | 'building'
  | 'document'
  | 'graduation'
  | 'award'
  | 'map-pin'
  | 'arrow-right'
  | 'check'
  | 'x'
  | 'upload'
  | 'paw'

const paths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  'shield-check': <><path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  'shield-alert': <><path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z" /><path d="M12 8v4" /><path d="M12 16h.01" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M10 21v-4h4v4" /></>,
  document: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
  graduation: <><path d="M12 4 2 9l10 5 10-5-10-5Z" /><path d="M6 11v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5" /></>,
  award: <><circle cx="12" cy="9" r="5" /><path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" /></>,
  'map-pin': <><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  'arrow-right': <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  upload: <><path d="M12 15V4M8 8l4-4 4 4" /><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  paw: <><circle cx="7" cy="9" r="2" /><circle cx="17" cy="9" r="2" /><circle cx="10" cy="5.5" r="1.8" /><circle cx="14" cy="5.5" r="1.8" /><path d="M12 12c-2.5 0-4.5 2-4.5 4.2C7.5 18 9 19 12 19s4.5-1 4.5-2.8C16.5 14 14.5 12 12 12Z" /></>,
}

export function Icon({
  name,
  size = 24,
  className,
  strokeWidth = 1.8,
}: {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}
