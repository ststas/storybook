import { type SVGProps, forwardRef } from 'react';

export const MinusIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function MinusIcon(props, ref) {
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
          clipRule="evenodd"
          d="M24 13.25H0v-2h24z"
          fill="currentColor"
          fillRule="evenodd"
          shapeRendering="crispEdges"
        />
      </svg>
    );
  },
);

MinusIcon.displayName = 'BalthazarUI.MinusIcon';
