var x = document.cookie;
x = x.split(";")
console.log(x[0], x[1]);
//if (x[0] == "" || x[1] == "") {
//    document.getElementById("AdvanceSearch").style.display = "none";
//    document.getElementById("PredefineQuery").style.display = "none";
//     document.getElementById("PredefineQuery").style.display = "none";
//}
document.getElementById("LogOut").addEventListener("click", function () {
    //alert("HII");

    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
        deleteCookie(cookies[i].split("=")[0]);
    window.open("/", "_self");
})

function setCookie(name, value, expirydays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirydays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}

for (var i = 0; i < x.length; i++) {
    if (x[i].trim() == "userRole=hospital") {
        document.getElementById("BuildingLayer").style.display = "none";
        document.getElementById("GreenAreaLayer").style.display = "none";
        document.getElementById("StromWaterLayer").style.display = "none";
        document.getElementById("EmergencyLayer").style.display = "none";
        document.getElementById("WaterSuppLayer").style.display = "none";
        document.getElementById("SewerageLayer").style.display = "none";
        document.getElementById("EducationLayer").style.display = "none";
        document.getElementById("SolidWasteLayer").style.display = "none";
        document.getElementById("MedicalLayer").style.display = "none";
        document.getElementById("ABDLayer").style.display = "none";
        document.getElementById("SCADALayer").style.display = "none";
    }
    if (x[i].trim() == "userRole=firestation") {
        document.getElementById("RailwayLayer").style.display = "none";
        document.getElementById("GreenAreaLayer").style.display = "none";
        document.getElementById("StromWaterLayer").style.display = "none";
        document.getElementById("EmergencyLayer").style.display = "none";
        document.getElementById("WaterSuppLayer").style.display = "none";
        document.getElementById("SewerageLayer").style.display = "none";
        document.getElementById("EducationLayer").style.display = "none";
        document.getElementById("SolidWasteLayer").style.display = "none";
        document.getElementById("MedicalLayer").style.display = "none";
        document.getElementById("CovidLayer").style.display = "none";
        document.getElementById("SCADALayer").style.display = "none";
        document.getElementById("OtherLayer").style.display = "none";
    }
    if (x[i].trim() == "userRole=forest") {
        document.getElementById("RailwayLayer").style.display = "none";
        document.getElementById("StreetLightLayer").style.display = "none";
        document.getElementById("StromWaterLayer").style.display = "none";
        document.getElementById("BankPostalLayer").style.display = "none";
        document.getElementById("BuildingLayer").style.display = "none";
        document.getElementById("SewerageLayer").style.display = "none";
        document.getElementById("EducationLayer").style.display = "none";
        document.getElementById("SolidWasteLayer").style.display = "none";
        document.getElementById("EmergencyLayer").style.display = "none";
        document.getElementById("MedicalLayer").style.display = "none";
        document.getElementById("CovidLayer").style.display = "none";
        document.getElementById("SCADALayer").style.display = "none";
        document.getElementById("OtherLayer").style.display = "none";
        document.getElementById("ABDLayer").style.display = "none";
    }
}

var view = new ol.View({
    center: ol.proj.fromLonLat([78.0322, 30.3165]),
    zoom: 11
})
var source = new ol.source.Vector();



var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

//var view;
var map = new ol.Map({

    target: 'map',
    layers: [],
    controls: [],
    overlays: [overlay],
    view: view,
});
//var zoomslider = new ol.control.ZoomSlider();
//map.addControl(zoomslider);






if (window.location.hash !== '') {
    // try to restore center, zoom-level and rotation from the URL
    var hash = window.location.hash.replace('#map=', '');
    var parts = hash.split('/');
    if (parts.length === 4) {
        zoom = parseFloat(parts[0]);
        center = [parseFloat(parts[1]), parseFloat(parts[2])];
        rotation = parseFloat(parts[3]);
    }
}
var shouldUpdate = true;
var view = map.getView();
var updatePermalink = function () {
    if (!shouldUpdate) {
        // do not update the URL when the view was changed in the 'popstate' handler
        shouldUpdate = true;
        return;
    }

    var center = view.getCenter();
    var hash =
        '#map=' +
        view.getZoom().toFixed(2) +
        '/' +
        center[0].toFixed(2) +
        '/' +
        center[1].toFixed(2) +
        '/' +
        view.getRotation();
    var state = {
        zoom: view.getZoom(),
        center: view.getCenter(),
        rotation: view.getRotation(),
    };
    window.history.pushState(state, 'map', hash);
};

map.on('moveend', updatePermalink);


window.addEventListener('popstate', function (event) {
    if (event.state === null) {
        return;
    }
    map.getView().setCenter(event.state.center);
    map.getView().setZoom(event.state.zoom);
    map.getView().setRotation(event.state.rotation);
    shouldUpdate = false;
});








//Geolocation
var geolocation = new ol.Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
        enableHighAccuracy: true,
    },
    projection: view.getProjection(),
});

function el(id) {
    return document.getElementById(id);
}

el('track').addEventListener('change', function () {
    geolocation.setTracking(this.checked);
});

//// update the HTML page when the position changes.
//geolocation.on('change', function () {
//    el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
//    el('altitude').innerText = geolocation.getAltitude() + ' [m]';
//    el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
//    el('heading').innerText = geolocation.getHeading() + ' [rad]';
//    el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
//});

//// handle geolocation error.
//geolocation.on('error', function (error) {
//    var info = document.getElementById('info');
//    info.innerHTML = error.message;
//    info.style.display = '';
//});

//var accuracyFeature = new Feature();
//geolocation.on('change:accuracyGeometry', function () {
//    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
//});

//var positionFeature = new Feature();
//positionFeature.setStyle(
//    new Style({
//        image: new CircleStyle({
//            radius: 6,
//            fill: new Fill({
//                color: '#3399CC',
//            }),
//            stroke: new Stroke({
//                color: '#fff',
//                width: 2,
//            }),
//        }),
//    })
//);

//geolocation.on('change:position', function () {
//    var coordinates = geolocation.getPosition();
//    positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
//});

//new VectorLayer({
//    map: map,
//    source: new VectorSource({
//        features: [accuracyFeature, positionFeature],
//    }),
//});


// document.getElementById('pan').addEventListener(
//   'click',
//   function () {
//     map.addInteraction(defaults({dragPan: false, mouseWheelZoom: false}).extend([
//       new DragPan({
//         condition: function (event) {
//           return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
//         },
//       }),
//       new MouseWheelZoom({
//         condition: platformModifierKeyOnly,
//       }) ]),
//     )
//   },
//   false
// );

function forlongilati() {

    map.on("click", function (e) {
        var resolution = map.getView().getResolution();
        var cor = e.coordinate;
        var meters2degress = function (x, y) {
            var lon = x * 180 / 20037508.34;
            var lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
            return [lon, lat]
        }
        console.log(url);
        if (url) {
            $.getJSON(url, function (data) {
                var len = Object.keys(data.Feature[0].properties).length;
                console.log(len);
            })
        }

        var cordinates = meters2degress(cor[0], cor[1]);
        var longitude = cordinates[0], latitude = cordinates[1];
        console.log(longitude + " " + latitude);
        var centerLongitudeLatitude = ol.proj.fromLonLat([longitude, latitude]);
        var layer12 = new ol.layer.Vector({
            source: new ol.source.Vector({
                projection: 'EPSG:4326',
                features: [new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, 4000))]
            }),
            style: [
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'blue',
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 255, 0.1)'
                    })
                })
            ]
        });
        map.addLayer(layer12);
    });

}

var satmap = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: ['Powered by Esri',
            'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'],
        attributionsCollapsible: false,
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 23
    })
})

//var basemap = new ol.layer.Tile({
//    source: new ol.source.XYZ({
//        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
//    })
//})
const basemap = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: 'OSMStandard'
});

map.addLayer(basemap);

var l1 = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS14/wms',
    params: { 'LAYERS': '	DehradunGIS14:dist' },
    serverType: 'geoserver'
})
var l = new ol.layer.Tile({
    source: l1
});
l.setOpacity(0.7);
l.setZIndex(50);
map.addLayer(l);


//var ForPoints = new TileLayer({
//    source: new TileWMS({
//        url: 'http://localhost:8082/geoserver/DehradunGIS53/wms',
//        params: { 'LAYERS': 'DehradunGIS53:dehracityhospital' },
//        serverType: 'geoserver'
//    })
//});
//ForPoints.setOpacity(0.7);

var zoomVar = 11;

// function plus() {
//     view.zoom = ++zoomVar;
//   }
//   function minus() {
//     view.zoom = --zoomVar;
//   }

var CoordinateDataInfo = document.getElementById("CoordinateDataInfo");
var coordinate = [];
document.getElementById('coordinate').addEventListener('click', function () {
    var dialog = document.getElementById('myFirstDialog');
    dialog.show();
    document.getElementById('Search').onclick = function () {
        var Lon = parseFloat(document.getElementById("Long").value);
        var Lat = parseFloat(document.getElementById("Lati").value);
        console.log(Lon + " " + Lat);
        fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + Lon + '&lat=' + Lat)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);
                coordinate = [Lon, Lat];
                // overlay.setPosition(coordinate);

                CoordinateDataInfo.innerHTML = '<p>' + json.display_name + '</p>';
                dialog.close();
            });
    };
    document.getElementById('Hide2').addEventListener("click", function () {
        //alert("HI");
        dialog.close();
    })
},
    false
);

var ArrayLayer = [];


// map.addLayer(ForPoints);



// var draw; 

// document.getElementById('emergency').addEventListener(
//   'click',
//   function () {
//     var value = "Point";
//     if (value !== 'None') {
//       draw = new Draw({
//         source: source,
//         type: "Point",
//       });
//       map.addInteraction(draw);
//     }
//   },
//   false
// );

// "Point".onchange = function () {
//     map.removeInteraction(draw);
//     addInteraction();
//   };



var Centralgovsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS11/wms',
    params: { 'LAYERS': '	DehradunGIS11:central government buildings' },
    serverType: 'geoserver'
})
var Centralgov = new ol.layer.Tile({
    source: Centralgovsrc
});
Centralgov.setZIndex(51);

var Stategovsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS35/wms',
    params: { 'LAYERS': 'DehradunGIS35:state government office' },
    serverType: 'geoserver'
})
var Stategov = new ol.layer.Tile({
    source: Stategovsrc
});
Stategov.setZIndex(51);
//map.addLayer(RedZone);


var Drainagesrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS15/wms',
    params: { 'LAYERS': '	DehradunGIS15:drainagenetwork' },
    serverType: 'geoserver'
})

var Drainage = new ol.layer.Tile({
    source: Drainagesrc
});
Drainage.setZIndex(51);
//map.addLayer(GreenZone);


var STWCatchsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS37/wms',
    params: { 'LAYERS': 'DehradunGIS37:stwcatchmentboundry' },
    serverType: 'geoserver'

})


var STWCatch = new ol.layer.Tile({
    source: STWCatchsrc
});
STWCatch.setZIndex(51);
//map.addLayer(GovermentHospitals);


var STWpointsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS38/wms',
    params: { 'LAYERS': '	DehradunGIS38:stwpoint' },
    serverType: 'geoserver'
})

var STWpoint = new ol.layer.Tile({
    source: STWpointsrc
});
STWpoint.setZIndex(51);
//map.addLayer(TestingCenters);


var Farmhousesrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS16/wms',
    params: { 'LAYERS': '	DehradunGIS16:farmhouse' },
    serverType: 'geoserver'
})

var Farmhouse = new ol.layer.Tile({
    source: Farmhousesrc
});
Farmhouse.setZIndex(51);
//map.addLayer(TestingCenters);


var Forestsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS18/wms',
    params: { 'LAYERS': 'DehradunGIS18:forest' },
    serverType: 'geoserver'
})

var Forest = new ol.layer.Tile({
    source: Forestsrc
});
Forest.setZIndex(51);
//map.addLayer(Gandhinagar);

var GreenAreasrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS19/wms',
    params: { 'LAYERS': '	DehradunGIS19:greenareas' },
    serverType: 'geoserver'
})


var GreenArea = new ol.layer.Tile({
    source: GreenAreasrc
});
GreenArea.setZIndex(51);
//map.addLayer(Ahmedabad);


var Agriculturesrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS4/wms',
    params: { 'LAYERS': '	DehradunGIS4:agriculture' },
    serverType: 'geoserver'
})
var Agriculture = new ol.layer.Tile({
    source: Agriculturesrc
});
Agriculture.setZIndex(51);
//map.addLayer(Vadodara);


var Parkingsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS25/wms',
    params: { 'LAYERS': '	DehradunGIS25:parking' },
    serverType: 'geoserver'
})

var Parking = new ol.layer.Tile({
    source: Parkingsrc
});
Parking.setZIndex(51);
//map.addLayer(Surat);

var Petrolpumpsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS26/wms',
    params: { 'LAYERS': '	DehradunGIS26:petrolpump' },
    serverType: 'geoserver'
})

var Petrolpump = new ol.layer.Tile({
    source: Petrolpumpsrc
});
Petrolpump.setZIndex(51);
//map.addLayer(Rajkot);

var Bridgesrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS9/wms',
    params: { 'LAYERS': '		DehradunGIS9:bridgesandflyover' },
    serverType: 'geoserver'
})


var Bridge = new ol.layer.Tile({
    source: Bridgesrc
});
Bridge.setZIndex(51);

var Trafficislandsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS42/wms',
    params: { 'LAYERS': '	DehradunGIS42:trafficisland' },
    serverType: 'geoserver'
})


var Trafficisland = new ol.layer.Tile({
    source: Trafficislandsrc
});
Trafficisland.setZIndex(51);

var Trafficjunctionsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS43/wms',
    params: { 'LAYERS': '	DehradunGIS43:trafficjunction' },
    serverType: 'geoserver'
})


var Trafficjunction = new ol.layer.Tile({
    source: Trafficjunctionsrc
});
Trafficjunction.setZIndex(51);

var Busdepotsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS10/wms',
    params: { 'LAYERS': '	DehradunGIS10:busdepot' },
    serverType: 'geoserver'
})
var Busdepot = new ol.layer.Tile({
    source: Busdepotsrc
});
Busdepot.setZIndex(51);

var Wateroverheadtanksrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS47/wms',
    params: { 'LAYERS': '	DehradunGIS47:wateroverheadtank' },
    serverType: 'geoserver'
})
var Wateroverheadtank = new ol.layer.Tile({
    source: Wateroverheadtanksrc
});
Wateroverheadtank.setZIndex(51);

var Wateroverheadtanklandmarksrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS48/wms',
    params: { 'LAYERS': 'DehradunGIS48:wateroverheadtanklandmark' },
    serverType: 'geoserver'
})
var Wateroverheadtanklandmark = new ol.layer.Tile({
    source: Wateroverheadtanklandmarksrc
});
Wateroverheadtanklandmark.setZIndex(51);

var Watertreatmentplantsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS51/wms',
    params: { 'LAYERS': '	DehradunGIS51:watertreatmentplant' },
    serverType: 'geoserver'
})
var Watertreatmentplant = new ol.layer.Tile({
    source: Watertreatmentplantsrc
});
Watertreatmentplant.setZIndex(51);


// var Petrolpump = new ol.layer.Tile({
//     source: new ol.source.TileWMS({
//         url: 'http://localhost:8082/geoserver/DehradunGIS26/wms',
//         params: { 'LAYERS': '	DehradunGIS26:petrolpump' },
//         serverType: 'geoserver'
//     })
// });

var Waterpiplinesrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS49/wms',
    params: { 'LAYERS': '	DehradunGIS49:waterpipline' },
    serverType: 'geoserver'
})

var Waterpipline = new ol.layer.Tile({
    source: Waterpiplinesrc
});
Waterpipline.setZIndex(51);

var Watersupplypointsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS50/wms',
    params: { 'LAYERS': 'DehradunGIS50:watersupplypoint' },
    serverType: 'geoserver'
})
var Watersupplypoint = new ol.layer.Tile({
    source: Watersupplypointsrc
});
Watersupplypoint.setZIndex(51);


var Tubewellsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS44/wms',
    params: { 'LAYERS': '	DehradunGIS44:tubewell' },
    serverType: 'geoserver'
})
var Tubewell = new ol.layer.Tile({
    source: Tubewellsrc
});
Tubewell.setZIndex(51);


var Bankssrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS7/wms',
    params: { 'LAYERS': '	DehradunGIS7:banks' },
    serverType: 'geoserver'
})
var Banks = new ol.layer.Tile({
    source: Bankssrc
});
Banks.setZIndex(51);


var Postofficesrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS29/wms',
    params: { 'LAYERS': '	DehradunGIS29:postoffice' },
    serverType: 'geoserver'
})

var Postoffice = new ol.layer.Tile({
    source: Postofficesrc
});
Postoffice.setZIndex(51);

var ATMssrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS6/wms',
    params: { 'LAYERS': '	DehradunGIS6:atms' },
    serverType: 'geoserver'
})
var Atms = new ol.layer.Tile({
    source: ATMssrc
});
Atms.setZIndex(51);

var Streetsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS36/wms',
    params: { 'LAYERS': '	DehradunGIS36:streetlight' },
    serverType: 'geoserver'
})
var Street = new ol.layer.Tile({
    source: Streetsrc
});
Street.setZIndex(51);

var Communitytoiletsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS13/wms',
    params: { 'LAYERS': '	DehradunGIS13:communitytoilet' },
    serverType: 'geoserver'
})
var Communitytoilet = new ol.layer.Tile({
    source: Communitytoiletsrc
});
Communitytoilet.setZIndex(51);

var Publictoiletssrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS31/wms',
    params: { 'LAYERS': '	DehradunGIS31:publictoilets' },
    serverType: 'geoserver'
})
var Publictoilets = new ol.layer.Tile({
    source: Publictoiletssrc
});
Publictoilets.setZIndex(51);

var Raillinesrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS32/wms',
    params: { 'LAYERS': 'DehradunGIS32:railline' },
    serverType: 'geoserver'
})
var Railline = new ol.layer.Tile({
    source: Raillinesrc
});
Railline.setZIndex(51);


var Firestationsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS17/wms',
    params: { 'LAYERS': '	DehradunGIS17:firestation' },
    serverType: 'geoserver'
})
var Firestation = new ol.layer.Tile({
    source: Firestationsrc
});
Firestation.setZIndex(51);

var Policestationssrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS28/wms',
    params: { 'LAYERS': '	DehradunGIS28:policestations' },
    serverType: 'geoserver'
})
var Policestations = new ol.layer.Tile({
    source: Policestationssrc
});
Policestations.setZIndex(51);

var Policechowkisrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS27/wms',
    params: { 'LAYERS': '	DehradunGIS27:policechowki' },
    serverType: 'geoserver'
})
var Policechowki = new ol.layer.Tile({
    source: Policechowkisrc
});
Policechowki.setZIndex(51);

var Primaryschoolsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS30/wms',
    params: { 'LAYERS': '	DehradunGIS30:primaryschool' },
    serverType: 'geoserver'
})
var Primaryschool = new ol.layer.Tile({
    source: Primaryschoolsrc
});
Primaryschool.setZIndex(51);



var SWMtransfersrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS41/wms',
    params: { 'LAYERS': '		DehradunGIS41:swm transfer station' },
    serverType: 'geoserver'
})
var SWMtransfer = new ol.layer.Tile({
    source: SWMtransfersrc
});
SWMtransfer.setZIndex(51);

var SWMcontainersrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS40/wms',
    params: { 'LAYERS': 'DehradunGIS40:swm container' },
    serverType: 'geoserver'
})
var SWMcontainer = new ol.layer.Tile({
    source: SWMcontainersrc
});
SWMcontainer.setZIndex(51);

var BloodBanksrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS8/wms',
    params: { 'LAYERS': '		DehradunGIS8:bloodbank' },
    serverType: 'geoserver'
})
var Bloodbank = new ol.layer.Tile({
    source: BloodBanksrc
});
Bloodbank.setZIndex(51);

var Clinicssrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS12/wms',
    params: { 'LAYERS': 'DehradunGIS12:clinics' },
    serverType: 'geoserver'
})
var Clinics = new ol.layer.Tile({
    source: Clinicssrc
});
Clinics.setZIndex(51);


var Homeopathicsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS20/wms',
    params: { 'LAYERS': '	DehradunGIS20:homeopathic' },
    serverType: 'geoserver'
})
var Homeopathic = new ol.layer.Tile({
    source: Homeopathicsrc
});
Homeopathic.setZIndex(51);

var Hospitalsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS21/wms',
    params: { 'LAYERS': 'DehradunGIS21:hospitals' },
    serverType: 'geoserver'
})

var Hospitals = new ol.layer.Tile({
    source: Hospitalsrc
});
Hospitals.setZIndex(51);

var MedicalStoresrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS23/wms',
    params: { 'LAYERS': '	DehradunGIS23:medicalstore' },
    serverType: 'geoserver'
})
var Medicalstore = new ol.layer.Tile({
    source: MedicalStoresrc
});
Medicalstore.setZIndex(51);

var Surgicalshopsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS39/wms',
    params: { 'LAYERS': '	DehradunGIS39:surgicalshop' },
    serverType: 'geoserver'
})
var Surgicalshop = new ol.layer.Tile({
    source: Surgicalshopsrc
});
Surgicalshop.setZIndex(51);

var Veterinarysrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS46/wms',
    params: { 'LAYERS': '	DehradunGIS46:veterinary' },
    serverType: 'geoserver'
})
var Veterinary = new ol.layer.Tile({
    source: Veterinarysrc
});
Veterinary.setZIndex(51);

var Areabaseddevlopmentsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS5/wms',
    params: { 'LAYERS': 'DehradunGIS5:areabaseddevlopment' },
    serverType: 'geoserver'
})
var Areabaseddevlopment = new ol.layer.Tile({
    source: Areabaseddevlopmentsrc
});
Areabaseddevlopment.setZIndex(51);

var Areawardsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS3/wms',
    params: { 'LAYERS': '	DehradunGIS3:abdwardboundry' },
    serverType: 'geoserver'
})
var Areaward = new ol.layer.Tile({
    source: Areawardsrc
});
Areaward.setZIndex(51);

var Abdconnectivitydrainsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS/wms',
    params: { 'LAYERS': '	DehradunGIS:abdconnectivitydrain' },
    serverType: 'geoserver'
})
var Abdconnectivitydrain = new ol.layer.Tile({
    source: Abdconnectivitydrainsrc
});
Abdconnectivitydrain.setZIndex(51);




var Abdgrbuildingsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS52/wms',
    params: { 'LAYERS': '	DehradunGIS52:abdgrbuilding' },
    serverType: 'geoserver'
})
var Abdgrbuilding = new ol.layer.Tile({
    source: Abdgrbuildingsrc
});
Abdgrbuilding.setZIndex(51);

var Abdmddaparksrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS3/wms  ',
    params: { 'LAYERS': 'DehradunGIS3:abdmddapark' },
    serverType: 'geoserver'
})
var Abdmddapark = new ol.layer.Tile({
    source: Abdmddaparksrc
});
Abdmddapark.setZIndex(51);

var Isolationwardsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS22/wms',
    params: { 'LAYERS': '	DehradunGIS22:isolationward' },
    serverType: 'geoserver'
})
var Isolationward = new ol.layer.Tile({
    source: Isolationwardsrc
});
Isolationward.setZIndex(51);

var Othereducationsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS24/wms',
    params: { 'LAYERS': '	DehradunGIS24:othereducation' },
    serverType: 'geoserver'
})
var Othereducation = new ol.layer.Tile({
    source: Othereducationsrc
});
Othereducation.setZIndex(51);


var Tubewell_lastsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS45/wms',
    params: { 'LAYERS': '	DehradunGIS45:tubewell_last' },
    serverType: 'geoserver'
})
var Tubewell_last = new ol.layer.Tile({
    source: Tubewell_lastsrc
});
Tubewell_last.setZIndex(51);


var Reservoirsrc = new ol.source.TileWMS({
    url: 'http://localhost:8082/geoserver/DehradunGIS33/wms',
    params: { 'LAYERS': '	DehradunGIS33:reservoir' },
    serverType: 'geoserver'
})
var Reservoir = new ol.layer.Tile({
    source: Reservoirsrc
});
Reservoir.setZIndex(51);



document.getElementById('AllLayerOff').addEventListener(
    'click',
    function () {
        var layerArray, len, layer1;
        layerArray = map.getLayers().getArray();
        len = layerArray.length;
        while (len > 0) {
            layer1 = layerArray[len - 1];
            map.removeLayer(layer1);
            len = layerArray.length;
        }
    },
    false
);





//document.getElementById('home').addEventListener(
//    'click',
//    function () {
//        //var cookies = document.cookie.split(";");
//        //for (var i = 0; i < cookies.length; i++)
//        //    deleteCookie(cookies[i].split("=")[0]);
//        window.open("/", "_self");
//    },
//    false
//);
var img1 = 0;
document.getElementById('image').addEventListener(
    'click',
    function () {
        if (img1 == 0) {
            map.addLayer(satmap);
            img1 = 1;
        }
        else {
            map.removeLayer(satmap);
            img1 = 0;
        }
    },
    false
);

// var AmbulanceTracking = new ol.layer.Tile({
//     source: new ol.source.TileWMS({
//         url: 'http://localhost:8082/geoserver/macro_provinces12/wms',
//         params: { 'LAYERS': 'macro_provinces12:ambulance' },
//         serverType: 'geoserver'
//     })
// });
// AmbulanceTracking.setZIndex(51);
// //map.addLayer(TestingCenters);

var layer12;





var markerLayerEmerg, markerLayerFun, markerLayerTour;


