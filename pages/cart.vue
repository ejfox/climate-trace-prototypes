<template>
  <div>
  <div class="intro w-two-thirds measure f3 sans-serif">
    <p>Welcome to the climate emissions calculator! This is a demo of the Climate Trace API. You can search for assets and add them to your shopping cart. The shopping cart will show you the total emissions of all the assets you have added.</p>
  </div>
  <ShoppingCart
    class="w-100 w-third-l fixed-l overflow-y-auto bl bw1 b--moon-gray right-0 top-0 vh-100-l bg-light-gray"
  />
  <AssetList class="w-100 w-two-thirds-l"
    @add-to-shopping-cart="addToShoppingCart"
   />
  
  </div>
</template>
<script setup>
import { useShoppingCartStore } from '~/store/shoppingcart'
const shoppingCart = useShoppingCartStore()
// keep track of items in the shopping cart store

// add an item to the shopping cart
const addToShoppingCart = (item) => {
  console.log('adding item to shopping cart', item)
  // shoppingCartList.value.push(item)
  shoppingCart.addItem(item)
}

// remove an item from the shopping cart
const removeFromShoppingCart = (item) => {
  const index = shoppingCartList.value.indexOf(item)
  shoppingCartList.value.splice(index, 1)
}

// check if an item is in the shopping cart
const isInShoppingCart = (item) => {
  return shoppingCartList.value.includes(item)
}

// clear the shopping cart
const clearShoppingCart = () => {
  shoppingCartList.value = []
}

// sum up the total emissions for the shopping cart
const totalEmissions = computed(() => {
  return shoppingCartList.value.reduce((total, item) => {
    return total + item.properties['EmissionValue']
  }, 0)
})
</script>