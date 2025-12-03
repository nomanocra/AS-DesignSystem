import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Button from './pages/Button';
import ToolIcons from './pages/ToolIcons';
import TextStyles from './pages/TextStyles';
import Colors from './pages/Colors';
import Icons from './pages/Icons';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/tokens/text-styles" replace />} />
          <Route path="/tokens/text-styles" element={<TextStyles />} />
          <Route path="/tokens/colors" element={<Colors />} />
          <Route path="/tokens/icons" element={<Icons />} />
          <Route path="/components" element={<Navigate to="/components/button" replace />} />
          <Route path="/components/button" element={<Button />} />
          <Route path="/components/tool-icons" element={<ToolIcons />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

