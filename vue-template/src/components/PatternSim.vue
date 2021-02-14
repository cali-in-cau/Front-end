<template>
    
        <card
        type="chart"
        cardCol
        >
        <template slot="header">
	    <div class="row">
		    <div class="col-sm-9">
			<template>
			    <h5 class="card-category">Real Time Analysis</h5>
			</template>
			<h3 class="card-title">Pattern Similarity</h3>
		    </div>	
		
		    <div class="col-sm-3">

			<button class="card-title btn-rotate btn btn-link btn-icon float-right" type="primary" @click="modals = true">
			    <i class="tim-icons icon-zoom-split"></i>
			</button>  
		    </div>
            </div>

             

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
          <bar-chart v-if="showChart"
                  class="chart-area"
                  chart-id="similar-chart"
                  :chart-data="similarity.chartData"
                  :gradient-stops="similarity.gradientStops"
                  :extra-options="similarity.extraOptions">
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
import Modal from "@/components/Modal";

export default {
    components:{
        Card,
        BarChart,
        Modal
    },
    data(){
        return{
	    showChart:false,
            modals: false,
            // yae - 안에 내용 created() 에서 채워 넣기
            similarity: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                labels: [],
                datasets: [{
                    label: "Patterns",
                    fill: true,
                    borderColor: config.colors.info,
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: [],
                    }]
                },
                gradientColors: config.colors.primaryGradient,
                gradientStops: [1, 0.3, 0],
            },
            detailSimilarity: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                labels: ['HeadAndShoulders', 'DoubleTop', 'RisingEdge', 'yaewon', 'jjeong', 'yaeyae'],
                datasets:[ {
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
    props:['data'],
    watch:{
	async data(newVal,oldVal){
		
		this.showChart=false;
		console.log("patternSim changed:", oldVal,"->", newVal);
		
		await this.renderChart();	
		
		this.showChart=true;
	},

    },
    methods:{
	renderChart:function(){
			if(this.data===undefined){
			// 0 값
			this.similarity.chartData.labels=["none", "none", "none"];
			this.similarity.chartData.datasets[0].data=[0, 0, 0];
			
		}else{
			// ML 결과 받아오기 , axios

			this.similarity.chartData.labels=["Pattern1", "pattern2", "pattern3"];
			this.similarity.chartData.datasets[0].data=[70,40, 50];
		}

	}

    },
    created:async function(){
	await this.renderChart();	
	this.showChart=true;
    }
}
</script>
