import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { About } from './layout/about/about';
import { Skills } from './layout/skills/skills';
import { Services } from './layout/services/services';
import { Portfolio } from './layout/portfolio/portfolio';
import { Contact } from './layout/contact/contact';
import { Notfound } from './notfound/notfound';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { HomeDashboard as HomeDashboard } from './dashboard/home/home';
import { About as AboutDashboard } from './dashboard/about/about';
import { Contact as ContactDashboard } from './dashboard/contact/contact';
import { SkillsDashboard as SkillsDashboard } from './dashboard/skills/skills';
import { PortfolioDashboard as PortfolioDashbored } from './dashboard/portfolio/portfolio';
import { ServicesDashboared as ServicesDashbored } from './dashboard/services/services';

export const routes: Routes = [
    {path:'',component:Layout, children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:Home},
        {path:'about',component:About},
        {path:'skills',component:Skills},
        {path:'services',component:Services},
        {path:'portfolio',component:Portfolio},
        {path:'contact',component:Contact},
    ]},
    {path:"dashboard",component:Dashboard,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeDashboard},
        {path:'about',component:AboutDashboard},
        {path:'skills',component:SkillsDashboard},
        {path:'portfolio',component:PortfolioDashbored},
        {path:'services',component:ServicesDashbored},
        {path:'contact',component:ContactDashboard},
    ]},
    {path:'**',component:Notfound},
];
