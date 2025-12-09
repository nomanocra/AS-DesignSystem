import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Icon } from '@as-design-system/core';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

interface NavSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function NavSection({ title, children, defaultOpen = true }: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="nav-section">
      <button
        className="nav-section-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h2 className="nav-section-title legend-bold">{title}</h2>
        <span className={`nav-section-chevron ${isOpen ? 'open' : ''}`}>
          <Icon name="keyboard_arrow_down" size={16} color="var(--text-tertiary, #8e99ab)" />
        </span>
      </button>
      <div className={`nav-section-links ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Logo />
        </div>
        <nav className="sidebar-nav">
          {/* Section Getting Started */}
          <NavSection title="Getting Started">
            <Link
              to="/getting-started/welcome"
              className={`nav-link nav-link-sub ${location.pathname === '/getting-started/welcome' ? 'active' : ''}`}
            >
              Welcome
            </Link>
            <Link
              to="/getting-started/installation"
              className={`nav-link nav-link-sub ${location.pathname === '/getting-started/installation' ? 'active' : ''}`}
            >
              Installation
            </Link>
            <Link
              to="/getting-started/how-to-use"
              className={`nav-link nav-link-sub ${location.pathname === '/getting-started/how-to-use' ? 'active' : ''}`}
            >
              How to Use
            </Link>
            <Link
              to="/getting-started/supported-platforms"
              className={`nav-link nav-link-sub ${location.pathname === '/getting-started/supported-platforms' ? 'active' : ''}`}
            >
              Supported Platforms
            </Link>
          </NavSection>

          {/* Section Tokens */}
          <NavSection title="Tokens">
            <Link
              to="/tokens/text-styles"
              className={`nav-link nav-link-sub ${location.pathname === '/tokens/text-styles' ? 'active' : ''}`}
            >
              Text Styles
            </Link>
            <Link
              to="/tokens/colors"
              className={`nav-link nav-link-sub ${location.pathname === '/tokens/colors' ? 'active' : ''}`}
            >
              Colors
            </Link>
            <Link
              to="/tokens/icons"
              className={`nav-link nav-link-sub ${location.pathname === '/tokens/icons' ? 'active' : ''}`}
            >
              Icons
            </Link>
          </NavSection>

          {/* Section Components */}
          <NavSection title="Components">
            <Link
              to="/components/button"
              className={`nav-link nav-link-sub ${location.pathname === '/components/button' ? 'active' : ''}`}
            >
              Button
            </Link>
            <Link
              to="/components/icon-button"
              className={`nav-link nav-link-sub ${location.pathname === '/components/icon-button' ? 'active' : ''}`}
            >
              IconButton
            </Link>
            <Link
              to="/components/tool-icons"
              className={`nav-link nav-link-sub ${location.pathname === '/components/tool-icons' ? 'active' : ''}`}
            >
              ToolIcons
            </Link>
            <Link
              to="/components/tab"
              className={`nav-link nav-link-sub ${location.pathname === '/components/tab' ? 'active' : ''}`}
            >
              Tab
            </Link>
            <Link
              to="/components/select"
              className={`nav-link nav-link-sub ${location.pathname === '/components/select' ? 'active' : ''}`}
            >
              Select
            </Link>
          </NavSection>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
