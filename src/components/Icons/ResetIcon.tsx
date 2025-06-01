import { type SVGProps, forwardRef } from 'react';

export const ResetIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function ResetIcon(props, ref) {
    return (
      <svg
        ref={ref}
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="m17.9 9.3 3.1 2.9 3-2.8-.7-.7-1.8 1.7c0-.3-.1-.6-.2-.8-.5-2-1.6-3.8-3.1-5.2-1.9-1.8-4.3-2.9-6.8-3.1s-5 .5-7.1 1.9c-1.2.9-2.1 2-2.8 3.2-2.9 4.9-1.5 11.2 3.2 14.4q1.5 1.05 3.3 1.5c2.5.7 5.1.4 7.4-.7 1.6-.8 3-1.9 4.1-3.4.1-.1.2-.3.3-.4l-.9-.5c-1.2 1.8-3 3.2-5.1 3.9-3.1 1-6.5.3-9-1.7-.7-.6-1.4-1.3-1.9-2.1l-.6-.9C.8 13.9.7 10.7 1.9 8c.1-.4.3-.7.5-1 .1-.2.2-.3.3-.5.2-.3.4-.5.6-.7.5-.7 1-1.2 1.7-1.7 1.8-1.3 4-1.9 6.3-1.7s4.5 1.2 6.1 2.8c1.2 1.1 2.1 2.6 2.6 4.1.1.3.2.6.2.9l-1.7-1.6z"
          fill="currentColor"
        />
      </svg>
    );
  },
);

ResetIcon.displayName = 'BalthazarUI.ResetIcon';
