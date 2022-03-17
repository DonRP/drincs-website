// import your route components too

import About from "About";
import DRNavbar from "components/DRNavbar";
import Download from "Download";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "shared/ErrorBoundary";
import Translations from "Translations";

const routes = [
    { title: "about", path: "/", element: <About /> },
    { title: "download", path: "download", element: <Download /> },
    { title: "translations", path: "translations", element: <Translations /> },
];

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <DRNavbar pages={routes} />
                <Routes>
                    {routes.map((route) => (
                        <Route path={route.path} element={route.element} />
                    ))}
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}
export default App;
