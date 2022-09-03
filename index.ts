/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: 8,
    center: { lat: -3.5778, lng: 102.3464 },
  });

  // Load GeoJSON.
  map.data.loadGeoJson('bengkulu.json');

  // Set the stroke width, and fill color for each polygon
  map.data.setStyle((feature) => {
    let color = feature.getProperty('COLOR');

    return {
      fillColor: color,
      strokeColor: color,
      strokeWeight: 2,
    };
  });

  // Set mouse event for each feature.
  map.data.addListener('mouseover', (event) => {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, { strokeWeight: 5 });
    (document.getElementById('info-box') as HTMLElement).textContent =
      event.feature.getProperty('WADMKK');
  });

  map.data.addListener('mouseout', (event) => {
    map.data.revertStyle();
    (document.getElementById('info-box') as HTMLElement).textContent = '?';
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
