import './SupportedPlatforms.css';

// Framework icons as SVG components
const NextjsIcon = () => (
  <svg viewBox="0 0 180 180" fill="none">
    <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="white"/>
    </mask>
    <g mask="url(#mask0)">
      <circle cx="90" cy="90" r="90" fill="black"/>
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)"/>
      <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const ViteIcon = () => (
  <svg viewBox="0 0 410 404" fill="none">
    <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#paint0_linear_vite)"/>
    <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#paint1_linear_vite)"/>
    <defs>
      <linearGradient id="paint0_linear_vite" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">
        <stop stopColor="#41D1FF"/>
        <stop offset="1" stopColor="#BD34FE"/>
      </linearGradient>
      <linearGradient id="paint1_linear_vite" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFBD4F"/>
        <stop offset="1" stopColor="#FF980E"/>
      </linearGradient>
    </defs>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="-11.5 -10.232 23 20.463" fill="none">
    <circle r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 128 128" fill="none">
    <rect width="128" height="128" rx="8" fill="#3178c6"/>
    <path d="M82.5 67.5v-5h-30v5h10v40h10v-40h10zm10 40v-45h-10v50h25v-5h-15z" fill="white"/>
  </svg>
);

const CRAIcon = () => (
  <svg viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" stroke="#61dafb" strokeWidth="3" fill="none"/>
    <circle cx="50" cy="50" r="8" fill="#61dafb"/>
    <ellipse cx="50" cy="50" rx="40" ry="16" stroke="#61dafb" strokeWidth="2" fill="none"/>
    <ellipse cx="50" cy="50" rx="40" ry="16" stroke="#61dafb" strokeWidth="2" fill="none" transform="rotate(60 50 50)"/>
    <ellipse cx="50" cy="50" rx="40" ry="16" stroke="#61dafb" strokeWidth="2" fill="none" transform="rotate(-60 50 50)"/>
  </svg>
);

const ManualIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
  </svg>
);

export default function SupportedPlatforms() {
  const frameworks = [
    { name: 'Vite', icon: <ViteIcon />, supported: true },
    { name: 'Next.js', icon: <NextjsIcon />, supported: true },
    { name: 'Create React App', icon: <CRAIcon />, supported: true },
    { name: 'Manual Setup', icon: <ManualIcon />, supported: true },
  ];

  return (
    <div className="platforms-page">
      {/* Header */}
      <header className="platforms-header">
        <h1 className="platforms-title">Supported Platforms</h1>
        <p className="platforms-subtitle">
          Start by selecting your framework of choice. AS Design System is built to work with all React frameworks.
        </p>
      </header>

      {/* Frameworks Grid */}
      <div className="platforms-grid">
        {frameworks.map((framework) => (
          <div
            key={framework.name}
            className={`platform-card ${framework.supported ? 'platform-card--supported' : 'platform-card--coming-soon'}`}
          >
            <div className="platform-icon">
              {framework.icon}
            </div>
            <span className="platform-name">{framework.name}</span>
            {!framework.supported && (
              <span className="platform-status">Coming soon</span>
            )}
          </div>
        ))}
      </div>

      {/* Requirements Section */}
      <section className="platforms-section">
        <h2 className="platforms-section-title">Requirements</h2>
        <p className="platforms-section-desc">
          Make sure your environment meets these requirements before getting started.
        </p>
        <div className="requirements-grid">
          <div className="requirement-card">
            <div className="requirement-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
            </div>
            <div className="requirement-content">
              <div className="requirement-title">Node.js</div>
              <div className="requirement-value">Version 18.0.0 or higher</div>
            </div>
          </div>

          <div className="requirement-card">
            <div className="requirement-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div className="requirement-content">
              <div className="requirement-title">React</div>
              <div className="requirement-value">Version 18.0.0 or higher</div>
            </div>
          </div>

          <div className="requirement-card">
            <div className="requirement-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div className="requirement-content">
              <div className="requirement-title">TypeScript</div>
              <div className="requirement-value">Version 5.0+ (optional but recommended)</div>
            </div>
          </div>

          <div className="requirement-card">
            <div className="requirement-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <div className="requirement-content">
              <div className="requirement-title">Package Manager</div>
              <div className="requirement-value">npm, pnpm, or yarn</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Support */}
      <section className="platforms-section">
        <h2 className="platforms-section-title">Browser Support</h2>
        <p className="platforms-section-desc">
          Components work in all modern browsers that support CSS custom properties.
        </p>
        <div className="browsers-grid">
          <div className="browser-item">
            <span className="browser-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="browser-name">Chrome / Edge</span>
          </div>
          <div className="browser-item">
            <span className="browser-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="browser-name">Firefox</span>
          </div>
          <div className="browser-item">
            <span className="browser-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="browser-name">Safari</span>
          </div>
          <div className="browser-item">
            <span className="browser-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="browser-name">Mobile Browsers</span>
          </div>
        </div>

        <div className="info-box">
          <span className="info-box-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </span>
          <span className="info-box-text">
            Internet Explorer is not supported. CSS custom properties (variables) are used extensively throughout the design system.
          </span>
        </div>
      </section>

      {/* Operating Systems */}
      <section className="platforms-section">
        <h2 className="platforms-section-title">Operating Systems</h2>
        <p className="platforms-section-desc">
          The CLI works on all major operating systems.
        </p>
        <div className="browsers-grid">
          <div className="browser-item">
            <span className="browser-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="browser-name">macOS</span>
          </div>
          <div className="browser-item">
            <span className="browser-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="browser-name">Linux</span>
          </div>
          <div className="browser-item">
            <span className="browser-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="browser-name">Windows</span>
          </div>
        </div>
      </section>
    </div>
  );
}
