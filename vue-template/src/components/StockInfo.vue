<template>
    <card
        type="chart"
        cardCold
        >
        <template slot="header">
          <h5 class="card-category">Real Time Information</h5>
          <h3 class="card-title"><i class="tim-icons icon-chart-bar-32 text-primary "></i>Stock Info</h3>
        </template>

          <template v-if="showInfo">
          <div class="content">
            <div class="row" style="margin:1rem;">
              <div class="ml-auto mr-auto">
                <h4 class="d-inline" style="margin-right:2rem;">Status</h4>
                <button :disabled="isBull"  type="button" class="btn animation-on-hover btn-success d-inline">Bullish</button>
                <button :disabled="isBear"  type="button" class="btn animation-on-hover btn-warning d-inline">Bearish</button>
              </div>
            </div>

            <div class="row">
              <div class="ml-auto mr-auto">
                <h3 style="margin-top:0; margin-bottom:0;">Bull : {{bullPercent}}% </h3>
                <h3 style="margin-top:0; margin-bottom:0;">Bear : {{bearPercent}}% </h3>
              </div>
            </div>

          </div>
          </template>
          <card v-else class="ml-auto mr-auto">
                <h3><i class="tim-icons icon-planet"></i></h3>
                <h3>Loading...</h3>
          </card>

          <div class="card-footer">
            <p>* All informations are made by C.I.C *</p>
          </div>

        </card>  
</template>

<script>


import {
  Card
} from "@/components/index";
import axios from "axios";
//import stockInfoData from '@/src/stockInfoData';


export default {
    components: {
        Card
    },
    data(){
        return{
            temp:false,
            date:'',
            flag:'',
            showInfo:false,
            // 버튼에 불들어오게 하려면 false값이 들어가야함
            isBull:true,
            isBear:true,
            bullPercent:0,
            bearPercent:0
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
        if(this.data===undefined){
        // 0 값
          this.showInfo = false;
          this.isBull=true;
          this.isBear=true;
          this.predictedPrice=0;
          this.showInfo = true;
                  
        }else{
          this.showInfo = false;
          // ML 결과 받아오기 , axios
          axios.get("/back/stocks/predict/stockinfo",{
            params:{
              date_type: 'day',
              stock_code:this.data.stock_code
            }
          })
          .then((res)=>{
            console.log("Mock data", res);

            this.date=res.data.date;
            console.log("key date", this.date);


            if(res.data.stock=="bull"){
              this.isBull=false;

                if(res.data.prob[0] > res.data.prob[1]){

                        this.bullPercent = res.data.prob[0];
                        this.bearPercent = res.data.prob[1];
                }else{
                        this.bullPercent = res.data.prob[1];
                        this.bearPercent = res.data.prob[0];

                }
            }else{
              this.isBear=false;
                if(res.data.prob[0] > res.data.prob[1]){

                        this.bearPercent = parseInt(res.data.prob[0]*100);
                        this.bullPercent = parseInt (res.data.prob[1]*100);
                }else{
                        this.bearPercent = parseInt(res.data.prob[1]*100);
                        this.bullPercent = parseInt(res.data.prob[0]*100);

                }
            }

            this.showInfo = true;
          })
          
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
