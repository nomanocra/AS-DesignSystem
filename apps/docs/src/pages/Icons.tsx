import { useState } from 'react';
import './Tokens.css';
import { Icon, availableIcons } from '@as-design-system/core';
import { Modal } from '../components/Modal';
import '../components/Modal.css';

// List of available icons (automatically synced from Icon component)
const iconNames = [...availableIcons];

export default function Icons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
        <input
          type="text"
          placeholder="Search an icon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="icon-search"
        />
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
                <Icon name={iconName} size={24} />
              </div>
              <code className="icon-name">{iconName}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="tokens-section">
        <h2
          className="heading-6"
          style={{
            marginTop: '32px',
            marginBottom: '16px',
            color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          }}
        >
          Usage
        </h2>
        <div className="usage-example">
          <pre className="code-block">
            <code>{`import { Icon } from '@/design-system/components/Icon';

// Basic usage
<Icon name="AIR_fleet" />

// With custom size
<Icon name="add" size={32} />

// With custom color
<Icon name="delete" size={24} color="var(--primary-default)" />`}</code>
          </pre>
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
                <Icon name={selectedIcon} size={48} />
              </div>
            </div>

            {/* Basic Icon Usage */}
            <div className="modal-section-title">Basic Usage</div>
            <div className="modal-code-block">
              <button
                className="modal-copy-button"
                onClick={() =>
                  copyToClipboard(`<Icon name="${selectedIcon}" />`)
                }
              >
                {copiedCode === `<Icon name="${selectedIcon}" />` ? '✓ Copied!' : 'Copy'}
              </button>
              <pre>
                <code>{`<Icon name="${selectedIcon}" />`}</code>
              </pre>
            </div>

            {/* With Size */}
            <div className="modal-section-title">With Custom Size</div>
            <div className="modal-code-block">
              <button
                className="modal-copy-button"
                onClick={() =>
                  copyToClipboard(`<Icon name="${selectedIcon}" size={32} />`)
                }
              >
                {copiedCode === `<Icon name="${selectedIcon}" size={32} />` ? '✓ Copied!' : 'Copy'}
              </button>
              <pre>
                <code>{`<Icon name="${selectedIcon}" size={32} />`}</code>
              </pre>
            </div>

            {/* With Color */}
            <div className="modal-section-title">With Custom Color</div>
            <div className="modal-code-block">
              <button
                className="modal-copy-button"
                onClick={() =>
                  copyToClipboard(
                    `<Icon name="${selectedIcon}" size={24} color="var(--primary-default)" />`
                  )
                }
              >
                {copiedCode === `<Icon name="${selectedIcon}" size={24} color="var(--primary-default)" />` ? '✓ Copied!' : 'Copy'}
              </button>
              <pre>
                <code>{`<Icon name="${selectedIcon}" size={24} color="var(--primary-default)" />`}</code>
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
