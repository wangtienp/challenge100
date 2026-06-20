import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { Favorites } from "../pages/Favorites";
import { NavBar } from "../components/NavBar";
import { MovieProvider } from "../contexts/MovieProvider";

export default function App() {
  return (
    <MovieProvider>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}