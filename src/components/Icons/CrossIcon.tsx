import { type SVGProps, forwardRef } from 'react';

export const CrossIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function CrossIcon(props, ref) {
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
          d="M12 11 1 0 0 1l11 11L0 23l1 1 11-11 11 11 1-1-11-11L24 1l-1-1z"
          fill="currentColor"
        />
      </svg>
    );
  },
);

CrossIcon.displayName = 'BalthazarUI.CrossIcon';
