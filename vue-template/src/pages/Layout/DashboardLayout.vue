<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->

    <side-bar :background-color="backgroundColor">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-chart-pie-36"></i>
        <template v-if="!isRTL">
          <p>Dashboard</p>
        </template>
        <template v-else>
          <p>لوحة القيادة</p>
        </template>
      </sidebar-link>

      <sidebar-link to="/News">
        <i class="tim-icons icon-planet"></i>
        <template v-if="!isRTL">
          <p>News</p>
        </template>
        <template v-else>
          <p>دعم RTL</p>
        </template>
      </sidebar-link>

      <sidebar-link to="/icons">
        <i class="tim-icons icon-bell-55"></i>
        <template v-if="!isRTL">
          <p>Notifications</p>
        </template>
        <template v-else>
          <p>إخطارات</p>
        </template>
      </sidebar-link>

      <sidebar-link to="/notifications">
        <i class="tim-icons icon-settings-gear-63"></i>
        <template v-if="!isRTL">
          <p>Settings</p>
        </template>
        <template v-else>
          <p>دعم RTL</p>
        </template>
      </sidebar-link>
    </side-bar>

    <sidebar-share :background-color.sync="backgroundColor"></sidebar-share>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>

  </div>
</template>
<style lang="scss"></style>
<script>

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SidebarShare from "./SidebarSharePlugin.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";



export default{
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
    SidebarShare
  },
  data() {
    return {
      backgroundColor: "green"
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
