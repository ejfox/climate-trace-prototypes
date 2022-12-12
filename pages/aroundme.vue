<template>
  <div class="sans-serif">
    <h1>Around me</h1>
    <p class="intro">
      This page will show you the assets with the most emissions near you.
    </p>

    <div id="map">

    </div>

    <div id="geocoder">

    </div>

    <div id="result" class="dn">

    </div>

    <div class="location-input">
      <!-- <label for="location">Location</label>
      <input type="text" id="location" name="location" /> -->

      <label for="radius">Radius in miles</label>

      <!-- use a v-model for the search radius -->
      <input type="number" id="radius" name="radius" v-model="radius" />

      <!-- <button>Search</button> -->
    </div>

    <div class="location-results mt5" v-if="nearAssets">
      <!-- make a table of the returned assets and their distance from the user -->
      <table class="measure ba b--gray pa3">
        <thead>
          <tr class="bg-dark-gray white">
            <th class="w-50 tl">Asset ID</th>
            <th class="w-50 tl">Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asset in nearAssets" :key="asset.asset_id" class="stripe-dark">
            <td>{{ asset.asset_id }}</td>
            <td>{{ Math.round(asset.distance) }} miles</td>
          </tr>
        </tbody>
      </table>

      <!-- create an AssetCard for every asset -->
      <div class="cards w-80 center mt5">
        <AssetCard v-for="asset in nearAssets" :key="asset.asset_id" :assetId="asset.asset_id" 
        class="w-50 fl pa2"
        />
      </div>

    </div>
  </div>
</template>
<script setup>
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { stringify, parse } from 'wkt'
import { circle, distance, bbox } from '@turf/turf'
import 'mapbox-gl/dist/mapbox-gl.css';

/*
We are going to execute a query like this:

SELECT asset_id, geom 
FROM all_assets_combined 
WHERE within(GeomFromText(geom), PolygonFromText('POLYGON((-127.1825 24.4286, -66.9266 24.4286, -66.9266 49.3845, -127.1825 49.3845, -127.1825 24.4286))')) 
AND date(start_time) >= '2021-01-01' 

To get the results in JSON, we request the following URL:
https://climate-trace-assets.fly.dev/ct-all-sectors.json?sql=SELECT+asset_id%2C+geom+%0D%0AFROM+all_assets_combined+%0D%0AWHERE+within%28GeomFromText%28geom%29%2C+PolygonFromText%28%27POLYGON%28%28-127.1825+24.4286%2C+-66.9266+24.4286%2C+-66.9266+49.3845%2C+-127.1825+49.3845%2C+-127.1825+24.4286%29%29%27%29%29+%0D%0AAND+date%28start_time%29+%3E%3D+%272021-01-01%27+%0D%0A&_shape=array
*/

const radius = ref(80)

const nearAssets = ref(null)

const searchResult = ref(null)

const map = ref(null)

onMounted(() => {  

  const mapboxglAccessToken = 'pk.eyJ1IjoiZWpmb3giLCJhIjoiY2lyZjd0bXltMDA4b2dma3JzNnA0ajh1bSJ9.iCmlE7gmJubz2RtL4RFzIw';

  // create the map
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    accessToken: mapboxglAccessToken,
    center: [-74.5, 40],
    zoom: 9
  });

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxglAccessToken,
    types: 'country,region,place,postcode,locality,neighborhood'
  });

  geocoder.addTo('#geocoder')

  // Get the geocoder results container.
  const results = document.getElementById('result');

  // Add geocoder result to container.
  geocoder.on('result', (e) => {
    results.innerText = JSON.stringify(e.result.geometry, null, 2);
    searchResult.value = e.result

    // add the resulting point as a red marker to the map
    const marker = new mapboxgl.Marker({
      color: 'red'
    })
      .setLngLat(e.result.geometry.coordinates)
      .addTo(map.value)      



    // Make a circle from the location return and radius v-model
    const circle = makeCircleFromPoint(e.result.geometry.coordinates)

    // add the circle to the map as a geojson layer
    map.value.addSource('circle', {
      type: 'geojson',
      data: circle
    })

    map.value.addLayer({
      id: 'circle',
      type: 'fill',
      source: 'circle',
      paint: {
        'fill-color': 'yellow',
        'fill-opacity': 0.8
      }
    })

    // fly map to point
    map.value.flyTo({
      center: e.result.geometry.coordinates,
      zoom: 8
    })

    // get bbox of the circle from turf
    const circleBounds = bbox(circle)

    // zoom map to circle
    map.value.fitBounds(circleBounds, {
      padding: 20
    })

    // Convert the circle into WKT
    const wkt = convertGeojsonToWkt(circle)

    // Make the query URL
    const url = makeQueryUrl(e.result.geometry.coordinates, wkt)

    // Fetch the data
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        // remove duplicate assets from the data using asset id
        const uniqueAssets = data.reduce((acc, asset) => {
          if (!acc.find(a => a.asset_id === asset.asset_id)) {
            acc.push(asset)
          }
          return acc
        }, [])

        // add the distance from the user to each asset
        const assetsWithDistance = uniqueAssets.map(asset => {
          // const assetPoint = JSON.parse(asset.geom)
          const assetPoint = parse(asset.geom)
          const assetDistance = distance(e.result.geometry, assetPoint, { units: 'miles' })
          return {
            ...asset,
            distance: parseFloat(assetDistance, 2)
          }
        })

        // add the assets to the map as markers
        assetsWithDistance.forEach(asset => {
          const assetPoint = parse(asset.geom)
          const marker = new mapboxgl.Marker()
            .setLngLat(assetPoint.coordinates)
            .addTo(map.value)
        })



        // sort the assets by distance
        const sortedAssets = assetsWithDistance.sort((a, b) => a.distance - b.distance)

        // set the nearAssets v-model to the sorted assets
        nearAssets.value = sortedAssets

      })
  });

  // Clear results container when search is cleared.
  geocoder.on('clear', () => {
    results.innerText = '';

    // clear the geojson layer and all the markers
    map.value.removeLayer('circle')
    map.value.removeSource('circle')
    map.value.removeLayer('nearAssets')
    map.value.removeSource('nearAssets')

  });

})

function makeQueryUrl(location, circleWKT) {
  const url = new URL('https://climate-trace-assets.fly.dev/ct-all-sectors.json')
  const params = {
    sql: `SELECT asset_id, geom
FROM all_assets_combined
WHERE within(GeomFromText(geom), PolygonFromText('${circleWKT}'))
AND date(start_time) >= '2021-01-01' LIMIT 25`,
    _shape: 'array'
  }
  url.search = new URLSearchParams(params).toString()
  console.log('Query:', params.sql)
  console.log('Generated URL: ', url.toString())
  return url
}

function makeCircleFromPoint(point) {
  // radius in miles
  const [lng, lat] = point
  const geoJsonCircle = circle([lng, lat], radius.value, { steps: 8, units: 'miles' })
  console.log(JSON.stringify(geoJsonCircle))
  return geoJsonCircle
}

function convertGeojsonToWkt(geojson) {
  return stringify(geojson)
}

</script>
<style>
#map {
  width: 100%;
  height: 48vh;
}
#geocoder input {
  width: 100%;
  padding: 0.5rem;
}

.mapboxgl-ctrl-geocoder--suggestion-title {
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  list-style-type: none;
  margin-left: 0;
  padding-left: 0;
}

.mapboxgl-ctrl-geocoder--suggestions {
  font-size: 1em;
  width: 100%;
  display: block;
}
</style>