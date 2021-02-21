<template>
    <card
        type="chart"
        cardCold
        >
        <template slot="header">
          <h5 class="card-category">Real Time Information</h5>
          <h3 class="card-title"><i class="tim-icons icon-chart-bar-32 text-primary "></i>Stock Info</h3>
        </template>
          <div v-if="showInfo" class="content">
            <div class="row" style="margin:1rem;">
              <div class="ml-auto mr-auto">
                <h4 class="d-inline" style="margin-right:2rem;">Status</h4>
                <button :disabled="isBull"  type="button" class="btn animation-on-hover btn-success d-inline">Bullish</button>
                <button :disabled="isBear"  type="button" class="btn animation-on-hover btn-warning d-inline">Bearish</button>
              </div>
            </div>

            <div class="row">
              <div class="ml-auto mr-auto">
                <h4 class="d-inline" style="margin-right:2rem;">Predicted Price : </h4>
                <h3 class="d-inline" style="margin-right:2rem;">{{predictedPrice}}원</h3>
              </div>
            </div>

          </div>

          <div class="card-footer">
            <p style="margin-top:1.9rem;">* All informations are made by C.I.C *</p>
          </div>

        </card>  
</template>

<script>

import EventBus from '@/eventbus';

import {
  Card
} from "@/components/index";

export default {
    components: {
        Card
    },
    data(){
        return{
            showInfo:false,
            // 버튼에 불들어오게 하려면 false값이 들어가야함
            isBull:true,
            isBear:true,
            predictedPrice:0
        }
    },
    props:['data'],
    watch:{
        async data(newVal,oldVal){
            
            console.log("StockInfo changed:", oldVal,"->", newVal);
            
            await this.renderChart();	
        },

    },
    methods:{
	    renderChart:async function(){
		    this.showInfo = false;
		    console.log("before Enter data in Stock info : ", this.data);
        if(this.data===undefined){
        // 0 값
          console.log("render!!!!");
                      this.isBull=false;
                      this.isBull=false;
                      this.predictedPrice=0;
          
          this.showInfo = true;
                  
        }else{
          // ML 결과 받아오기 , axios
          this.isBull=false;
          this.isBear=true;
          this.predictedPrice=83000;

          console.log("Stock Info data here");
          await EventBus.$on('period', (stockData)=>{
            console.log("stock Data here", stockData);

            this.showInfo = true;
          });	
        }
      }

    },
    created:async function(){
        await this.renderChart();	
    }

    
}
</script>
<style>
</style>
