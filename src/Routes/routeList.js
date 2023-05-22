import {lazy} from "react";

export const publicRoutes = [{path: "/", element: lazy(() => import("../Pages/Auth/index.js"))}];

export const privateRoutes = [
    {path: "/", element: lazy(() => import("../Pages/home.jsx"))},
    {path: "/Home", element: lazy(() => import("../Pages/home.jsx"))},
    {path: "/AddPost", element: lazy(() => import("../Pages/AddPost"))},
    {path: "/Profile/Settings", element: lazy(() => import("../Pages/Profile/settings.jsx"))},
    {path: "/Profile/Dashboard", element: lazy(() => import("../Pages/Profile/dashboard.jsx"))},
    {path: "/Profile/ManageAds", element: lazy(() => import("../Pages/Profile/manageAds.jsx"))},
    {path: "/Profile/MyJobs", element: lazy(() => import("../Pages/Profile/Jobs.jsx"))},
    {path: "/Profile/SavedAds", element: lazy(() => import("../Pages/Profile/savedAds.jsx"))},
    {path: "/Profile/SavedResume", element: lazy(() => import("../Pages/Profile/savedResume.jsx"))},
    {path: "/Profile/Support", element: lazy(() => import("../Pages/Profile/support.jsx"))},
    {path: "/Property/Home", element: lazy(() => import("../Pages/Property/home.jsx"))},
    {path: "/Property/Details", routeParam: "id", element: lazy(() => import("../Pages/Property/details.jsx"))},
    {path: "/Property/Filter", element: lazy(() => import("../Pages/Property/filter.jsx"))},
];
