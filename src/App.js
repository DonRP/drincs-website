// import your route components too

import About from "About";
import DRNavbar from "components/DRNavbar";
import Download from "Download";
import News from "News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "shared/ErrorBoundary";

const routes = [
    { title: "about", path: "/", element: <About /> },
    { title: "news", path: "/news", element: <News /> },
    { title: "download", path: "/download", element: <Download /> },
];
function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <DRNavbar pages={routes} injectFirst />
                <Routes>
                    {(routes).map((route) => (
                        <Route path={route.path} element={route.element} />
                    ))}
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}
export default App;
