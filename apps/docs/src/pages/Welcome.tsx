import './Tokens.css';

export default function Welcome() {
  return (
    <div className="tokens-page">
      <h1
        className="heading-5"
        style={{
          color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          marginBottom: '24px',
        }}
      >
        Welcome to AS Design System
      </h1>

      <section className="tokens-section">
        <p className="body-large" style={{ marginBottom: '24px', lineHeight: '1.6' }}>
          AS Design System is a comprehensive design system for React applications.
          Unlike traditional libraries, components are copied directly into your project,
          giving you full ownership and control over the code.
        </p>

        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          What's Included
        </h2>
        <div className="tokens-grid" style={{ marginBottom: '32px' }}>
          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>5 Components</p>
            <p className="body-small">Button, IconButton, Tab, Icon, ToolIcons</p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>Design Tokens</p>
            <p className="body-small">Colors, Typography (CSS + TypeScript)</p>
          </div>

          <div className="token-item">
            <p className="legend-bold" style={{ marginBottom: '8px' }}>37 Icons</p>
            <p className="body-small">Airbus-specific and common UI icons</p>
          </div>
        </div>

        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Quick Start
        </h2>
        <div className="code-block">
          <code>{`# Install and initialize
npx @as-design-system/cli init

# Add components
asds add button icon-button`}</code>
        </div>
      </section>
    </div>
  );
}
