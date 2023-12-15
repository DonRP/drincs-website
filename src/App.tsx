import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyTheme } from 'Theme';
import axios from 'axios';
import DRNavbar, { IPageDRNavbar } from 'components/DRNavbar';
import MarkdownPage from 'components/MarkdownPage';
import { ABFDrepo, discordLink, gitHubLink } from 'constant';
import ErrorBoundary from 'errer_check/ErrorBoundary';
import { useI18n } from 'i18n';
import { SnackbarProvider } from 'notistack';
import About from 'page/About';
import Download from 'page/Download';
import Report from 'page/Report';
import SignInSide from 'page/SignInSide';
import Support from 'page/Support';
import Translations from 'page/Translations';
import Wiki from 'page/Wiki';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { geturlwebapi } from 'services/BaseRestService';
import './App.css';

axios.get(geturlwebapi() + "/discord/awakens").catch((err) => {
})

function App() {
    // if (process.env.NODE_ENV !== 'production') {
    //     console.log('🛠️Looks like we are in development mode!');
    // }
    const routes = [
        { title: "about", path: "/", element: <About /> },
        { title: "⬇️download", path: "/download", element: <Download /> },
        // { title: "🗞️news", path: "/news", element: <News /> },
        { title: "🌍translations", path: "/translations", element: <Translations /> },
        { title: "📖wiki", path: "/wiki", element: <Wiki routeLink="wiki" urlRepo={ABFDrepo} /> },
        { title: "🐞bug/request", path: "/report", element: <Report /> },
    ];
    const extern_link: IPageDRNavbar[] = [
        { title: "💬discord", path: discordLink },
        {
            title: "GitHub", path: gitHubLink
        },
    ];
    const supportRoute = { title: "support me", path: "/support", element: <Support /> }
    const [openLogin, setOpenLogin] = useState(false);
    const queryClient = new QueryClient()
    useI18n()

    return (
        <ErrorBoundary>
            <MyTheme>
                <BrowserRouter>
                    <QueryClientProvider client={queryClient} >
                        <RecoilRoot>
                            <SnackbarProvider maxSnack={3}>
                                <DRNavbar
                                    pages={routes}
                                    supportPage={supportRoute}
                                    openLogin={() => { setOpenLogin(true) }}
                                    extern_link={extern_link}
                                />

                                <SignInSide
                                    open={openLogin}
                                    onClose={() => { setOpenLogin(false) }}
                                />
                                <Routes>
                                    {(routes).map((route) => (
                                        <Route key={route.title} path={route.path} element={route.element} />
                                    ))}
                                    <Route key={supportRoute.title} path={supportRoute.path} element={supportRoute.element} />
                                    <Route key="howtotranslate" path="/howtotranslate" element={<MarkdownPage markdownLink={`https://raw.githubusercontent.com/wiki/${ABFDrepo}/how-to-translate.md`} />} />
                                    <Route key="daz-assert" path="/daz-assert" element={<Wiki routeLink="daz-assert" urlRepo={`DRincs-Productions/daz-assert-ABFD-all-in-one`} />} />
                                    <Route key="drincs" path="/drincs" element={<About />} />
                                    <Route key="a-big-family-in-debit" path="/a-big-family-in-debit" element={<About />} />
                                </Routes>
                            </SnackbarProvider>
                        </RecoilRoot>
                    </QueryClientProvider>
                </BrowserRouter>
            </MyTheme>
        </ErrorBoundary >
    );
}

export default App;
