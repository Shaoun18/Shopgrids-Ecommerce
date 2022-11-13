<template>
  <div class="home">
    <HeroAreaView/>
    <FeaturedCategoryView/>
    <TrendingProductView/>
    <BannerView/>
    <OfferView/>
    <ProductlistView/>
    <BrandView/>
    <BlogView/>
    <shippingView/>

  </div>
</template>

<script>
import HeroAreaView from "@/components/home/HeroAreaView";
import FeaturedCategoryView from "@/components/home/FeaturedCategoryView";
import TrendingProductView from "@/components/home/TrendingProductView";
import BannerView from "@/components/home/BannerView";
import OfferView from "@/components/home/OfferView";
import ProductlistView from "@/components/home/ProductlistView";
import BrandView from "@/components/home/BrandView";
import BlogView from "@/components/home/BlogView";
import shippingView from "@/components/home/ShippingView";

export default {
  name: 'HomeView',
  components: {HeroAreaView, FeaturedCategoryView, TrendingProductView, BannerView,
                OfferView, ProductlistView, BrandView, BlogView, shippingView},

}
</script>

<style scoped>

</style>
