import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Installation from './pages/Installation';
import HowToUse from './pages/HowToUse';
import SupportedPlatforms from './pages/SupportedPlatforms';
import Button from './pages/Button';
import IconButton from './pages/IconButton';
import ToolIcons from './pages/ToolIcons';
import Tab from './pages/Tab';
import Select from './pages/Select';
import TextStyles from './pages/TextStyles';
import Colors from './pages/Colors';
import Icons from './pages/Icons';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/getting-started/welcome" replace />} />
          <Route path="/getting-started/welcome" element={<Welcome />} />
          <Route path="/getting-started/installation" element={<Installation />} />
          <Route path="/getting-started/how-to-use" element={<HowToUse />} />
          <Route path="/getting-started/supported-platforms" element={<SupportedPlatforms />} />
          <Route path="/tokens/text-styles" element={<TextStyles />} />
          <Route path="/tokens/colors" element={<Colors />} />
          <Route path="/tokens/icons" element={<Icons />} />
          <Route path="/components" element={<Navigate to="/components/button" replace />} />
          <Route path="/components/button" element={<Button />} />
          <Route path="/components/icon-button" element={<IconButton />} />
          <Route path="/components/tool-icons" element={<ToolIcons />} />
          <Route path="/components/tab" element={<Tab />} />
          <Route path="/components/select" element={<Select />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

