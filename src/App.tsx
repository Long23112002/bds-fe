import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar.tsx";
import Home from "./pages/home/Home.tsx";
import Footer from "./layouts/Footer.tsx";
import ManagerUser from "./pages/user-manager/ManagerUser.tsx";
import PostDetail from "./pages/home/components/PostDetail.tsx";
import LoginModal from "./pages/auth/LoginModal.tsx";
import RegisterModal from "./pages/auth/RegisterModal.tsx";
import FillterPage from "./pages/filter/FillterPage.tsx";
import ProfileUser from "./pages/home/components/ProfileUser.tsx";
import Favorite from "./layouts/favorite/Favorite.tsx";
import PostNew from "./pages/post/postnew/PostNew.tsx";
import PostUpdate from "./pages/post/postupdate/PostUpdate.tsx";


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-new" element={<PostNew />} />
          <Route path="/user-dasboard/*" element={<ManagerUser />} />
          <Route path="/post-detail/:id" element={<PostDetail />} />
          <Route path="/filter-page" element={<FillterPage />} />
          <Route path="/profile-user/:id" element={<ProfileUser />} />
          <Route path="/favorite-list" element={<Favorite />} />
          <Route path="/post-update/:id" element={<PostUpdate />} />
        </Routes>
        <LoginModal />
        <RegisterModal />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
