import React, { lazy } from "react";
import { Route, Routes, Link } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/about" element={<About></About>}></Route>
        </Routes>
    );
}

export default App;
