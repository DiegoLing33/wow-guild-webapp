import IndexPage from "@/components/pages/IndexPage";
import DevelopPage from "@/components/pages/DevelopPage";
import LeaversPage from "@/components/pages/LeaversPage";
import GuildScorePage from "@/components/pages/GuildScore/GuildScorePage";
import GuildSocreCalcPage from "@/components/pages/GuildScore/GuildSocreCalcPage";
import GuildScoreRatingPage from "@/components/pages/GuildScore/GuildScoreRatingPage";
import VersionsPage from "@/components/pages/VersionsPage";
import WarriorPage from "@/components/pages/WarriorPage";
import AddonsPage from "@/core/pages/AddonsPage";

/**
 * Core routes
 * @type {any}
 */
export const coreRoutes = [
    {path: '/', component: IndexPage},
    {path: '/dev', component: DevelopPage},
    {path: '/leavers', component: LeaversPage},
    {path: '/score', component: GuildScorePage},
    {path: '/score/calc', component: GuildSocreCalcPage},
    {path: '/score/rating', component: GuildScoreRatingPage},
    {path: '/versions', component: VersionsPage},
    {path: '/addons', component: AddonsPage},
    {path: '/player/:name', component: WarriorPage, props: true},
];