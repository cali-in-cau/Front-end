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
                        <h2 class="card-title">Samsung Electronics</h2>
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

import {
  Card
} from "@/components/index";

import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';

export default {
    components: {
        Card,
        LineChart
    },
    data(){
        return{
            //고정값
            bigLineChartCategories:[
                "1hour",
                "1Day",
                "1Month"
            ],
            bigLineChartCategoriesAr:[
                "حسابات",
                "المشتريات",
                "جلسات"
            ],
            //stock data
            bigLineChart: {
                //여기 값을 파싱을 해야하는데 기준을 잡아야됨
                allData: [
                [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
                [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
                [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
                ],
                activeIndex: 0,
                chartData: { datasets: [{ }]},
                extraOptions: chartConfigs.purpleChartOptions,
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.4, 0],
                categories: []
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
        //여기도 라벨을 어떻게 붙일지...
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      }
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
}
</script>
<style>
</style>
