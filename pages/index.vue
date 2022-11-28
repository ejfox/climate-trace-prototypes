<template>
  <div>
  <h1 class="">Asset list</h1>
  <AssetList class="w-two-thirds"
    @add-to-shopping-cart="addToShoppingCart"
   />
  <ShoppingCart
    :list="shoppingCartList"
    class="w-third fixed overflow-y-auto right-0 top-0 vh-100 bg-light-gray"
  />
  </div>
</template>
<script setup>
// keep track of items in the shopping cart
const shoppingCartList = ref([])

// add an item to the shopping cart
const addToShoppingCart = (item) => {
  console.log('adding item to shopping cart', item)
  shoppingCartList.value.push(item)
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