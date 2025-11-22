Map.centerObject(roi, 10);

var palette = [
  'red',       // 0 = Urban
  'green',     // 1 = Vegetation
  'blue'       // 2 = Water
];

// Add to map
Map.addLayer(classified, {min: 0, max: 2, palette: palette}, 'Classified Map');

// Optional: export to Google Drive
Export.image.toDrive({
  image: classified,
  description: 'Hyderabad_Classified_Map',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});
