import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ModalProvider } from "./context/ModalContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ModalContainer from "./components/features/ModalContainer";
import EasterEggContainer from "./components/features/EasterEggContainer";
import DocumentHead from "./components/common/DocumentHead";
import { Home, About, Portfolio, CV, Contact } from "./pages";

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <BrowserRouter>
          <DocumentHead
            title="Rasmus Wenngren Portfolio"
            description="Personal portfolio website showcasing my work and projects"
            ogTitle="Rasmus Wenngren Portfolio"
            ogDescription="Personal portfolio website showcasing my work and projects"
            ogUrl="https://rasmuswenngren.github.io/"
            ogImage="https://rasmuswenngren.github.io/icons/icon-512x512.png"
            ogType="website"
          />

          <Header />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </main>

          <Footer />
          <EasterEggContainer />
          <ModalContainer />
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  );
}
