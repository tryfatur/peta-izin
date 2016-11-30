L.mapbox.accessToken = 'pk.eyJ1IjoidHJ5ZmF0dXIiLCJhIjoiY2lxdDJ5d3R1MDAydmZybmh3a3VtcmFvMiJ9.lL9RoXOtTscOHiSvOCrL-Q';

var map        = L.mapbox.map('map').setView([-6.909620, 107.634553], 13);
var tileLayer  = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken);
var info       = L.control();
var optionData = L.control();
var marker     = L.FeatureGroup();
var cluster    = L.markerClusterGroup();
var geojson;
var text;

tileLayer.addTo(map);
L.MakiMarkers.accessToken = L.mapbox.accessToken;

$(".leaflet-control-zoom").css("visibility", "hidden");

function onEachFeature(feature, layer) {
	text = "<h2><b>" + feature.properties.jenis_izin + "</b></h2>";
	text += "<p><b>Nama Perusahaan:</b></p>";
	text += "<p>" + feature.properties.nama_perusahaan + "</p>";
	text += "<p><b>Nomor Izin:</b></p>";
	text += "<p>" + feature.properties.nomor_izin + "</p>";
	text += "<p><b>Tanggal Berakhir:</b></p>";
	text += "<p>" + feature.properties.tgl_akhir + "</p>";
	
	layer.bindPopup(text);
}

function plotting(file) {
	$.getJSON(file, function(data) {
		geojson = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, {
					icon: L.MakiMarkers.icon({icon: "triangle", color: "#FF5627", size: "m"})
				});
			},
			onEachFeature: onEachFeature
		});

		// Clustering Pointer
		cluster.clearLayers();
		cluster.addLayer(geojson);
		map.addLayer(cluster);

		tileLayer.addTo(map);
	});
}

function izin(id_izin) {
	switch (id_izin){
		case 1: plotting('src/json/geojson/lokasi_imb.json'); break;
		case 2: plotting('src/json/geojson/lokasi_ig.json'); break;
		case 3: plotting('src/json/geojson/lokasi_tdp.json'); break;
		case 4: plotting('src/json/geojson/lokasi_iup.json'); break;
		case 5: plotting('src/json/geojson/lokasi_ipr.json'); break;
	}
}

bdgBasemap = L.geoJson(bdgMap, {});
bdgBasemap.addTo(map);

map.attributionControl.addAttribution('<a href="http://portal.bandung.go.id/">Pemerintah Kota Bandung</a> &copy; 2016');
map.attributionControl.addAttribution('Dinas Komunikasi dan Informatika & Badan Pelayanan Perizinan Terpadu');