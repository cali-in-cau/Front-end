import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
//import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

import News from "@/pages/News.vue";

//yae
import StockSearch from "@/pages/StockSearch.vue";

const routes = [{
  path: "/",
  component: DashboardLayout,
  redirect: "dashboard",

  // yae - nested routing 을 위한 것이었따.
  children:[
    {
      path: "dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      // yae - 나중에 컴포넌트를 만들어서 바꿔줘야함
      path: "icons",
      name: "News",
      component: Icons
    },
    {
      path: "maps",
      name: "Maps",
      component: Maps
    },
    {
      path: "notifications",
      name: "Notifications",
      component: Notifications
    },
    {
      path: "user",
      name: "User Profile",
      component: UserProfile
    },
    {
      path: "table",
      name: "Table List",
      component: TableList
    },
    {
      path: "typography",
      name: "Typography",
      component: Typography
    },
    {
      path: "news",
      name: "News",
      component: News
    },

    //yae - page 이동 
    {
      path: "stock",
      name: "Stock Search",
      component: StockSearch
    },
  ]

}];

export default routes;
