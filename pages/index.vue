<template>
  <div class="sans-serif">

    <div id="intro" class="measure f3 mt5">
      <p>
        In these prototypes, we explored potential additional directions for the ClimateTrace dataset. These prototypes were intended to  take small but meaningful steps towards additional functionality or modes of examination for such a large, intricate, and important dataset.</p>
        
        <p>Additionally, wherever possible, we are creating templates and open-source tools so that anyone can pick up this data and modify it for their own analysis. 
      </p>
    </div>

    <div class="pa2 w-100 f2 lh-title db">
      <h2>Concept 1: 
      <NuxtLink  to="/cart">Asset Shopping Cart</NuxtLink>
      </h2>

      <p>
        What would the impact of removing or replacing a given asset be? How would that impact emissions?</p>
        
        <p>How would that impact the climate? This tools attempts to answer these questions by allowing users to select assets and see the impact of removing them. This could be useful for researchers, policymakers, and journalists who want to compare different groupings of assets or scenarios on global emissions.
      </p>

      <p class="f4">
        Functionality:
        <ul>
          <li>🛒 Select multiple assets from any country or sector and add them to your "cart"</li>
        </ul>
      </p>
    </div>

    <div class="pa2 w-100 f2 lh-title db">
      <h2>Concept 2: 
      <NuxtLink  to="/aroundme">Assets around me</NuxtLink>
      </h2>

      <p>
        What assets are near me? How do they impact the climate? This tool allows users to see the assets near them and see their impact on sector, country, and global emissions.
        </p>

        <p class="f4">
        Functionality:
        <ul>
          <li>📍 Geo-locate a user using their browser or a typed address</li>
          <li>⭕️ Select a radius for your search, how far you want to look around your current location</li>
        </ul>
      </p>
    </div>

    <div class="pa2 w-100 f2 lh-title db">
      <h2>Suggestions:
      <NuxtLink to="/api-wishlist">API Wishlist</NuxtLink>
      </h2>

      <p>
        As these prototypes were created, we noticed some areas where developer experience could be improved or additional data could be provided from the core API.</p>
    </div>

  </div>
</template>
<script setup>
</script>