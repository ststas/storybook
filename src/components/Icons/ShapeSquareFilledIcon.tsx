import { type SVGProps, forwardRef } from 'react';

export const ShapeSquareFilledIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function ShapeSquareFilledIcon(props, ref) {
  return (
    <svg
      ref={ref}
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0.5,0.5h24v24h-24V0.5z" fill="currentColor" />
    </svg>
  );
});

ShapeSquareFilledIcon.displayName = 'BalthazarUI.ShapeSquareFilledIcon';
