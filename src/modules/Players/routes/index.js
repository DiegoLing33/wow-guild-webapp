import PlayersPage from "@/modules/Players/pages/PlayersPage";
import ProfilePage from "@/modules/Players/pages/ProfilePage";

/**
 * Core routes
 * @type {any}
 */
export const playersRoutes = [
    {path: '/players', component: PlayersPage},
    {path: '/profile', component: ProfilePage},
];