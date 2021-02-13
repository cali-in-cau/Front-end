<!-- Annie -->
<template>
    <card type="chart">
        <!-- Header -->
        <template slot="header">
            <div class="row">
                <!-- Chart Title -->
                <div class="col-sm-6">
                    <template>
                        <h5 class="card-category">Real Time Stock Graph</h5>
                    </template>
                    <template>
                        <!-- 여기도 검색한 회사명 넣어줘야 함 -->
                        <h2 class="card-title">{{data.stock_name}}</h2>
                        
                    </template>
                </div>
                <!-- Buttons(Group) -->
                <div class="col-sm-6">
                    <div class="btn-group btn-group-toggle"
                        data-toggle="buttons"
                        :class="isRTL ? 'float-left' : 'float-right'">
                        <template v-if="!isRTL">
                            <label v-for="(option, index) in bigLineChartCategories"
                                :key="option"
                                class="btn btn-success btn-sm btn-simple"
                                :class="{active:bigLineChart.activeIndex === index}"
                                    id="index">
                                <input type="radio"
                                    @click="initBigChart(index)"
                                    name="options" autocomplete="off"
                                    :checked="bigLineChart.activeIndex === index">
                                {{ option }}
                            </label>
                        </template>
                        <template v-else>
                            <label v-for="(option, index) in bigLineChartCategoriesAr"
                                :key="option"
                                class="btn btn-success btn-sm btn-simple"
                                :class="{active:bigLineChart.activeIndex === index}"
                                :id="index">
                                <input type="radio"
                                    @click="initBigChart(index)"
                                    name="options" autocomplete="off"
                                    :checked="bigLineChart.activeIndex === index">
                                {{ option }}
                            </label>
                        </template>
                    </div>
                </div>
            </div>
        </template>
        <!-- Chart(Line, Green) -->
        <line-chart
            class="chart-area"
            ref="bigChart"
            chart-id="big-line-chart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions">
        </line-chart>
    </card>
</template>       

<script>

import stockData from '../components/dumpSS.json';

import {
  Card
} from "@/components/index";

import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';

//import axios from 'axios'

export default {

    components: {
        Card,
        LineChart
    },
    data(){
        return{
            corName : "",
            //고정값
            bigLineChartCategories:[
                "1Day",
                "1Week",
                "1Month"
            ],
            bigLineChartCategoriesAr:[
                "حسابات",
                "المشتريات",
                "جلسات"
            ],
            //stock data
            bigLineChart: {
                allData: [
                    stockData.data.value.map(a=>a.Close),
                    //stockData.data.value.map(a=>a.Close),
                    //stockData.data.value.map(a=>a.Close)
                    //[100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],//1번버튼
                    //[80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],//2번버튼
                    //[60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]//3번버튼
                ],
                allDate:[
                    stockData.data.date.slice(-10,),
                    stockData.data.date.slice(-50,),
                    stockData.data.date.slice(-100,),
                ],

                activeIndex: 0,
                chartData: { datasets: [{ }]},
                extraOptions: chartConfigs.purpleChartOptions,
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.4, 0],
                categories: []
            },
            
            //list:undefined

            
        }
    },
  props:['data'],
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
            borderWidth: 2, //선굵기
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            //찾았다 데이터
            //data: this.bigLineChart.allData[index]
            data: this.bigLineChart.allData[0]
        }],
        //라벨 여기있다
        //아 이거 이렇게 적어도 되는걸까ㅋㅎㅠ

        //labels: stockData.data.date.slice(-30,),
        labels: this.bigLineChart.allDate[index]
        //labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      }
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
      this.corName = stockData.info.name;
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
  created:function(){
	console.log("stockChart created : ", this.data);
  },
  watch:{
	data(newVal, oldVal){
		console.log("stock Chart stock changed:", oldVal,"->", newVal);
	}
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
