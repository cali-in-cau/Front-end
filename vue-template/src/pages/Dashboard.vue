<template>
  <div class="content">
    
    <!-- yae SearchBar component -->
    <div class="row"> 
      <div class="col-sm-12">
        <search-bar></search-bar>
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
              <template v-if="!isRTL">
                <h6 class="title d-inline">Bookmark</h6>
              </template>
              <template v-else>
                <h6 class="title d-inline">الشحنات</h6>
              </template>
              <template v-if="!isRTL">
                <p class="card-category d-inline">Username</p>
              </template>
              <drop-down tag="div" :class="isRTL ? 'float-left' : ''">
                <button aria-label="Settings menu" data-toggle="dropdown" class="dropdown-toggle btn-rotate btn btn-link btn-icon" :class="isRTL ? 'pl-5' : ''">
                  <i class="tim-icons icon-settings-gear-63"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <a href="#pablo" class="dropdown-item">Action</a>
                  <a href="#pablo" class="dropdown-item">Another Action</a>
                  <a href="#pablo" class="dropdown-item">Something else</a>
                </ul>
              </drop-down>
            </template>
            <div class="table-full-width table-responsive">
              <task-list></task-list>
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

      <!-- yae 유사도 그래프 -->
      <div class="col-lg-4">
         <pattern-sim></pattern-sim>
      </div>

      <!-- Stock Info -->
      <div class="col-lg-4">
        <card
        type="chart"
        cardCol
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
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-bell-55 text-success "></i> 5+</h3>
          </template>
          <div class="table-responsive">
            <p>notification example1</p>
            <p>notification example2</p>
            <p>notification example3</p>
            <p>notification example4</p>
            <p>notification example5</p>
            <p>notification example6</p>
            <p>notification example7</p>
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
import TaskList from './Dashboard/TaskList'
//import UserTable from './Dashboard/UserTable'
import config from '@/config';

import SearchBar from '@/components/SearchBar';
import StockChart from '@/components/StockChart';
import PatternSim from '@/components/PatternSim';

export default {
  components: {
    Card,
    LineChart,
    TaskList,
    SearchBar,
    StockChart,
    PatternSim
    //UserTable
  },
  data(){
    return{
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
