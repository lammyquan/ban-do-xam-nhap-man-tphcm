//  Initialise map 
var map = L.map('map').setView([10.7, 106.7],10);


//  Add Osm  tile layer to map 
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
// .addTo(map)


var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});



var marker = L.marker([10.7, 106.7]).addTo(map);



//add geojsonStyle
var RanhgioihcmStyle = {
    color: "red",
    opacity: 0.3,
    weight:1,
};
var tramdomanStyle = {
    radius:8,
    fillColor: "green",
    color: "green",
    weight:1,
};
var nongnghiepStyle = {
    color: "Horror", 
};

var RanhmanStyle = { 
    color: "red"
};

//add geojson 

var ranhman = L.geoJson(ranhman,{style:RanhmanStyle, 
    onEachFeature:function (feature, layer) {
    layer.bindPopup(feature.properties.description)
}})//.addTo(map);

var ranhgioihcm = L.geoJson(Ranhgioihcm, {style:RanhgioihcmStyle,
onEachFeature:function (feature, layer) {
    area=(turf.area(feature)/1000000).toFixed(3)
    center_lng= turf.center(feature).geometry.coordinates[0].toFixed(2)
    center_lat= turf.center(feature).geometry.coordinates[1].toFixed(2)


    label =`Quận: ${feature.properties.huyen}<br>`
    label +=`Diện tích: ${area}<br>`
    label+=`center:${center_lng} , ${center_lat}<br>`




    layer.bindPopup(label)

}}).addTo(map);

var tramdoman = L.geoJson(tramdoman,{pointToLayer:function(feature, latlng){
    return L.circleMarker(latlng,tramdomanStyle);
},onEachFeature:function (feature, layer) {
    layer.bindPopup(feature.properties.name)
}}).addTo(map);


var nongnghiep = L.geoJson(nongnghiep,{style:nongnghiepStyle,
    onEachFeature:function (feature, layer) {
    layer.bindPopup(feature.properties.refname) 
}})//.addTo(map);

//add raster 
var RanhmanWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:ManHCM_decimal',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map);

var Nongnghiep = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:nongthuysan',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map); 

var ranhmancontour =  L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:ranhmanhcm',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map); 

//Legend
//layergroup
var datnongnghiep = L.layerGroup([nongnghiep, Nongnghiep]).addTo(map);

//var Ranhman = L.layerGroup([ranhman, ranhmancontour]).addTo(map);


//  Basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street map": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satelite": googleSat,
    "Google Terrain": googleTerrain,
};


// Layers
var overlays = {
    "Marker": marker,
    // "Roads": roadsLayer
    "Ranh giới": ranhgioihcm,
    "Trạm đo mặn": tramdoman,
    "Đất nông nghiệp": datnongnghiep,
    "Đường ranh mặn": ranhman,
    //"Mặn": RanhmanWMS,
 };




//  Add layer control to map 
L.control.layers(baseLayers, overlays,{position: 'topright'}).addTo(map);

// Add leaflet browser print control to map

L.control.browserPrint({position: 'topleft'}).addTo(map);

// mouse move Coordinate 
map.on("mousemove",function(e) {
	
   $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)} , Lng:${e.latlng.lng.toFixed(3)}`)
})




//  Adding scale to map
L.control.scale().addTo(map);
