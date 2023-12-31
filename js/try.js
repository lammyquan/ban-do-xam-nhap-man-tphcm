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

var myIcon = L.icon({
    iconUrl: 'image/pulse2.png',
    iconSize: [38, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

//add geojsonStyle
var RanhgioihcmStyle = {
    color: "black",
    fillColor: "horror",
    opacity: 0.3,
    weight:1,
};
//var tramdomanStyle = {
//   radius:8,
//    color: "orange",
//    weight:1,
//};
var nongnghiepStyle = {
    color: "horror", 
};


var RanhmanStyle = { 
    color: "blue",
    opacity: 0.1,
    weight: 5,

};



//add geojson 

var ranhman = L.geoJson(ranhman,{
    style: function (feature) {
        switch (feature.properties.contour) {
        case 0.25: return {color: 'lightblue'};
        case 1.2: return {color: 'lightgreen'};
        case 5: return {color: 'red'}
        }
    },
    onEachFeature:function (feature, layer) {
    layer.bindPopup(feature.properties.description)
}}).addTo(map);

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
    return L.marker(latlng, {icon:myIcon});
},onEachFeature:function (feature, layer) {
    layer.bindPopup(feature.properties.name)
}}).addTo(map);


var clnvsnts = L.geoJson(clnvsnts,{
    style: function (feature) {
        switch (feature.properties.refname) {
        case "CLN": return {color: '#ffd2a0'};
        case "NTS": return {color: '#aaffff'};
        }
    },
    onEachFeature:function (feature, layer) {
            area=(turf.area(feature)/1000000).toFixed(3)

            label =`Tên: ${feature.properties.refname}<br>`
            label +=`Loại: ${feature.properties.descriptio}<br>`
            label +=`Diện tích: ${area}<br>`

    layer.bindPopup(label) 
}})//.addTo(map);

var conlai = L.geoJson(conlai,{
     style: function (feature) {
        switch (feature.properties.refname) {
        case "NKH": return {color: '#f5ffb4'};
        case "BHK": return {color: '#fff0b4'};
        case "LUK": return {color: '#fffc96'};
        case "LUC": return {color: '#fffc8c'};
        case "LUN": return {color: '#fffcb4'};
        case "HNK": return {color: '#fff0b4'};
        }
    },
    onEachFeature:function (feature, layer) {
            area=(turf.area(feature)/1000000).toFixed(3)


            label =`Tên: ${feature.properties.refname}<br>`
            label +=`Loại: ${feature.properties.descriptio}<br>`
            label +=`Diện tích: ${area}<br>`

    layer.bindPopup(label) 
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
var datnongnghiep = L.layerGroup([clnvsnts, conlai]).addTo(map);

//var Ranhman = L.layerGroup([ranhmancontour, ranhman]).addTo(map);


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
    "Mặn": RanhmanWMS,
 };



//  Add layer control to map 
L.control.layers(baseLayers, overlays, {position: 'topright'}).addTo(map);

// Add leaflet browser print control to map

L.control.browserPrint({position: 'topleft'}).addTo(map);


// mouse move Coordinate 
map.on("mousemove",function(e) {
	
   $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)} , Lng:${e.latlng.lng.toFixed(3)}`)
})


//  Adding scale to map
L.control.scale().addTo(map);



//Menu
    showLegend = true;  // default value showing the legend

    var toggleLegend = function(){
        if(showLegend === true){
        /* use jquery to select your DOM elements that has the class 'legend' */
           $('.fillter').hide(); 
           showLegend = false; 
        }else{
           $('.fillter').show();
           showLegend = true; 
        }

    }
