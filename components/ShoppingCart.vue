<template>
  <div class="pa3 f4 sans-serif fw6">
  <div>Shopping cart</div>
  <!-- <pre class="bg-black white f6">
    {{props.list}}
  </pre> -->
  <div v-if="list">
  <div v-if="list.length" class="mb5">
  <div v-for="item in list" :key="item.id" class="bb pa2">
    <h3 class="mv0">{{item.properties.Name}}</h3>
    <h4 class="mv0 gray">
      <strong class="light-red">{{ co2NumberFormat(item.properties['EmissionValue'])}}</strong> tons co2, 100yr</h4>
    <button @click="removeFromShoppingCart(item)">Remove</button>
  </div>

  <div class="ba b--gray mv3 bg-white pa2 fixed-l bottom-0">
  <h3 class="mv1">Total: <strong class="red">{{ co2NumberFormat(totalCartEmissions) }}</strong> tons of co2</h3>

  </div>
  </div>
  </div>
  </div>
</template>
<script setup>
import { format } from 'd3'
import { useShoppingCartStore } from '~/store/shoppingcart'

const shoppingCart = useShoppingCartStore()

const list = computed(() => shoppingCart.items)

const co2NumberFormat = format(',.8r')
// define shoppingCartList array as prop
// const props = defineProps({
//   list: {
//     type: Array,
//   },
// })

// remove from shopping cart using store removeItem
const removeFromShoppingCart = (item) => {
  shoppingCart.removeItem(item)
}

// computed that adds up all emissions values for every item in the cart
const totalCartEmissions = computed(() => {
  return shoppingCart.items.reduce((total, item) => {
    return total + item.properties['EmissionValue']
  }, 0)
})
</script>