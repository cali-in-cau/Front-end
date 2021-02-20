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
                        <!-- 여기도 검색한 회사명 넣어줘야 함 _이게 더빠름 바꿔야징~  -->
                        <h2 v-if="showTitle" class="card-title">{{data.stock_name}}</h2>
                        <!--
                        <h2 v-if="showTitle" class="card-title">{{this.stock_code}}</h2>-->
                        <h2 v-else class="card-title">Add a Bookmark!</h2>
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
                                    @click="initBigChart(index, option)"
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
        <line-chart v-if="showChart"
            class="chart-area"
            ref="bigChart"
            chart-id="big-line-chart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions">
        </line-chart>
        <card v-else class="ml-auto mr-auto">
            <h3><i class="tim-icons icon-sound-wave"></i></h3>
            <h3>Add Bookmarks for Stock Graph</h3>
        </card>
    </card>
</template>       

<script>

import {
  Card
} from "@/components/index";

import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';

import EventBus from '@/eventbus';

import axios from 'axios'


export default {

    components: {
        Card,
        LineChart
    },
    data(){
        return{
            showChart:false,
            showTitle:false,
            // mem:false,
            //stockData: {},
            //고정값
            corName : "",

            //고정값...day, week, month
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
                allData: [],
                allDate:[],
                activeIndex: 0,
                chartData: { datasets: [{ }]},
                extraOptions: chartConfigs.purpleChartOptions,
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.4, 0],
                categories: []
            },
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

    initBigChart(index, option) {
      if(option===undefined){
        option = "1D";
      }
      //if(this.data !== undefined) 
      EventBus.$emit('period', option[1]);

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
            data: this.bigLineChart.allData[index]
        }],
        //라벨 여기있다
        labels: this.bigLineChart.allDate[index]
      }
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    mounted(){
        this.i18n = this.$i18n;
        if (this.enableRTL) {
            this.i18n.locale = 'ar';
            this.$rtl.enableRTL();
        }
        this.initBigChart(0);
        this.$LineChart.UpdateGradients();
    },

    renderChart:async function(){
        console.log('path',this.$router.currentRoute.path)
		if(this.data===undefined){
        // 0 값
            this.showTitle = false
            console.log("Stock chart, data undefined")
            // if(this.$router.currentRoute.path=='/accept/dashboard'){
            //     this.mem = true
            //     console.log("Mem Stockchart, Empty Bookmark")
            // }
        }
        else{
            // ML 결과 받아오기 , axios
            this.showTitle = true
            this.mem = true
            console.log("Mem StockChart")
            console.log("stockChart created : ", this.data);
            //axios.get('/back/stocks/graph/'+this.data.stock_code)
        
            const promise1 = axios.get('/back/stocks/graph/',{
                params: {
                    date_type : "day",
                    start_date : 3,
                    stock_code : this.data.stock_code
                    }
            })
            const promise2 = axios.get('/back/stocks/graph/', {
                params: {
                    date_type : "week",
                    start_date : 7,
                    stock_code : this.data.stock_code
                    }
            })
            const promise3 = axios.get('/back/stocks/graph/', {
                params: {
                    date_type : "month",
                    start_date : 15,
                    stock_code : this.data.stock_code
                    }
            })

            Promise.all([promise1, promise2, promise3])
                .then((res)=>{
                    //console.log(res)
                    //this.stockData = res[0].data.data;
                    //console.log("get data from Back", this.stockData);
                    for (let i = 0; i < 3; i++) {
                        this.bigLineChart.allData.push(res[i].data.data.value.map(a=>a.Close));
                        this.bigLineChart.allDate.push(res[i].data.data.date);       
                    }
                    console.log("allData", this.bigLineChart.allData);
                    console.log("allDate", this.bigLineChart.allDate); 
                })
                .catch((err)=>{
                    console.log(err);
                })
            
        }
    }
  },
  created:async function(){
    await this.renderChart();
    //console.log('here');
    this.showChart=true;
  },
  watch:{
        async data(newVal,oldVal){      
            this.showChart=false;
            console.log("Stock Chart changed:", oldVal,"->", newVal);
            await this.renderChart();	
            this.showChart=true;
        },

    },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
    }
  },
}
</script>
<style>
</style>
