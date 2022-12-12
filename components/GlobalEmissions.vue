<template>
  <div class="bb pb3 mb3 f5">
<!-- <pre>{{globalEmissionsBySector}}</pre> -->
<h2 class="mv1">Global emissions by sector</h2>
<h2 class="red">Total cart emissions: {{cartTotal}}</h2>
<tr v-for="sector in globalEmissionsBySector"
  :key="sector.Sector">
  <td>{{sector.Sector}}</td> 
  <!-- <td>{{emissionsNumberFormat(sector.Emissions)}}</td> -->
  <!-- add the remainder for that sector -->
  <!-- <td>{{getSectorRemainder(sector.Sector)}}</td> -->
  <td>{{emissionsNumberFormat(sector.Emissions + getSectorRemainder(sector.Sector))}}</td>
</tr>
    <!-- total emissions -->
    <tr class="f3 b w-100 bg-black white">
      <td>Total</td>
      <td>{{emissionsNumberFormat(totalEmissionsAndRemainder)}}</td>
      <!-- and the remainder -->
    </tr>

    <!-- remaining emissions -->
    <tr class="f3 b w-100 bg-green white">
      <td>Remaining</td>
      <td>{{emissionsNumberFormat(remainingEmissions)}}</td>
    </tr>
</div>
</template>
<script setup>
import { emissionsNumberFormat } from '~/helpers'
// global emissions for all industries: https://api.climatetrace.org/v0/emissions?years=2021

const props = defineProps({
  cartTotal: {
    type: Number,
  },
})

const globalEmissionsBySector = ref(null)
const globalEmissionsRemaindersByCountryBySector = ref(null)

fetch('https://api.climatetrace.org/v0/emissions?years=2021')
  .then((response) => response.json())
  .then((data) => {
    globalEmissionsBySector.value = data
  })

fetch('https://api.climatetrace.org/v0/emissions/remainders?years=2021')
  .then((response) => response.json())
  .then((data) => {
    globalEmissionsRemaindersByCountryBySector.value = data
  })

// a computed that rolls up all of the emissions for each sector
const totalEmissionsRemainderBySector = computed(() => {
  if(!globalEmissionsRemaindersByCountryBySector.value) return 0
  const sectors = globalEmissionsRemaindersByCountryBySector.value.map((item) => item.Sector)
  const uniqueSectors = [...new Set(sectors)]

  const totalEmissionsRemainderBySector = uniqueSectors.map((sector) => {
    const sectorRemainders = globalEmissionsRemaindersByCountryBySector.value.filter((item) => item.Sector === sector)
    const totalRemainder = sectorRemainders.reduce((total, item) => {
      return total + item.Remainder
    }, 0)
    return {
      Sector: sector,
      Remainder: totalRemainder
    }
  })

  return totalEmissionsRemainderBySector
})

// a function to grab a sector from totalEmissionsRemainderBySector by name
const getSectorRemainder = (sectorName) => {
  const sector = totalEmissionsRemainderBySector.value.find((sector) => sector.Sector === sectorName)
  return sector.Remainder
}

// a computed that calculates the sum of the emissions and the remainder for all sectors
const totalEmissionsAndRemainder = computed(() => {
  if(!globalEmissionsBySector.value) return 0
  return globalEmissionsBySector.value.reduce((total, sector) => {
    return total + sector.Emissions + getSectorRemainder(sector.Sector)
  }, 0)
})

// make a computed to calculate the total emissions for all sectors
const totalEmissions = computed(() => {
  if(!globalEmissionsBySector.value) return 0
  return globalEmissionsBySector.value.reduce((total, sector) => {
    return total + sector.Emissions
  }, 0)
})

// make a computed that subtracts the cart total from the total emissions
const remainingEmissions = computed(() => {
  return totalEmissionsAndRemainder.value - props.cartTotal
})
</script>