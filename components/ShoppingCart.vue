<template>
  <div class="pa3 f4 sans-serif fw6">
  <div>Shopping cart</div>
  <!-- <pre class="bg-black white f6">
    {{props.list}}
  </pre> -->
  <div v-if="props.list.length">
  <div v-for="item in props.list" :key="item.id" class="bb pa2">
    <h3 class="mv0">{{item.properties.Name}}</h3>
    <h4 class="mv0 gray">
      <strong class="light-red">{{ co2NumberFormat(item.properties['EmissionValue'])}}</strong> tons co2, 100yr</h4>
    <!-- <button @click="removeFromShoppingCart(item)">Remove</button> -->
  </div>

  <div class="ba b--gray mv3 bg-white pa2 fixed bottom-0">
  <h3 class="mv1">Total: <strong class="red">{{ co2NumberFormat(totalCartEmissions) }}</strong> tons of co2</h3>
  </div>
  </div>
  </div>
</template>
<script setup>
import { format } from 'd3'

const co2NumberFormat = format(',.8r')
// define shoppingCartList array as prop
const props = defineProps({
  list: {
    type: Array,
  },
})

// computed that adds up all emissions values for every item in the cart
const totalCartEmissions = computed(() => {
  return props.list.reduce((total, item) => {
    return total + item.properties['EmissionValue']
  }, 0)
})
</script>