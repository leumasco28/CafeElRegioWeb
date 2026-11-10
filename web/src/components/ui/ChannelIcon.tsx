/**
 * Iconos de canales. Trazos simples, sin dependencias externas.
 * Todos heredan el color con currentColor.
 */
import type { SVGProps } from 'react';

export type ChannelName =
  'instagram' | 'whatsapp' | 'facebook' | 'tiktok' | 'links' | 'external' | 'chevron';

const BASE: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  width: 18,
  height: 18,
  'aria-hidden': 'true',
  focusable: 'false',
};

export default function ChannelIcon({
  name,
  className = '',
}: {
  name: ChannelName;
  className?: string;
}) {
  const props = { ...BASE, className };

  switch (name) {
    case 'instagram':
      return (
        <svg {...props}>
          <rect
            x="3.6"
            y="3.6"
            width="16.8"
            height="16.8"
            rx="4.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg {...props}>
          <path
            d="M4.2 19.8 5.5 15.7A8.1 8.1 0 1 1 8.4 18.6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.3 8.5c.3-.1.6 0 .8.3l.9 1.2c.1.2.1.4 0 .6l-.6.7c.4.9 1.1 1.6 2 2l.7-.6c.2-.1.4-.1.6 0l1.2.9c.2.2.3.5.2.8l-.3.9c-.1.4-.5.6-.9.6-3.2-.2-5.8-2.8-6-6 0-.4.2-.8.6-.9Z"
            fill="currentColor"
          />
        </svg>
      );

    case 'facebook':
      return (
        <svg {...props}>
          <path
            d="M13.4 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.4V21Z"
            fill="currentColor"
          />
        </svg>
      );

    case 'tiktok':
      return (
        <svg {...props}>
          <path
            d="M16.6 5.1c.9.9 2.1 1.4 3.4 1.4v2.6c-1.4 0-2.7-.4-3.8-1.2v6.2c0 2.9-2.3 5.2-5.2 5.2S5.8 17 5.8 14.1s2.3-5.2 5.2-5.2c.3 0 .5 0 .8.1v2.7c-.3-.1-.5-.1-.8-.1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V3.5h2.6c.1.6.2 1.1.5 1.6Z"
            fill="currentColor"
          />
        </svg>
      );

    case 'links':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3.9 12h16.2M12 3.8c2.1 2.3 3.2 5 3.2 8.2s-1.1 5.9-3.2 8.2c-2.1-2.3-3.2-5-3.2-8.2S9.9 6.1 12 3.8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );

    case 'external':
      return (
        <svg {...props}>
          <path
            d="M8 16 16 8M10.2 8H16v5.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'chevron':
      return (
        <svg {...props}>
          <path
            d="m6 9.5 6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}
