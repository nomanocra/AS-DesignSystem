import './Tokens.css';

export default function Installation() {
  return (
    <div className="tokens-page">
      <h1
        className="heading-5"
        style={{
          color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          marginBottom: '24px',
        }}
      >
        Installation
      </h1>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Prerequisites
        </h2>
        <ul style={{ paddingLeft: '24px', lineHeight: '1.8', marginBottom: '24px' }}>
          <li className="body-medium">Node.js 18+</li>
          <li className="body-medium">React 18+ project (Vite, CRA, or Next.js)</li>
          <li className="body-medium">pnpm, npm, or yarn</li>
        </ul>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Installation Steps
        </h2>

        <div className="code-block" style={{ marginBottom: '24px' }}>
          <code>{`# 1. Initialize your project
cd your-react-project
npx @as-design-system/cli init

# 2. Add components
asds add button icon-button

# 3. List available components
asds list`}</code>
        </div>

        <p className="body-medium" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          The CLI will automatically:
        </p>
        <ul style={{ paddingLeft: '24px', lineHeight: '1.8' }}>
          <li className="body-medium">Create <code>src/design-system/</code> directory</li>
          <li className="body-medium">Copy component files to your project</li>
          <li className="body-medium">Resolve dependencies automatically</li>
          <li className="body-medium">Update your global CSS with token imports</li>
        </ul>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Project Structure
        </h2>
        <div className="code-block">
          <code>{`your-project/
├── src/
│   ├── design-system/
│   │   ├── components/    # React components
│   │   ├── tokens/        # Design tokens (CSS + TS)
│   │   └── icons/         # Icon components
│   └── index.css          # Updated with imports
├── asds.config.json       # CLI configuration
└── tsconfig.json          # Updated with aliases`}</code>
        </div>
      </section>
    </div>
  );
}
