import './Tokens.css';
import { colors } from '@as-design-system/tokens';

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

// Helper component pour afficher une palette de couleurs
function ColorPalette({
  name,
  palette,
}: {
  name: string;
  palette: Record<string, string>;
}) {
  const shades = Object.keys(palette).reverse(); // Du plus clair au plus foncé

  return (
    <div className="color-category">
      <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--cool-grey-60)' }}>
        {name}
      </h3>
      <div className="color-palette">
        {shades.map((shade) => {
          const shadeValue = parseInt(shade);
          // Shades élevés (100-60) = couleurs foncées -> texte blanc
          // Shades faibles (50-10) = couleurs claires -> texte noir
          const textColor = shadeValue >= 60 ? '#fff' : '#000';
          const isDark = shadeValue >= 60;
          
          return (
            <div
              key={shade}
              className="color-tile"
              style={{
                backgroundColor: palette[shade],
                color: textColor,
              }}
            >
              <span className="color-shade">{shade}</span>
              <code 
                className="color-value"
                style={{
                  backgroundColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                {palette[shade]}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper component pour afficher les couleurs sémantiques
function SemanticColorGroup({
  title,
  colors: semanticColors,
  reference,
}: {
  title: string;
  colors: Record<string, string | Record<string, string>>;
  reference?: string;
}) {
  const flattenColors: Array<{ key: string; value: string; fullKey: string }> = [];

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
      <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--cool-grey-60)' }}>
        {title}
        {reference && (
          <span className="label-regular-s" style={{ marginLeft: '8px' }}>
            (référence: {reference})
          </span>
        )}
      </h3>
      <div className="semantic-colors-grid">
        {flattenColors.map(({ key, value, fullKey }) => {
          // Pour Success et Error: Default, Hover, Active -> texte blanc
          const isFeedbackState = (title === 'Success' || title === 'Error') && 
                                  (key === 'default' || key === 'hover' || key === 'active');
          // Pour Primary: Default, Hover, Active -> texte blanc
          const isPrimaryState = title === 'Primary' && 
                                 (key === 'default' || key === 'hover' || key === 'active');
          // Pour Text: Main, Secondary, Tertiary -> texte blanc
          const isTextState = title === 'Text' && 
                             (key === 'main' || key === 'secondary' || key === 'tertiary');
          
          const textColor = (isFeedbackState || isPrimaryState || isTextState) ? '#fff' : getTextColor(value);
          
          return (
            <div key={fullKey} className="semantic-color-item">
              <div
                className="semantic-color-tile"
                style={{
                  backgroundColor: value,
                  color: textColor,
                }}
              >
                <span className="semantic-color-name">{key}</span>
              </div>
              <code className="semantic-color-value">{value}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Colors() {
  return (
    <div className="tokens-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>Colors</h1>
      <p className="label-regular-m" style={{ marginTop: '12px', color: 'var(--cool-grey-60, #63728a)' }}>
        Les tokens de couleur générés depuis Figma.
      </p>

      {/* ========================================================================
          COULEURS PRIMITIVES
          ======================================================================== */}
      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Couleurs Primitives
        </h2>
        <div className="primitives-grid">
          <ColorPalette name="Sea Blue" palette={colors.seaBlue} />
          <ColorPalette name="Sky Blue" palette={colors.skyBlue} />
          <ColorPalette name="Cool Grey" palette={colors.coolGrey} />
          <ColorPalette name="Warm Grey" palette={colors.warmGrey} />
          <ColorPalette name="Red" palette={colors.red} />
          <ColorPalette name="Green" palette={colors.green} />
          <ColorPalette name="Yellow" palette={colors.yellow} />
          <div className="color-category">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--cool-grey-60)' }}>
              White & Black
            </h3>
            <div className="color-palette">
              <div
                className="color-tile"
                style={{ backgroundColor: colors.white, color: '#000' }}
              >
                <span className="color-shade">White</span>
                <code 
                  className="color-value"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {colors.white}
                </code>
              </div>
              <div
                className="color-tile"
                style={{ backgroundColor: colors.black, color: '#fff' }}
              >
                <span className="color-shade">Black</span>
                <code 
                  className="color-value"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {colors.black}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          COULEURS SÉMANTIQUES
          ======================================================================== */}
      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Couleurs Sémantiques
        </h2>
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
            reference="White, Cool Grey"
          />
          <div>
            <h3 className="label-bold-l" style={{ marginBottom: '12px', color: 'var(--cool-grey-60)' }}>
              Feedback
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
    </div>
  );
}