var Area = "";
function Check7() {
    fetch('http://localhost:8082/geoserver/DehradunGIS53/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS53%3Adehracityhospital&maxFeatures=50&outputFormat=application%2Fjson')
        .then(function (res) {
            res.text().then(function (data) {

                document.getElementById("ShowHospital").innerHTML = "";
                document.getElementById("TShow").innerHTML = "";
                var data = JSON.parse(data);
                document.getElementById(data);
                //var vasteras = data.features[i].geometry.coordinates;
                document.getElementById("ShowHospital").innerHTML += "<br>  Hospitals : <br>";
                console.log(Area);

                for (var i = 0; i < data.features.length; i++) {
                    if (arePointsNear(data.features[i].geometry.coordinates, COORDINATE, areaforaroundme)) {
                        console.log(data.features[i].properties.name);

                        markerLayerEmerg = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]))
                                    })
                                ]
                            })
                        });
                        map.addLayer(markerLayerEmerg);
                        //document.getElementById("ForHospital").innerHTML += data.features[i].properties.name + "<br>";

                        markerLayerEmerg.setZIndex(52);
                        var zoom = 18;
                        var center = [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]];
                        var Link = "http://localhost:3000/map.html#/center/" + center[0] + "," + center[1] + "/zoom/" + zoom;
                        document.getElementById("TShow").innerHTML += "<tr><td><div style='color:black;' onclick='ZoomHosp(" + center[0] + "," + center[1] + ")'>" + "->" + data.features[i].properties.name + "</div></td></tr>";

                    }

                }


            })
        })
}
function ZoomHosp(a, b) {
    console.log(a, b);
    view.animate({
        zoom: 18
    }, {
        center: ol.proj.fromLonLat([a, b]),
    })
}

//TOURIST ATTRACTION
function Check5() {
    fetch('http://localhost:8082/geoserver/DehradunGIS63/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS63%3Atouristforaroundme&maxFeatures=50&outputFormat=application%2Fjson')
        .then(function (res) {
            res.text().then(function (data) {
                document.getElementById("TourShow").innerHTML = "";
                document.getElementById("TouristShow").innerHTML = "";
                var data = JSON.parse(data);
                document.getElementById(data);
                //var vasteras = data.features[i].geometry.coordinates;
                document.getElementById("TouristShow").innerHTML += "<br>  TOURIST ENTERACTION : <br>";
                console.log(Area);
                for (var i = 0; i < data.features.length; i++) {
                    if (arePointsNear(data.features[i].geometry.coordinates, COORDINATE, areaforaroundme)) {
                        console.log(data.features[i].properties.name);
                        var markerLayerTour = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]))
                                    })
                                ]
                            })
                        });
                        map.addLayer(markerLayerTour);
                        markerLayerTour.setZIndex(52);
                        var zoom = 18;
                        var center = [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]];
                        var Link = "http://localhost:3000/map.html#/center/" + center[0] + "," + center[1] + "/zoom/" + zoom;

                        document.getElementById("TourShow").innerHTML += "<tr><td><div style='color:black;' onclick='ZoomHosp(" + center[0] + "," + center[1] + ")'>" + "->" + data.features[i].properties.name + "</div></td></tr>";
                        //document.getElementById("ForHospital").innerHTML += data.features[i].properties.name + "<br>";
                    }
                }
            })
        })
}
//FUN & ENTERTAINMENT
function Check6() {
    fetch('http://localhost:8082/geoserver/DehradunGIS64/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS64%3Afunandentainmentarountme&maxFeatures=50&outputFormat=application%2Fjson')
        .then(function (res) {
            res.text().then(function (data) {
                document.getElementById("FunShow").innerHTML = "";
                document.getElementById("FunEnterShow").innerHTML = "";
                var data = JSON.parse(data);
                document.getElementById(data);
                //var vasteras = data.features[i].geometry.coordinates;
                document.getElementById("FunEnterShow").innerHTML += "<br>  FUN & ENTERTAINMENT : <br>";
                console.log(Area);
                for (var i = 0; i < data.features.length; i++) {
                    if (arePointsNear(data.features[i].geometry.coordinates, COORDINATE, areaforaroundme)) {
                        console.log(data.features[i].properties.name);
                        var markerLayerFun = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]))
                                    })
                                ]
                            })
                        });
                        map.addLayer(markerLayerFun);
                        markerLayerFun.setZIndex(52);
                        var zoom = 18;
                        var center = [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]];
                        var Link = "http://localhost:3000/map.html#/center/" + center[0] + "," + center[1] + "/zoom/" + zoom;

                        /*document.getElementById("FunShow").innerHTML += "<tr><td><li><a style='color:black;' href='" + Link + "'>" + data.features[i].properties.name + "</a></li></td></tr>";*/
                        document.getElementById("FunShow").innerHTML += "<tr><td><div style='color:black;' onclick='ZoomHosp(" + center[0] + "," + center[1] + ")'>" + "->" + data.features[i].properties.name + "</div></td></tr>";

                        /*document.getElementById("ForHospital").innerHTML += data.features[i].properties.name + "<br>";*/
                    }
                }
            })
        })
}

//for area

function arePointsNear(checkPoint, centerPoint, km) {
    console.log(km);
    km = km / 1000;
    var ky = 45000 / 360;
    var kx = Math.cos(Math.PI * centerPoint[1] / 180.0) * ky;
    var dx = Math.abs(centerPoint[0] - checkPoint[0]) * kx;
    var dy = Math.abs(centerPoint[1] - checkPoint[1]) * ky;
    console.log(dx, dy, dx * dx + dy * dy);
    return Math.sqrt(dx * dx + dy * dy) <= km;
}






document.getElementById('AgraImg').addEventListener(
    'click',
    function () {
        if (document.getElementById('AgraImg').checked == true) {
            document.getElementById('dehra').checked = true;
            document.getElementById('Satellite').checked = true;
            document.getElementById('Basemap').checked = true;
            map.addLayer(satmap);
            map.addLayer(basemap);
            map.addLayer(l);
            return false;
        }
        else {
            document.getElementById('dehra').checked = false;
            document.getElementById('Satellite').checked = false;
            document.getElementById('Basemap').checked = false;
            map.removeLayer(satmap);
            map.removeLayer(basemap);
            map.removeLayer(l);
            return false;
        }
    },
    false
);
document.getElementById('dehra').addEventListener(
    'click',
    function () {
        if (document.getElementById('dehra').checked == true) {
            map.addLayer(basemap);;
            return false;
        }
        else {
            map.removeLayer(basemap);
            return false;
        }
    },
    false
);

document.getElementById('Satellite').addEventListener(
    'click',
    function () {
        if (document.getElementById('Satellite').checked == true) {
            map.addLayer(satmap);;
            return false;
        }
        else {
            map.removeLayer(satmap);
            return false;
        }
    },
    false
);

document.getElementById('Basemap').addEventListener(
    'click',
    function () {
        if (document.getElementById('Basemap').checked == true) {
            map.addLayer(l);
            return false;
        }
        else {
            map.removeLayer(l);
            return false;
        }
    },
    false
);
document.getElementById('AdminBound').addEventListener(
    'click',
    function () {
        if (document.getElementById('AdminBound').checked == true) {
            document.getElementById('MlaConsBound').checked = true;
            map.addLayer(l);;
            return false;
        }
        else {
            document.getElementById('MlaConsBound').checked = false;
            map.removeLayer(l);
            return false;
        }
    },
    false
);

document.getElementById('MlaConsBound').addEventListener(
    'click',
    function () {
        if (document.getElementById('MlaConsBound').checked == true) {
            map.addLayer(l);;
            return false;
        }
        else {
            map.removeLayer(l);
            return false;
        }
    },
    false
);

document.getElementById('WaterBodies').addEventListener(
    'click',
    function () {
        if (document.getElementById('WaterBodies').checked == true) {
            document.getElementById('a1').checked = true;
            document.getElementById('a2').checked = true;
            map.addLayer(Stategov);
            map.addLayer(Centralgov);

            return false;
        }
        else {
            document.getElementById('a1').checked = false;
            document.getElementById('a2').checked = false;
            map.removeLayer(Stategov);
            map.removeLayer(Centralgov);

            return false;
        }
    },
    false
);
document.getElementById('a1').addEventListener(
    'click',
    function () {
        if (document.getElementById('a1').checked == true) {
            map.addLayer(Stategov);
            ArrayLayer.push(Stategovsrc);
            return false;
        }
        else {
            map.removeLayer(Stategov);
            return false;
        }
    },
    false
);
document.getElementById('a2').addEventListener(
    'click',
    function () {
        if (document.getElementById('a2').checked == true) {
            map.addLayer(Centralgov);
            ArrayLayer.push(Centralgovsrc);
            return false;
        }
        else {
            map.removeLayer(Centralgov);
            return false;
        }
    },
    false
);
document.getElementById('Building').addEventListener(
    'click',
    function () {
        if (document.getElementById('Building').checked == true) {
            document.getElementById('b1').checked = true;
            document.getElementById('b2').checked = true;
            document.getElementById('b3').checked = true;

            map.addLayer(Drainage);
            map.addLayer(STWCatch);
            map.addLayer(STWpoint);
            return false;
        }
        else {
            document.getElementById('b1').checked = false;
            document.getElementById('b2').checked = false;
            document.getElementById('b3').checked = false;

            map.removeLayer(Drainage);
            map.removeLayer(STWCatch);
            map.removeLayer(STWpoint);
            return false;
        }
    },
    false
);

document.getElementById('b1').addEventListener(
    'click',
    function () {
        if (document.getElementById('b1').checked == true) {
            map.addLayer(Drainage);
            ArrayLayer.push(Drainagesrc);
            return false;
        }
        else {
            map.removeLayer(Drainage);
            return false;
        }
    },
    false
);
document.getElementById('b2').addEventListener(
    'click',
    function () {
        if (document.getElementById('b2').checked == true) {
            map.addLayer(STWCatch);
            ArrayLayer.push(STWCatchsrc);
            return false;
        }
        else {
            map.removeLayer(STWCatch);
            return false;
        }
    },
    false
);

document.getElementById('b3').addEventListener(
    'click',
    function () {
        if (document.getElementById('b3').checked == true) {
            map.addLayer(STWpoint);
            ArrayLayer.push(STWpointsrc);
            return false;
        }
        else {
            map.removeLayer(STWpoint);
            return false;
        }
    },
    false
);

document.getElementById('Railway').addEventListener(
    'click',
    function () {
        if (document.getElementById('Railway').checked == true) {
            document.getElementById('d1').checked = true;
            document.getElementById('d2').checked = true;
            document.getElementById('d3').checked = true;
            document.getElementById('d1').checked = true;

            map.addLayer(Farmhouse);;
            map.addLayer(Forest);;
            map.addLayer(GreenArea);;
            map.addLayer(Agriculture);;
            return false;
        }
        else {
            document.getElementById('d1').checked = false;
            document.getElementById('d2').checked = false;
            document.getElementById('d3').checked = false;
            document.getElementById('d1').checked = false;

            map.removeLayer(Farmhouse);
            map.removeLayer(Forest);
            map.removeLayer(GreenArea);
            map.removeLayer(Agriculture);
            return false;
        }
    },
    false
);


document.getElementById('d1').addEventListener(
    'click',
    function () {
        if (document.getElementById('d1').checked == true) {
            map.addLayer(Farmhouse);
            ArrayLayer.push(Farmhousesrc);
            return false;
        }
        else {
            map.removeLayer(Farmhouse);
            return false;
        }
    },
    false
);
document.getElementById('d2').addEventListener(
    'click',
    function () {
        if (document.getElementById('d2').checked == true) {
            map.addLayer(Forest);;
            ArrayLayer.push(Forestsrc);
            return false;
        }
        else {
            map.removeLayer(Forest);
            return false;
        }
    },
    false
);

document.getElementById('d3').addEventListener(
    'click',
    function () {
        if (document.getElementById('d3').checked == true) {
            map.addLayer(GreenArea);;
            ArrayLayer.push(GreenAreasrc);
            return false;
        }
        else {
            map.removeLayer(GreenArea);
            return false;
        }
    },
    false
);
document.getElementById('d4').addEventListener(
    'click',
    function () {
        if (document.getElementById('d4').checked == true) {
            map.addLayer(Agriculture);;
            ArrayLayer.push(Agriculturesrc);
            return false;
        }
        else {
            map.removeLayer(Agriculture);
            return false;
        }
    },
    false
);

document.getElementById('Sewerage').addEventListener(
    'click',
    function () {
        if (document.getElementById('Sewerage').checked == true) {
            document.getElementById('f1').checked = true;
            document.getElementById('f2').checked = true;
            document.getElementById('f3').checked = true;
            document.getElementById('f4').checked = true;
            document.getElementById('f5').checked = true;
            document.getElementById('f6').checked = true;

            map.addLayer(Parking);;
            map.addLayer(Petrolpump);;
            map.addLayer(Bridge);;
            map.addLayer(Trafficisland);;
            map.addLayer(Trafficjunction);;
            map.addLayer(Busdepot);;
            return false;
        }
        else {
            document.getElementById('f1').checked = false;
            document.getElementById('f2').checked = false;
            document.getElementById('f3').checked = false;
            document.getElementById('f4').checked = false;
            document.getElementById('f5').checked = false;
            document.getElementById('f6').checked = false;

            map.removeLayer(Parking);
            map.removeLayer(Petrolpump);
            map.removeLayer(Bridge);
            map.removeLayer(Trafficisland);
            map.removeLayer(Trafficjunction);
            map.removeLayer(Busdepot);
            return false;
        }
    },
    false
);

