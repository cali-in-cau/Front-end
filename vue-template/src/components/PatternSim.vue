<!--Annie-->
<template>
    <card
        type="chart"
        cardCol
        >
        <template slot="header">
          <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i>Pattern Similarity</h3>
        </template>
        <bar-chart
            class="chart-area"
            chart-id="blue-bar-chart"
            :chart-data="blueBarChart.chartData"
            :gradient-stops="blueBarChart.gradientStops"
            :extra-options="blueBarChart.extraOptions">
        </bar-chart>
    </card>
</template>


<script>

import {
    Card
} from "@/components/index";

import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';

export default {
    components:{
        Card,
        BarChart
    },
    data(){
        return{
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
    }
}
</script>