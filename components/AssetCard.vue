<template>
  <div class="h5 overflow-y-auto overflow-x-hidden" v-if="asset">
    <div class="pa2 ba b--moon-gray">
    <h3 class="mv0">{{asset.properties.Name}}</h3>
    <h3 class="mv0 moon-gray">{{asset.properties.Sector}}</h3>
    <pre class="f6 mono bg-light-gray mv3 br3 pa1">{{asset}}</pre>

    <pre class="f6 mono bg-dark-gray white mv3 br3 pa1">{{emissions}}</pre>
  </div>
  </div>
</template>
<script setup>
const props = defineProps({
  // asset: {
  //   type: Object,
  //   required: true
  // }
  assetId: {
    type: String,
    required: true
  }
})

// const asset = props.asset
const asset = ref(null)


// to get emissions for an asset we need to query the following URL:
// https://api.dev.climatetrace.org/v0/assets/5093543/emissions?years=2021

function buildEmissionsQueryUrl(assetId) {
  return `https://api.dev.climatetrace.org/v0/assets/${assetId}/emissions?years=2021`
}

const emissions = ref(null)

function buildAssetQueryUrl(assetId) {
  // https://api.dev.climatetrace.org/v0/assets/5093419
  return `https://api.dev.climatetrace.org/v0/assets/${assetId}`
}

onMounted(() => {
  fetch(buildAssetQueryUrl(props.assetId))
    .then(response => response.json())
    .then(data => {
      asset.value = data
    })

    fetch(buildEmissionsQueryUrl(props.assetId))
    .then(response => response.json())
    .then(data => {
      emissions.value = data.properties.Emissions
    })

})

</script>