<template>
  <div class="breadcrumbs">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-6 col-12">
          <div class="breadcrumbs-content">
            <h1 class="page-title">Cart</h1>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <ul class="breadcrumb-nav">
            <li><a href="index.html"><i class="lni lni-home"></i> Home</a></li>
            <li><a href="index.html">Shop</a></li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
    </div>
  </div>


  <div class="shopping-cart section">
    <div class="container">
      <div class="cart-list-head">

        <div class="cart-list-title">
          <div class="row">
            <div class="col-lg-1 col-md-1 col-12">
            </div>
            <div class="col-lg-4 col-md-3 col-12">
              <p>Product Name</p>
            </div>
            <div class="col-lg-2 col-md-2 col-12">
              <p>Quantity</p>
            </div>
            <div class="col-lg-2 col-md-2 col-12">
              <p>Unit Price</p>
            </div>
            <div class="col-lg-2 col-md-2 col-12">
              <p>Total</p>
            </div>
            <div class="col-lg-1 col-md-2 col-12">
              <p>Remove</p>
            </div>
          </div>
        </div>


        <div class="cart-single-list" v-for="(product, key) in products" :key="key">
          <div class="row align-items-center">
            <div class="col-lg-1 col-md-1 col-12">
              <a href="product-details.html"><img :src="product.image" alt="#"></a>
            </div>
            <div class="col-lg-4 col-md-3 col-12">
              <h5 class="product-name"><a href="product-details.html">
                {{product.name}}</a></h5>
<!--              <p class="product-des">-->
<!--                <span><em>Type:</em> Mirrorless</span>-->
<!--                <span><em>Color:</em> Black</span>-->
<!--              </p>-->
            </div>
            <div class="col-lg-2 col-md-2 col-12">
              <div class="input-group mb-3">
                <input type="number" :value="product.qty" :id="'qty'+ product.id" class="form-control"/>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="updateCartProduct(product.id)">Update</button>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-12">
              <p>TK. {{ product.price }}</p>
            </div>
            <div class="col-lg-2 col-md-2 col-12">
              <p>TK. {{ product.total }}</p>
            </div>
            <div class="col-lg-1 col-md-2 col-12">
              <a class="remove-item" href="javascript:void(0)" @click="removeCartProduct(product.id)"><i class="lni lni-close"></i></a>
            </div>
          </div>
        </div>

      </div>
      <div class="row">
        <div class="col-12">

          <div class="total-amount">
            <div class="row">
              <div class="col-lg-8 col-md-6 col-12">
                <div class="left">
                  <div class="coupon">
                    <form action="#" target="_blank">
                      <input name="Coupon" placeholder="Enter Your Coupon">
                      <div class="button">
                        <button class="btn">Apply Coupon</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-12">
                <div class="right">
                  <ul>
                    <li>Cart Subtotal<span>{{ subTotal }}</span></li>
                    <li>Tax Total<span>{{ Taxtotal }}</span></li>
                    <li>Shipping Cost<span>{{ ShippingCost }}</span></li>
                    <li class="last">Total Pay<span>{{ GrandTotal }}</span></li>
                  </ul>
                  <div class="button">
                    <router-link :to="{name: 'checkout'}" class="btn">Checkout</router-link>
                    <router-link :to="{name: 'home'}" class="btn btn-alt">Continue shopping</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "CartView",
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
  },
  methods:{
    updateCartProduct(id){
      var qty= document.getElementById('qty'+id).value;
      this.$store.commit('updateToCart', {id: id, qty: qty });

      this.$store.commit('updateSubTotal');
      this.$store.commit('updateTaxTotal');
      this.$store.commit('updateGrandTotal');
    },
    removeCartProduct(id){
      var check = confirm('Are you sure to delete this?');
      if (check){
        this.$store.commit('removeCartProduct', {id: id});

        this.$store.commit('updateSubTotal');
        this.$store.commit('updateTaxTotal');
        this.$store.commit('updateGrandTotal');
      }

    }
  }
}
</script>

<style scoped>

</style>