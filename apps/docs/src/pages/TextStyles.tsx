import { useState } from 'react';
import './Tokens.css';

export default function TextStyles() {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);

  const copyClassName = (className: string) => {
    navigator.clipboard.writeText(className);
    setCopiedClass(className);
    setTimeout(() => setCopiedClass(null), 2000);
  };

  return (
    <div className="tokens-page">
      <h1 className="heading-5">Text Styles</h1>
      <p className="label-regular-m" style={{ marginTop: '12px', color: 'var(--cool-grey-60, #63728a)' }}>
        Les styles de texte (typographie) générés depuis Figma.
      </p>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Headings
        </h2>
        <div className="text-styles-list">
          <div
            className="token-item clickable"
            onClick={() => copyClassName('heading-1')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="heading-1">Heading 1</p>
            <div>
              <code className="token-code">
                {copiedClass === 'heading-1' ? '✓ Copied!' : '.heading-1'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('subheading-1')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="subheading-1">Subheading 1</p>
            <div>
              <code className="token-code">
                {copiedClass === 'subheading-1' ? '✓ Copied!' : '.subheading-1'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('heading-2')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="heading-2">Heading 2</p>
            <div>
              <code className="token-code">
                {copiedClass === 'heading-2' ? '✓ Copied!' : '.heading-2'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('subheading-2')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="subheading-2">Subheading 2</p>
            <div>
              <code className="token-code">
                {copiedClass === 'subheading-2' ? '✓ Copied!' : '.subheading-2'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('heading-3')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="heading-3">Heading 3</p>
            <div>
              <code className="token-code">
                {copiedClass === 'heading-3' ? '✓ Copied!' : '.heading-3'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('subheading-3')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="subheading-3">Subheading 3</p>
            <div>
              <code className="token-code">
                {copiedClass === 'subheading-3' ? '✓ Copied!' : '.subheading-3'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('heading-4')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="heading-4">Heading 4</p>
            <div>
              <code className="token-code">
                {copiedClass === 'heading-4' ? '✓ Copied!' : '.heading-4'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('subheading-4')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="subheading-4">Subheading 4</p>
            <div>
              <code className="token-code">
                {copiedClass === 'subheading-4' ? '✓ Copied!' : '.subheading-4'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('heading-5')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="heading-5">Heading 5</p>
            <div>
              <code className="token-code">
                {copiedClass === 'heading-5' ? '✓ Copied!' : '.heading-5'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('subheading-5')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="subheading-5">Subheading 5</p>
            <div>
              <code className="token-code">
                {copiedClass === 'subheading-5' ? '✓ Copied!' : '.subheading-5'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('heading-6')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="heading-6">Heading 6</p>
            <div>
              <code className="token-code">
                {copiedClass === 'heading-6' ? '✓ Copied!' : '.heading-6'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('subheading-6')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="subheading-6">Subheading 6</p>
            <div>
              <code className="token-code">
                {copiedClass === 'subheading-6' ? '✓ Copied!' : '.subheading-6'}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Labels - Large
        </h2>
        <div className="text-styles-list">
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-bold-l')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-bold-l">Label Bold L</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-bold-l' ? '✓ Copied!' : '.label-bold-l'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-medium-l')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-medium-l">Label Medium L</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-medium-l' ? '✓ Copied!' : '.label-medium-l'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-regular-l')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-regular-l">Label Regular L</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-regular-l' ? '✓ Copied!' : '.label-regular-l'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-light-l')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-light-l">Label Light L</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-light-l' ? '✓ Copied!' : '.label-light-l'}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Labels - Medium
        </h2>
        <div className="text-styles-list">
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-bold-m')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-bold-m">Label Bold M</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-bold-m' ? '✓ Copied!' : '.label-bold-m'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-medium-m')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-medium-m">Label Medium M</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-medium-m' ? '✓ Copied!' : '.label-medium-m'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-regular-m')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-regular-m">Label Regular M</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-regular-m' ? '✓ Copied!' : '.label-regular-m'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-light-m')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-light-m">Label Light M</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-light-m' ? '✓ Copied!' : '.label-light-m'}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Labels - Small
        </h2>
        <div className="text-styles-list">
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-bold-s')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-bold-s">Label Bold S</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-bold-s' ? '✓ Copied!' : '.label-bold-s'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-medium-s')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-medium-s">Label Medium S</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-medium-s' ? '✓ Copied!' : '.label-medium-s'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-regular-s')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-regular-s">Label Regular S</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-regular-s' ? '✓ Copied!' : '.label-regular-s'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-light-s')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-light-s">Label Light S</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-light-s' ? '✓ Copied!' : '.label-light-s'}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Labels - Extra Small
        </h2>
        <div className="text-styles-list">
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-bold-xs')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-bold-xs">Label Bold XS</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-bold-xs' ? '✓ Copied!' : '.label-bold-xs'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-medium-xs')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-medium-xs">Label Medium XS</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-medium-xs' ? '✓ Copied!' : '.label-medium-xs'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-regular-xs')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-regular-xs">Label Regular XS</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-regular-xs' ? '✓ Copied!' : '.label-regular-xs'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('label-light-xs')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="label-light-xs">Label Light XS</p>
            <div>
              <code className="token-code">
                {copiedClass === 'label-light-xs' ? '✓ Copied!' : '.label-light-xs'}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Legends
        </h2>
        <div className="text-styles-list">
          <div
            className="token-item clickable"
            onClick={() => copyClassName('legend-bold')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="legend-bold">Legend Bold</p>
            <div>
              <code className="token-code">
                {copiedClass === 'legend-bold' ? '✓ Copied!' : '.legend-bold'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('legend-medium')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="legend-medium">Legend Medium</p>
            <div>
              <code className="token-code">
                {copiedClass === 'legend-medium' ? '✓ Copied!' : '.legend-medium'}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          System (Monospace)
        </h2>
        <div className="text-styles-list">
          <div
            className="token-item clickable"
            onClick={() => copyClassName('system-l')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="system-l">System L</p>
            <div>
              <code className="token-code">
                {copiedClass === 'system-l' ? '✓ Copied!' : '.system-l'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('system-m')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="system-m">System M</p>
            <div>
              <code className="token-code">
                {copiedClass === 'system-m' ? '✓ Copied!' : '.system-m'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('system-s')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="system-s">System S</p>
            <div>
              <code className="token-code">
                {copiedClass === 'system-s' ? '✓ Copied!' : '.system-s'}
              </code>
            </div>
          </div>
          <div
            className="token-item clickable"
            onClick={() => copyClassName('system-xs')}
            style={{ cursor: 'pointer' }}
            title="Click to copy class name"
          >
            <p className="system-xs">System XS</p>
            <div>
              <code className="token-code">
                {copiedClass === 'system-xs' ? '✓ Copied!' : '.system-xs'}
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

