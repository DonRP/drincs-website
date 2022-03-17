import { Home } from "@mui/icons-material";
import DRNavbar from "components/DRNavbar";
import Download from "Download";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "shared/ErrorBoundary";
import Translations from "Translations";
// import your route components too

const routes = [
    { title: "about", path: "/", element: <Home /> },
    { title: "download", path: "download", element: <Download /> },
    { title: "translations", path: "translations", element: <Translations /> },
];

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <DRNavbar />
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