document.getElementById('f1').addEventListener(
    'click',
    function () {
        if (document.getElementById('f1').checked == true) {
            map.addLayer(Parking);;
            ArrayLayer.push(Parkingsrc);
            return false;
        }
        else {
            map.removeLayer(Parking);
            return false;
        }
    },
    false
);

document.getElementById('f2').addEventListener(
    'click',
    function () {
        if (document.getElementById('f2').checked == true) {
            map.addLayer(Petrolpump);;
            ArrayLayer.push(Petrolpumpsrc);
            return false;
        }
        else {
            map.removeLayer(Petrolpump);
            return false;
        }
    },
    false
); document.getElementById('f3').addEventListener(
    'click',
    function () {
        if (document.getElementById('f3').checked == true) {
            map.addLayer(Bridge);;
            ArrayLayer.push(Bridgesrc);
            return false;
        }
        else {
            map.removeLayer(Bridge);
            return false;
        }
    },
    false
); document.getElementById('f4').addEventListener(
    'click',
    function () {
        if (document.getElementById('f4').checked == true) {
            map.addLayer(Trafficisland);;
            ArrayLayer.push(Trafficislandsrc);
            return false;
        }
        else {
            map.removeLayer(Trafficisland);
            return false;
        }
    },
    false
); document.getElementById('f5').addEventListener(
    'click',
    function () {
        if (document.getElementById('f5').checked == true) {
            map.addLayer(Trafficjunction);;
            ArrayLayer.push(Trafficjunctionsrc);
            return false;
        }
        else {
            map.removeLayer(Trafficjunction);
            return false;
        }
    },
    false
); document.getElementById('f6').addEventListener(
    'click',
    function () {
        if (document.getElementById('f6').checked == true) {
            map.addLayer(Busdepot);;
            ArrayLayer.push(Busdepotsrc);
            return false;
        }
        else {
            map.removeLayer(Busdepot);
            return false;
        }
    },
    false
);
document.getElementById('WaterSupply').addEventListener(
    'click',
    function () {
        if (document.getElementById('WaterSupply').checked == true) {
            document.getElementById('g1').checked = true;
            document.getElementById('g2').checked = true;
            document.getElementById('g3').checked = true;

            map.addLayer(Banks);
            map.addLayer(Postoffice);
            map.addLayer(Atms);;
            return false;
        }
        else {
            document.getElementById('g1').checked = false;
            document.getElementById('g2').checked = false;
            document.getElementById('g3').checked = false;

            map.removeLayer(Banks);
            map.removeLayer(Postoffice);
            map.removeLayer(Atms);
            return false;
        }
    },
    false
);

document.getElementById('g1').addEventListener(
    'click',
    function () {
        if (document.getElementById('g1').checked == true) {
            map.addLayer(Banks);
            ArrayLayer.push(Bankssrc);
            return false;
        }
        else {
            map.removeLayer(Banks);
            return false;
        }
    },
    false
);
document.getElementById('g2').addEventListener(
    'click',
    function () {
        if (document.getElementById('g2').checked == true) {
            map.addLayer(Postoffice);
            ArrayLayer.push(Postofficesrc);
            return false;
        }
        else {
            map.removeLayer(Postoffice);
            return false;
        }
    },
    false
);
document.getElementById('g3').addEventListener(
    'click',
    function () {
        if (document.getElementById('g3').checked == true) {
            map.addLayer(Atms);
            ArrayLayer.push(ATMssrc);
            return false;
        }
        else {
            map.removeLayer(Atms);
            return false;
        }
    },
    false
);
document.getElementById('MedicalServices').addEventListener(
    'click',
    function () {
        if (document.getElementById('MedicalServices').checked == true) {
            document.getElementById('h1').checked = true;
            document.getElementById('h2').checked = true;
            document.getElementById('h3').checked = true;
            document.getElementById('h4').checked = true;
            document.getElementById('h5').checked = true;
            document.getElementById('h6').checked = true;

            map.addLayer(Wateroverheadtank);
            map.addLayer(Watertreatmentplant);
            map.addLayer(Wateroverheadtanklandmark);
            map.addLayer(Waterpipline);
            map.addLayer(Watersupplypoint);
            map.addLayer(Tubewell);
            return false;
        }
        else {
            document.getElementById('h1').checked = false;
            document.getElementById('h2').checked = false;
            document.getElementById('h3').checked = false;
            document.getElementById('h4').checked = false;
            document.getElementById('h5').checked = false;
            document.getElementById('h6').checked = false;

            map.removeLayer(Wateroverheadtank);
            map.removeLayer(Watertreatmentplant);
            map.removeLayer(Wateroverheadtanklandmark);
            map.removeLayer(Waterpipline);
            map.removeLayer(Watersupplypoint);
            map.removeLayer(Tubewell);
            return false;
        }
    },
    false
);
document.getElementById('h1').addEventListener(
    'click',
    function () {
        if (document.getElementById('h1').checked == true) {
            map.addLayer(Wateroverheadtank);
            ArrayLayer.push(Wateroverheadtanksrc);
            return false;
        }
        else {
            map.removeLayer(Wateroverheadtank);
            return false;
        }
    },
    false
);
document.getElementById('h2').addEventListener(
    'click',
    function () {
        if (document.getElementById('h2').checked == true) {
            map.addLayer(Watertreatmentplant);
            ArrayLayer.push(Watertreatmentplantsrc);
            return false;
        }
        else {
            map.removeLayer(Watertreatmentplant);
            return false;
        }
    },
    false
);
document.getElementById('h3').addEventListener(
    'click',
    function () {
        if (document.getElementById('h3').checked == true) {
            map.addLayer(Wateroverheadtanklandmark);
            ArrayLayer.push(Wateroverheadtanklandmarksrc);
            return false;
        }
        else {
            map.removeLayer(Wateroverheadtanklandmark);
            return false;
        }
    },
    false
);
document.getElementById('h4').addEventListener(
    'click',
    function () {
        if (document.getElementById('h4').checked == true) {
            map.addLayer(Waterpipline);
            ArrayLayer.push(Waterpiplinesrc);
            return false;
        }
        else {
            map.removeLayer(Waterpipline);
            return false;
        }
    },
    false
);
document.getElementById('h5').addEventListener(
    'click',
    function () {
        if (document.getElementById('h5').checked == true) {
            map.addLayer(Watersupplypoint);
            ArrayLayer.push(Watersupplypointsrc);
            return false;
        }
        else {
            map.removeLayer(Watersupplypoint);
            return false;
        }
    },
    false
);
document.getElementById('h6').addEventListener(
    'click',
    function () {
        if (document.getElementById('h6').checked == true) {
            map.addLayer(Tubewell);
            ArrayLayer.push(Tubewellsrc);
            return false;
        }
        else {
            map.removeLayer(Tubewell);
            return false;
        }
    },
    false
);
document.getElementById('Recreation').addEventListener(
    'click',
    function () {
        if (document.getElementById('Recreation').checked == true) {
            document.getElementById('k1').checked = true;
            map.addLayer(Street);
            ArrayLayer.push(Streetsrc);
            return false;
        }
        else {
            document.getElementById('k1').checked = false;

            map.removeLayer(Street);
            return false;
        }
    },
    false
);
document.getElementById('k1').addEventListener(
    'click',
    function () {
        if (document.getElementById('k1').checked == true) {
            map.addLayer(Street);
            ArrayLayer.push(Streetsrc);
            return false;
        }
        else {
            map.removeLayer(Street);
            return false;
        }
    },
    false
);
document.getElementById('ReligiousPlaces').addEventListener(
    'click',
    function () {
        if (document.getElementById('ReligiousPlaces').checked == true) {
            document.getElementById('l1').checked = true;
            document.getElementById('l2').checked = true;

            map.addLayer(Communitytoilet);
            map.addLayer(Publictoilets);
            return false;
        }
        else {
            document.getElementById('l1').checked = false;
            document.getElementById('l2').checked = false;

            map.removeLayer(Communitytoilet);
            map.removeLayer(Publictoilets);
            return false;
        }
    },
    false
);

document.getElementById('l1').addEventListener(
    'click',
    function () {
        if (document.getElementById('l1').checked == true) {
            map.addLayer(Communitytoilet);
            ArrayLayer.push(Communitytoiletsrc);
            return false;
        }
        else {
            map.removeLayer(Communitytoilet);
            return false;
        }
    },
    false
);

