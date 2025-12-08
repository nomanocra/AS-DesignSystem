import './Tokens.css';

export default function SupportedPlatforms() {
  return (
    <div className="tokens-page">
      <h1
        className="heading-5"
        style={{
          color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          marginBottom: '24px',
        }}
      >
        Supported Platforms
      </h1>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Framework Support
        </h2>
        <div className="tokens-grid">
          <div className="token-item" style={{ backgroundColor: 'var(--success-background)' }}>
            <p className="legend-bold" style={{ marginBottom: '8px', color: 'var(--success-default)' }}>
              ✓ React 18+
            </p>
            <p className="body-small">
              Fully supported. All components are built with React 18 and hooks.
            </p>
          </div>

          <div className="token-item" style={{ backgroundColor: 'var(--background-secondary)' }}>
            <p className="legend-bold" style={{ marginBottom: '8px' }}>
              Future: Vue, Angular
            </p>
            <p className="body-small">
              Support for other frameworks is planned for future releases.
            </p>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Build Tools
        </h2>
        <p className="body-large" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          AS Design System works with all modern React build tools:
        </p>
        <div className="tokens-grid">
          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Vite</p>
            <p className="body-small" style={{ marginBottom: '8px' }}>
              Recommended for new projects. Fast development and excellent TypeScript support.
            </p>
            <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Status: ✅ Fully Supported
            </p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Create React App</p>
            <p className="body-small" style={{ marginBottom: '8px' }}>
              Classic React setup tool. Works well with path aliases via tsconfig.
            </p>
            <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Status: ✅ Fully Supported
            </p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Next.js</p>
            <p className="body-small" style={{ marginBottom: '8px' }}>
              React framework with SSR. Components work in both App Router and Pages Router.
            </p>
            <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Status: ✅ Supported
            </p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Other Build Tools</p>
            <p className="body-small" style={{ marginBottom: '8px' }}>
              Webpack, Parcel, Rollup, etc. Should work if they support React and CSS imports.
            </p>
            <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Status: ⚠️ Not Tested
            </p>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          TypeScript Support
        </h2>
        <p className="body-large" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          AS Design System is built with TypeScript and provides full type support:
        </p>
        <ul style={{ paddingLeft: '24px', lineHeight: '1.8', marginBottom: '16px' }}>
          <li className="body-medium">All components have TypeScript type definitions</li>
          <li className="body-medium">Design tokens are typed for autocomplete</li>
          <li className="body-medium">Works with TypeScript 5.0+</li>
          <li className="body-medium">Supports strict mode</li>
        </ul>
        <div className="code-block">
          <code>{`// TypeScript types are included
import { Button, ButtonProps } from '@/design-system/components/Button';
import { colors, ColorToken } from '@/design-system/tokens/colors';

// Full autocomplete and type checking
const props: ButtonProps = {
  variant: 'primary', // ✓ Type-checked
  size: 'M',
  onClick: () => console.log('clicked')
};`}</code>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          JavaScript Support
        </h2>
        <p className="body-large" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          While the design system is built with TypeScript, it also works in JavaScript projects:
        </p>
        <ul style={{ paddingLeft: '24px', lineHeight: '1.8' }}>
          <li className="body-medium">The CLI can be used in non-TypeScript projects</li>
          <li className="body-medium">Components will be copied as .tsx files but work in .jsx</li>
          <li className="body-medium">You can convert copied .tsx files to .jsx if needed</li>
          <li className="body-medium">Design tokens work the same way</li>
        </ul>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Browser Support
        </h2>
        <p className="body-large" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Components and tokens work in all modern browsers:
        </p>
        <div className="tokens-grid">
          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Chrome / Edge</p>
            <p className="body-small">Latest 2 versions ✅</p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Firefox</p>
            <p className="body-small">Latest 2 versions ✅</p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Safari</p>
            <p className="body-small">Latest 2 versions ✅</p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Mobile Browsers</p>
            <p className="body-small">iOS Safari, Chrome Mobile ✅</p>
          </div>
        </div>
        <p className="body-medium" style={{ marginTop: '16px', lineHeight: '1.6' }}>
          Note: CSS custom properties (variables) are used extensively. IE11 is not supported.
        </p>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Package Managers
        </h2>
        <p className="body-large" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          The CLI works with all major Node.js package managers:
        </p>
        <div className="tokens-grid">
          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>pnpm</p>
            <p className="body-small">
              Recommended. Fast and disk-efficient. ✅
            </p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>npm</p>
            <p className="body-small">
              Default Node.js package manager. ✅
            </p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>yarn</p>
            <p className="body-small">
              Classic and Berry versions supported. ✅
            </p>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Node.js Requirements
        </h2>
        <div className="token-item" style={{ backgroundColor: 'var(--background-secondary)' }}>
          <p className="body-large" style={{ marginBottom: '8px' }}>
            <strong>Minimum Version:</strong> Node.js 18.0.0
          </p>
          <p className="body-medium" style={{ lineHeight: '1.6' }}>
            The CLI requires Node.js 18 or higher for ESM support and modern JavaScript features.
            We recommend using the latest LTS version for best compatibility.
          </p>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Operating Systems
        </h2>
        <div className="tokens-grid">
          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>macOS</p>
            <p className="body-small">✅ Fully tested and supported</p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Linux</p>
            <p className="body-small">✅ Tested on Ubuntu, should work on all distributions</p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Windows</p>
            <p className="body-small">✅ Supported via WSL2 or native</p>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Testing Compatibility
        </h2>
        <p className="body-large" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Components work with popular testing libraries:
        </p>
        <ul style={{ paddingLeft: '24px', lineHeight: '1.8' }}>
          <li className="body-medium">
            <strong>Jest + React Testing Library</strong> - Recommended setup ✅
          </li>
          <li className="body-medium">
            <strong>Vitest</strong> - Modern alternative to Jest ✅
          </li>
          <li className="body-medium">
            <strong>Cypress / Playwright</strong> - For E2E testing ✅
          </li>
        </ul>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Reporting Issues
        </h2>
        <p className="body-large" style={{ lineHeight: '1.6' }}>
          If you encounter compatibility issues with your platform or build tool, please report
          them on our GitHub repository. We're continuously working to expand platform support.
        </p>
      </section>
    </div>
  );
}
