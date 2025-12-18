import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const gradientVariants = cva(
  'pointer-events-none absolute inset-0 -z-10',
  {
    variants: {
      variant: {
        radial:
          'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-100 via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-black',
        linear:
          'bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-black',
        mesh:
          'bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(0,0,0,0))]',
        dots:
          'bg-[radial-gradient(circle_at_1px_1px,_rgb(163_163_163_/_20%)_1px,_transparent_0)] [background-size:24px_24px] dark:bg-[radial-gradient(circle_at_1px_1px,_rgb(64_64_64_/_40%)_1px,_transparent_0)]',
        grid:
          'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]',
        spotlight:
          'bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-neutral-200/50 via-transparent to-transparent dark:from-neutral-800/50',
      },
      animated: {
        true: 'animate-gradient',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'radial',
      animated: false,
    },
  }
);

export interface GradientBgProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientVariants> {
  overlay?: boolean;
}

export const GradientBg: React.FC<GradientBgProps> = ({
  variant,
  animated,
  overlay = false,
  className,
  ...props
}) => {
  return (
    <>
      <div
        className={`${gradientVariants({ variant, animated })} ${className || ''}`}
        {...props}
      />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-white/50 dark:bg-black/50" />
      )}
    </>
  );
};

// Optional: Add this to your Tailwind config for the animate-gradient
// animation: {
//   gradient: 'gradient 8s ease infinite',
// },
// keyframes: {
//   gradient: {
//     '0%, 100%': { backgroundPosition: '0% 50%' },
//     '50%': { backgroundPosition: '100% 50%' },
//   },
// },
