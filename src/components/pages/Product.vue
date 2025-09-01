<template>
  <div class="content-wrapper" style="min-height: 191px">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Product Page</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Starter Page</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div v-for="p in products" :key="p.id" class="col-3">
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img
                    class="profile-user-img img-fluid img-circle"
                    :src="p.thumbnail"
                    alt="User profile picture"
                  />
                </div>

                <h3 class="profile-username text-center">{{ p.title }}</h3>

                <p class="text-muted text-center">{{ p.brand }}</p>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Price</b> <a class="float-right">{{ p.price }}$</a>
                  </li>
                  <li class="list-group-item">
                    <b>Discount</b> <a class="float-right">{{ p.discountPercentage }}</a>
                  </li>
                  <li class="list-group-item">
                    <b>Category</b>
                    <router-link
                      :to="{
                        name: 'product-category',
                        params: { category_name: p.category },
                      }"
                      class="float-right"
                    >
                      {{ p.category }}
                    </router-link>
                  </li>
                  <li class="list-group-item">
                    <b>{{ p.availabilityStatus }}</b>
                  </li>
                </ul>
                <div class="d-flex justify-content-between">
                  <a href="#" class="btn btn-primary"><b>See More...</b></a>
                  <a href="#" class="btn btn-outline-success"><b>Add to Cart</b></a>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
</template>

<script setup>
import { getAllProducts, getProductsByCategory } from "@/api/product-api";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route);

const products = ref([]);

onBeforeMount(() => {
  // console.log(products.value);
  // console.log("Product onBeforeMount");
});

const x = ref(0);
watch(
  () => route.params.category_name,
  async function (nv, ov) {
    try {
      let productResult = null;
      if (route.name === "product") {
        productResult = await getAllProducts();
      } else {
        productResult = await getProductsByCategory(route.params.category_name);
      }
      products.value = productResult.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  { immediate: true }
);

// onMounted(async () => {
//   try {
//     let productResult = null;
//     if (route.name === "product") {
//       productResult = await getAllProducts();
//     } else {
//       productResult = await getProductsByCategory(route.params.category_name);
//     }
//     products.value = productResult.data.products;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// });
</script>
