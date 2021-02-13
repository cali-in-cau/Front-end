<template>
  <div class="content">
    <div class="row"> 
      <div class="col-sm-12">
        <card class="card">
          <h4 slot="header" class="card-title">
            <template v-if="!isRTL">
              Simple Table
            </template>
            <template v-else>
              جدول بسيط
            </template>
          </h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>

import {
  Card
} from "@/components/index";

import UserTable from './Dashboard/UserTable'
//import config from '@/config';

import axios from 'axios';

export default {
  components: {
    Card,
    UserTable
  },
  data(){
    return{
    }
  },
  computed:{
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL(){
      return this.$rtl.isRTL;
    }
  },
  methods:{
  },
  mounted(){
    /*
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = 'ar';
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
    */
  },
  beforeDestroy() {
    /*
    if (this.$rtl.isRTL) {
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
    }
    */
  },
  created:function(){
    
    console.log("news enter created");
    
    axios.get('/back/news/')
    .then((res)=>{
      console.log("Enter news", res);
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }
}
</script>
<style>
</style>
