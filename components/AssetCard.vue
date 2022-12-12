<template>
  <div class="h5 overflow-y-auto overflow-x-hidden ba b--moon-gray" v-if="asset">
    <h3 class="mv0">{{asset.properties.Name}}</h3>
    <h3 class="mv0 moon-gray">{{asset.properties.Sector}}</h3>
    <pre>
      {{asset}}
    </pre>
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
})
</script>