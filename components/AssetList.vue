<template>
<div class="sans-serif f5 f3-l">
  <div class="list-controls">
    <!-- select one or more countries from the availableCountries list -->
    <select class="w-50 h5 ba pa2 f5" v-model="selectedCountries" multiple>
      <option v-for="country in availableCountries" :key="country">
        <!-- {{ country.name }} -->
        {{ country.alpha3 }}
      </option>
    </select>

    <!-- select one or more sectors from the availableSectors list -->
    <select class="w-50 h5 ba pa2 f5" v-model="selectedSectors" multiple>
      <option v-for="sector in availableSectors" :key="sector">
        {{ sector.SectorName }}
      </option>
    </select>
    </div>
  <div class="active-selections f6">
    <div class="w-50 fl h4 overflow-y-auto">
      <h4 class="mv0">Chosen Countries</h4>
      <ul class="list pl0 mv0 bt b--light-gray">
        <li v-for="country in selectedCountries" :key="country">
          {{ country }}
        </li>
      </ul>
    </div>

    <div class="w-50 fl h4 overflow-y-auto">
      <h4 class="mv0">Chosen Sectors</h4>
      <ul class="list pl0 mv0 bt b--light-gray">
        <li v-for="sector in selectedSectors" :key="sector">
          {{ sector }}
        </li>
      </ul>
    </div>
  </div>
  <div v-if="assets">
    <div v-for="asset in assets" :key="asset.id" class="w-50 dib v-top pa0 ba b--white"
    :style="{
      backgroundImage: `url(${asset.properties['ImageUrl']})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    @click="addToShoppingCart(asset)">
    <div class="asset-inner-container h5 pa4">
    <h3 class="pointer mv0">{{asset.properties.Name}}</h3>
    <h4 class="dark-gray">100yr co2: {{asset.properties['EmissionValue']}}</h4>
      <!-- <pre class="h5 overflow-y-auto ba b--red">{{asset}}</pre> -->
    </div>
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

const availableCountries = ref(null)
const availableSectors = ref(null)


const selectedCountries = ref(['USA', 'CAN', 'MEX'])
const selectedSectors = ref(['oil-and-gas-refining'])

// const localListUrl = '/data/oil_and_gas_refining__USA.json'

const remoteListUrl = computed(() => {
  const countries = selectedCountries.value//.map((country) => country.alpha3)
  const sector = selectedSectors.value
  return `https://api.dev.climatetrace.org/v0/assets?limit=100&offset=0&countries=${countries}&sectors=${sector}`
})




onMounted(() => {
  // fetch(remoteListUrl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data.features);
  //     assets.value = data.features;
  //   });

  // get list of available countries from https://api.dev.climatetrace.org/v3/definitions/countries
  fetch('https://api.dev.climatetrace.org/v3/definitions/countries')
    .then((response) => response.json())
    .then((data) => {
      availableCountries.value = data
    })

  // get a list of available sectors from https://api.dev.climatetrace.org/v3/definitions/sectors
  fetch('https://api.dev.climatetrace.org/v0/definitions/sectors')
    .then((response) => response.json())
    .then((data) => {
      availableSectors.value = data
    })

  // watch the remoteListUrl and when it changes, fetch the data
  watch(remoteListUrl, (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.features);
        assets.value = data.features;
      });
  }, { immediate: true });
})
</script>
<style>
.asset-inner-container {
  background-color: rgba(255,255,255,0.45);  
}
</style>