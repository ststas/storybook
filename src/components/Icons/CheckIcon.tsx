import { type SVGProps, forwardRef } from 'react';

export const CheckIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function CheckIcon(props, ref) {
    return (
      <svg
        ref={ref}
        fill="none"
        height="11"
        viewBox="0 0 15 11"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M0,5.4L5.5,11L15,1.4L13.6,0L5.5,8.2L1.4,4L0,5.4z"
          fill="currentColor"
        />
      </svg>
    );
  },
);

CheckIcon.displayName = 'BalthazarUI.CheckIcon';
