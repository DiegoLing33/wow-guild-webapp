import AddonsPage from "@/core/pages/AddonsPage";
import IndexPage from "@/core/pages/IndexPage";
import VersionsPage from "@/core/pages/VersionsPage";

/**
 * Core routes
 * @type {any}
 */
export const coreRoutes = [
    {path: '/', component: IndexPage},
    {path: '/versions', component: VersionsPage},
    {path: '/addons', component: AddonsPage},
];