import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface QuickLinkCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const QuickLinkCard: React.FC<QuickLinkCardProps> = ({
  href,
  icon: Icon,
  title,
  description,
  className = '',
}) => {
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-lg border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-neutral-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600 ${className}`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 translate-y-full bg-gradient-to-br from-neutral-100 to-neutral-50 transition-transform duration-300 group-hover:translate-y-0 dark:from-neutral-800 dark:to-neutral-900" />

      <div className="relative flex items-start gap-4">
        {/* Icon container */}
        <div className="flex-shrink-0 rounded-lg bg-neutral-100 p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-neutral-200 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
          <Icon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
              {title}
            </h3>

            {/* Arrow icon with animation */}
            <ArrowRight className="h-4 w-4 flex-shrink-0 text-neutral-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-600 dark:text-neutral-600 dark:group-hover:text-neutral-400" />
          </div>

          <p className="text-sm text-neutral-600 transition-colors duration-300 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom highlight line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full dark:bg-neutral-100" />
    </a>
  );
};
