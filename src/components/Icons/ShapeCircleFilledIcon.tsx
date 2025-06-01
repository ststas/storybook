import { type SVGProps, forwardRef } from 'react';

export const ShapeCircleFilledIcon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(function ShapeCircleFilledIcon(props, ref) {
  return (
    <svg
      ref={ref}
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.5,12.5c0,6.6-5.4,12-12,12c-6.6,0-12-5.4-12-12c0-6.6,5.4-12,12-12C19.1,0.5,24.5,5.9,24.5,12.5z"
        fill="currentColor"
      />
    </svg>
  );
});

ShapeCircleFilledIcon.displayName = 'BalthazarUI.ShapeCircleFilledIcon';
