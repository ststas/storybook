import { type SVGProps, forwardRef } from 'react';

export const UnselectBlockIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function UnselectBlockIcon(props, ref) {
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
        d="M2.216.372A2.216 2.216 0 0 0 0 2.588v3.58a.427.427 0 1 0 .853 0v-3.58c0-.752.61-1.363 1.363-1.363h3.58a.427.427 0 1 0 0-.853zM12.954.372a.427.427 0 1 0 0 .853h3.58c.753 0 1.363.61 1.363 1.363v3.58a.427.427 0 1 0 .853 0v-3.58A2.216 2.216 0 0 0 16.534.372zM0 13.326a.427.427 0 0 1 .853 0v3.58c0 .753.61 1.363 1.363 1.363h3.58a.427.427 0 1 1 0 .853h-3.58A2.216 2.216 0 0 1 0 16.906zM9.75 8.622 24 16.348l-6.777 1.807-3.612 5.467z"
        fill="currentColor"
      />
    </svg>
  );
});

UnselectBlockIcon.displayName = 'BalthazarUI.UnselectBlockIcon';
