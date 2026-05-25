import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Process from './pages/Process';
import Knowledge from './pages/Knowledge';
import Quality from './pages/Quality';
import Blog from './pages/Blog';
import ClientPortal from './pages/ClientPortal';
import CustomCursor from './components/UI/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/process" element={<Process />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portal" element={<ClientPortal />} />
            {/* Catch-all route for missing pages */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
