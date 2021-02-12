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
        <p class="title" @click="changeStock(row.stock_name, row.stock_code)" >{{row.stock_name}}</p>
        <!--
        <router-link :to="{name: 'Stock Search', params: { code: row.stock_code, name:row.stock_name }}" >
          <p class="title">{{row.stock_name}}</p>
        </router-link>
        -->
        <!--<p class="text-muted">{{row.description}}</p>-->
      </td>
      <td class="td-actions text-right">
        <base-button type="link" artia-label="edit button" @click="deleteFav(row.stock_code)" >
          <i class="tim-icons icon-simple-remove"></i>
        </base-button>
      </td>
    </template>
  </base-table>
</template>
<script>

  import BaseButton from '@/components/BaseButton';
  import BaseTable from '@/components/BaseTable';
  
  export default {
    components: {
      BaseButton,
      BaseTable,
    },
    data(){
      return {
      }
    },
    props:['data'],
    methods:{
      
      deleteFav:function(code){
	this.$emit('deleteStock', code);
      },
      changeStock:function(code, name){
        this.$emit('changeStock', [code, name]);
      }
    },
    computed: {
      tableData() {
        return this.data;
      }
    },
    watch:{
	data(newVal, oldVal){
	    console.log('favorites changed: ', newVal, ' | was: ', oldVal)
	}
    },
  }
</script>
<style>
</style>
