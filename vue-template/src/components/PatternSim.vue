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
            
            <button v-if="data !== undefined" class="card-title btn-rotate btn btn-link btn-icon float-right" type="primary" @click="modals = true">
             <!--       
			<button class="card-title btn-rotate btn btn-link btn-icon float-right" type="primary" @click="modals = true">
                -->
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
        <!--
          <bar-chart v-if="showChart"
                  class="chart-area"
                  chart-id="similar-chart"
                  :chart-data="similarity.chartData"
                  :gradient-stops="similarity.gradientStops"
                  :extra-options="similarity.extraOptions">
          </bar-chart>
          -->
            <pie-chart v-if="showChart"
                  :chart-data="pieChart.chartData"
                  :extra-options="pieChart.extraOptions"
                  :height="120"
                >
            </pie-chart>
            
            <div class="card-footer">
                    <div v-for="(label, index) in pieChart.chartData.labels" :key="index">
                        <h4 v-if="label != 'none'" style="margin:0;">{{index+1}}. {{label}} / {{pieChart.chartData.datasets[0].data[index]}}%</h4>
                        <h2 v-else>No data</h2> 
                    </div>
            </div>
        </card>
</template>


<script>

import {
  Card
} from "@/components/index";
import BarChart from '@/components/Charts/BarChart';
import PieChart from "@/components/Charts/PieChart";
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import Modal from "@/components/Modal";

import EventBus from '@/eventbus';

//Mock Data
import pie from '@/pieData.json';
import bar from '@/BarData.json';

export default {
    components:{
        Card,
        BarChart,
        PieChart,
        Modal
    },
    data(){
        return{
            period:"",
	        showChart:false,
            modals: false,

            detailSimilarity: {
                extraOptions: chartConfigs.barChartOptions,
                chartData: {
                labels: [],
                datasets:[ {
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

        pieChart: {
            chartData: {
            labels: [],
            datasets: [
                {
                label: "Emails",
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ["#e2e2e2", "#ff8779", "#2a84e9" ],
                borderWidth: 0,
                data: []
                }
            ]
            },
            extraOptions: chartConfigs.pieChartOptions
            }
        } 
    },
    props:['data'],
    watch:{
        async data(newVal,oldVal){
            
            this.showChart=false;
            console.log("patternSim changed:", oldVal,"->", newVal);
            await this.renderChart();	
        },

    },
    methods:{

	    renderChart:async function(){
            
		if(this.data===undefined){
                // 0 값
		console.log("pie data undefined!!");
                this.pieChart.chartData.labels=[];
                this.pieChart.chartData.labels.push("none");
                this.pieChart.chartData.datasets[0].data=[];
                this.pieChart.chartData.datasets[0].data.push(100);
		this.showChart = true
            }
            
            else{
                await EventBus.$on('period', (payload)=>{
                    //period 의 길이로 ML 서버가 아니라 이젠 스톡 차트에서 주는 데이터가 된다.
                    this.period=payload;

                    console.log("Pattern Sim period:", this.period);
                    
                    /* Pie Data */

                    var temp =[]
                    // 데이터 오는거 보고 파싱 잘해야함
                    Object.keys(pie.talibv2).forEach(function(key) {
                        temp.push({key:key.split('_')[0], count:pie.talibv2[key].length});
                    })
                    temp.sort(function(a,b){
                        return b.count -a.count;
                    });

                    // 상위 3개까지만 받을거기 때문에 3개 이상일 때에만 slice
                    if(temp.length > 3){
                        temp = temp.slice(0, 3);
                    }

                    var sumCount = 0;
                    for(var i = 0 ; i < temp.length; i++){
                        sumCount += temp[i].count;
                    }


                    this.pieChart.chartData.labels=[]
                    this.pieChart.chartData.datasets[0].data=[]

                    for(var j = 0 ; j < temp.length; j++){
                        this.pieChart.chartData.labels.push(temp[j].key)
                        this.pieChart.chartData.datasets[0].data.push( parseInt((temp[j].count / sumCount) *100) );
                        
                    }
                    /* Modal Data */
                    var modal = bar["2021-01-02"].slice(0,5)

                    this.detailSimilarity.chartData.labels = [];
                    this.detailSimilarity.chartData.datasets[0].data = [];

                    for(var k = 0 ; k < modal.length ; k++){

                        var patternName = modal[k][0].split("_")[0]
                        this.detailSimilarity.chartData.labels.push(patternName);
                        this.detailSimilarity.chartData.datasets[0].data.push(parseInt(modal[k][1]*100))
                        
                    }
			this.showChart=true;
                })
        }

        }
    },
    created:async function(){
        
        console.log("crated pattern sim");
        await this.renderChart();	
        //this.showChart=true;
    }
}
</script>
