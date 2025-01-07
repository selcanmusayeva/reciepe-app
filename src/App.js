import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/pages/home";
import ContactPage from "./pages/contact-me";
import CreateRecipe from "./pages/recipe/create";
import MainPage from "./pages/recipe";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import RecipeDetailPage from "./pages/recipe/DetailedPage";

function App() {
  return (
    <div className="App w-full h-full">
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/recipes">
            <Route path="" element={<MainPage />} />
            <Route path=":id" element={<RecipeDetailPage />} />
            <Route path="create" element={<CreateRecipe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
