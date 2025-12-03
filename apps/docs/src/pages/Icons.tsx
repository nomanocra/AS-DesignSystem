import { useState } from 'react';
import './Tokens.css';
import { Icon } from '@as-design-system/core';

// Liste des icônes disponibles (extrait depuis Figma)
const iconNames = [
  'AIR_AC_twin_engine',
  'AIR_fleet',
  'AIR_departure',
  'AIR_ground_In',
  'AIR_ground_out',
  'AIR_arrival',
  'AIR_side',
  'AIR_APU',
  'AIR_tail',
  'AIR_engine',
  'AIR_landing gear',
  'AIR_life_vest',
  'AIR_airport',
  'AIR_Airbus',
  'AIR_GitHub',
  'AIR_Google',
  'AIR_SAP',
  'AIR_Skywise',
  'AIR_spinner',
  'AIR_XLS',
  'AIR_SVG',
  'AIR_Facebook',
  'AIR_Instagram',
  'AIR_Linkedin',
  'AIR_Youtube',
  'AIR_X',
  'AIR_Chatbot',
  'emoji_emotions',
  'add',
  'construction',
  'delete',
  'keyboard_arrow_down',
  'keyboard_arrow_up',
  'code',
];

export default function Icons() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIcons = iconNames.filter((iconName) =>
    iconName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tokens-page">
      <div className="icons-header">
        <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>Icons</h1>
        <input
          type="text"
          placeholder="Rechercher une icône..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="icon-search"
        />
      </div>

      <section className="tokens-section">
        <div className="icons-grid">
          {filteredIcons.map((iconName) => (
            <div key={iconName} className="icon-item">
              <div className="icon-preview">
                <Icon name={iconName} size={24} />
              </div>
              <code className="icon-name">{iconName}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="tokens-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Utilisation
        </h2>
        <div className="usage-example">
          <pre className="code-block">
            <code>{`import { Icon } from '@as-design-system/core';

// Utilisation de base
<Icon name="AIR_fleet" />

// Avec une taille personnalisée
<Icon name="add" size={32} />

// Avec une couleur personnalisée
<Icon name="delete" size={24} color="var(--primary-default)" />`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
