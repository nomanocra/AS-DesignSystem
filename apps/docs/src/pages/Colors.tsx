import { useState, createContext, useContext } from 'react';
import './Tokens.css';
import './Colors.css';
import { colors, Tab } from '@as-design-system/core';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/colors.css';

// Color format types
type ColorFormat = 'hex' | 'rgb' | 'variable';

// Context to share format across components
const ColorFormatContext = createContext<{
  format: ColorFormat;
  setFormat: (format: ColorFormat) => void;
}>({
  format: 'hex',
  setFormat: () => {},
});

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Helper function to format color based on selected format
function formatColor(
  hexValue: string,
  variableName: string,
  format: ColorFormat
): string {
  switch (format) {
    case 'hex':
      return hexValue;
    case 'rgb': {
      // Handle rgba values
      if (hexValue.startsWith('rgba') || hexValue.startsWith('rgb')) {
        return hexValue;
      }
      const rgb = hexToRgb(hexValue);
      if (rgb) {
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      }
      return hexValue;
    }
    case 'variable':
      return `var(${variableName})`;
    default:
      return hexValue;
  }
}

// Helper function to determine text color based on background luminosity
function getTextColor(bgColor: string): string {
  // Handle rgba/rgb colors
  if (bgColor.includes('rgba') || bgColor.startsWith('rgb')) {
    const match = bgColor.match(/\d+/g);
    if (match && match.length >= 3) {
      const r = parseInt(match[0]);
      const g = parseInt(match[1]);
      const b = parseInt(match[2]);
      const alpha = match[3] ? parseFloat(match[3]) : 1;

      // If transparent, assume white background
      if (alpha < 0.5) {
        return '#000';
      }

      // Calculate relative luminance (WCAG formula)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.179 ? '#000' : '#fff';
    }
  }

  // Handle hex colors
  if (bgColor.startsWith('#')) {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate relative luminance (WCAG formula)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.179 ? '#000' : '#fff';
  }

  // Default to black for unknown formats
  return '#000';
}

// Primitive color variable name mapping
function getPrimitiveVariableName(paletteName: string, shade: string): string {
  const nameMap: Record<string, string> = {
    'Sea Blue': 'sea-blue',
    'Sky Blue': 'sky-blue',
    'Cool Grey': 'cool-grey',
    'Warm Grey': 'warm-grey',
    Red: 'red',
    Green: 'green',
    Yellow: 'yellow',
  };
  return `--${nameMap[paletteName] || paletteName.toLowerCase()}-${shade}`;
}

// Semantic color variable name mapping
function getSemanticVariableName(groupTitle: string, key: string): string {
  const groupMap: Record<string, string> = {
    Primary: 'primary',
    Text: 'text',
    Background: 'background',
    Border: 'border',
    Success: 'feedback-success',
    Error: 'feedback-error',
    Warning: 'feedback-warning',
  };

  const prefix = groupMap[groupTitle] || groupTitle.toLowerCase();

  // Handle special cases for key names
  const keyMap: Record<string, string> = {
    tHover: 't-hover',
    tActive: 't-active',
    tBackground: 't-background',
  };

  const formattedKey = keyMap[key] || key;
  return `--${prefix}-${formattedKey}`;
}

