import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import FavouritesView from "./pages/FavouritesView";
import MatchesList from "./pages/MatchesList";
import ResponsiveAppBar from "./components/AppBar";
import PlayersList from "./pages/PlayersList";
import FavouritesProvider from "./contexts/FavouritesContext";

function App() {
    return (
        <div className="App">
            <FavouritesProvider>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/" element={<PlayersList/>}/>
                    <Route path="/players" element={<PlayersList/>}/>
                    <Route path="/matches" element={<MatchesList/>}/>
                    <Route path="/favourites" element={<FavouritesView/>}/>
                </Routes>
            </FavouritesProvider>
        </div>
    );
}

export default App;
