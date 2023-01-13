
import Vue, { createApp } from 'vue'
import axios from "axios"
import VueAxios from "vue-axios"

const cc = require("currency-codes");

createApp({
    data() {
       return {
           currency: [],
           itemFrom:'',
           itemTo:'',
           amount:'',
           result:'',
       }
    },
    mounted () {
      //  axios.get("https://api.monobank.ua/bank/currency").then((response) => {
      //      this.currency = response.data;

      // console.log(reaponse.data);
      // });
       axios.get("currency.json").then((res) => {
           res.data.map((item)=>{
            item.nameA = cc.number(item.currencyCodeA) && cc.number(item.currencyCodeA).code || null;
            item.nameB =
              cc.number(item.currencyCodeB) &&
              cc.number(item.currencyCodeB).code;
           })
           this.currency = res.data;
       });
    },

    methods: {
        getResult(){
            const currentTransaction = this.currency.find(item =>
              item.nameA === this.itemFrom  && item.nameB === this.itemTo
            );
            if(!currentTransaction){
                this.result = "Немає";
            }else{
                const rate = +currentTransaction.rateBuy || +currentTransaction.rateCross || +currentTransaction.rateSell;
                this.result = this.amount * rate;
            }
        },
    },
 }).mount('#app');
