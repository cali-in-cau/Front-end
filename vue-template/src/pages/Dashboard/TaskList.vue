<template>
  <base-table  :data="tableData"
              thead-classes="text-primary">
    <template slot-scope="{row}">
      <!--
      <td>
        <base-checkbox v-model="row.done">
        </base-checkbox>
      </td>
      -->
      <td class="text-left">
        <p class="title">{{row.stock_name}}</p>
        <!--<p class="text-muted">{{row.description}}</p>-->
      </td>
      <td class="td-actions text-right">
        <base-button type="link" artia-label="edit button">
          <i class="tim-icons icon-simple-remove"></i>
        </base-button>
      </td>
    </template>
  </base-table>
</template>
<script>

  import BaseButton from '@/components/BaseButton';
  import BaseTable from '@/components/BaseTable';
  //import BaseCheckbox from '@/components/BaseCheckbox';
  import axios from 'axios';
  
  export default {
    components: {
      BaseButton,
      BaseTable,
      //BaseCheckbox
    },
    data(){
      return {
        favorites:[]
      }
    },
    props:['token'],
    computed: {
      tableData() {
        return this.favorites
      }
    },
    created:function(){
      
      axios.post("/back/users/favorites",{token:this.token})
        .then((res)=>{
          console.log(res)
          this.favorites=res.data;
        })
        .catch((err)=>{
          console.log(err);
        });
    }
  }
</script>
<style>
</style>
