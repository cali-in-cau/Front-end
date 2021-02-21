<template>
    <div class="content">
        <div class="row">
            <div class="col-sm-12">
                <search-bar :info="info"></search-bar>
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
                    
                        <h2 class v-if="showStock">{{stockPrice}}원</h2>
                        <h2 class v-else>Loading!</h2>

                    </template>
                </card>
            </div>

            <div class="col-sm-8">
                <card>
                    <template slot="header">
                        <h2 class="card-category">Details</h2>

                        <div v-if="showStock" class="table-responsive text-left">
                            <base-table :data="details.data"
                                        :columns="details.columns"
                                        thead-classes="text-primary">
                            </base-table>
                        </div>

                        <h3 v-else>Loading!</h3>

                    </template>
                </card>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-8">
                <stock-chart :data="mainStock"></stock-chart>
            </div>
            <div class="col-sm-4">
                <pattern-sim :data="mainStock"></pattern-sim>
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
import StockChart from '@/components/StockChart';

import axios from "axios";

const tableColumns = ["Open", "High", "Low", "Close", "Volume", "Change"];

export default {
    components:{
        Card,
        SearchBar,
        BaseTable,
        PatternSim,
        StockChart
    },
    data(){
        return{
            tmdata:[],
            showStock:false,
            details: {
                title: "Simple Table",
                columns: [...tableColumns],
                data: []
            },
            //stockName: "",
            stockPrice: "82,000",
            isMember: false, 
            token:"",

        mainStock:{},
        info:"",
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
    created: async function(){
        this.mainStock = { "stock_name":this.name, "stock_code":this.$route.params.code};
        // 어떻게보면 주식 그래프 용도
        //yae - 다음에 MSFT-> stockName으로 바꿔주기
        // 어떻게 이렇게 잘 파싱해서 가져와서 넣으면 된다.

        await axios.get('/back/stocks/graph/', {
            params: {
                date_type : "day",
                start_date : 5,
                stock_code : this.$route.params.code
            }
        })
        .then((res)=>{
            //미완
            console.log("Searched Recent data", (res.data.data.value.slice(-1)[0]));
            this.details.data = [res.data.data.value.slice(-1)[0]];
            console.log('details.data',this.details.data); 
            this.showStock = true;
            console.log("showStock true");
        })
        .catch((err)=>{
            console.log(err)
        })
        // var exData =[{
        //     Open : 5080300,
        //     High : this.tmdata.High,
        //     Low : this.tmdata.Low,
        //     Close : this.tmdata.Close,
        //     Volume : this.tmdata.Volume
        //     Chagne
        //  }];
        //console.log('exData', exData);
        //this.details.data = exData;
        
        var currentPath = this.$router.currentRoute.path;

        if(currentPath.includes("accept")){
            this.info="accept";
            this.isMember = true;
        }else{
            this.info="non";
            this.inMember = false;
        }
    },

    
}
</script>
