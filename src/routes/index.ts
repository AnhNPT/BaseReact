import { lazy } from "react";
const TestPage = lazy(() => import("../pages/Test/Test"));
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
        path: "/test",
        component: TestPage,
    },
    {
        path: "/about",
        component: AboutPage,
    },
];

export { PublicRoutes };
