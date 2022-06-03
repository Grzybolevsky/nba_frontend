import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import FavouritesView from "./pages/FavouritesView";
import MatchesList from "./pages/MatchesList";
import ResponsiveAppBar from "./components/AppBar";
import PlayersList from "./pages/PlayersList";
import FavouritesProvider from "./contexts/FavouritesContext";
import { PlayerView } from "./pages/PlayerView";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <div className="App">
      <FavouritesProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/players" element={<PlayersList />} />
          <Route path="/players/:id" element={<PlayerView />} />
          <Route path="/matches" element={<MatchesList />} />
          <Route path="/favourites" element={<FavouritesView />} />
        </Routes>
      </FavouritesProvider>
    </div>
  );
}
