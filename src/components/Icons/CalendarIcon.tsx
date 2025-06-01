import { type SVGProps, forwardRef } from 'react';

export const CalendarIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function CalendarIcon(props, ref) {
    return (
      <svg
        ref={ref}
        fill="none"
        height="21"
        viewBox="0 0 24 21"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M19.4,2.5V0h-1v2.5H5.6V0h-1v2.5H0V21h24V2.5H19.4L19.4,2.5z M1,20V3.5h3.6V6h1V3.5h12.9V6h1V3.5H23V20H1z"
          fill="currentColor"
        />
        <path
          d="M21,8.6H3v0.9h18V8.6z M15.5,14h-7v1h7V14z"
          fill="currentColor"
        />
      </svg>
    );
  },
);

CalendarIcon.displayName = 'BalthazarUI.CalendarIcon';
