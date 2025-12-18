import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  className = '',
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={`group relative rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
          {language}
        </span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium text-neutral-600 transition-all duration-200 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="block font-mono text-neutral-800 dark:text-neutral-200">
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="mr-4 inline-block w-8 select-none text-right text-neutral-400 dark:text-neutral-600">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>

      {/* Hover effect overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 ring-1 ring-neutral-300 transition-opacity duration-200 group-hover:opacity-100 dark:ring-neutral-700" />
    </div>
  );
};
