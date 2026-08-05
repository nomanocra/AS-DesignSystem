import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Tokens.css';
import './Icons.css';
import { Button, Icon, IconButton, availableIcons, ButtonGroup, Modal, TextInput } from '@as-designsystem/core';
import '@as-designsystem/core/ButtonGroup.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Modal.css';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/TextInput.css';

// List of available icons (synced from Icon component)
const iconNames = [...availableIcons];

// Available sizes (default is 24)
const sizes = [16, 20, 24, 32, 40] as const;
type IconSize = (typeof sizes)[number];
const DEFAULT_SIZE: IconSize = 24;

// Available colors with their CSS variable names (Primary is default)
const colorOptions = [
  { label: 'Primary', value: 'var(--primary-default, #063b9e)', isDefault: true },
  { label: 'Error', value: 'var(--feedback-error-default, #e4002b)', isDefault: false },
  { label: 'Warning', value: 'var(--feedback-warning-default, #ffc929)', isDefault: false },
  { label: 'Success', value: 'var(--feedback-success-default, #08875b)', isDefault: false },
] as const;

// Extra choice revealing a native color picker (its popup already provides a hex field)
const CUSTOM_COLOR_LABEL = 'Custom';
const DEFAULT_CUSTOM_COLOR = '#00205b';

// PNG is exported at 4x the previewed size so it stays usable outside the docs
const PNG_SCALE = 4;

// ButtonGroup options for sizes
const sizeOptions = sizes.map((size) => ({
  value: String(size),
  label: String(size),
}));

// ButtonGroup options for colors
const colorButtonOptions = [
  ...colorOptions.map((color) => ({ value: color.label, label: color.label })),
  { value: CUSTOM_COLOR_LABEL, label: CUSTOM_COLOR_LABEL },
];

const triggerDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function Icons() {
  // The URL is the single source of truth for the view, so any state worth sharing
  // survives a reload, a Back/Forward, and a link pasted into a chat.
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const searchQuery = searchParams.get('q') ?? '';

  // Guard against a hand-edited or stale ?icon= pointing at an icon that no longer exists
  const iconParam = searchParams.get('icon');
  const selectedIcon =
    iconParam && (iconNames as readonly string[]).includes(iconParam) ? iconParam : null;

  const sizeParam = Number(searchParams.get('size'));
  const selectedSize = (sizes as readonly number[]).includes(sizeParam)
    ? (sizeParam as IconSize)
    : DEFAULT_SIZE;

  // A preset is stored by label ("Error"), a custom color by its hex ("#643563")
  const colorParam = searchParams.get('color') ?? '';
  const isCustomColor = colorParam.startsWith('#');
  const customColor = isCustomColor ? colorParam : DEFAULT_CUSTOM_COLOR;
  const presetColor = colorOptions.find((color) => color.label === colorParam) ?? colorOptions[0];
  const selectedColorLabel = isCustomColor ? CUSTOM_COLOR_LABEL : presetColor.label;

  const activeColor = isCustomColor ? customColor : presetColor.value;
  const isDefaultColor = !isCustomColor && presetColor.isDefault;

  /**
   * Writes params, dropping any that fall back to their default so shared links stay short.
   *
   * `replace` is the default because filters change on every keystroke and would otherwise
   * bury the Back button under one entry per character. Discrete actions — opening or
   * closing an icon — pass `replace: false` so Back closes the modal.
   */
  const updateParams = (changes: Record<string, string | null>, replace = true) => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        Object.entries(changes).forEach(([key, value]) => {
          if (value === null || value === '') next.delete(key);
          else next.set(key, value);
        });
        return next;
      },
      { replace }
    );
  };

  const filteredIcons = iconNames.filter((iconName) =>
    iconName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // The modal preview is the reference render: it always exists while the buttons are visible,
  // unlike the grid item which the search box can filter out mid-download.
  const getPreviewSvg = () =>
    document.querySelector<SVGSVGElement>('.icons-modal-preview-icon svg');

  const downloadSvg = (iconName: string) => {
    const svg = getPreviewSvg();
    if (!svg) return;
    triggerDownload(new Blob([svg.outerHTML], { type: 'image/svg+xml' }), `${iconName}.svg`);
  };

  const downloadPng = (iconName: string) => {
    const svg = getPreviewSvg();
    if (!svg) return;

    // A PNG cannot inherit currentColor, so bake the resolved color into the clone
    const clone = svg.cloneNode(true) as SVGSVGElement;
    const px = selectedSize * PNG_SCALE;
    clone.setAttribute('width', String(px));
    clone.setAttribute('height', String(px));
    clone.style.color = getComputedStyle(svg).color;

    const source = new XMLSerializer().serializeToString(clone);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = px;
      canvas.height = px;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.drawImage(image, 0, 0, px, px);
      canvas.toBlob((blob) => {
        if (blob) triggerDownload(blob, `${iconName}-${px}.png`);
      }, 'image/png');
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
  };

  // Generate code string based on selected settings, omitting default values
  const generateIconCode = (iconName: string) => {
    const props: string[] = [`name="${iconName}"`];

    if (selectedSize !== DEFAULT_SIZE) {
      props.push(`size={${selectedSize}}`);
    }

    if (!isDefaultColor) {
      props.push(`color="${activeColor}"`);
    }

    return `<Icon ${props.join(' ')} />`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="tokens-page tokens-page--full-width">
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
      <div className="example-container">
        <div className="icons-controls">
          <TextInput
            placeholder="Search an icon..."
            value={searchQuery}
            onChange={(e) => updateParams({ q: e.target.value })}
            size="S"
            showLabel={false}
            showLeftIcon
            leftIcon="search"
            showRightIconButton={searchQuery.length > 0}
            rightIconButton="close"
            onRightIconButtonClick={() => updateParams({ q: null })}
            className="icon-search-input"
            showLegend
            legend={
              filteredIcons.length === 0
                ? 'No icons match'
                : `${filteredIcons.length} icon${filteredIcons.length === 1 ? '' : 's'} ${searchQuery ? 'match' : 'available'}`
            }
          />

          {/* Size Selector */}
          <div className="icons-setting">
            <span className="icons-setting-label">Size</span>
            <ButtonGroup
              options={sizeOptions}
              value={String(selectedSize)}
              onChange={(value) =>
                updateParams({ size: Number(value) === DEFAULT_SIZE ? null : value })
              }
              size="S"
            />
          </div>

          {/* Color Selector */}
          <div className="icons-setting">
            <span className="icons-setting-label">Color</span>
            <ButtonGroup
              options={colorButtonOptions}
              value={selectedColorLabel}
              onChange={(value) =>
                updateParams({
                  // Switching to Custom seeds the picker with a concrete hex
                  color:
                    value === CUSTOM_COLOR_LABEL
                      ? DEFAULT_CUSTOM_COLOR
                      : value === colorOptions[0].label
                        ? null
                        : value,
                })
              }
              size="S"
            />

            {isCustomColor && (
              <input
                type="color"
                className="icons-custom-color-swatch"
                value={customColor}
                onChange={(e) => updateParams({ color: e.target.value })}
                title={customColor}
                aria-label="Pick a custom icon color"
              />
            )}
          </div>
        </div>
      </div>

      <section className="tokens-section">
        <div className="icons-grid">
          {filteredIcons.map((iconName) => (
            <div
              key={iconName}
              className="icon-item clickable"
              onClick={() => updateParams({ icon: iconName }, false)}
              style={{ cursor: 'pointer' }}
              title="Click to see usage"
            >
              <div className="icon-preview">
                <Icon name={iconName} size={selectedSize} color={activeColor} />
              </div>
              <code className="icon-name">{iconName}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Icon Code Modal */}
      <Modal
        isOpen={selectedIcon !== null}
        // Closing replaces instead of pushing: opening already added an entry, so Back
        // closes the modal. Pushing here too would make Back re-open what was just closed.
        onClose={() => updateParams({ icon: null })}
        title={`Icon: ${selectedIcon}`}
      >
        {selectedIcon && (
          <div>
            {/* Icon Preview */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  padding: '32px',
                  background: 'var(--background-tertiary)',
                  borderRadius: '8px',
                }}
              >
                <Icon
                  name={selectedIcon}
                  size={selectedSize}
                  color={activeColor}
                  className="icons-modal-preview-icon"
                />
              </div>
            </div>

            {/* Code Example */}
            <div className="icons-modal-section-title">Code</div>
            <div className="icons-modal-code-block">
              <div className="icons-modal-copy-button">
                <IconButton
                  icon={copiedCode === generateIconCode(selectedIcon) ? 'check' : 'content_copy'}
                  size="S"
                  variant="Ghost"
                  onClick={() => copyToClipboard(generateIconCode(selectedIcon))}
                  alt="Copy code"
                />
              </div>
              <pre>
                <code>{generateIconCode(selectedIcon)}</code>
              </pre>
            </div>

            {/* In Button */}
            <div className="icons-modal-section-title">Used in Button Component</div>
            <div className="icons-modal-code-block">
              <div className="icons-modal-copy-button">
                <IconButton
                  icon={copiedCode === `<Button variant="primary" size="M" leftIcon="${selectedIcon}">\n  Click me\n</Button>` ? 'check' : 'content_copy'}
                  size="S"
                  variant="Ghost"
                  onClick={() =>
                    copyToClipboard(
                      `<Button variant="primary" size="M" leftIcon="${selectedIcon}">\n  Click me\n</Button>`
                    )
                  }
                  alt="Copy code"
                />
              </div>
              <pre>
                <code>{`<Button variant="primary" size="M" leftIcon="${selectedIcon}">
  Click me
</Button>`}</code>
              </pre>
            </div>

            {/* Share & downloads */}
            <div className="icons-modal-downloads">
              <div className="icons-modal-downloads-buttons">
                <Button
                  label={copiedCode === window.location.href ? 'Link copied' : 'Copy link'}
                  variant="Outlined"
                  size="M"
                  leftIcon={copiedCode === window.location.href ? 'check' : 'link'}
                  onClick={() => copyToClipboard(window.location.href)}
                />
                <Button
                  label="Download SVG"
                  variant="Outlined"
                  size="M"
                  leftIcon="download"
                  onClick={() => downloadSvg(selectedIcon)}
                />
                <Button
                  label="Download PNG"
                  variant="Outlined"
                  size="M"
                  leftIcon="download"
                  onClick={() => downloadPng(selectedIcon)}
                />
              </div>
              <p className="icons-modal-downloads-hint">
                SVG keeps <code>currentColor</code> so it stays themeable. PNG is exported at{' '}
                {selectedSize * PNG_SCALE}px with the selected color baked in.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