// Helper component to display a color palette
function ColorPalette({
  name,
  palette,
}: {
  name: string;
  palette: Record<string, string>;
}) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { format } = useContext(ColorFormatContext);
  const shades = Object.keys(palette).reverse(); // From lightest to darkest

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="color-category">
      <h3
        className="label-bold-m"
        style={{ marginBottom: '12px', color: 'var(--cool-grey-60)' }}
      >
        {name}
      </h3>
      <div className="color-palette">
        {shades.map((shade) => {
          const shadeValue = parseInt(shade);
          // High shades (100-60) = dark colors -> white text
          // Low shades (50-10) = light colors -> black text
          const textColor = shadeValue >= 60 ? '#fff' : '#000';
          const isDark = shadeValue >= 60;
          const variableName = getPrimitiveVariableName(name, shade);
          const displayValue = formatColor(palette[shade], variableName, format);

          return (
            <div
              key={shade}
              className="color-tile clickable"
              style={{
                backgroundColor: palette[shade],
                color: textColor,
                cursor: 'pointer',
              }}
              onClick={() => copyColor(displayValue)}
              title={`Click to copy ${displayValue}`}
            >
              <span className="color-shade">
                {copiedColor === displayValue ? '✓ Copied!' : shade}
              </span>
              <code
                className="color-value"
                style={{
                  backgroundColor: isDark
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                {displayValue}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper component to display semantic colors
function SemanticColorGroup({
  title,
  colors: semanticColors,
  reference,
}: {
  title: string;
  colors: Record<string, string | Record<string, string>>;
  reference?: string;
}) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { format } = useContext(ColorFormatContext);
  const flattenColors: Array<{ key: string; value: string; fullKey: string }> =
    [];

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  Object.entries(semanticColors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      flattenColors.push({ key, value, fullKey: key });
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'string') {
          flattenColors.push({
            key: subKey,
            value: subValue,
            fullKey: `${key}.${subKey}`,
          });
        }
      });
    }
  });

  return (
    <div className="semantic-color-group">
      <h3
        className="label-bold-m"
        style={{ marginBottom: '12px', color: 'var(--cool-grey-60)' }}
      >
        {title}
        {reference && (
          <span className="label-regular-s" style={{ marginLeft: '8px' }}>
            (reference: {reference})
          </span>
        )}
      </h3>
      <div className="semantic-colors-grid">
        {flattenColors.map(({ key, value, fullKey }) => {
          // For Success and Error: Default, Hover, Active -> white text
          const isFeedbackState =
            (title === 'Success' || title === 'Error') &&
            (key === 'default' || key === 'hover' || key === 'active');
          // For Primary: Default, Hover, Active -> white text
          const isPrimaryState =
            title === 'Primary' &&
            (key === 'default' || key === 'hover' || key === 'active');
          // For Text: Main, Secondary, Tertiary -> white text
          const isTextState =
            title === 'Text' &&
            (key === 'main' || key === 'secondary' || key === 'tertiary');

          const textColor =
            isFeedbackState || isPrimaryState || isTextState
              ? '#fff'
              : getTextColor(value);

          const variableName = getSemanticVariableName(title, key);
          const displayValue = formatColor(value, variableName, format);

          return (
            <div key={fullKey} className="semantic-color-item">
              <div
                className="semantic-color-tile clickable"
                style={{
                  backgroundColor: value,
                  color: textColor,
                  cursor: 'pointer',
                }}
                onClick={() => copyColor(displayValue)}
                title={`Click to copy ${displayValue}`}
              >
                <span className="semantic-color-name">
                  {copiedColor === displayValue ? '✓ Copied!' : key}
                </span>
              </div>
              <code className="semantic-color-value">{displayValue}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Format selector component
function FormatSelector() {
  const { format, setFormat } = useContext(ColorFormatContext);

  const formats: { label: string; value: ColorFormat }[] = [
    { label: 'HEX', value: 'hex' },
    { label: 'RGB', value: 'rgb' },
    { label: 'Variable', value: 'variable' },
  ];

  return (
    <div className="color-format-selector">
      <span className="color-format-label">Format</span>
      <div className="color-format-options">
        {formats.map((f) => (
          <button
            key={f.value}
            className={`color-format-option ${format === f.value ? 'active' : ''}`}
            onClick={() => setFormat(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Colors() {
  const [activeTab, setActiveTab] = useState<'primitives' | 'semantics'>(
    'primitives'
  );
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [format, setFormat] = useState<ColorFormat>('hex');

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Format white/black colors
  const formatWhiteBlack = (hex: string, varName: string) => {
    return formatColor(hex, varName, format);
  };

  return (
    <ColorFormatContext.Provider value={{ format, setFormat }}>
      <div className="tokens-page">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Colors
        </h1>
        <p
          className="label-regular-m"
          style={{ marginTop: '12px', color: 'var(--cool-grey-60, #63728a)' }}
        >
          Color tokens generated from Figma.
        </p>

        {/* Controls */}
        <div className="colors-controls">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0' }}>
            <Tab
              label="Primitives"
              size="M"
              status={activeTab === 'primitives' ? 'Active' : 'Default'}
              onClick={() => setActiveTab('primitives')}
            />
            <Tab
              label="Semantics"
              size="M"
              status={activeTab === 'semantics' ? 'Active' : 'Default'}
              onClick={() => setActiveTab('semantics')}
            />
          </div>

          {/* Format Selector */}
          <FormatSelector />
        </div>

        {/* ========================================================================
          PRIMITIVES TAB
          ======================================================================== */}
        {activeTab === 'primitives' && (
          <section className="tokens-section">
            <div className="primitives-grid">
              <ColorPalette name="Sea Blue" palette={colors.seaBlue} />
              <ColorPalette name="Sky Blue" palette={colors.skyBlue} />
              <ColorPalette name="Cool Grey" palette={colors.coolGrey} />
              <ColorPalette name="Warm Grey" palette={colors.warmGrey} />
              <ColorPalette name="Red" palette={colors.red} />
              <ColorPalette name="Green" palette={colors.green} />
              <ColorPalette name="Yellow" palette={colors.yellow} />
              <div className="color-category">
                <h3
                  className="label-bold-m"
                  style={{ marginBottom: '12px', color: 'var(--cool-grey-60)' }}
                >
                  White & Black
                </h3>
                <div className="color-palette">
                  <div
                    className="color-tile clickable"
                    style={{
                      backgroundColor: colors.white,
                      color: '#000',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      copyColor(formatWhiteBlack(colors.white, '--white'))
                    }
                    title={`Click to copy ${formatWhiteBlack(colors.white, '--white')}`}
                  >
                    <span className="color-shade">
                      {copiedColor === formatWhiteBlack(colors.white, '--white')
                        ? '✓ Copied!'
                        : 'White'}
                    </span>
                    <code
                      className="color-value"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {formatWhiteBlack(colors.white, '--white')}
                    </code>
                  </div>
                  <div
                    className="color-tile clickable"
                    style={{
                      backgroundColor: colors.black,
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      copyColor(formatWhiteBlack(colors.black, '--black'))
                    }
                    title={`Click to copy ${formatWhiteBlack(colors.black, '--black')}`}
                  >
                    <span className="color-shade">
                      {copiedColor === formatWhiteBlack(colors.black, '--black')
                        ? '✓ Copied!'
                        : 'Black'}
                    </span>
                    <code
                      className="color-value"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {formatWhiteBlack(colors.black, '--black')}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================
          SEMANTICS TAB
          ======================================================================== */}
        {activeTab === 'semantics' && (
          <section className="tokens-section">
            <div className="semantics-container">
              <SemanticColorGroup
                title="Primary"
                colors={colors.primary}
                reference="Sea Blue"
              />
              <SemanticColorGroup
                title="Text"
                colors={colors.text}
                reference="Cool Grey, Sea Blue"
              />
              <SemanticColorGroup
                title="Background"
                colors={colors.background}
                reference="White, Cool Grey, Sea Blue"
              />
              <SemanticColorGroup
                title="Border"
                colors={colors.border}
                reference="Cool Grey, White"
              />
              <div>
                <h3
                  className="label-bold-l"
                  style={{ marginBottom: '12px', color: 'var(--cool-grey-60)' }}
                >
                  Feedback
                </h3>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <SemanticColorGroup
                    title="Success"
                    colors={colors.feedback.success}
                    reference="Green"
                  />
                  <SemanticColorGroup
                    title="Error"
                    colors={colors.feedback.error}
                    reference="Red"
                  />
                  <SemanticColorGroup
                    title="Warning"
                    colors={colors.feedback.warning}
                    reference="Yellow"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </ColorFormatContext.Provider>
  );
}
