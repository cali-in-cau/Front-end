<template>
    <div class="content">
        <div class="row">
            <div class="col-sm-12">
                <search-bar></search-bar>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-4">
                <card>
                    <template slot="header">
                        <h5 class="card-category">Brief Info</h5>
                        <h3 class="card-title">{{stockName}}</h3>
                        <h2 class>{{stockPrice}}원</h2>
                    </template>
                </card>
            </div>

            <div class="col-sm-8">
                <card>
                    <template slot="header">
                        <h2 class="card-category">Details</h2>
                        <div class="table-responsive text-left">
                            <base-table :data="details.data"
                                        :columns="details.columns"
                                        thead-classes="text-primary">
                            </base-table>
                        </div>
                    </template>
                </card>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-4">
                <pattern-sim :stockName="stockName"></pattern-sim>
            </div>
        </div>

    </div>

</template>

<script>
import {
  Card
} from "@/components/index";

import SearchBar from '@/components/SearchBar';
import BaseTable from "@/components/BaseTable";
import PatternSim from '@/components/PatternSim'

//import stockData from '../components/dumpSS.json';

//import axios from "axios";

const tableColumns = ["시가", "고가", "저가", "종가"];

export default {
    components:{
        Card,
        SearchBar,
        BaseTable,
        PatternSim
    },
    data(){
        return{
            details: {
                title: "Simple Table",
                columns: [...tableColumns],
                data: []
            },
            stockName: "",
            stockPrice: "82,000",
        }
    },
    created: function(){

        // 어떻게보면 주식 그래프 용도
        console.log("Stock Name:", this.$route.params.data)
        this.stockName = this.$route.params.data;

        //yae - 다음에 MSFT-> stockName으로 바꿔주기
        /*
        axios.get("/back/stocks/data/MSFT")
        .then(function(res){
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
        */
       
        // 어떻게 이렇게 잘 파싱해서 가져와서 넣으면 된다.

        var exData =[{
            시가 : "83,700",
            고가 : "85,000",
            저가 : "84,500",
            종가 : "82,000"
        }];

        this.details.data = exData;
    },
    //methods:{
    //    exData : stockData.data.value[0]
    //}
    
}
</script>
