<template>
<div class="sans-serif f3">
  <div v-if="assets">
    <div v-for="asset in assets" :key="asset.id" class="w-50 dib v-top"
    @click="addToShoppingCart(asset)">
    <h3 class="pointer">{{asset.properties.Name}}</h3>
    <h4 class="gray">100yr co2: {{asset.properties['EmissionValue']}}</h4>
      <!-- <pre class="h5 overflow-y-auto ba b--red">{{asset}}</pre> -->
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</div>
</template>
<script setup>
const assets = ref(null)

const emit = defineEmits(['add-to-shopping-cart'])

// define events we will emit
// addToShoppingCart event will emit the item to be added to the parent
const addToShoppingCart = (item) => {
  emit('add-to-shopping-cart', item)
}




onMounted(() => {
  fetch('/data/oil_and_gas_refining__USA.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(data.features);
      assets.value = data.features;
    });
})
</script>