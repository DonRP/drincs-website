// import your route components too

import About from "About";
import DRNavbar from "components/DRNavbar";
import Download from "Download";
import News from "News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "shared/ErrorBoundary";
import Support from "Support";
import Translations from "Translations";

const routes = [
    { title: "about", path: "/", element: <About /> },
    { title: "news", path: "/news", element: <News /> },
    { title: "download", path: "/download", element: <Download /> },
    { title: "translations", path: "/translations", element: <Translations /> },
];
const supportRoute = { title: "support", path: "/support", element: <Support /> }
function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <DRNavbar pages={routes} supportPage={supportRoute} injectFirst />
                <Routes>
                    {(routes).map((route) => (
                        <Route path={route.path} element={route.element} />
                    ))}
                    <Route path={supportRoute.path} element={supportRoute.element} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}
export default App;
