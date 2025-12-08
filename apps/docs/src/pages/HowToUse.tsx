import './Tokens.css';

export default function HowToUse() {
  return (
    <div className="tokens-page">
      <h1
        className="heading-5"
        style={{
          color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          marginBottom: '24px',
        }}
      >
        How to Use
      </h1>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Using Components
        </h2>
        <p className="body-medium" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Import components from your local design-system directory:
        </p>
        <div className="code-block">
          <code>{`import { Button } from '@/design-system/components/Button';
import { Icon } from '@/design-system/components/Icon';

function MyComponent() {
  return (
    <Button
      variant="primary"
      size="M"
      leftIcon="add"
    >
      Add Item
    </Button>
  );
}`}</code>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Using Colors
        </h2>
        <p className="body-medium" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Use colors as CSS variables or TypeScript constants:
        </p>
        <div className="code-block">
          <code>{`/* CSS Variables (in your .css files) */
.my-element {
  color: var(--text-main);
  background-color: var(--primary-default);
}

/* TypeScript Constants (in your .tsx files) */
import { colors } from '@/design-system/tokens/colors';

const MyComponent = () => (
  <div style={{ color: colors.primary.default }}>
    Content
  </div>
);`}</code>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ color: 'var(--text-corporate)', marginBottom: '16px' }}>
          Using Text Styles
        </h2>
        <p className="body-medium" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Apply pre-defined text style classes directly in your JSX:
        </p>
        <div className="code-block">
          <code>{`function MyComponent() {
  return (
    <div>
      <h1 className="heading-1">Main Title</h1>
      <p className="body-large">This is body text</p>
      <span className="legend-bold">Legend text</span>
    </div>
  );
}`}</code>
        </div>
        <p className="body-small" style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
          See the <strong>Text Styles</strong> page for all available classes.
        </p>
      </section>
    </div>
  );
}
