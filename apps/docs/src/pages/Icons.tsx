import { useState } from 'react';
import './Tokens.css';
import './Icons.css';
import { Icon, availableIcons } from '@as-design-system/core';
import { Modal } from '../components/Modal';
import '../components/Modal.css';

// List of available icons (automatically synced from Icon component)
const iconNames = [...availableIcons];

// Available sizes
const sizes = [16, 20, 24, 32, 40] as const;
type IconSize = (typeof sizes)[number];

// Available colors with their CSS variable names
const colorOptions = [
  { label: 'Primary', value: 'var(--primary-default, #063b9e)' },
  { label: 'Error', value: 'var(--feedback-error-default, #e4002b)' },
  { label: 'Warning', value: 'var(--feedback-warning-default, #ffc929)' },
  { label: 'Success', value: 'var(--feedback-success-default, #08875b)' },
] as const;
type ColorOption = (typeof colorOptions)[number];

export default function Icons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<IconSize>(24);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorOptions[0]);

  const filteredIcons = iconNames.filter((iconName) =>
    iconName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="tokens-page">
      <div className="icons-header">
        <h1
          className="heading-5"
          style={{
            color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          }}
        >
          Icons
        </h1>
      </div>

      {/* Controls Bar */}
      <div className="icons-controls">
        <input
          type="text"
          placeholder="Search an icon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="icon-search"
        />

        {/* Size Selector */}
        <div className="icons-setting">
          <span className="icons-setting-label">Size</span>
          <div className="icons-setting-options">
            {sizes.map((size) => (
              <button
                key={size}
                className={`icons-setting-option ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="icons-setting">
          <span className="icons-setting-label">Color</span>
          <div className="icons-setting-options">
            {colorOptions.map((color) => (
              <button
                key={color.label}
                className={`icons-setting-option icons-color-option ${selectedColor.label === color.label ? 'active' : ''}`}
                onClick={() => setSelectedColor(color)}
                style={{ '--option-color': color.value } as React.CSSProperties}
              >
                <span
                  className="icons-color-dot"
                  style={{ backgroundColor: color.value }}
                />
                {color.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="tokens-section">
        <div className="icons-grid">
          {filteredIcons.map((iconName) => (
            <div
              key={iconName}
              className="icon-item clickable"
              onClick={() => setSelectedIcon(iconName)}
              style={{ cursor: 'pointer' }}
              title="Click to see usage"
            >
              <div className="icon-preview">
                <Icon name={iconName} size={selectedSize} color={selectedColor.value} />
              </div>
              <code className="icon-name">{iconName}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Icon Code Modal */}
      <Modal
        isOpen={selectedIcon !== null}
        onClose={() => setSelectedIcon(null)}
        title={`Icon: ${selectedIcon}`}
      >
        {selectedIcon && (
          <div>
            {/* Icon Preview */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  padding: '32px',
                  background: 'var(--cool-grey-10, #f5f6f8)',
                  borderRadius: '8px',
                }}
              >
                <Icon name={selectedIcon} size={selectedSize} color={selectedColor.value} />
              </div>
            </div>

            {/* Code Example */}
            <div className="modal-section-title">Code</div>
            <div className="modal-code-block">
              <button
                className="modal-copy-button"
                onClick={() =>
                  copyToClipboard(`<Icon name="${selectedIcon}" size={${selectedSize}} color="${selectedColor.value}" />`)
                }
              >
                {copiedCode === `<Icon name="${selectedIcon}" size={${selectedSize}} color="${selectedColor.value}" />` ? '✓ Copied!' : 'Copy'}
              </button>
              <pre>
                <code>{`<Icon name="${selectedIcon}" size={${selectedSize}} color="${selectedColor.value}" />`}</code>
              </pre>
            </div>

            {/* In Button */}
            <div className="modal-section-title">Used in Button Component</div>
            <div className="modal-code-block">
              <button
                className="modal-copy-button"
                onClick={() =>
                  copyToClipboard(
                    `<Button variant="primary" size="M" leftIcon="${selectedIcon}">\n  Click me\n</Button>`
                  )
                }
              >
                {copiedCode === `<Button variant="primary" size="M" leftIcon="${selectedIcon}">\n  Click me\n</Button>` ? '✓ Copied!' : 'Copy'}
              </button>
              <pre>
                <code>{`<Button variant="primary" size="M" leftIcon="${selectedIcon}">
  Click me
</Button>`}</code>
              </pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