document.getElementById('l2').addEventListener(
    'click',
    function () {
        if (document.getElementById('l2').checked == true) {
            map.addLayer(Publictoilets);
            ArrayLayer.push(Publictoiletssrc);
            return false;
        }
        else {
            map.removeLayer(Publictoilets);
            return false;
        }
    },
    false
);
document.getElementById('EducationalServices').addEventListener(
    'click',
    function () {
        if (document.getElementById('EducationalServices').checked == true) {
            document.getElementById('m1').checked = true;

            map.addLayer(Railline);
            ArrayLayer.push(Raillinesrc);
            return false;
        }
        else {
            document.getElementById('m1').checked = false;

            map.removeLayer(Railline);
            return false;
        }
    },
    false
);
document.getElementById('m1').addEventListener(
    'click',
    function () {
        if (document.getElementById('m1').checked == true) {
            map.addLayer(Railline);
            ArrayLayer.push(Raillinesrc);
            return false;
        }
        else {
            map.removeLayer(Railline);
            return false;
        }
    },
    false
);
document.getElementById('BankingandPostalServices').addEventListener(
    'click',
    function () {
        if (document.getElementById('BankingandPostalServices').checked == true) {
            document.getElementById('n1').checked = true;
            document.getElementById('n2').checked = true;
            document.getElementById('n3').checked = true;

            map.addLayer(Firestation);
            map.addLayer(Policestations);
            map.addLayer(Policechowki);
            return false;
        }
        else {
            document.getElementById('n1').checked = false;
            document.getElementById('n2').checked = false;
            document.getElementById('n3').checked = false;

            map.removeLayer(Firestation);
            map.removeLayer(Policestations);
            map.removeLayer(Policechowki);
            return false;
        }
    },
    false
);
document.getElementById('n1').addEventListener(
    'click',
    function () {
        if (document.getElementById('n1').checked == true) {
            map.addLayer(Firestation);
            ArrayLayer.push(Firestationsrc);
            return false;
        }
        else {
            map.removeLayer(Firestation);
            return false;
        }
    },
    false
);
document.getElementById('n2').addEventListener(
    'click',
    function () {
        if (document.getElementById('n2').checked == true) {
            map.addLayer(Policestations);
            ArrayLayer.push(Policestationssrc);
            return false;
        }
        else {
            map.removeLayer(Policestations);
            return false;
        }
    },
    false
);
document.getElementById('n3').addEventListener(
    'click',
    function () {
        if (document.getElementById('n3').checked == true) {
            map.addLayer(Policechowki);
            ArrayLayer.push(Policechowkisrc);
            return false;
        }
        else {
            map.removeLayer(Policechowki);
            return false;
        }
    },
    false
);
document.getElementById('FireAndEmergency').addEventListener(
    'click',
    function () {
        if (document.getElementById('FireAndEmergency').checked == true) {
            document.getElementById('o1').checked = true;

            map.addLayer(Primaryschool);
            ArrayLayer.push(Primaryschoolsrc);
            return false;
        }
        else {
            document.getElementById('o1').checked = false;

            map.removeLayer(Primaryschool);
            return false;
        }
    },
    false
);
document.getElementById('o1').addEventListener(
    'click',
    function () {
        if (document.getElementById('o1').checked == true) {
            map.addLayer(Primaryschool);
            ArrayLayer.push(Primaryschoolsrc);
            return false;
        }
        else {
            map.removeLayer(Primaryschool);
            return false;
        }
    },
    false
);
document.getElementById('EstateManagement').addEventListener(
    'click',
    function () {
        if (document.getElementById('EstateManagement').checked == true) {
            document.getElementById('p1').checked = true;
            document.getElementById('p2').checked = true;

            map.addLayer(SWMcontainer);
            map.addLayer(SWMtransfer);
            return false;
        }
        else {
            document.getElementById('p1').checked = false;
            document.getElementById('p2').checked = false;

            map.removeLayer(SWMcontainer);
            map.removeLayer(SWMtransfer);
            return false;
        }
    },
    false
);
document.getElementById('p1').addEventListener(
    'click',
    function () {
        if (document.getElementById('p1').checked == true) {
            map.addLayer(SWMcontainer);
            ArrayLayer.push(SWMcontainersrc);
            return false;
        }
        else {
            map.removeLayer(SWMcontainer);
            return false;
        }
    },
    false
);
document.getElementById('p2').addEventListener(
    'click',
    function () {
        if (document.getElementById('p2').checked == true) {
            map.addLayer(SWMtransfer);
            ArrayLayer.push(SWMtransfersrc);
            return false;
        }
        else {
            map.removeLayer(SWMtransfer);
            return false;
        }
    },
    false
);
document.getElementById('AdvertisementAndHordings').addEventListener(
    'click',
    function () {
        if (document.getElementById('AdvertisementAndHordings').checked == true) {
            document.getElementById('q1').checked = true;
            document.getElementById('q2').checked = true;
            document.getElementById('q3').checked = true;
            document.getElementById('q4').checked = true;
            document.getElementById('q5').checked = true;
            document.getElementById('q6').checked = true;
            document.getElementById('q7').checked = true;

            map.addLayer(Bloodbank);
            map.addLayer(Clinics);
            map.addLayer(Homeopathic);
            map.addLayer(Hospitals);
            map.addLayer(Medicalstore);
            map.addLayer(Surgicalshop);
            map.addLayer(Veterinary);
            return false;
        }
        else {
            document.getElementById('q1').checked = false;
            document.getElementById('q2').checked = false;
            document.getElementById('q3').checked = false;
            document.getElementById('q4').checked = false;
            document.getElementById('q5').checked = false;
            document.getElementById('q6').checked = false;
            document.getElementById('q7').checked = false;

            map.removeLayer(Bloodbank);
            map.removeLayer(Clinics);
            map.removeLayer(Homeopathic);
            map.removeLayer(Hospitals);
            map.removeLayer(Medicalstore);
            map.removeLayer(Surgicalshop);
            map.removeLayer(Veterinary);
            return false;
        }
    },
    false
);
document.getElementById('q1').addEventListener(
    'click',
    function () {
        if (document.getElementById('q1').checked == true) {
            map.addLayer(Bloodbank);
            ArrayLayer.push(BloodBanksrc);
            return false;
        }
        else {
            map.removeLayer(Bloodbank);
            return false;
        }
    },
    false
);
document.getElementById('q2').addEventListener(
    'click',
    function () {
        if (document.getElementById('q2').checked == true) {
            map.addLayer(Clinics);
            ArrayLayer.push(Clinicssrc);
            return false;
        }
        else {
            map.removeLayer(Clinics);
            return false;
        }
    },
    false
);
document.getElementById('q3').addEventListener(
    'click',
    function () {
        if (document.getElementById('q3').checked == true) {
            map.addLayer(Homeopathic);
            ArrayLayer.push(Homeopathicsrc);
            return false;
        }
        else {
            map.removeLayer(Homeopathic);
            return false;
        }
    },
    false
);
document.getElementById('q4').addEventListener(
    'click',
    function () {
        if (document.getElementById('q4').checked == true) {
            map.addLayer(Hospitals);
            ArrayLayer.push(Homeopathicsrc);
            return false;
        }
        else {
            map.removeLayer(Hospitals);
            return false;
        }
    },
    false
);
document.getElementById('q5').addEventListener(
    'click',
    function () {
        if (document.getElementById('q5').checked == true) {
            map.addLayer(Medicalstore);
            ArrayLayer.push(MedicalStoresrc);
            return false;
        }
        else {
            map.removeLayer(Medicalstore);
            return false;
        }
    },
    false
);
document.getElementById('q6').addEventListener(
    'click',
    function () {
        if (document.getElementById('q6').checked == true) {
            map.addLayer(Surgicalshop);
            ArrayLayer.push(Surgicalshopsrc);
            return false;
        }
        else {
            map.removeLayer(Surgicalshop);
            return false;
        }
    },
    false
);
document.getElementById('q7').addEventListener(
    'click',
    function () {
        if (document.getElementById('q7').checked == true) {
            map.addLayer(Veterinary);
            ArrayLayer.push(Veterinarysrc);
            return false;
        }
        else {
            map.removeLayer(Veterinary);
            return false;
        }
    },
    false
);
document.getElementById('DevelopmentPlan').addEventListener(
    'click',
    function () {
        if (document.getElementById('DevelopmentPlan').checked == true) {
            document.getElementById('r1').checked = true;
            document.getElementById('r2').checked = true;
            document.getElementById('r3').checked = true;
            document.getElementById('r4').checked = true;
            document.getElementById('r5').checked = true;

            map.addLayer(Areabaseddevlopment);
            map.addLayer(Areaward);
            map.addLayer(Abdconnectivitydrain);
            map.addLayer(Abdgrbuilding);
            map.addLayer(Abdmddapark);
            return false;
        }
        else {
            document.getElementById('r1').checked = false;
            document.getElementById('r2').checked = false;
            document.getElementById('r3').checked = false;
            document.getElementById('r4').checked = false;
            document.getElementById('r5').checked = false;

            map.removeLayer(Areabaseddevlopment);
            map.removeLayer(Areaward);
            map.removeLayer(Abdconnectivitydrain);
            map.removeLayer(Abdgrbuilding);
            map.removeLayer(Abdmddapark);
            return false;
        }
    },
    false
);
document.getElementById('r1').addEventListener(
    'click',
    function () {
        if (document.getElementById('r1').checked == true) {
            map.addLayer(Areabaseddevlopment);
            ArrayLayer.push(Areabaseddevlopmentsrc);
            return false;
        }
        else {
            map.removeLayer(Areabaseddevlopment);
            return false;
        }
    },
    false
);
document.getElementById('r2').addEventListener(
    'click',
    function () {
        if (document.getElementById('r2').checked == true) {
            map.addLayer(Areaward);
            ArrayLayer.push(Areawardsrc);
            return false;
        }
        else {
            map.removeLayer(Areaward);
            return false;
        }
    },
    false
);
document.getElementById('r3').addEventListener(
    'click',
    function () {
        if (document.getElementById('r3').checked == true) {
            map.addLayer(Abdconnectivitydrain);
            ArrayLayer.push(Abdconnectivitydrainsrc);
            return false;
        }
        else {
            map.removeLayer(Abdconnectivitydrain);
            return false;
        }
    },
    false
);
document.getElementById('r4').addEventListener(
    'click',
    function () {
        if (document.getElementById('r4').checked == true) {
            map.addLayer(Abdgrbuilding);
            ArrayLayer.push(Abdgrbuildingsrc);
            return false;
        }
        else {
            map.removeLayer(Abdgrbuilding);
            return false;
        }
    },
    false
);
document.getElementById('r5').addEventListener(
    'click',
    function () {
        if (document.getElementById('r5').checked == true) {
            map.addLayer(Abdmddapark);
            ArrayLayer.push(Abdmddaparksrc);
            return false;
        }
        else {
            map.removeLayer(Abdmddapark);
            return false;
        }
    },
    false
);
document.getElementById('Solid').addEventListener(
    'click',
    function () {
        if (document.getElementById('Solid').checked == true) {
            document.getElementById('s1').checked = true;

            map.addLayer(Isolationward);
            ArrayLayer.push(Isolationwardsrc);
            return false;
        }
        else {
            document.getElementById('s1').checked = false;

            map.removeLayer(Isolationward);
            return false;
        }
    },
    false
);
document.getElementById('s1').addEventListener(
    'click',
    function () {
        if (document.getElementById('s1').checked == true) {
            map.addLayer(Isolationward);
            ArrayLayer.push(Isolationwardsrc);
            return false;
        }
        else {
            map.removeLayer(Isolationward);
            return false;
        }
    },
    false
);
document.getElementById('Green').addEventListener(
    'click',
    function () {
        if (document.getElementById('Green').checked == true) {
            document.getElementById('t1').checked = true;

            map.addLayer(Othereducation);
            ArrayLayer.push(Othereducationsrc);
            return false;
        }
        else {
            document.getElementById('t1').checked = false;

            map.removeLayer(Othereducation);
            return false;
        }
    },
    false
);
document.getElementById('t1').addEventListener(
    'click',
    function () {
        if (document.getElementById('t1').checked == true) {
            map.addLayer(Othereducation);
            ArrayLayer.push(Othereducationsrc);
            return false;
        }
        else {
            map.removeLayer(Othereducation);
            return false;
        }
    },
    false
);
document.getElementById('RoadandTrafficSystems').addEventListener(
    'click',
    function () {
        if (document.getElementById('RoadandTrafficSystems').checked == true) {
            document.getElementById('u1').checked = true;
            document.getElementById('u2').checked = true;

            map.addLayer(Tubewell_last);
            map.addLayer(Reservoir);
            return false;
        }
        else {
            document.getElementById('u1').checked = false;
            document.getElementById('u2').checked = false;

            map.removeLayer(Tubewell_last);
            map.removeLayer(Reservoir);
            return false;
        }
    },
    false
);
document.getElementById('u1').addEventListener(
    'click',
    function () {
        if (document.getElementById('u1').checked == true) {
            map.addLayer(Tubewell_last);
            ArrayLayer.push(Tubewell_lastsrc);

            return false;
        }
        else {
            map.removeLayer(Tubewell_last);

            return false;
        }
    },
    false
); document.getElementById('u2').addEventListener(
    'click',
    function () {
        if (document.getElementById('u2').checked == true) {
            map.addLayer(Reservoir);
            ArrayLayer.push(Reservoirsrc);
            return false;
        }
        else {
            map.removeLayer(Reservoir);

            return false;
        }
    },
    false
);

var b = 0, areaforaroundme;
var COORDINATE;
document.getElementById('go1').addEventListener(
    'click',
    function () {
        map.on("click", function (e) {
            map.removeLayer(layer12);
            areaforaroundme = parseInt(document.getElementById("areaforaroundme").value);
            var resolution = map.getView().getResolution();
            var cor = e.coordinate;
            COORDINATE = ol.proj.toLonLat(cor);
            var meters2degress = function (x, y) {
                var lon = x * 180 / 20037508.34;
                var lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
                return [lon, lat]
            }
            // console.log(url);
            // if (url) {
            //   $.getJSON(url, function (data) {
            //     var len = Object.keys(data.Feature[0].properties).length;
            //     console.log(len);
            //   })
            // }
            // Circle

            var cordinates = meters2degress(cor[0], cor[1]);
            var longitude = cordinates[0], latitude = cordinates[1];
            console.log(longitude + " " + latitude);
            var centerLongitudeLatitude = ol.proj.fromLonLat([longitude, latitude]);
            layer12 = new ol.layer.Vector({
                source: new ol.source.Vector({
                    projection: 'EPSG:4326',
                    features: [new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, areaforaroundme))]
                }),
                style: [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 2
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(0, 0, 255, 0.1)'
                        })
                    })
                ]
            });
            map.addLayer(layer12);
            if (document.getElementById("EmergencyServices").checked == true) {
                Check7();
            }
            else if (document.getElementById("TouristAttraction").checked == true) {
                Check5();
            }
            else if (document.getElementById("FunEntertainment").checked == true) {
                Check6();
            }

        });

        // alert("Please Click on Map to Identify/Point Your Location");
        // map.addLayer(basemap);
        //map.addLayer(ForPoints);

    },
    false
);
document.getElementById('go').addEventListener(
    'click',
    function () {
        document.getElementById("ForHospital").innerHTML = "";
        document.getElementById("ShowHospital").innerHTML = "";
        document.getElementById("TShow").innerHTML = "";
        document.getElementById("TouristShow").innerHTML = "";
        document.getElementById("TourShow").innerHTML = "";
        document.getElementById("areaforaroundme").innerHTML = "";
        document.getElementById("FunEnterShow").innerHTML = "";
        document.getElementById("FunShow").innerHTML = "";
        document.getElementById("EmergencyServices").checked = false;
        document.getElementById("TouristAttraction").checked = false;
        document.getElementById("FunEntertainment").checked = false;

        var layerArray, len, layer1;
        layerArray = map.getLayers().getArray();
        len = layerArray.length;
        while (len > 0) {
            layer1 = layerArray[len - 1];
            map.removeLayer(layer1);
            len = layerArray.length;
        }

        map.addLayer(basemap);
        map.addLayer(l);
        // map.removeLayer(markerLayerEmerg);
        // map.removeLayer(markerLayerEmerg);
        // window.location.reload();
        return false;

    },
    false
);





// function formap() {
//     map.on('click', function (e) {
//         var p = new Promise((resolve, reject) => {
//             console.log("HI");
//             var coord = e.coordinate;
//             coord = toLonLat(coord);
//             fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coord[0] + '&lat=' + coord[1])
//                 .then(function (response) {
//                     return response.json();
//                 }).then(function (json) {
//                     var AreaSplit = json.address.suburb;
//                     console.log(json.address);
//                     if (json.address.residential) {
//                         AreaSplit = json.address.residential;
//                     } else if (json.address.suburb) {
//                         AreaSplit = json.address.suburb;
//                     } else if (json.address.village) {
//                         AreaSplit = json.address.village;
//                     } else if (json.address.city) {
//                         AreaSplit = json.address.city;
//                     } else if (json.address.town) {
//                         AreaSplit = json.address.town;
//                     } else if (json.address.county) {
//                         AreaSplit = json.address.county;
//                     }
//                     // CoordinateDataInfo.innerHTML = '<p>' + AreaSplit + '</p>';
//                     resolve(AreaSplit);
//                 });
//         });
//         if (document.getElementById("EmergencyServices").checked == true) {
//             p.then((Area) => Check(Area))
//         }
//         else if (document.getElementById("TouristAttraction").checked == true) {
//             p.then((Area) => Check5(Area))
//         }
//         else if (document.getElementById("FunEntertainment").checked == true) {
//             p.then((Area) => Check6(Area))
//         }
//     })

// }


