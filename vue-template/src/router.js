import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import DashboardLayoutNoMem from "@/pages/Layout/DashboardLayout_nonmem.vue";

import Dashboard from "@/pages/Dashboard.vue";
import DashboardNoMem from "@/pages/Dashboard_nonmem.vue";

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
import FirstPage from "@/pages/FirstPage.vue"

import axios from 'axios';
//import Vue from 'vue';

/*
let authPages = {
  path: "/",
  component:FirstPage,
  name: "FirstPage",

  
  children:[
    {
      path:"login",
      name:"login",
      component:
    }
  ]
  

}
*/

const routes = [
  {
    path:"/",
    name:"Login",
    component:FirstPage,
  },
   
  {
    path: "/accept",
    component: DashboardLayout,
    beforeEnter:async (to, from, next) =>{
	await axios.get('/back/users/get_user')
	    .then((res)=>{
		if(res.data.success == false){
			alert('로그인 해주세요!');
			next('/');
		}
	    })
	    .catch((err)=>{
		console.log(err);
	    });

	    next();
    },
    redirect: "accept/dashboard",

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
        path: "/accept/stock/:code",
        name: "Stock Search",
        component: StockSearch,
        props: true
      },
      
    ],
  },
  
  {
    path: "/non",
    //component: FirstPage,
    //redirect: "main",
    component: DashboardLayoutNoMem,
    redirect: "/non/dashboard",

    // yae - nested routing 을 위한 것이었따.
    children:[
      {
        path: "/non/dashboard",
        name: "Dashboard",
        component: DashboardNoMem
      },
      {
        // yae - 나중에 컴포넌트를 만들어서 바꿔줘야함
        path: "/non/icons",
        name: "News",
        component: Icons
      },
      {
        path: "/non/news",
        name: "News",
        component: News
      },
      //yae - page 이동 
      {
        path: "/non/stock/:data",
        name: "Stock Search",
        component: StockSearch,
        props: true
      },
    ],
  },


];


/*
const routes = [{
  path: "/",
  //component: FirstPage,
  //redirect: "main",
  component: DashboardLayout,
  redirect: "dashboard",

  // yae - nested routing 을 위한 것이었따.
  children:[
    {
      path: "main",
      name: "Main",
      component: FirstPage
    },

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
      path: "stock/:data",
      name: "Stock Search",
      component: StockSearch,
      props: true
    },
  ],


}];
*/
export default routes;
