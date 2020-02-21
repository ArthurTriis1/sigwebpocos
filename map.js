require(
    [       
      "esri/Map", 
      "esri/views/MapView", 
      "esri/layers/FeatureLayer",
      "esri/Basemap",
      "esri/widgets/Locate",
      "esri/widgets/Search",
      "esri/widgets/Zoom"
    ],
    function(Map, MapView, FeatureLayer, Basemap,  Locate, Search, Zoom) {


  //Definição geral do mapa
  var map = new Map({
    basemap: "streets-navigation-vector"
  });


  //Visualizador do mapa
  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-38.078705,-8.392832],
    zoom: 8
  });


  //Definição da foto do poços
  var trailheadsRenderer = {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA18fiRzsu64MUk2dChbmtgMn8S0PwEUnkxbHEvL4SNX9FXBlIiQ&s",
      width: "18px",
      height: "18px"
    }
  }


  
  //Definição da descrição do popup
  var trailheadsLabels = {
    symbol: {
      type: "text",
      color: "#FFFFFF",
      haloColor: "#5E8D74",
      haloSize: "2px",
      font: {
        size: "12px",
        family: "Noto Sans",
        style: "italic",
        weight: "normal"
      }
    },
    labelPlacement: "above-center",

  };


  //Definição do popup
  var popupTrailheads = {
    "title": "<b>Processo da APAC:</b> {PROCESSO_APAC}<br>",
    "content": `
                <b>Local:</b> {LOCAL}<br>
                <b>Municipio:</b> {MUNICiPIO}<br>
                <b>Profundidade (M):</b> {PROFUNDIDADE__M_}<br>
                <b>Vazão (MES/DIA):</b> {VAZAO_OUTORGADA__MES_DIA_}<br>
                <b>Finalidade:</b> {FINALIDADE_DE_USO}<br>
                <b>Bacia Hidrogeológica:</b> {BACIA_HIDROGEOLOGICA}<br>
                <b>Aquifero:</b> {AQUIFERO}<br>
                <b>Bacia Hidrográfica:</b> {BACIA_HIDROGRAFICA}<br>`


  } 


  //Definição do estilo dos poços e criação da layer
  var trailheads = new FeatureLayer({
    url: "https://services3.arcgis.com/HXhxkGvTom6uHOMG/arcgis/rest/services/Outorga_Subterranea_17_12_2019/FeatureServer/0",
    renderer: trailheadsRenderer,
    labelingInfo: [trailheadsLabels],
    outFields: ["PROCESSO_APAC", "LOCAL", "MUNICiPIO", "PROFUNDIDADE__M_", "VAZAO_OUTORGADA__MES_DIA_", "VALIDADE_OUTORGA", "FINALIDADE_DE_USO","BACIA_HIDROGEOLOGICA", "AQUIFERO", "BACIA_HIDROGRAFICA"],
    popupTemplate: popupTrailheads
  });

  map.add(trailheads);



  //localização atual
  // var btOptions = document.createElement("div");
  //     btOptions.id = "btOptions";
  //     btOptions.className = "esri-widget esri-component";
  //      btOptions.style.padding = "7px 15px 5px";

  //      view.ui.add(btOptions, "bottom-right");

  // function showCoordinates(pt) {
  //   var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
  //       " | Scale 1:" + Math.round(view.scale * 1) / 1 +
  //       " | Zoom " + view.zoom;
  //   btOptions.innerHTML = coords;
  // }

  // view.watch("stationary", function(isStationary) {
  //   showCoordinates(view.center);
  // });

  // view.on("pointer-move", function(evt) {
  //   showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
  // });

  var locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function(view, options) {
      options.target.scale = 1500;  // Override the default map scale
      return view.goTo(options.target);
    }
  });

  view.ui.add(locate, "bottom-right");


  //Widget de pesquisa
  var search = new Search({
    view: view
  });

  view.ui.add(search, "top-right");

  view.on("click", function(evt){
    search.clear();
    if (search.activeSource) {
      var geocoder = search.activeSource.locator; // World geocode service
      var params = {
        location: evt.mapPoint
      };
    }
  });

  view.ui.move("zoom", "bottom-left");

  //Botão de opções

  if(window.innerWidth < 600){

    var btOptions = document.createElement("div");
      btOptions.id = "btOptions";
      btOptions.className = "esri-widget esri-component";
       btOptions.style.padding = "7px 15px 5px";

       view.ui.add(btOptions, "top-left");
  
       btOptions.innerHTML = "&#9776;";

       btOptions.addEventListener('click', function (event) {
       document.getElementById("options").classList.remove("opchide");
      });

  }
  




});


function voltar(){
  document.getElementById("options").classList.add("opchide");

}

