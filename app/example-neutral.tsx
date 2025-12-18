import React from 'react';

export default function NeutralThemeExample() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Neutral Theme Example
          </h1>
          <p className="text-lg text-secondary-text">
            A clean, professional documentation theme with neutral gray tones
          </p>
        </header>

        {/* Color Palette Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Color Palette</h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Light Mode Colors */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Light Mode</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded border border-neutral-200 bg-white"></div>
                  <span className="text-sm">Background #ffffff</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-neutral-100"></div>
                  <span className="text-sm">Neutral 100</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-neutral-200"></div>
                  <span className="text-sm">Neutral 200</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-neutral-500"></div>
                  <span className="text-sm text-white">Neutral 500</span>
                </div>
              </div>
            </div>

            {/* Dark Mode Colors */}
            <div className="dark bg-neutral-950 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-neutral-50">Dark Mode</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded border border-neutral-700 bg-neutral-950"></div>
                  <span className="text-sm text-neutral-200">Background #141414</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-neutral-900"></div>
                  <span className="text-sm text-neutral-200">Neutral 900</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-neutral-800"></div>
                  <span className="text-sm text-neutral-200">Neutral 800</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-neutral-500"></div>
                  <span className="text-sm text-neutral-200">Neutral 500</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Typography</h2>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Heading Level 1</h1>
              <p className="text-sm text-muted-text">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Heading Level 2</h2>
              <p className="text-sm text-muted-text">text-3xl font-bold</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Heading Level 3</h3>
              <p className="text-sm text-muted-text">text-2xl font-bold</p>
            </div>
            <div>
              <p className="text-base mb-2">Body text - This is the standard paragraph text used throughout the documentation site.</p>
              <p className="text-sm text-muted-text">text-base leading-7</p>
            </div>
          </div>
        </section>

        {/* Component Examples */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Components</h2>

          <div className="space-y-6">
            {/* Cards */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-white p-6 shadow-sm dark:bg-neutral-900">
                  <h4 className="text-lg font-semibold mb-2">Card Title</h4>
                  <p className="text-sm text-secondary-text">
                    This is a card component with neutral styling. It uses subtle borders and shadows.
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
                  <h4 className="text-lg font-semibold mb-2">Secondary Card</h4>
                  <p className="text-sm text-secondary-text">
                    Cards can have different background colors for visual hierarchy.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90">
                  Primary Button
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100">
                  Secondary Button
                </button>
                <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-accent transition-colors hover:text-accent/80">
                  Ghost Button
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Form Inputs</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Text Input</label>
                  <input
                    type="text"
                    placeholder="Enter text..."
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Block Example */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-6">Code Example</h2>
          <pre className="rounded-lg border border-border bg-neutral-50 p-4 overflow-x-auto dark:bg-neutral-950 dark:border-neutral-700">
            <code className="text-sm font-mono text-foreground">
{`// Neutral theme configuration
const neutralTheme = {
  colors: {
    background: '#ffffff',
    foreground: '#1a1a1a',
    border: '#e6e6e6',
    accent: '#3b82f6',
  },
  darkMode: {
    background: '#141414',
    foreground: '#fafafa',
  }
}`}
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
}
