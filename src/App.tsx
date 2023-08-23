import { CssVarsProvider } from '@mui/joy/styles';
import { GlobalStyles } from '@mui/material';
import SignInSide from 'SignInSide';
import axios from 'axios';
import { IPageDRNavbar } from 'components/DRNavbar';
import MarkdownPage from 'components/MarkdownPage';
import ErrorBoundary from 'errer_check/ErrorBoundary';
import { SnackbarProvider } from 'notistack';
import About from 'page/About';
import Download from 'page/Download';
import Report from 'page/Report';
import Support from 'page/Support';
import Translations from 'page/Translations';
import Wiki from 'page/Wiki';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { geturlwebapi } from 'services/BaseRestService';
import { theme } from 'theme';
import './App.css';

axios.get(geturlwebapi() + "/discord/awakens").catch((err) => {
})

function App() {
    const routes = [
        { title: "about", path: "/", element: <About /> },
        { title: "⬇️download", path: "/download", element: <Download /> },
        // { title: "🗞️news", path: "/news", element: <News /> },
        { title: "🌍translations", path: "/translations", element: <Translations /> },
        { title: "📖wiki", path: "/wiki", element: <Wiki routeLink="wiki" urlRepo='DRincs-Productions/ABFD' /> },
        { title: "🐞bug/request", path: "/report", element: <Report /> },
    ];
    const extern_link: IPageDRNavbar[] = [
        { title: "💬discord", path: "https://discord.gg/HFfeJKR" },
        {
            title: "GitHub", path: "https://github.com/DRincs-Productions"
        },
    ];
    const supportRoute = { title: "support me", path: "/support", element: <Support /> }
    const loginRoute = { title: "login", path: "/login", element: <SignInSide /> }

    return (
        <ErrorBoundary>
            <CssVarsProvider theme={theme} defaultMode="dark">
                <GlobalStyles styles={{ h1: { color: 'white' }, h2: { color: 'white' }, body: { backgroundColor: '#6c4b73', } }} />

                <BrowserRouter>
                    <RecoilRoot>
                        <SnackbarProvider maxSnack={3}>
                            {/* <DRNavbar
                                pages={routes}
                                supportPage={supportRoute}
                                loginPage={loginRoute}
                                extern_link={extern_link}
                            /> */}
                            <Routes>
                                {(routes).map((route) => (
                                    <Route key={route.title} path={route.path} element={route.element} />
                                ))}
                                <Route key={supportRoute.title} path={supportRoute.path} element={supportRoute.element} />
                                <Route key={loginRoute.title} path={loginRoute.path} element={loginRoute.element} />
                                <Route key="howtotranslate" path="/howtotranslate" element={<MarkdownPage markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/how-to-translate.md' />} />
                                <Route key="howtoconnectwithdiscord" path="/howtoconnectwithdiscord" element={<MarkdownPage markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/how-to-connect-with-discord.md' />} />
                                <Route key="daz-assert" path="/daz-assert" element={<Wiki routeLink="daz-assert" urlRepo='DRincs-Productions/daz-assert-ABFD-all-in-one' />} />
                            </Routes>
                        </SnackbarProvider>
                    </RecoilRoot>
                </BrowserRouter>
            </CssVarsProvider>
        </ErrorBoundary >
    );
}

export default App;