//Landmark
document.getElementById("LandmarksGo").addEventListener('click', function () {
    var AreaSelect = document.getElementById("AreaSelect").value;
    if (document.getElementById("ATM").checked == true) {
        Check1(AreaSelect);
        document.getElementById("LandShow").innerHTML = "";

        function Check1(Area) {
            fetch('http://localhost:8082/geoserver/DehradunGIS60/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS60%3Aatmsforlandmark&maxFeatures=50&outputFormat=application%2Fjson')
                .then(function (res) {
                    res.text().then(function (data) {
                        document.getElementById("LandShow").innerHTML = "";
                        var data = JSON.parse(data);
                        document.getElementById(data);
                        document.getElementById("LandShow").innerHTML += "<br>" + Area + "  ATM : <br>";
                        for (var i = 0; i < data.features.length; i++) {
                            //console.log(data.features[i].properties.name);
                            //console.log(data.features[i].properties.area);
                            if (data.features[i].properties.area == Area) {
                                console.log(data.features[i].properties.name);
                                //console.log(data.features[i].properties.area);
                                document.getElementById("LandShow").innerHTML += "<li>" + data.features[i].properties.name + "</li>";
                            }
                        }
                    })
                })
        }
    }
    if (document.getElementById("Bank").checked == true) {
        Check2(AreaSelect);
        document.getElementById("LandShow").innerHTML = "";

        function Check2(Area) {
            fetch('http://localhost:8082/geoserver/DehradunGIS61/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS61%3Abankforlandmark&maxFeatures=50&outputFormat=application%2Fjson')
                .then(function (res) {
                    res.text().then(function (data) {
                        document.getElementById("LandShow").innerHTML = "";
                        var data = JSON.parse(data);
                        document.getElementById(data);
                        document.getElementById("LandShow").innerHTML += "<br>" + Area + "  Bank : <br>";
                        for (var i = 0; i < data.features.length; i++) {
                            //console.log(data.features[i].properties.name);
                            //console.log(data.features[i].properties.area);
                            if (data.features[i].properties.area == Area) {
                                console.log(data.features[i].properties.name);
                                //console.log(data.features[i].properties.area);
                                document.getElementById("LandShow").innerHTML += "<li>" + data.features[i].properties.name + "</li>";
                            }
                        }
                    })
                })
        }
    }
    if (document.getElementById("Hospital").checked == true) {
        Check3(AreaSelect);
        document.getElementById("LandShow").innerHTML = "";

        function Check3(Area) {
            fetch('http://localhost:8082/geoserver/DehradunGIS53/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS53%3Adehracityhospital&maxFeatures=50&outputFormat=application%2Fjson')
                .then(function (res) {
                    res.text().then(function (data) {
                        document.getElementById("LandShow").innerHTML = "";
                        var data = JSON.parse(data);
                        document.getElementById(data);
                        document.getElementById("LandShow").innerHTML += "<br>" + Area + "  Hospitals : <br>";
                        for (var i = 0; i < data.features.length; i++) {
                            //console.log(data.features[i].properties.name);
                            //console.log(data.features[i].properties.area);
                            if (data.features[i].properties.area == Area) {
                                console.log(data.features[i].properties.name);
                                //console.log(data.features[i].properties.area);
                                document.getElementById("LandShow").innerHTML += "<li>" + data.features[i].properties.name + "</li>";
                            }
                        }
                    })
                })
        }
    }
    if (document.getElementById("BloodBank").checked == true) {
        Check4(AreaSelect);
        document.getElementById("LandShow").innerHTML = "";

        function Check4(Area) {
            fetch('http://localhost:8082/geoserver/DehradunGIS62/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS62%3Apschoollandmark&maxFeatures=50&outputFormat=application%2Fjson')
                .then(function (res) {
                    res.text().then(function (data) {
                        document.getElementById("LandShow").innerHTML = "";
                        var data = JSON.parse(data);
                        document.getElementById(data);
                        document.getElementById("LandShow").innerHTML += "<br>" + Area + "  Primary School : <br>";
                        for (var i = 0; i < data.features.length; i++) {
                            //console.log(data.features[i].properties.name);
                            //console.log(data.features[i].properties.area);
                            if (data.features[i].properties.area == Area) {
                                console.log(data.features[i].properties.name);
                                //console.log(data.features[i].properties.area);
                                document.getElementById("LandShow").innerHTML += "<li>" + data.features[i].properties.name + "</li>";
                            }
                        }
                    })
                })
        }
    }
});

// document.getElementById('analytics').addEventListener(
//     'click',
//     function () {
//         var dialog5 = document.getElementById('analytics1');
//         dialog5.show();
//             return false;
//         }
//         else {
//             map.removeLayer(Stategov);
//             return false;
//         }
//     },
//     false
// );




// document.getElementById('currentlocation').addEventListener('click', function() {

//     var geolocation = new Geolocation({
//         // enableHighAccuracy must be set to true to have the heading value.
//         trackingOptions: {
//             enableHighAccuracy: true,
//         },
//         projection: view.getProjection(),
//     });

//     function el(id) {
//         return document.getElementById(id);
//     }

//     el('currentlocation').addEventListener('change', function() {
//         geolocation.setTracking(this.checked);
//     });

//     // update the HTML page when the position changes.
//     geolocation.on('change', function() {
//         el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
//         el('altitude').innerText = geolocation.getAltitude() + ' [m]';
//         el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
//         el('heading').innerText = geolocation.getHeading() + ' [rad]';
//         el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
//     });

//     // handle geolocation error.
//     geolocation.on('error', function(error) {
//         var info = document.getElementById('info');
//         info.innerHTML = error.message;
//         info.style.display = '';
//     });

//     var accuracyFeature = new Feature();
//     geolocation.on('change:accuracyGeometry', function() {
//         accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
//     });

//     var positionFeature = new Feature();
//     positionFeature.setStyle(
//         new Style({
//             image: new CircleStyle({
//                 radius: 6,
//                 fill: new Fill({
//                     color: '#3399CC',
//                 }),
//                 stroke: new Stroke({
//                     color: '#fff',
//                     width: 2,
//                 }),
//             }),
//         })
//     );

//     geolocation.on('change:position', function() {
//         var coordinates = geolocation.getPosition();
//         positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
//     });

//     new VectorLayer({
//         map: map,
//         source: new VectorSource({
//             features: [accuracyFeature, positionFeature],
//         }),
//     });

// }, false);


// navigator.geolocation.watchPosition(function(pos) {
//     const coords = [pos.coords.longitude, pos.coords.latitude];
//     const accuracy = circular(coords, pos.coords.accuracy);
//     source.clear(true);
//     source.addFeatures([
//       new Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())),
//       new Feature(new Point(fromLonLat(coords)))
//     ]);
//   }, function(error) {
//     alert(`ERROR: ${error.message}`);
//   }, {
//     enableHighAccuracy: true
//   });

//   const locate = document.createElement('div');
// locate.className = 'ol-control ol-unselectable locate';
// locate.innerHTML = '<button title="Locate me">◎</button>';
// locate.addEventListener('click', function() {
//   if (!source.isEmpty()) {
//     map.getView().fit(source.getExtent(), {
//       maxZoom: 18,
//       duration: 500
//     });
//   }
// });
// map.addControl(new Control({
//   element: locate
// }));



// document.getElementById('emergency').addEventListener(
//     'click',
//     function () {

//         // alert("Please Click on Map to Identify/Point Your Location");
//         // map.addLayer(basemap);
//         map.addLayer(ForPoints);
//         formap();
// },
//   false
//   );


var panID = false;
document.getElementById('PAN').addEventListener(
    'click',
    function () {
        if (panID) {
            document.getElementById("map").style.cursor = "auto";
            panID = false;
        }
        else {
            document.getElementById("map").style.cursor = "grab";
            panID = true;
        }
    },
    false
);
//ol.hashed.sync(map, { animate: false });
//ol.hashed.sync(map, { animate: { duration: 500 } });
//const unregister = ol.hashed.sync(map);

// later, if you want the map to no longer by synchronized
//unregister();
//ol-hashed.sync(map);
//ol.interaction.UndoRedo();
//Advance Search v2
var int, advanceLayer, adlayer;
function advance() {
    adlayer = localStorage.getItem("advance");
    if (adlayer == 'BusDepot') {
        advanceLayer = Busdepot;
    }
    else if (adlayer == 'FarmHouse') {
        advanceLayer = Farmhouse;
    }
    else if (adlayer == 'Parking') {
        advanceLayer = Parking;
    }
    else if (adlayer == 'PostOffice') {
        advanceLayer = Postoffice;
    }
    else if (adlayer == 'Banks') {
        advanceLayer = Banks;
    }
    //var v = Object.values(data);
    //var k = Object.keys(data);
    //console.log(k);
    //console.log(v);
    //var KEY = Object.keys(v[0]);
    //var str = "";
    var forint = 0;
    int = setInterval(() => {
        if (forint == 0) {
            map.addLayer(advanceLayer);
            forint = 1;
        } else {
            map.removeLayer(advanceLayer);
            forint = 0;
        }
    }, 1000);
    //v = JSON.stringify(v);
    //console.log(JSON.stringify(KEY));
    //for (var i = 0; i < v.length; i++) {
    //    var W = v[i];
    //    str += "<tr>";
    //    for (var j = 0; j < KEY.length - 1; j++) {
    //        console.log(W[KEY[j]]);
    //        str += "<td>" + W[KEY[j]] + "</td>";
    //    }
    //    str += "</tr>";
    //}

    //document.getElementById("AdvanceSearchShowTable").innerHTML = str;


}



//Advance Search
//var int, advanceLayer, adlayer;
//document.getElementById("ShowResult").addEventListener("click", function () {
//    adlayer = LayerName.layername;
//    if (adlayer == 'busdepot') {
//        advanceLayer = Busdepot;
//    }
//    else if (adlayer == 'bankforlandmark') {
//        advanceLayer = Banks;
//    }
//    else if (adlayer == 'parking') {
//        advanceLayer = Parking;
//    }
//    else if (adlayer == 'medicalstore') {
//        advanceLayer = Medicalstore;
//    }
//    var v = Object.values(data);
//    var k = Object.keys(data);
//    console.log(k);
//    console.log(v);
//    var KEY = Object.keys(v[0]);
//    var str = "";
//    var forint = 0;
//    int = setInterval(() => {
//        if (forint == 0) {
//            map.addLayer(advanceLayer);
//            forint = 1;
//        } else {
//            map.removeLayer(advanceLayer);
//            forint = 0;
//        }
//    }, 1000);
//    //v = JSON.stringify(v);
//    console.log(JSON.stringify(KEY));
//    for (var i = 0; i < v.length; i++) {
//        var W = v[i];
//        str += "<tr>";
//        for (var j = 0; j < KEY.length - 1; j++) {
//            console.log(W[KEY[j]]);
//            str += "<td>" + W[KEY[j]] + "</td>";
//        }
//        str += "</tr>";
//    }

//    document.getElementById("AdvanceSearchShowTable").innerHTML = str;

//    // document.getElementById("AdvanceSearchShow").innerHTML = JSON.stringify(data);
//})

////Predefined Quries
////Advance Search
//document.getElementById("ShowResult1").addEventListener("click", function () {
//    var v = Object.values(data);
//    var k = Object.keys(data);
//    console.log(k);
//    console.log(v);
//    var KEY = Object.keys(v[0]);
//    var str = "";
//    //v = JSON.stringify(v);
//    console.log(JSON.stringify(KEY));
//    for (var i = 0; i < v.length; i++) {
//        var W = v[i];
//        str += "<tr>";
//        for (var j = 0; j < KEY.length - 1; j++) {
//            console.log(W[KEY[j]]);
//            str += "<td>" + W[KEY[j]] + "</td>";
//        }
//        str += "</tr>";
//    }
//    document.getElementById("AdvanceSearchShowTable1").innerHTML = str;

//    // document.getElementById("AdvanceSearchShow").innerHTML = JSON.stringify(data);
//})




// var City = "";
// map.on('click', function(e) {
//     var p = new Promise((resolve, reject) => {
//         var res = map.getView().getResolution();
//         var coord = e.coordinate;
//         var projection = map.getView().getProjection();
//         var url = l1.getFeatureInfoUrl(coord, res, projection, { 'INFO_FORMAT': 'application/json' });
//         if (url) {
//             $.getJSON(url, function(data) {
//                 var k = Object.keys(data.features[0].properties);
//                 var v = Object.values(data.features[0].properties);
//                 console.log(k);
//                 console.log(v);
//                 //console.log(v[1]);
//                 City = v[6];
//                 console.log(City);
//                 resolve();
//             })
//         }
//         //Check();
//     });
//     p.then(() => Check())
// })
// var Area = "";
// function Check(Area) {
//     fetch('http://localhost:8082/geoserver/macro_provinces53/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=macro_provinces53%3Ahospitalall&maxFeatures=50&outputFormat=application%2Fjson')
//         .then(function (res) {
//             res.text().then(function (data) {
//                 document.getElementById("ForHospital").innerHTML = "";
//                 var data = JSON.parse(data);
//                 document.getElementById("ForHospital").innerHTML += "<br>" + Area + "  Hospitals : <br>";
//                 for (var i = 0; i < data.features.length; i++) {
//                     if (data.features[i].properties.area == Area) {
//                         console.log(data.features[i].properties.name);
//                         document.getElementById("ForHospital").innerHTML += data.features[i].properties.name + "<br>";
//                     }
//                 }
//             })
//         })
// }

