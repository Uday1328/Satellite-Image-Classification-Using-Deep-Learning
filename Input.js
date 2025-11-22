// Define ECIL using bounding box
Map.centerObject(roi, 10);
// Load Sentinel-2 data
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(roi)
  .filterDate("2022-01-01", "2022-12-31")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10))
  .median()
  .clip(roi);

Map.addLayer(s2, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, "Sentinel-2");
// Combine into one training set
var trainingFC = urban.merge(vegetation).merge(water);

// Sample image using training polygons
var training = s2.select(['B2', 'B3', 'B4', 'B8']).sampleRegions({
  collection: trainingFC,
  properties: ['class'],
  scale: 10
});
// Printing Train data points
print('Sampled training points:', training);
// Table to CSV in Drive
Export.table.toDrive({
  collection: training,
  description: 'Hyderabad_Training_Data',
  fileFormat: 'CSV'
});



