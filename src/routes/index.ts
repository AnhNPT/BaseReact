import { lazy } from "react";
const HomePage = lazy(() => import("../pages/Home/Home"));
const AboutPage = lazy(() => import("../pages/About/About"));

const PublicRoutes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/about",
        component: AboutPage,
    },
];

export {PublicRoutes};
