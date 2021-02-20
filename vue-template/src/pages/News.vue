<template>
  <div class="content">
    <div class="row"> 
      <div class="col-sm-12">
        <card class="card">
          <h4 slot="header" class="card-title">
            <template>
              News
            </template>
            
          </h4>
          <div class="table-responsive">
            <base-table :data="tableData" thead-classes="text-primary">
              <template slot-scope="{ row }">
                <div class="row" style="cursor: pointer;" @click="openNews(row.url)">
                  <div class="col-sm-4">
                    <td class="text-center">
                      <div ><img :src="row.img" alt="photo" /></div>
                    </td>
                  </div>

                  <div class="col-sm-8">
                    <td class="text-left">
                      <h2 class="title">{{ row.title }}</h2>
                      <h4 class="text-muted">{{ row.desc }}</h4>
                    </td>
                  </div>
                </div>
              </template>
            </base-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>

import {
  Card
} from "@/components/index";

import BaseTable from '@/components/BaseTable';

import axios from 'axios';

export default {
  components: {
    Card,
    BaseTable
    //UserTable
  },
  data(){
    return{
      tableData:[],
    }
  },
  computed:{
    
  },
  methods:{
    openNews: function(link){
      window.open(link);
    }
  },
  mounted(){

  },
  beforeDestroy() {
  },
  created:async function(){
    
    console.log("news enter created");
    
    await axios.get('/back/news/')
    .then((res)=>{
      this.tableData = res.data.news;
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }
}
</script>
<style>
</style>
