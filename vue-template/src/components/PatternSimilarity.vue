<template>
    <div class="col-lg-4">
        <card
        type="chart"
        cardCol
        >
        <template slot="header">
            <h3 class="card-title d-inline">Pattern Similarity</h3>
            
            <button class="card-title btn-rotate btn btn-link btn-icon" type="primary" @click="modals = true">
            <i class="tim-icons icon-zoom-split"></i>
            </button>   

            <modal :show.sync="modals"
                    class="modal-search"
                    id="searchModal"
                    :centered="false"
                    :show-close="true">

                    <template slot="header">
                        <h3 class="modal-title" id="exampleModalLabel">Detail Similarity</h3>
                    </template>
                    
                    <bar-chart
                    class="chart-area"
                    chart-id="similar-chart"
                    :chart-data="detailSimilarity.chartData"
                    :gradient-stops="detailSimilarity.gradientStops"
                    :extra-options="detailSimilarity.extraOptions">
                    </bar-chart>
            </modal>


        </template>
        <h2>{{stockName}}</h2>
          <bar-chart
                  class="chart-area"
                  chart-id="similar-chart"
                  :chart-data="similarity.chartData"
                  :gradient-stops="similarity.gradientStops"
                  :extra-options="similarity.extraOptions">
          </bar-chart>
        </card>
    </div>
</template>


<script>

import {
  Card
} from "@/components/index";
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import Modal from "@/components/Modal";

export default {
    components:{
        Card,
        BarChart,
        Modal
    },
    data(){
        return{
            modals: false,
            // yae - 안에 내용 created() 에서 채워 넣기
            similarity: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                labels: ['HeadAndShoulders', 'DoubleTop', 'RisingEdge'],
                datasets: [{
                    label: "Patterns",
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
            detailSimilarity: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                labels: ['HeadAndShoulders', 'DoubleTop', 'RisingEdge', 'yaewon', 'jjeong', 'yaeyae'],
                datasets: [{
                    label: "Patterns",
                    fill: true,
                    borderColor: config.colors.info,
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: [90, 60,75, 20, 40, 30],
                    }]
                },
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.3, 0],
            },
        } 
    },
    props:['stockName'],

    created:function(){
        // yae- 여기서 pattern similarity 받아오기
        console.log("created:", this.stockName)
    }
}
</script>