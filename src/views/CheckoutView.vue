<template>
  <div class="breadcrumbs">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-6 col-12">
          <div class="breadcrumbs-content">
            <h1 class="page-title">checkout</h1>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <ul class="breadcrumb-nav">
            <li><a href="index.html"><i class="lni lni-home"></i> Home</a></li>
            <li><a href="index.html">Shop</a></li>
            <li>checkout</li>
          </ul>
        </div>
      </div>
    </div>
  </div>


  <section class="checkout-wrapper section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="checkout-steps-form-style-1">
            <ul id="accordionExample">
              <li>
                <h6 class="title text-center">Your Personal Details </h6>
                <section class="checkout-steps-form-content collapse show" id="collapseThree" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="single-form form-default">
                        <label>Full Name</label>
                        <div class="row">
                          <div class="col-md-12 form-input form">
                            <input type="text" v-model="customer.name" placeholder="Full Name">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="single-form form-default">
                        <label>Email Address</label>
                        <div class="form-input form">
                          <input type="email" v-model="customer.email" placeholder="Email Address">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="single-form form-default">
                        <label>Phone Number</label>
                        <div class="form-input form">
                          <input type="number" v-model="customer.mobile" placeholder="Phone Number">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="single-form form-default">
                        <label>Delivery Address</label>
                        <div class="form-input form">
                          <textarea placeholder="Delivery Address" v-model="customer.address"></textarea>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="checkout-payment-option">
                        <h6 class="heading-6 font-weight-400 payment-title">Select Delivery
                          Option</h6>
                        <div class="payment-option-wrapper">
                          <div class="single-payment-option">
                            <input type="radio" v-model="customer.PaymentMethod" checked id="shipping-1" value="1">
                            <label for="shipping-1">
                              <img src="/images/shipping/shipping-1.png" alt="Sipping">
                              <p>Cash On Delivery</p>
                              <span class="price">$10.50</span>
                            </label>
                          </div>
                          <div class="single-payment-option">
                            <input type="radio" v-model="customer.PaymentMethod" id="shipping-2" value="2">
                            <label for="shipping-2">
                              <img src="/images/shipping/shipping-2.png" alt="Sipping">
                              <p>Online Shipping</p>
                              <span class="price">$10.50</span>
                            </label>
                          </div>
                          <div class="single-payment-option">
                            <input type="radio" v-model="customer.PaymentMethod" id="shipping-3" value="3">
                            <label for="shipping-3">
                              <img src="/images/shipping/shipping-3.png" alt="Sipping">
                              <p>Standerd Shipping</p>
                              <span class="price">$10.50</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="single-form button">
                        <button class="btn" type="button" @click="newOrder">Confirm Order</button>
                      </div>
                    </div>
                  </div>
                </section>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="checkout-sidebar">
            <div class="checkout-sidebar-price-table">
              <h5 class="title">Your Cart Summery</h5>
              <div class="sub-total-price">
                <div class="total-price" v-for="(cartproduct, key) in products" :key="key">
                  <p class="value">{{cartproduct.name}}: ({{cartproduct.price}} * {{cartproduct.qty}})</p>
                  <p class="price">TK {{cartproduct.price * cartproduct.qty}}</p>
                </div>
              </div>
              <div class="total-payable">
                  <div class="payable-price">
                    <p class="value">Subotal Price:</p>
                    <p class="price">TK {{subTotal}}</p>
                  </div>
                  <div class="payable-price">
                    <p class="value">Total Tax Amount(15%):</p>
                    <p class="price">TK {{Taxtotal}}</p>
                  </div>
                  <div class="payable-price">
                    <p class="value">Shipping Free:</p>
                    <p class="price">TK {{ShippingCost}}</p>
                  </div>
              </div>
              <div class="total-payable">
              <div class="payable-price">
                <p class="value">Total payable:</p>
                <p class="price">TK {{GrandTotal}}</p>
              </div>
              </div>
            </div>
            <div class="checkout-sidebar-banner mt-30">
              <a href="">
                <img src="/images/banner/banner.jpg" alt="#">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckoutView",
  data(){
    return{
      customer: {name: '', email:'', mobile:'', address:'', PaymentMethod:''}
    }
  },
  methods:{
    newOrder(){
      var data = {
                  customer: this.customer,
                  ordertotal: this.GrandTotal,
                  shippingtotal: this.ShippingCost,
                  Taxtotal: this.Taxtotal,
                  products: this.products,
      };
      axios.post("http://localhost:8000/api/new-order/", data).then((response) => {
        // console.log(response.data);
          if(response.data.success == true){
            this.$store.commit('addCustomer',{id: response.data.id, name: response.data.name, token: response.data.token});
            this.$router.push('/complete-order');
          }
      })
    }
  },
  computed:{
    products(){
      return this.$store.getters.getProducts;
    },
    subTotal(){
      return this.$store.getters.getSubtotal;
    },
    Taxtotal(){
      return this.$store.getters.getTaxTotal;
    },
    ShippingCost(){
      return this.$store.getters.getShippingTotal;
    },
    GrandTotal(){
      return this.$store.getters.getGrandTotal;
    }
  }
}
</script>

<style scoped>

</style>