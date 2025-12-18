import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 ${className}`}
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-neutral-800/50" />

      <div className="relative">
        {/* Icon with animation */}
        <div className="mb-4 inline-flex rounded-lg bg-neutral-100 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-neutral-200 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
          <Icon className="h-6 w-6 text-neutral-700 transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100" />
        </div>

        {/* Title with slide animation */}
        <h3 className="mb-2 text-lg font-semibold text-neutral-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-neutral-100">
          {title}
        </h3>

        {/* Description with fade animation */}
        <p className="text-sm text-neutral-600 transition-all duration-300 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-neutral-400 to-neutral-600 transition-all duration-300 group-hover:w-full dark:from-neutral-600 dark:to-neutral-400" />
    </div>
  );
};