function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344

        return dist;
    }
}


var locationLine, locationLinecount;
var prevLongitude, prevLatitude;

var locfrom = document.getElementById('locfrom');
locfrom.addEventListener(
    'click',
    function () {
        locationLine = true;
        locationLinecount = 1;
        map.on('click', function (e) {
            var cd = e.coordinate;
            cd = ol.proj.toLonLat(cd);
            if (locationLine == true) {
                if (locationLinecount == 1) {
                    prevLongitude = cd[0];
                    prevLatitude = cd[1];
                    var markerLayer3 = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [
                                new ol.Feature({
                                    geometry: new ol.geom.Point(ol.proj.fromLonLat([cd[0], cd[1]]))
                                })
                            ]
                        })
                    });
                    map.addLayer(markerLayer3);
                    locationLinecount++;
                } else if (locationLinecount == 2) {
                    var markerLayer3 = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [
                                new ol.Feature({
                                    geometry: new ol.geom.Point(ol.proj.fromLonLat([cd[0], cd[1]]))
                                })
                            ]
                        })
                    });
                    map.addLayer(markerLayer3);

                    var lonlatnew = ol.proj.fromLonLat([prevLongitude, prevLatitude]);
                    var location2new = ol.proj.fromLonLat([cd[0], cd[1]]);
                    var linieStyle3 = [
                        new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: '#d12710',
                                width: 3,
                            }),
                            text: new ol.style.Text({
                                text: "KM : " + parseInt(distance(prevLongitude, prevLatitude, cd[0], cd[1])),
                                scale: 2,
                                fill: new ol.style.Fill({
                                    color: '#black',
                                })
                            })
                        })
                    ];
                    //create the line       
                    var linie3 = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [new ol.Feature({
                                geometry: new ol.geom.LineString([lonlatnew, location2new]),
                                name: 'Line',
                            })]
                        })
                    });

                    //set the style and add to layer
                    linie3.setStyle(linieStyle3);
                    map.addLayer(linie3);
                    locationLinecount++;
                }
            }
        })

    },
    false
);

var dialog = document.getElementById("FindLocDil");
var direction = document.getElementById('direction');
direction.addEventListener(
    'click',
    function () {
        var value1 = document.getElementById("LatF").value;
        var value2 = document.getElementById("LongF").value;
        var value3 = document.getElementById("LatT").value;
        var value4 = document.getElementById("LongT").value;
        var longitude1 = value2, latitude1 = value1;
        var longitude2 = value4, latitude2 = value3;

        var markerLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude1, latitude1]))
                    })
                ]
            })
        });
        map.addLayer(markerLayer);

        var markerLayer2 = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude2, latitude2]))
                    })
                ]
            })
        });
        map.addLayer(markerLayer2);

        //For LineDraw
        var lonlat = ol.proj.fromLonLat([longitude1, latitude1]);
        var location2 = ol.proj.fromLonLat([longitude2, latitude2]);
        var linieStyle = [
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#d12710',
                    width: 3,
                }),
                text: new ol.style.Text({
                    text: "KM : " + parseInt(distance(latitude1, longitude1, latitude2, longitude2)),
                    scale: 2,
                    fill: new ol.style.Fill({
                        color: '#black',
                    })
                })
            })
        ];
        //create the line       
        var linie = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [new ol.Feature({
                    geometry: new ol.geom.LineString([lonlat, location2]),
                    name: 'Line',
                })]
            })
        });

        //set the style and add to layer
        linie.setStyle(linieStyle);
        map.addLayer(linie);

        // alert(distance(latitude1, longitude1, latitude2, longitude2));
        dialog.close();

    },
    false
);


// document.getElementById('lonnngi').addEventListener(
//     'click',
//     function () {
//         locationLine = true;
//         locationLinecount = 1;
//         map.on('click', function (e) {
//             var cd = e.coordinate;
//             cd = toLonLat(cd);
//             if (locationLine == true) {
//                 if (locationLinecount == 1) {
//                     prevLongitude = cd[0];
//                     prevLatitude = cd[1];
//                     var markerLayer3 = new ol.layer.Vector({
//                         source: new ol.source.Vector({
//                             features: [
//                                 new ol.Feature({
//                                     geometry: new ol.geom.Point(ol.proj.fromLonLat([cd[0], cd[1]]))
//                                 })
//                             ]
//                         })
//                     });
//                     map.addLayer(markerLayer3);
//                     locationLinecount++;
//                 } else if (locationLinecount == 2) {
//                     var markerLayer3 = new ol.layer.Vector({
//                         source: new ol.source.Vector({
//                             features: [
//                                 new ol.Feature({
//                                     geometry: new ol.geom.Point(ol.proj.fromLonLat([cd[0], cd[1]]))
//                                 })
//                             ]
//                         })
//                     });
//                     map.addLayer(markerLayer3);

//                     var lonlatnew = ol.proj.fromLonLat([prevLongitude, prevLatitude]);
//                     var location2new = ol.proj.fromLonLat([cd[0], cd[1]]);
//                     var linieStyle3 = [
//                         new ol.style.Style({
//                             stroke: new ol.style.Stroke({
//                                 color: '#d12710',
//                                 width: 3,
//                             }),
//                             text: new ol.style.Text({
//                                 text: "KM : " + parseInt(distance(prevLongitude, prevLatitude, cd[0], cd[1])),
//                                 scale: 2,
//                                 fill: new ol.style.Fill({
//                                     color: '#black',
//                                 })
//                             })
//                         })
//                     ];
//                     //create the line       
//                     var linie3 = new ol.layer.Vector({
//                         source: new ol.source.Vector({
//                             features: [new ol.Feature({
//                                 geometry: new ol.geom.LineString([lonlatnew, location2new]),
//                                 name: 'Line',
//                             })]
//                         })
//                     });

//                     //set the style and add to layer
//                     linie3.setStyle(linieStyle3);
//                     map.addLayer(linie3);
//                     locationLinecount++;
//                 }
//             }
//         })

//     },
//     false

// );



//Identity



var Idet = 0;
document.getElementById("Identify").addEventListener("click", function () {

    if (Idet == 0) {
        map.on('click', function (e) {
            Idet = 1;
            var p = new Promise((resolve, reject) => {
                var res = map.getView().getResolution();
                var coord = e.coordinate;
                var projection = map.getView().getProjection();
                var url = ArrayLayer[ArrayLayer.length - 1].getFeatureInfoUrl(coord, res, projection, { 'INFO_FORMAT': 'application/json' });
                if (url) {
                    $.getJSON(url, function (data) {
                        if (data.features[0]) {
                            var k = Object.keys(data.features[0].properties);
                            var v = Object.values(data.features[0].properties);
                            console.log(k);
                            console.log(v);
                            content.innerHTML = '<p>Result :</p><code>' + v + '</code>';
                            overlay.setPosition(coord);
                        }
                    })
                }
            });
        })
    } else {
        Idet = 0;
    }
})






map.on('pointermove', function (e) {
    var Coord = ol.proj.toLonLat(e.coordinate);
    document.getElementById("ShowCoordinatesDetails").innerHTML = "X : " + Coord[0].toPrecision(5) + "    Y : " + Coord[1].toPrecision(5)
})


//document.getElementById('clear').addEventListener(
//    'click',
//    function () {
//        // map.removeLayer(markerLayer);
//        // map.removeLayer(markerLayer2);
//        // map.removeLayer(linie);
//        document.getElementById("cor1").value = "";
//        document.getElementById("cor2").value = "";

//    },
//    false
//);

//Bookmark

var cor11, NameBook, Description;

// document.getElementById('forbook').style.display = "none";
// document.getElementById('clear5').style.display = "none";
document.getElementById('bookmark').addEventListener(
    'click',
    function () {
        var dialog2 = document.getElementById('BookDialog');
        dialog2.show();
        document.getElementById('AddBook').onclick = function () {
            NameBook = document.getElementById("NameBook").value;
            Description = document.getElementById("DescBook").value;
            var Link = window.location.href;
            var coord = Link.split("=");
            console.log(coord);
            var cd = coord[1].split("/");
            console.log(cd);
            document.getElementById("tbody").innerHTML += "<tr><td><a style='color:black;cursor: pointer;'  onclick='bookmarkd(" + cd[0] + "," + cd[1] + "," + cd[2] + ")'>" + NameBook + "</a></td>" +
                "<td style='text-align: center;'><input type='button' class='btn btn-danger'  value='Delete' style='float:right' onclick='updateBox(this)'</td>" + "</tr>";
            /*var Link = window.location.href;*/
            //var zoomforbook, centerforbook;
            //zoomforbook = view.getZoom();
            //centerforbook = view.getCenter();
            //var c = centerforbook.toString().split(",");
            //document.getElementById("tbody").innerHTML += "<tr><td><a onclick='bookmarkd(" + zoomforbook + "," + c[0] + "," + c[1] + ")'>" + NameBook + "</a></td>" +
            //    "<td style='text-align: center;'><input type='button' class='btn btn-success' value='Delete' onclick='updateBox(this)'</td>" + "</tr>";
            dialog2.close();
        }
        document.getElementById("CancelBook").onclick = function () {
            dialog2.close();
        }
    },
    false
);

function bookmarkd(zoom, cd1, cd2) {
    console.log(zoom, cd1, cd2);
    view.animate({
        zoom: zoom
    }, {
        center: [cd1, cd2],
    })
}
//}
function updateBox(obj) {
    var index = obj.parentNode.parentNode.rowIndex;
    document.getElementById("tbody").deleteRow(index);
}


//Line and Area

document.getElementById('line').addEventListener(
    'click',
    function () {


        var raster = new ol.layer.Tile({
            source: new ol.source.OSM(),
        });

        //   var source = new VectorSource();

        var vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33',
                    }),
                }),
            }),
        });

        /**
         * Currently drawn feature.
         * @type {import("../src/ol/Feature.js").default}
         */
        var sketch;

        /**
         * The help tooltip element.
         * @type {HTMLElement}
         */
        var helpTooltipElement;

        /**
         * Overlay to show the help messages.
         * @type {Overlay}
         */
        var helpTooltip;

        /**
         * The measure tooltip element.
         * @type {HTMLElement}
         */
        var measureTooltipElement;

        /**
         * Overlay to show the measurement.
         * @type {Overlay}
         */
        var measureTooltip;

        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = 'Click to continue drawing the polygon';

        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = 'Click to continue drawing the line';

        /**
         * Handle pointer move.
         * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
         */
        createMeasureTooltip();
        createHelpTooltip();

        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = 'Click to start drawing';

            if (sketch) {
                var geom = sketch.getGeometry();
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };

        //   var map = new Map({
        //     layers: [raster, vector],
        //     target: 'map',
        //     view: new View({
        //       center: [-11000000, 4600000],
        //       zoom: 15,
        //     }),
        //   });

        map.addLayer(vector);


        map.on('pointermove', pointerMoveHandler);

        map.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
        });

        var typeSelect = document.getElementById('type');

        var draw; // global so we can remove it later

        /**
         * Format length output.
         * @param {LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function (line) {
            var length = ol.sphere.getLength(line);
            var output;
            if (length > 100) {
                output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
            } else {
                output = Math.round(length * 100) / 100 + ' ' + 'm';
            }
            return output;
        };

        /**
         * Format area output.
         * @param {Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function (polygon) {
            var area = ol.sphere.getArea(polygon);
            var output;
            if (area > 10000) {
                output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
            } else {
                output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
            }
            return output;
        };

        function addInteraction() {
            // var type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
            draw = new ol.interaction.Draw({
                source: source,
                type: "LineString",
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2,
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.7)',
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)',
                        }),
                    }),
                }),
            });
            map.addInteraction(draw);


            var listener;
            draw.on('drawstart', function (evt) {
                // set sketch
                sketch = evt.feature;

                /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

            draw.on('drawend', function () {
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            });
        }

        /**
         * Creates a new help tooltip
         */
        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'ol-tooltip hidden';
            helpTooltip = new ol.Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left',
            });
            map.addOverlay(helpTooltip);
        }

        /**
         * Creates a new measure tooltip
         */
        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center',
            });
            map.addOverlay(measureTooltip);
        }

        /**
         * Let user change the geometry type.
         */
        //   typeSelect.onchange = function () {
        //     map.removeInteraction(draw);
        //     addInteraction();
        //   };

        addInteraction();
        map.on('dblclick', function () {
            map.removeInteraction(draw);
            //addInteraction();
            map.removeOverlay(measureTooltip);
            map.removeOverlay(helpTooltip);
        });

    },
    false
);




