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
import MyProfile from 'page/MyProfile/MyProfile';
import MyProfileEdit from 'page/MyProfile/MyProfileEdit';
import MyProfileEditPassword from 'page/MyProfile/MyProfileEditPassword';
import Report from 'page/Report';
import SignInSide from 'page/SignInSide';
import Support from 'page/Support';
import Translations from 'page/Translations';
import Wiki from 'page/Wiki';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { isLoggedIn } from 'services/AuthService';
import { geturlwebapi } from 'services/BaseRestService';
import './App.css';

axios.get(geturlwebapi() + "/discord/awakens").catch((err) => {
})

function App() {
    useI18n()
    const { t } = useTranslation(["translation"]);
    const routes = [
        { title: t("about"), path: "/", element: <About /> },
        { title: "⬇️" + t("download"), path: "/download", element: <Download /> },
        // { title: "🗞️news", path: "/news", element: <News /> },
        { title: "🌍" + t("translations"), path: "/translations", element: <Translations /> },
        { title: "📖" + t("wiki"), path: "/wiki", element: <Wiki routeLink="wiki" urlRepo={ABFDrepo} /> },
        { title: "🐞" + t("bug/requests"), path: "/report", element: <Report /> },
    ];
    const extern_link: IPageDRNavbar[] = [
        { title: "🔗Discord", path: discordLink },
        {
            title: "🔗GitHub", path: gitHubLink
        },
    ];
    const supportRoute = { title: t("support_us"), path: "/support", element: <Support /> }
    const [openLogin, setOpenLogin] = useState(false);
    const queryClient = new QueryClient()

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
                                {isLoggedIn() &&
                                    <Routes>
                                        <Route key="profile" path="/profile" element={<MyProfile />} />
                                        <Route key="profile-edit" path="/profile/edit" element={<MyProfileEdit />} />
                                        <Route key="profile-change-password" path="/profile/change-password" element={<MyProfileEditPassword />} />
                                    </Routes>
                                }
                            </SnackbarProvider>
                        </RecoilRoot>
                    </QueryClientProvider>
                </BrowserRouter>
            </MyTheme>
        </ErrorBoundary >
    );
}

export default App;
