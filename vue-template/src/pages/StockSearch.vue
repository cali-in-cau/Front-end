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
                    <div class="row">
                        <div class="col-sm-9">
                            <h5 class="card-category">Brief Info</h5>
                            <h3 class="card-title">{{name}}</h3>
                        </div>
                        	
                        <div class="col-sm-3">
                            <button v-if="isMember" class="card-title btn-rotate btn btn-link btn-icon float-right" type="primary" @click="setFavorite">
                                <i class="tim-icons icon-simple-add"></i>
                            </button>  
                        </div>
                    </div>
                    
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
                <pattern-sim :data="patternData"></pattern-sim>
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


import axios from "axios";


const tableColumns = ["Open", "High", "Low", "Close", "Volume"];

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
            //stockName: "",
            stockPrice: "82,000",
            isMember: false, 
            token:"",

	    patternData:[],
        }
    },
    props:['name'],
    methods:{
        setFavorite: function(){
            console.log("set Favorite~~~")
            //var setFavoriteURL = "/back/users/favorite/add/"+this.$route.params.code
            axios.get('/back/users/get_user')
            .then((res)=>{
                this.token = res.data.token;
                console.log("Get user :", res);
            })
            .catch((err)=>{
                console.log(err)
            });
            axios.post("/back/users/favorite/add/" + this.$route.params.code, {token:this.token})
            .then((res)=>{
                console.log("favorite add res: ", res)
            })
            .catch((err)=>{
                console.log(err);
            });

        },
    },
    created: function(){
	this.patternData = [this.name, this.$route.params.code]
        // 어떻게보면 주식 그래프 용도
        //yae - 다음에 MSFT-> stockName으로 바꿔주기
        // 어떻게 이렇게 잘 파싱해서 가져와서 넣으면 된다.

        axios.get('/back/stocks/graph/', {
            params: {
                date_type : "day",
                start_date : 1,
                stock_code : this.$route.params.code
            }
        })
        .then(function(res){
            //미완
            console.log("Searched data", res.data.data.value.slice(-1)[0]);
            //console.log("entries", Object.entries(res.data.data.value.slice(-1)[0]));
            //this.price=[];
            this.details.data.push(Object.entries(res.data.data.value.slice(-1)[0]));
            console.log("price", this.details.data);
        })
        .catch((err)=>{
            console.log(err)
        })

        // var exData =[{
        //     Open : this.openP,
        //     High : this.highP,
        //     Low : this.lowP,
        //     Close : this.closeP,
        //     Volume : this.volumeP
        // }];

        //this.details.data = exData;
        
        var currentPath = this.$router.currentRoute.path;

        if(currentPath.includes("accept")){
            this.isMember = true;
        }
    },

    
}
</script>
