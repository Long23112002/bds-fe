import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar.tsx";
import Home from "./pages/home/Home.tsx";
import Footer from "./layouts/Footer.tsx";
import PostNew from "./pages/postnew/PostNew.tsx";


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-new" element={<PostNew />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
