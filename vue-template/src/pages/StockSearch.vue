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
                        <h2 class="card-title">1주 가격</h2>
                        <h2>{{stockName}}</h2>
                    </template>
                </card>
            </div>

            <div class="col-sm-8">
                <card>
                    <template slot="header">
                        <h2 class="card-title">Details</h2>
                    </template>
                </card>
            </div>
        </div>
    </div>

</template>

<script>
import {
  Card
} from "@/components/index";

import SearchBar from '@/components/SearchBar';
import axios from "axios";

export default {

    data(){
        return{
            stockName: "",
        }
    },
    
    components:{
        Card,
        SearchBar
    },
    created: function(){
        console.log("Stock Name:", this.$route.params.data)
        this.stockName = this.$route.params.data;
      
        axios.get("/back/stocks/data/MSFT")
        .then(function(res){
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    },
    
    
}
</script>
