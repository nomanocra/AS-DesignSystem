import { useState } from 'react';
import './Welcome.css';

export default function Welcome() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="welcome-page">
      {/* Hero Section */}
      <section className="welcome-hero">
        <div className="welcome-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          AS Design System
        </div>
        <h1 className="welcome-title">
          Build beautiful apps<br />with full control
        </h1>
        <p className="welcome-subtitle">
          A comprehensive design system for React. Copy components directly into your project
          and customize them freely. No runtime dependencies.
        </p>

        <div className="welcome-quickstart">
          <div className="welcome-code-block">
            <code>npx @as-design-system/cli init</code>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard('npx @as-design-system/cli init')}
              title="Copy to clipboard"
            >
              {copiedCommand === 'npx @as-design-system/cli init' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="welcome-stats">
        <div className="welcome-stat">
          <div className="welcome-stat-value">6</div>
          <div className="welcome-stat-label">Components</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">40+</div>
          <div className="welcome-stat-label">Icons</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">20+</div>
          <div className="welcome-stat-label">Tool Icons</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">100%</div>
          <div className="welcome-stat-label">TypeScript</div>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: '48px' }}>
        <h2 className="welcome-section-title">Why AS Design System?</h2>
        <div className="welcome-features">
          <div className="welcome-feature">
            <div className="welcome-feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className="welcome-feature-title">Full Ownership</h3>
            <p className="welcome-feature-desc">
              Components are copied directly into your project. Modify, extend, or refactor as needed.
            </p>
          </div>

          <div className="welcome-feature">
            <div className="welcome-feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h3 className="welcome-feature-title">Design Tokens</h3>
            <p className="welcome-feature-desc">
              Consistent colors, typography, and spacing. Available as CSS variables and TypeScript.
            </p>
          </div>

          <div className="welcome-feature">
            <div className="welcome-feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3 className="welcome-feature-title">Zero Runtime</h3>
            <p className="welcome-feature-desc">
              No external runtime dependencies. Just React, CSS, and your code.
            </p>
          </div>

          <div className="welcome-feature">
            <div className="welcome-feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="welcome-feature-title">Type Safe</h3>
            <p className="welcome-feature-desc">
              Built with TypeScript. Full autocomplete and type checking out of the box.
            </p>
          </div>

          <div className="welcome-feature">
            <div className="welcome-feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="welcome-feature-title">Easy Updates</h3>
            <p className="welcome-feature-desc">
              Update components with a single CLI command while keeping your customizations.
            </p>
          </div>

          <div className="welcome-feature">
            <div className="welcome-feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3 className="welcome-feature-title">Modular</h3>
            <p className="welcome-feature-desc">
              Install only what you need. Each component is independent and self-contained.
            </p>
          </div>
        </div>
      </section>

      {/* CLI Commands */}
      <section>
        <h2 className="welcome-section-title">CLI Commands</h2>
        <div className="welcome-commands">
          <div className="welcome-command">
            <code className="welcome-command-code">asds init</code>
            <span className="welcome-command-desc">Initialize the design system in your project</span>
          </div>
          <div className="welcome-command">
            <code className="welcome-command-code">asds add button</code>
            <span className="welcome-command-desc">Add a component to your project</span>
          </div>
          <div className="welcome-command">
            <code className="welcome-command-code">asds list</code>
            <span className="welcome-command-desc">List all available components</span>
          </div>
          <div className="welcome-command">
            <code className="welcome-command-code">asds update</code>
            <span className="welcome-command-desc">Update installed components to latest version</span>
          </div>
        </div>
      </section>
    </div>
  );
}
