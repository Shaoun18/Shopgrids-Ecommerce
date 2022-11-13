import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            products: [],
            subTotal: 0,
            TaxTotal: 0,
            ShippingTotal: 100,
            GrandTotal: 0,
            customer: {id:'',name:'',token:''}
        }
    },
    getters:{
        getProducts(state){
            return state.products;
        },
        getSubtotal(state){
            return state.subTotal;
        },
        getTaxTotal(state){
            return state.TaxTotal;
        },
        getShippingTotal(state){
            return state.ShippingTotal;
        },
        getGrandTotal(state){
            return state.GrandTotal;
        },
        getCustomer(state){
            return state.customer;
        }
    },
    mutations: {
        addToCart (state, payload) {
            state.products.push(payload);
        },
        updateToCart (state, payload) {
            var product = state.products.find(product => product.id == payload.id);
            product.qty = payload.qty;
            product.total = payload.qty * product.price;

        },
        removeCartProduct (state, payload) {
            var index = state.products.findIndex(product => product.id == payload.id);
            state.products.splice(index, 1);
        },
        updateSubTotal (state) {
            var sum = 0;
            for(var i=0; i< state.products.length; i++){
                sum = Number(sum) + Number(state.products[i].total);
            }
            state.subTotal = sum;
        },
        updateTaxTotal (state) {
            state.TaxTotal = Math.round((state.subTotal * 15) /100);
        },
        updateGrandTotal (state) {
            state.GrandTotal = state.subTotal + state.ShippingTotal + state.TaxTotal;
        },
        addCustomer(state, payload){
            state.customer.id = payload.id;
            state.customer.name = payload.name;
            state.customer.token = payload.token;
        },
        removeCustomer(state){
            state.customer.id = '';
            state.customer.name = '';
            state.customer.token = '';
        }
    }
})