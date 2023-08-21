import { getAnalytics, logEvent } from '@firebase/analytics';
import { GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import About from 'About';
import Download from 'Download';
import MarkdownPage from 'MarkdownPage';
import Report from 'Report';
import SignInSide from 'SignInSide';
import Support from 'Support';
import Translations from 'Translations';
import Wiki from 'Wiki';
import axios from 'axios';
import DRNavbar, { IPageDRNavbar } from 'components/DRNavbar';
import ErrorBoundary from 'errer_check/ErrorBoundary';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { geturlwebapi } from 'services/BaseRestService';
import './App.css';

try {
    const analytics = getAnalytics();
    logEvent(analytics, "page_view", {
        page_title: "home",
    });
}
catch (err) {
    console.log(err)
}

const darkTheme = createTheme({
    // body: {
    //     background: "black",
    // },
    palette: {
        mode: 'dark',
    },
});

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
            <ThemeProvider theme={darkTheme}>
                <GlobalStyles styles={{ h1: { color: 'white' }, h2: { color: 'white' }, body: { backgroundColor: '#6c4b73', } }} />

                <BrowserRouter>
                    <RecoilRoot>
                        <SnackbarProvider maxSnack={3}>
                            <DRNavbar
                                pages={routes}
                                supportPage={supportRoute}
                                loginPage={loginRoute}
                                extern_link={extern_link}
                            // injectFirst 
                            />
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
            </ThemeProvider>
        </ErrorBoundary >
    );
}

export default App;
