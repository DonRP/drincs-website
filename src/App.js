// import your route components too

import About from "About";
import DRNavbar from "components/DRNavbar";
import Download from "Download";
import ErrorBoundary from "errer_check/ErrorBoundary";
import News from "News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Report from "Report";
import Support from "Support";
import Translations from "Translations";

const routes = [
    { title: "about", path: "/", element: <About /> },
    { title: "🗞️news", path: "/news", element: <News /> },
    { title: "⬇️download", path: "/download", element: <Download /> },
    { title: "🌍translations", path: "/translations", element: <Translations /> },
    { title: "🐞bug/request", path: "/report", element: <Report /> },
];
const extern_link = [
    { title: "📖wiki", path: "https://github.com/DonRP/ABFD/wiki" },
    { title: "💬discord", path: "https://discord.gg/HFfeJKR" },
];
const supportRoute = { title: "support🙏", path: "/support", element: <Support /> }
function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <DRNavbar pages={routes} supportPage={supportRoute} extern_link={extern_link} injectFirst />
                <Routes>
                    {(routes).map((route) => (
                        <Route key={route.title} path={route.path} element={route.element} />
                    ))}
                    <Route key={supportRoute.title} path={supportRoute.path} element={supportRoute.element} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}
export default App;
