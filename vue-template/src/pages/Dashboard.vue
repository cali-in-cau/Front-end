<template>
  <div class="content">
    
    <!-- yae SearchBar component -->
    <div class="row"> 
      <div class="col-sm-12">
        <search-bar :info="info"></search-bar>
      </div>
    </div>

    <div class="row">
    <!-- Annie Stock Graph -->
      <div class="col-8">
        <stock-chart></stock-chart>
      </div>

        <!-- Annie bookmark -->
        <div class="col-4">
          <card type="tasks">
            <template slot="header">
                <h3 class="card-title">BOOKMARK</h3>
            </template>
            <div class="table-full-width table-responsive">
              
              <bookmark v-if='showbookmark' :data="favorites" v-on:changeStock="changeStock($event)" v-on:deleteStock="deleteStock($event)" ></bookmark>

            </div>
          </card>

      </div>
    </div>
    <div class="row">

    <!--
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card
        type="chart"
        cardCol
        >
        <template slot="header">
          <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
          <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i> 763,215</h3>
        </template>
          
        </card>
      </div>
      -->

      <!-- yae 유사도 그래프, :stockName="stockName" 요런식으로 값을 넣어줘야함 나중에-->
      <div class="col-lg-4">
         <pattern-sim></pattern-sim>
      </div>

      <!-- Stock Info -->
      <div class="col-lg-4">
        <card
        type="chart"
        cardCold
        >
        <template slot="header">
          <h3 class="card-title"><i class="tim-icons icon-chart-bar-32 text-primary "></i>Stock Info</h3>
        </template>
          <line-chart
                  class="chart-area"
                  chart-id="green-line-chart"
                  :chart-data="greenLineChart.chartData"
                  :gradient-colors="greenLineChart.gradientColors"
                  :gradient-stops="greenLineChart.gradientStops"
                  :extra-options="greenLineChart.extraOptions">
          </line-chart>
        </card>  
      </div>
      <!-- Notification -->
      <div class="col-lg-4">
        <card class="card">
          <template slot="header">
            <h3 class="card-title"><i class="tim-icons icon-bell-55 text-success "></i> 4+</h3>
          </template>
          <div class="content">
            <base-alert type="success" dismissible>
              <span><b> BULL - </b> CAB Inc. : +14.51% </span>
            </base-alert>
            <base-alert type="danger" dismissible>
              <span><b> BEAR - </b> ABC corp. : -13.22%  </span>
            </base-alert>
            <base-alert type="info" dismissible>
              <span><b> Info - </b> normal notification </span>
            </base-alert>
            <base-alert type="danger" dismissible>
              <span><b> BEAR - </b> XYZ corp. : -7.83%  </span>
            </base-alert>
          </div>
        </card>
      </div>
      
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        
      </div>
    </div>
  </div>
</template>

<script>

import {
  Card
} from "@/components/index";


import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import Bookmark from './Dashboard/Bookmark'
import config from '@/config';

import SearchBar from '@/components/SearchBar';
import StockChart from '@/components/StockChart';
import PatternSim from '@/components/PatternSim';

import BaseAlert from '@/components/BaseAlert';
//import BaseButton from '@/components/BaseButton';
import NotificationTemplate from './Notifications/NotificationTemplate';

import axios from "axios";

export default {
  components: {
    Card,
    LineChart,
    Bookmark,
    SearchBar,
    StockChart,
    PatternSim,
    BaseAlert
    //BaseButton
  },
  data(){
    return{
      // favorites
      showbookmark:false,	
      favorites:[],
      //user token
      token:"",
      //user Info
      info:"accept",
      //Stock Info
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [{
            label: "Data",
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [80, 100, 70, 80, 120, 80],
          }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      //Pattern Similarity
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ['HeadAndShoulders', 'DoubleTop', 'RisingEdge'],
          datasets: [{
            label: "Countries",
            fill: true,
            borderColor: config.colors.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [90, 20,75],
          }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.3, 0],
      },
      //notification
      type:["","info","success","warning","danger"],
      notifications:{
        topCenter: false
      }
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
  created: async function(){

    await axios.get('/back/users/get_user')
            .then((res)=>{
                this.token = res.data.token;
                console.log("get user data", res.data)
                console.log("token", this.token)
            })
            .catch((err)=>{
                console.log(err)
            });

    await axios.post("/back/users/favorites",{token:this.token})
        .then((res)=>{
          console.log("favorites", res);
	        this.favorites = res.data;
          this.showbookmark = true; 
        })
        .catch((err)=>{
          console.log(err);
        });

  },
  methods:{
    initBigChart(index) {
      let chartData = {
        datasets: [{
          fill: true,
          borderColor: config.colors.primary,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: config.colors.primary,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: config.colors.primary,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.bigLineChart.allData[index]
        }],
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      }
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    notifyVue(verticalAlign, horizontalAlign){
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        component: NotificationTemplate,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color],
        timeout: 0
      });
    },
    changeStock:function(code, name){
      console.log("changeStock methods,, change it later in Dashboard.vue", code, name);
    },
    deleteStock:function(code){
	axios.post("/back/users/favorite/delete/"+code,{token:this.token})
        .then((res)=>{
          this.favorites=res.data
        })
        .catch((err)=>{
          console.log(err);
        });
    }
  },
  mounted(){
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = 'ar';
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
    }
  }
}
</script>
<style>
</style>
