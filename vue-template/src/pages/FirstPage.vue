<template>
    <div data="green" class="main-panel">
        <div class="container">
            
            <div class="content" style="position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);">
                <card>
                    <template slot="header">
                        <h3 class="card-category">2021 PeopleSpace Internship</h3> 
                    </template>

                    <div class="card-body ml-auto mr-auto">
                        <h1 class="card-title text-center" style="width:60vw;" >Welcome to Stock Reader</h1>
                        <button type="button" class="ml-auto mr-auto btn btn-round" @click="login">Login using Google</button>
                    </div>
                </card>

                <card>
                    <template slot="header">
                        <h3 class="card-category">Cali in CAU</h3> 
                    </template>
                    
                        <base-button type="link" class="ml-auto mr-auto text-center" @click="toNonMem" fill>비회원으로 이용시 이 곳을 클릭하세요.</base-button>
                    
                    <!-- Use modal, but give up
                    <base-button type="link" class="ml-auto mr-auto text-center" @click="modals = true" fill>비회원으로 이용시 이 곳을 클릭하세요.</base-button>
                    -->
                </card>
            </div>
            
            <!-- Use modal, but give up
            <modal :show.sync="modals"
                    headerClasses="justify-content-center"
                    class="modal-open"
                    :centered="false"
                    :show-close="true" >

                    <h4 slot="header" class="title title-up">Get Start Information</h4>

                    
                        <div class="modal-body">
                            <input slot="header" v-model="nonmemSearch" type="text" class="form-control" id="inlineFormInputGroup" placeholder="조회를 원하시는 주식 종목을 입력해주세요.">
                        </div>
                        <h5 slot="modal-footer">Get more information</h5>
            </modal>
            -->

        </div>
    </div>
</template>

<script>
    import axios from "axios";

    import {
        Card
    } from "@/components/index";
    import BaseButton from '@/components/BaseButton';
    //import Modal from "@/components/Modal";

    export default {
        components:{
            Card,
            BaseButton,
            //Modal,
        },
        data(){
            return{
                modals:false,
                nonmemSearch:"",
            }

        },
        methods:{
            toNonMem(){
                return location.href='/non';
            },
	    login(){
		
                return location.href='http://yaeoni.o-r.kr/back/accounts/google/login';
		/*
		console.log("login click")
		axios.get("/back/accounts/google/login")
			.then(function(res){
				console.log(res);
			})
			.catch((err)=>{
				console.log(err);
			})
		*/
	    },
        }
    }
</script>
