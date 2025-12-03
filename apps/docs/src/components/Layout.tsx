import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isComponentRoute = location.pathname.startsWith('/components');

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Logo />
        </div>
        <nav className="sidebar-nav">
          {/* Section Tokens */}
          <div className="nav-section">
            <h2 className="nav-section-title legend-bold">Tokens</h2>
            <div className="nav-section-links">
              <Link
                to="/tokens/text-styles"
                className={`nav-link nav-link-sub ${
                  location.pathname === '/tokens/text-styles' ? 'active' : ''
                }`}
              >
                Text Styles
              </Link>
              <Link
                to="/tokens/colors"
                className={`nav-link nav-link-sub ${
                  location.pathname === '/tokens/colors' ? 'active' : ''
                }`}
              >
                Colors
              </Link>
              <Link
                to="/tokens/icons"
                className={`nav-link nav-link-sub ${
                  location.pathname === '/tokens/icons' ? 'active' : ''
                }`}
              >
                Icons
              </Link>
            </div>
          </div>

          {/* Barre de séparation */}
          <div className="nav-separator"></div>

          {/* Section Components */}
          <div className="nav-section">
            <h2 className="nav-section-title legend-bold">Components</h2>
            <div className="nav-section-links">
              <Link
                to="/components/button"
                className={`nav-link nav-link-sub ${
                  location.pathname === '/components/button' ? 'active' : ''
                }`}
              >
                Button
              </Link>
              <Link
                to="/components/tool-icons"
                className={`nav-link nav-link-sub ${
                  location.pathname === '/components/tool-icons' ? 'active' : ''
                }`}
              >
                ToolIcons
              </Link>
            </div>
          </div>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}

