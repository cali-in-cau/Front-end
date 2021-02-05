<template>
    <card>
        <h5 class="card-category">Search Bar</h5>
            <div class="card-title">
                <input id="test" class="form-control" v-model="stockName" v-on:keyup.enter="searchStock(stockName)" @click="showSearch=false" placeholder="검색어를 입력해주세요">
            </div>
            <div class="card-body" v-if="showSearch">
                <strong>Search result</strong>
                <div class="table-responsive">
                    <table class="table tablesorter text-left">
                        <tbody>          
                            <tr v-for="(item, index) in stockList" :key="index" @click="clickStock(item)">
                                <slot :row="item">
                                    <td><a :href="`/stock/${item.code}`" @click="clickStock(item.code)" ><p>{{item.name}}</p></a></td>
                                </slot>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>    
    </card>
</template>

<script>

import {
  Card
} from "@/components/index";

import axios from "axios";

export default {
    components:{
        Card,
    },
    data(){
        return{
            showSearch:false,
            stockList:[
            ],
            stockName:"",
        }
    },
    methods:{
        //Search 연동 - yae
        searchStock(stockName){
            // 이제 이걸 백으로 넘겨서 데이터 받으면 된다.
            console.log(stockName)
            if(this.stockList.indexOf(this.stockName.replace(/\s+/g, '')) >-1){
                this.showSearch = true;
            }else{
                this.showSearch = false;
            }
            /* axios 이용 post 요청 */
            axios.get(`/back/stocks/search/${stockName}`)
                .then((res)=>{
                    //res data 여기에 넣어주기
                	this.stockList = res.data.result
			console.log(this.stockList);
			
                	this.showSearch = true;
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
        // 클릭 시 해당 주식 정보 띄워주는 화면으로 갈 수 있게끔!
        clickStock(item){
            console.log(item, " push ");
            this.$route.push({name:"Stock Search", params:{"id":item.code}});
        },
    }
    
}
</script>

