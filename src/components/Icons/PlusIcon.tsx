import { type SVGProps, forwardRef } from 'react';

export const PlusIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function PlusIcon(props, ref) {
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
          d="M11.123 0v11.123H0v1.754h11.123V24h1.754V12.877H24v-1.754H12.877V0z"
          fill="currentColor"
          shapeRendering="crispEdges"
        />
      </svg>
    );
  },
);

PlusIcon.displayName = 'BalthazarUI.PlusIcon';
