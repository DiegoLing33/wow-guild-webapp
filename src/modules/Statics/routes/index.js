import StaticsHome from "@/modules/Statics/pages/StaticsHome";
import StaticPage from "@/modules/Statics/pages/StaticPage";

export const staticsRouter = [
    {path: '/statics', component: StaticsHome},
    {path: '/statics/:id', component: StaticPage},
];