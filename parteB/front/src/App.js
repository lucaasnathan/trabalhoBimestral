import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/index';
import Footer from './components/Footer/index';
import RoutesConfig from './RoutesConfig';

function App() {
  return (
    <Router>
      <Header />
      <RoutesConfig />
      <Footer />
    </Router>
  );
}

export default App;
