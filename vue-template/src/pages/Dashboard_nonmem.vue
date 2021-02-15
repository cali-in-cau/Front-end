<template>
  <div class="content">
    
    <!-- yae SearchBar component -->
    <div class="row"> 
      <div class="col-sm-12">
        <search-bar :info="info" ></search-bar>
      </div>
    </div>

    <div class="row">
      <!-- Annie Stock Graph -->
      <div class="col-8">
        <stock-chart :data="mainStock"></stock-chart>
      </div>

      <!-- Annie News -->
      <div class="col-4">
        <card class="card">
          <template slot="header">
            <h3 class="card-title"><i class="tim-icons icon-planet text-primary "></i>News</h3>
          </template>
          <div class="table-responsive">
            <p>news example1</p>
            <p>news example2</p>
            <p>news example3</p>
            <p>news example4</p>
            <p>news example5</p>
            <p>news example6</p>
            <p>news example7</p>
            <p>news example8</p>
          </div>
        </card>
      </div>
    </div>
  <div class="row">
    <!-- Login ad -->
    <div class="col-12">
      <card>
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto text-center">
              <h4 class="card-title">
                For more information,
              </h4>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8 ml-auto mr-auto">
              <div class="row">
                <div class="col-md-4 ml-auto mr-auto text-center">
                  <!-- 버튼 동작은 아직 지정하지 않음 -->
                  <base-button type="primary" block @click="notifyVue('Sign', 'In')">Sign in/up</base-button>
                </div>
              </div>
            </div>
          </div>
      </card>
    </div>     
  </div>


  <div class="row">
    <div class="col-md-5 mr-auto">
        <card class="card-chart card-chart-pie">
          <h5 slot="header" class="card-category text-left">
            Multiple Pie Chart
          </h5>

          <div class="row">
            <div class="col-6">
              <div class="chart-area">
                <pie-chart
                  :chart-data="pieChart2.chartData"
                  :extra-options="pieChart2.extraOptions"
                  :height="120"
                >
                </pie-chart>
              </div>
            </div>

            <div class="col-6">
              <h4 class="card-title text-left">
                <i class="tim-icons  icon-tag text-warning"></i> 130,000
              </h4>
              <p class="category text-left">Feedback from 20.000 users</p>
            </div>
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


//import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
//import TaskList from './Dashboard/TaskList'
//import UserTable from './Dashboard/UserTable'
import config from '@/config';

import SearchBar from '@/components/SearchBar';
import StockChart from '@/components/StockChart';
import PieChart from "@/components/Charts/PieChart";
//import PatternSim from '@/components/PatternSim';

export default {
  components: {
    Card,
    //LineChart,
    //TaskList,
    SearchBar,
    StockChart,
    PieChart
    //PatternSim
    //UserTable
  },
  data(){
    return{
      mainStock:{stock_code:"AAPL", stock_name:"APPLE INC"},
      //user Info
      info:"non",
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