document.getElementById('area').addEventListener(
    'click',
    function () {


        var raster = new ol.layer.Tile({
            source: new ol.source.OSM(),
        });

        //   var source = new VectorSource();

        var vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33',
                    }),
                }),
            }),
        });

        /**
         * Currently drawn feature.
         * @type {import("../src/ol/Feature.js").default}
         */
        var sketch;

        /**
         * The help tooltip element.
         * @type {HTMLElement}
         */
        var helpTooltipElement;

        /**
         * Overlay to show the help messages.
         * @type {Overlay}
         */
        var helpTooltip;

        /**
         * The measure tooltip element.
         * @type {HTMLElement}
         */
        var measureTooltipElement;

        /**
         * Overlay to show the measurement.
         * @type {Overlay}
         */
        var measureTooltip;

        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = 'Click to continue drawing the polygon';

        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = 'Click to continue drawing the line';

        /**
         * Handle pointer move.
         * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
         */
        createMeasureTooltip();
        createHelpTooltip();

        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = 'Click to start drawing';

            if (sketch) {
                var geom = sketch.getGeometry();
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };

        //   var map = new Map({
        //     layers: [raster, vector],
        //     target: 'map',
        //     view: new View({
        //       center: [-11000000, 4600000],
        //       zoom: 15,
        //     }),
        //   });

        map.addLayer(vector);


        map.on('pointermove', pointerMoveHandler);

        map.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
        });

        var typeSelect = document.getElementById('type');

        var draw; // global so we can remove it later

        /**
         * Format length output.
         * @param {LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function (line) {
            var length = ol.sphere.getLength(line);
            var output;
            if (length > 100) {
                output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
            } else {
                output = Math.round(length * 100) / 100 + ' ' + 'm';
            }
            return output;
        };

        /**
         * Format area output.
         * @param {Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function (polygon) {
            var area = ol.sphere.getArea(polygon);
            var output;
            if (area > 10000) {
                output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
            } else {
                output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
            }
            return output;
        };

        function addInteraction() {
            // var type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
            draw = new ol.interaction.Draw({
                source: source,
                type: "Polygon",
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2,
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.7)',
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)',
                        }),
                    }),
                }),
            });
            map.addInteraction(draw);


            var listener;
            draw.on('drawstart', function (evt) {
                // set sketch
                sketch = evt.feature;

                /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

            draw.on('drawend', function () {
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            });
        }

        /**
         * Creates a new help tooltip
         */
        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'ol-tooltip hidden';
            helpTooltip = new ol.Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left',
            });
            map.addOverlay(helpTooltip);
        }

        /**
         * Creates a new measure tooltip
         */
        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center',
            });
            map.addOverlay(measureTooltip);
        }

        /**
         * Let user change the geometry type.
         */
        //   typeSelect.onchange = function () {
        //     map.removeInteraction(draw);
        //     addInteraction();
        //   };

        addInteraction();
        map.on('dblclick', function () {
            map.removeInteraction(draw);
            //addInteraction();
            map.removeOverlay(measureTooltip);
            map.removeOverlay(helpTooltip);
        });

    },
    false
);


document.getElementById('go').addEventListener(
    'click',
    function () {
        document.getElementById("ForHospital").innerHTML = "";
        document.getElementById("areaforaroundme").value = "";
        document.getElementById("EmergencyServices").checked = false;
        document.getElementById("TouristAttraction").checked = false;
        document.getElementById("FunEntertainment").checked = false;
        var layerArray, len, layer1;
        layerArray = map.getLayers().getArray();
        len = layerArray.length;
        while (len > 0) {
            layer1 = layerArray[len - 1];
            map.removeLayer(layer1);
            len = layerArray.length;
        }

        map.addLayer(basemap);
        map.addLayer(l);
        // map.removeLayer(markerLayerEmerg);
        // map.removeLayer(markerLayerEmerg);
        // window.location.reload();
        return false;

    },
    false
);


//Navbar

document.getElementById('ZoomInbtn').addEventListener(
    'click',
    function () {
        var view = map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom + 1);
    },
    false
);

document.getElementById('ZoomOutbtn').addEventListener(
    'click',
    function () {
        var view = map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom - 1);
    },
    false
);


document.getElementById('Previous').addEventListener(
    'click',
    function () {
        window.history.back(1);
    },
    false
);

document.getElementById('Next').addEventListener(
    'click',
    function () {
        window.history.go(1);
    },
    false
);

document.getElementById('blink').addEventListener(
    'click',
    function () {
        clearInterval(int);
        map.removeLayer(AdLayerName);
    },
    false
);



document.getElementById('ClearSelection').addEventListener(
    'click',
    function () {
        //window.location.reload();
        var layerArray, len, layer1;
        layerArray = map.getLayers().getArray();
        len = layerArray.length;
        while (len > 0) {
            layer1 = layerArray[len - 1];
            map.removeLayer(layer1);
            len = layerArray.length;
        }

        map.addLayer(basemap);
        map.addLayer(l);
        var helper = document.getElementsByClassName("ol-overlay-container");
        for (var i = 0; i < helper.length; i++) {
            helper[i].style.display = "none";
        }

        document.getElementById("LayerForm").reset();
        /*map.addLayer(basemap);*/
    },
    false
);


document.getElementById('resetlayer').addEventListener(
    'click',
    function () {
        var layerArray, len, layer1;
        layerArray = map.getLayers().getArray();
        len = layerArray.length;
        while (len > 0) {
            layer1 = layerArray[len - 1];
            map.removeLayer(layer1);
            len = layerArray.length;
        }

        map.addLayer(basemap);
        map.addLayer(l);
        var helper = document.getElementsByClassName("ol-overlay-container");
        for (var i = 0; i < helper.length; i++) {
            helper[i].style.display = "none";
        }
        //map.removeOverlay(measureTooltip);
        //map.removeOverlay(helpTooltip);
        // map.addLayer(distNames);


    },
    false
);

//Advance Search
var DataAd, AdLayerName, int, XYZ2 = 0;
function AdSearch() {
    if (AdLayerName != "" || AdLayerName != null) {
        clearInterval(int);
        map.removeLayer(AdLayerName);
    }
    var TableName = document.getElementById("Layer").value;
    if (TableName == "busdepot") {
        document.getElementById("FilterSelect").innerHTML = '<option value="0">name</option>';
        fetch('http://localhost:8082/geoserver/DehradunGIS10/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS10%3Abusdepot&maxFeatures=50&outputFormat=application%2Fjson')
            .then(function (res) {
                res.text().then(function (data) {
                    AdLayerName = Busdepot;
                    DataAd = data;
                    //console.log(DataAd);
                    ShowDataAd();
                })
            });
    }
    else if (TableName == "centralgovtbuilding") {
        document.getElementById("FilterSelect").innerHTML = '<option value="0">name</option><option value="1">pop</option>';
        fetch('http://localhost:8082/geoserver/DehradunGIS11/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS11%3Acentral%20government%20buildings&maxFeatures=50&outputFormat=application%2Fjson')
            .then(function (res) {
                res.text().then(function (data) {
                    AdLayerName = Centralgov;
                    DataAd = data;
                    //console.log(DataAd);
                    ShowDataAd();
                })
            });
    }
    else if (TableName == "parking") {
        document.getElementById("FilterSelect").innerHTML = '<option value="0">name</option >';
        fetch('http://localhost:8080/geoserver/Dehradun25/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Dehradun25%3Aparking&maxFeatures=50&outputFormat=application%2Fjson')
            .then(function (res) {
                res.text().then(function (data) {
                    AdLayerName = Parking;
                    DataAd = data;
                    //console.log(DataAd);
                    ShowDataAd();
                })
            });
    }
    else if (TableName == "medicalstore") {
        document.getElementById("FilterSelect").innerHTML = '<option value = "0">sgovtbuild</option><option value="1">location</option><option value="2">area</option><option value="3">city</option>';
        fetch('http://localhost:8082/geoserver/DehradunGIS23/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS23%3Amedicalstore&maxFeatures=50&outputFormat=application%2Fjson')
            .then(function (res) {
                res.text().then(function (data) {
                    AdLayerName = Medicalstore;
                    DataAd = data;
                    //console.log(DataAd);
                    ShowDataAd();
                })
            });
    }
    else if (TableName == "hospital") {
        document.getElementById("FilterSelect").innerHTML = '<option value = "0">sgovtbuild</option><option value="1">location</option><option value="2">city</option><option value="3">area</option>';
        fetch('http://localhost:8082/geoserver/DehradunGIS21/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunGIS21%3Ahospitals&maxFeatures=50&outputFormat=application%2Fjson')
            .then(function (res) {
                res.text().then(function (data) {
                    AdLayerName = Hospitals;
                    DataAd = data;
                    //console.log(DataAd);
                    ShowDataAd();
                })
            });
    }
}
function ShowDataAd() {
    var Time = 1;
    document.getElementById("AdvanceSearchShow").style.display = "block";
    //console.log(DataAd);
    DataAd = JSON.parse(DataAd);
    console.log(DataAd);
    var v = Object.values(DataAd);
    var k = Object.keys(DataAd);
    console.log(k);
    console.log(v[1]);

    var str = "";
    var Val = v[1];
    console.log(KEY);
    for (var i = 0; i < Val.length; i++) {
        var W = Val[i].properties;
        var KEY = Object.keys(Val[i].properties);
        // console.log(KEY);
        //console.log(Val[i].properties);
        //console.log(W);
        if (Time == 1) {
            str += "<thead>";
            for (var k = 0; k < KEY.length; k++) {
                str += "<th>" + KEY[k] + "</th>";
            }
            str += "</thead>";
            Time = 0;
        }
        str += "<tr>";
        for (var j = 0; j < KEY.length; j++) {

            str += "<td>" + W[KEY[j]] + "</td>";
            //console.log(W[KEY[j]]);
        }
        str += "</tr>";
    }
    document.getElementById("AdvanceSearchShowTable").innerHTML = str;
    int = setInterval(() => {
        if (XYZ2 == 0) {
            map.addLayer(AdLayerName);
            XYZ2 = 1;
        } else {
            map.removeLayer(AdLayerName);
            XYZ2 = 0;
        }
    }, 1000);
}
function myFunction() {
    var ID = parseInt(document.getElementById("FilterSelect").value);
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("AdvanceSearchShowTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[ID];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}





//     document.getElementById('add1').addEventListener(
//         'click',
//         function () {
//             var dialog = document.getElementById('forbookmark');
//             dialog.close();

//             cor11=document.getElementById("cor11").value;      
//             document.getElementById("forbook").innerHTML=cor11;

//         },
//         false
//         );
//         document.getElementById('clear5').addEventListener(
//             'click',
//             function () {
//                 document.getElementById('clear5').style.display = "none";
//                 document.getElementById("forbook").innerHTML="";

//             },
//             false
//             );




// var b = 0;
// document.getElementById('emergency').addEventListener(
//     'click',
//     function () {
//         if (b == 0) {
//             // alert("Please Click on Map to Identify/Point Your Location");
//             map.addLayer(basemap);
//             map.addLayer(ForPoints);
//             b = 1;
//             formap();

//         }
//     },
//     false
// );
// function formap() {
//     map.on('click', function (e) {
//         var p = new Promise((resolve, reject) => {
//             var coord = e.coordinate;
//             coord = toLonLat(coord);
//             fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coord[0] + '&lat=' + coord[1])
//                 .then(function (response) {
//                     return response.json();
//                 }).then(function (json) {
//                     var AreaSplit = json.address.suburb;
//                     console.log(json.address);
//                     if (json.address.residential) {
//                         AreaSplit = json.address.residential;
//                     } else if (json.address.suburb) {
//                         AreaSplit = json.address.suburb;
//                     } else if (json.address.neighbourhood) {
//                         AreaSplit = json.address.neighbourhood;
//                     } else if (json.address.city) {
//                         AreaSplit = json.address.city;
//                     } else if (json.address.town) {
//                         AreaSplit = json.address.town;
//                     } else if (json.address.county) {
//                         AreaSplit = json.address.county;
//                     }
//                     // CoordinateDataInfo.innerHTML = '<p>' + AreaSplit + '</p>';
//                     resolve(AreaSplit);
//                 });
//         });
//         p.then((Area) => Check(Area))
//     })

// }



//   var Area = "";
// map.on('click', function(e) {
//     var p = new Promise((resolve, reject) => {
//         var coord = e.coordinate;
//         coord = toLonLat(coord);
//         fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coord[0] + '&lat=' + coord[1])
//             .then(function(response) {
//                 return response.json();
//             }).then(function(json) {
//                 var AreaSplit = json.address.suburb;
//                 console.log(AreaSplit);
//                 CoordinateDataInfo.innerHTML = '<p>' + AreaSplit + '</p>';
//                 resolve(AreaSplit);
//             });
//     });
//     p.then((Area) => Check(Area))
// })

// function Check(Area) {
//     fetch('http://localhost:8082/geoserver/macro_provinces46/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=macro_provinces46%3Ahospitalamd&maxFeatures=50&outputFormat=application%2Fjson')
//         .then(function(res) {
//             res.text().then(function(data) {
//                 document.getElementById("ForHospital").innerHTML = "";
//                 var data = JSON.parse(data);
//                 document.getElementById("ForHospital").innerHTML += "<br>" + Area + "  Hospitals : <br>";
//                 for (var i = 0; i < data.features.length; i++) {
//                     if (data.features[i].properties.area == Area) {
//                         console.log(data.features[i].properties.name);
//                         document.getElementById("ForHospital").innerHTML += data.features[i].properties.name + "<br>";
//                     }
//                 }
//             })
//         })
// }