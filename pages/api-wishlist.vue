<template>
  <div class="f3 sans-serif">

    <h1>API wishlist</h1>

    <div class="w-50 fl db">
      <div class="pa3 ba b--light-gray">
        <h2 class="mv0 pv0">Geospatial radius query</h2>

        <p class="what">
          Find all of the assets within a certain radius of a given point.
        </p>

        <p class="why">
          I want to see the assets with the most emissions near me.
        </p>

        <p class="inputs">
          <span class="blue">Inputs: latitude/longitude of center, radius of search in miles/km</span>
        </p>

        <p class="outputs">
          <span class="red">Outputs: A list of asset IDs within the search radius</span>
        </p>
      </div>
    </div>

    <div class=" w-50 fl db">
      <div class="pa3 ba b--light-gray">
        <h2 class="mv0 pv0">Datasette instance for analysis</h2>

        <p class="what">
          A publicly-hosted datasette instance that provides a query-level API to the asset-level data.
        </p>

        <p class="why">
          The current API is great for getting a high-level view of the data, but it's sometimes difficult to do
          analysis
          on the entire dataset because of its size.
        </p>

        <p><a href="https://climate-trace-assets.fly.dev/ct-all-sectors">Prototype datasette instance hosted on fly</a></p>

        <!-- <p class="inputs">
      <span class="blue">Inputs: latitude/longitude of center, radius of search in miles/km</span>
    </p>

    <p class="outputs">
      <span class="red">A list of asset IDs within the search radius</span>
    </p> -->
      </div>
    </div>

    <div class=" w-50 fl db">
      <div class="pa3 ba b--light-gray">
        <h2 class="mv0 pv0">Include null values for known but un-measured facilities</h2>

        <p class="what">
          It would be great to receive null values for facilities that are known to exist, but for which no data has been collected. It would additionally be helpful to know the reason for the lack of data.
        </p>

        <p class="why">
          Users sometimes expect to see certain facilities that may be too small to be included in the dataset. It would be helpful to know that these facilities are not included in the dataset, if they might be in the future, and why they weren't included.
        </p>

        <!-- <p class="inputs">
      <span class="blue">Inputs: latitude/longitude of center, radius of search in miles/km</span>
    </p>

    <p class="outputs">
      <span class="red">A list of asset IDs within the search radius</span>
    </p> -->
      </div>
    </div>
  </div>

</template>