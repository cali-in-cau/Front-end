<template>
    <card>
        <h5 class="card-category">Search Bar</h5>
            <div class="card-title">
                <input id="test" class="form-control" v-model="stockName" v-on:keyup.enter="searchStock(stockName)" @click="clickSearch" placeholder="검색어를 입력해주세요">
            </div>
            <div class="card-body" v-if="showSearch">
                <strong>Search result</strong>
                <div class="table-responsive">
                    <table class="table tablesorter text-left">
                        <tbody>     
                            <tr v-for="(item, index) in paginatedData" :key="index">
                                <slot :row="item">
                                    <td>
                                        <router-link v-if="isMember" :to="{name: 'Stock Search', params: { code: item.code, name:item.name }}" ><p>{{item.name}}</p></router-link>
                                        <router-link v-else :to="{name: 'Stock Search ', params: { code: item.code, name:item.name }}" ><p>{{item.name}}</p></router-link>
                                    </td>  
                                </slot>
                            </tr>
                        </tbody>
                    </table>
                    <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">

                        <base-button :disabled="pageNum==0" type="success" class="page-item btn-round" aria-label="Previous" @click="prevPage">
                            <i class="tim-icons icon-double-left" aria-hidden="true"></i>
                        </base-button>

                        <span class="page-count">  {{ pageNum + 1 }} / {{ pageCount }} page  </span>

                        <base-button  :disabled="pageNum >= (pageCount-1)" class="page-item btn-round" type="success" aria-label="Next" @click="nextPage">
                            <i class="tim-icons icon-double-right" aria-hidden="true"></i>
                        </base-button>
                        
                    </div>
                </div>
            </div>    
    </card>
</template>

<script>

import {
  Card
} from "@/components/index";

import axios from "axios";

import BaseButton from "@/components/BaseButton";

export default {
    components:{
        BaseButton,
        Card,
    },
    data(){
        return{
            showSearch:false,
            stockList:[
                "삼성",
                "삼성 전자"
            ],
            stockName:"",
            isMember:true,

            pageSize:5,
            pageNum:0,

        }
    },
    props:['info'],
    methods:{
        //Search 연동 - yae
        searchStock(stockName){
            axios.get('/back/stocks/search/',{
                params: {
                    keyword: stockName
                }    
            })
                .then((res)=>{
                    //res data 여기에 넣어주기
                   this.stockList = res.data.result;
                   this.showSearch = true;
                })
                .catch((err)=>{
                    console.log(err);
                })
                
        }, 
        nextPage () {
            this.pageNum += 1;
        },
        prevPage () {
            this.pageNum -= 1;
        },
        clickSearch(){
            this.showSearch=false;
            this.pageNum=0;
        }
    },
    computed:{
        pageCount(){
            let dataLength = this.stockList.length,
                page = Math.floor((dataLength - 1) / this.pageSize) + 1;

            return page
        },
        paginatedData () {
            const start = this.pageNum * this.pageSize,
                    end = start + this.pageSize;
            return this.stockList.slice(start, end);
        }
    },
    created: function(){
        if(this.info=="non"){
            this.isMember=false
        }

    }
    
}
</script>

