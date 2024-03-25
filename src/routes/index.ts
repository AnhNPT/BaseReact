import { lazy } from "react";
const AboutPage = lazy(() => import("../pages/About/About"));
const ErrorPage = lazy(() => import("../pages/404/Error"));
const HomePage = lazy(() => import("../pages/Home/Home"));

const PublicRoutes = [
    {
        path: "*",
        component: ErrorPage,
    },
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/about",
        component: AboutPage,
    },
];

export { PublicRoutes };
