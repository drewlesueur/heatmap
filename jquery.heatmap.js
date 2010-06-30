 (function($) {
 
   $.fn.heatmap = function(settings) {
   
       var config = {'radius': 25, opacity: 0.5, centerValue: 10, 
       gradient :   [0,167772262,336396403,504430711,672727155,857605496,1025311865,1193542778,1361445755,1529480062,1714226559,1882326399,2050229378,2218264197,2386232710,2571044231,2739013001,2906982028,3075081868,3243050383,3427796369,3595765395,3763734164,3931768213,4099736983,4284614554,4284745369,4284876441,4285007513,4285138585,4285334937,4285466009,4285597081,4285728153,4285924505,4286055577,4286186649,4286317721,4286514073,4286645145,4286776217,4286907289,4287103641,4287234713,4287365785,4287496857,4287693209,4287824281,4287955353,4288086425,4288283033,4288348568,4288414103,4288545431,4288610966,4288742293,4288807829,4288938900,4289004691,4289135763,4289201554,4289332625,4289398161,4289529488,4289595024,4289726351,4289791886,4289922958,4289988749,4290119820,4290185612,4290316683,4290382218,4290513546,4290579081,4290710409,4290776198,4290841987,4290907777,4290973822,4291039612,4291105401,4291171447,4291237236,4291303026,4291369071,4291434861,4291500650,4291566696,4291632485,4291698275,4291764320,4291830110,4291895899,4291961945,4292027734,4292093524,4292159569,4292225359,4292291148,4292422730,4292422983,4292489029,4292489282,4292555328,4292621118,4292621627,4292687417,4292753462,4292753972,4292819762,4292885807,4292886061,4292952106,4292952360,4293018406,4293084195,4293084705,4293150750,4293216540,4293217050,4293282839,4293348885,4293349138,4293415184,4293481230,4293481485,4293481996,4293547788,4293548299,4293614091,4293614602,4293614858,4293680905,4293681416,4293747208,4293747719,4293747975,4293814022,4293814278,4293880325,4293880581,4293881092,4293947139,4293947395,4294013442,4294013698,4294014209,4294080001,4294080512,4294146560,4294146816,4294147328,4294213376,4294213632,4294214144,4294280192,4294280704,4294280960,4294347008,4294347520,4294347776,4294413824,4294414336,4294480384,4294480640,4294481152,4294547200,4294547456,4294547968,4294614016,4294614528,4294614784,4294680832,4294681344,4294747392,4294747648,4294747904,4294748416,4294748672,4294749184,4294749440,4294749952,4294750208,4294750464,4294750976,4294751232,4294751744,4294752000,4294752512,4294752768,4294753280,4294753536,4294753792,4294754304,4294754560,4294755072,4294755328,4294755840,4294756096,4294756608,4294756869,4294757130,4294757391,4294757652,4294757913,4294758174,4294758435,4294758696,4294758957,4294759219,4294759480,4294759741,4294760258,4294760519,4294760780,4294761041,4294826838,4294827099,4294827360,4294827622,4294827883,4294828144,4294828405,4294828666,4294829183,4294829444,4294829705,4294829966,4294830227,4294830489,4294830750,4294831011,4294831272,4294897069,4294897330,4294897591,4294897852,4294898369,4294898630,4294898892,4294899153,4294899414,4294899675,4294899936,4294900197,4294900458,4294900719,4294900980,4294901241,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295],
       map: '', mapOptions : '', 
       'swf' : 'HelloWorld.swf', 
       echo : 'data-proxy.php',
       tileSize: 256,
       'useCanvas' : false};
        
       
        
       if (settings) $.extend(config, settings);
         
         //small tiles for ie because they only support data url up to 32k
         if (navigator.appName.indexOf("Microsoft") != -1) {
            config.tileSize = 100;
           $(this).attr('data-tile-size', 100)

         }       
       
       $(this).attr('data-radius', config.radius)
       $(this).attr('data-centerValue', config.centerValue)
       $(this).attr('opacity', config.opacity)
       $(this).attr('data-tile-size', config.tileSize)
       $(this).attr('data-use-canvas', config.useCanvas)
       var the_mappy = this;
       
       var intensities = []
       var lat_lngs = []
       var world_coords = []
   
   
       var bolus = false;
       var spotImageData
       function getTile() {
            var options = arguments[0] || {}
          var r = options.radius || 25;
          var factor = 5
          r *=factor;
          var val_to_watch = 3
          if (bolus == false){
              //var ctx = document.getElementById('canvas').getContext('2d');
               var canvas = $('<canvas width="'+(r*2)+'" height="'+(r*2)+'"></canvas>')
              $(document.body).append(canvas)
              var ctx = canvas[0].getContext('2d');
               var radgrad = ctx.createRadialGradient(r,r,0,r,r,r);
              radgrad.addColorStop(0, 'rgba(0,0,255,.2)');
              //radgrad.addColorStop(.5, 'rgba(0,0,255,.25)');
              radgrad.addColorStop(1, 'rgba(0,0,255,0)');
              ctx.fillStyle = radgrad;
              ctx.fillRect(0,0,r*2,r*2);
              
              spotImageData = ctx.getImageData(0,0,r*2, r*2);
              
              /*
              var spotData = spotImageData.data
              for (var i=0; i < spotData.length; i+=4) {
                 alpha  = spotData[i+3]
                 //alpha = alpha / 255 * Math.pow(255, 1/3);
                 alpha = Math.pow(alpha, 1/2)//Math.log(alpha) * 255//Math.pow(alpha, 1/2)
                 spotData[i+3] = alpha
              }
              ctx.putImageData(spotImageData, 0, 0)
             */             
              bolus = canvas
          } else {
             var canvas = bolus
          }
          
          
          //spotImageData = blur(spotImageData, 1);
          //ctx.putImageData(spotImageData, 0, 0);
          
          var colors_canvas = $('<canvas width="256" height="5"></canvas>');
          //$(document.body).append(colors_canvas)
          var colors = colors_canvas[0].getContext('2d');
          var lingrad = colors.createLinearGradient(0,0,255,0);
          
          
          if (options.stops) {
              var stops = options.stops 
              
          } else if (options.gradient){
              var stops = {}
              var gradient = options.gradient || ["rgba(130, 33, 122, 0)","rgba(130, 33, 122, .9)" , "#FF4F00", "#FFAA00", "#FFD200", "#FFFB73"]
              var max = gradient.length - 1 
              for (var i = 0; i < gradient.length; i++) {
                  stops[(i/max) + ""] = gradient[i];
              }
          } else {
              var stops = {
                "0" : "rgba(" + 0x92 + ", " + 0x42 + ", " +0xb3 +", 0)",
                "0.5" : "rgba(" + 0x92 + ", " + 0x42 + ", " +0xb3 +", 1)",
                "0.75" : "rgba("+0xF4+","+0x98+","+0x91+",1)",
                "0.9" : "rgba("+0xFC+","+0xC4+","+0x41+",1)",
                "1" : "rgba("+0xFD+","+0xe7+","+0x98+",1)"
              }
          }
          
          for (var i in stops) {
              lingrad.addColorStop(i-0, stops[i]);
          }
          
          
          colors.fillStyle = lingrad
          colors.fillRect(0,0,256,5);
          var colorsImageData = colors.getImageData(0,0,256,1);
          var colorsData = colorsImageData.data;
          
         
          var tileSize = options.tileSize || 256;
          var tile_canvas = $('<canvas width="'+tileSize+'" height="'+tileSize+'"></canvas>');

          var tile = tile_canvas[0].getContext('2d');
          
          
          var points = options.points || []
          
          for (var i=0; i < points.length; i++) {
             var point = points[i]
             for (j = 0; j < point[2]; j++) {
                tile.drawImage(canvas[0], 0, 0, r*2, r*2, point[0] - r/factor, point[1] - r/factor, 2 *r/factor, 2*r/factor )
             }
          }
          
          
          var opacity = options.opacity || 0.75
          var tileImageData = tile.getImageData(0,0,tileSize, tileSize);
          var data = tileImageData.data;

          for (var i=0; i < data.length; i+=4) {
             if (data[i+val_to_watch] < 10) {
                 data[i+3] = 0
                continue;
             }
             data[i] = colorsData[data[i+val_to_watch]*4];
             data[i+1] = colorsData[data[i+val_to_watch]*4+1];
             data[i+2] = colorsData[data[i+val_to_watch]*4+2];
             data[i+3] = colorsData[data[i+val_to_watch]*4+3] * opacity;
          }
          
         //tileImageData = blur(tileImageData, 1);
          
          tile.putImageData(tileImageData, 0, 0)
          return tile_canvas[0]
       }
       
       function drawTile(options) {
          return getTile(options).toDataURL();
       }
       
       
       function CoordMapType() {
        }

       //CoordMapType.prototype.tileSize = new google.maps.Size(256,256);
       CoordMapType.prototype.tileSize = new google.maps.Size($(the_mappy).attr('data-tile-size'),$(the_mappy).attr('data-tile-size'));
       
CoordMapType.prototype.maxZoom = 19;

CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
  var div = ownerDocument.createElement('DIV');
  //div.innerHTML = coord;
  div.style.width = this.tileSize.width + 'px';
  div.style.height = this.tileSize.height + 'px';
  div.style.fontSize = '10';
  //div.style.borderStyle = 'solid';
  //div.style.borderWidth = '1px';
  //div.style.borderColor = '#AAAAAA';
                  var flash = thisMovie(callback+"_id");
                   var my_points = []
                   
                   var tileSize = $(the_mappy).attr('data-tile-size')
                for (var i in world_coords) {
                   worldCoordinate = world_coords[i];
                   var pixelCoordinate = get_pixel_coord(worldCoordinate);
                   var tileCoordinate = get_tile_coord(pixelCoordinate);
                   //if (Math.abs(tileCoordinate.x - coord.x) < 2 && Math.abs(tileCoordinate.y - coord.y) < 2) { //cut off
                   
                   var tile_pixel_coord = {x: coord.x * tileSize, y: coord.y * tileSize}
                   
                   var left_dist = pixelCoordinate.x - tile_pixel_coord.x
                   var right_dist = tile_pixel_coord.x + tileSize - pixelCoordinate.x
                   var top_dist = pixelCoordinate.y - tile_pixel_coord.y;
                   var bottom_dist = tile_pixel_coord.y + tileSize - pixelCoordinate.y;
                   var buffer = -1 * config.radius * 2  //better algorithm?
                         if (left_dist > buffer && right_dist > buffer && top_dist > buffer && bottom_dist > buffer) {
                             var x = pixelCoordinate.x - tileSize * coord.x;
                             var y = pixelCoordinate.y - tileSize * coord.y;
                             my_points.push([x,y,intensities[i]]);
                         }
                   /*
                   if (tileCoordinate.x == coord.x && tileCoordinate.y == coord.y) { //cut off
                     var x = pixelCoordinate.x - 256 * tileCoordinate.x;
                     var y = pixelCoordinate.y - 256 * tileCoordinate.y;
                     my_points.push([x,y]);
                   } */
                   //cache this and the above in the future
                }
                
                
                if (config.useCanvas == true) {
                    var canvas = getTile({
                      points: my_points, 
                      tileSize: $(the_mappy).attr('data-tile-size'), 
                      radius :  $(the_mappy).attr('data-radius')
                    });
                    
                    $(div).append(canvas)         
                    return div;
                }
                    
                var data = flash.drawHeatMap({
                    'points' : my_points,
                    'radius' : $(the_mappy).attr('data-radius'), //config.radius,
                    'opacity' : $(the_mappy).attr('data-opacity'), //config.opacity,
                    'centerValue' : $(the_mappy).attr('data-centerValue'), //config.centerValue
                    'gradient' : config.gradient,
                    'tileSize' : $(the_mappy).attr('data-tile-size')
                    
                });

                  var ajax = $.ajax({
                    'type' : 'POST',
                    //'async' : false,
                    'url' : 'data-proxy.php' ,
                    'data' : {data : data},
                    'success' : function(ret) { $(div).append("<img src='images/"+ret+"' />")}
                  })

  
            return div;
};

CoordMapType.prototype.name = "Tile #s";
CoordMapType.prototype.alt = "Tile Coordinate Map Type";

var coordinateMapType = new CoordMapType();



        var heat_map_options = {
            
            getTileUrl: function(coord, zoom) {
                
                var flash = thisMovie(callback+"_id");
                
                
                var my_points = []
                var tileSize = $(the_mappy).attr('data-tile-size')
                for (var i in world_coords) {
                   worldCoordinate = world_coords[i];
                   var pixelCoordinate = get_pixel_coord(worldCoordinate);
                   var tileCoordinate = get_tile_coord(pixelCoordinate);
                   //if (Math.abs(tileCoordinate.x - coord.x) < 2 && Math.abs(tileCoordinate.y - coord.y) < 2) { //cut off
                   
                   var tile_pixel_coord = {x: coord.x * tileSize, y: coord.y * tileSize}
                   
                   var left_dist = pixelCoordinate.x - tile_pixel_coord.x
                   var right_dist = tile_pixel_coord.x + tileSize - pixelCoordinate.x
                   var top_dist = pixelCoordinate.y - tile_pixel_coord.y;
                   var bottom_dist = tile_pixel_coord.y + tileSize - pixelCoordinate.y;
                   var buffer = -1 * config.radius * 2  //better algorithm?
                         if (left_dist > buffer && right_dist > buffer && top_dist > buffer && bottom_dist > buffer) {
                             var x = pixelCoordinate.x - tileSize * coord.x;
                             var y = pixelCoordinate.y - tileSize * coord.y;
                             my_points.push([x,y,intensities[i]]);
                         }
                   //cache this and the above in the future
                }
                
                /* canvas way
                return drawTile({
                  points: my_points, 
                  tileSize: $(the_mappy).attr('data-tile-size'), 
                  radius :  $(the_mappy).attr('data-radius')
                })
                */
                
                
                
                var data = flash.drawHeatMap({
                    'points' : my_points,
                    'radius' : $(the_mappy).attr('data-radius'), //config.radius,
                    'opacity' : $(the_mappy).attr('data-opacity'), //config.opacity,
                    'centerValue' : $(the_mappy).attr('data-centerValue'), //config.centerValue
                    'gradient' : config.gradient,
                    'tileSize' : $(the_mappy).attr('data-tile-size')
                });
                
                
                 
                return "data:image/png;base64," + data;
                //can return an html element too  
              },
              //tileSize: new google.maps.Size(256, 256),
              tileSize: new google.maps.Size($(the_mappy).attr('data-tile-size'), $(the_mappy).attr('data-tile-size')),
              isPng: true
    };  
    var heat_map = new google.maps.ImageMapType(heat_map_options);
       
       
            //http://code.google.com/apis/maps/documentation/javascript/overlays.html#TileCoordinates
            //http://code.google.com/apis/maps/documentation/javascript/examples/map-coordinates.html
            var MERCATOR_RANGE = 256;
            //var MERCATOR_RANGE = $(the_mappy).attr('tile-size');
             
            function bound(value, opt_min, opt_max) {
              if (opt_min != null) value = Math.max(value, opt_min);
              if (opt_max != null) value = Math.min(value, opt_max);
              return value;
            }
             
            function degreesToRadians(deg) {
              return deg * (Math.PI / 180);
            }
             
            function radiansToDegrees(rad) {
              return rad / (Math.PI / 180);
            }
             
            function MercatorProjection() {
              this.pixelOrigin_ = new google.maps.Point(
                  MERCATOR_RANGE / 2, MERCATOR_RANGE / 2);
              this.pixelsPerLonDegree_ = MERCATOR_RANGE / 360;
              this.pixelsPerLonRadian_ = MERCATOR_RANGE / (2 * Math.PI);
            };
             
            MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
              var me = this;
             
              var point = opt_point || new google.maps.Point(0, 0);
             
              var origin = me.pixelOrigin_;
              point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;
              // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
              // 89.189.  This is about a third of a tile past the edge of the world tile.
              var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999, 0.9999);
              point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
              return point;
            };
             
            MercatorProjection.prototype.fromPointToLatLng = function(point) {
              var me = this;
              
              var origin = me.pixelOrigin_;
              var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
              var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
              var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
              return new google.maps.LatLng(lat, lng);
            };

            function get_tile_coord(pixelCoordinate) {
                var tileCoordinate = new google.maps.Point(Math.floor(pixelCoordinate.x / MERCATOR_RANGE), Math.floor(pixelCoordinate.y / MERCATOR_RANGE));
                return tileCoordinate;
            }

            function get_pixel_coord(worldCoordinate) {
                var pixelCoordinate = new google.maps.Point(worldCoordinate.x * Math.pow(2, config.map.getZoom()), worldCoordinate.y * Math.pow(2, config.map.getZoom()));
                return pixelCoordinate;
            }

            //http://code.google.com/apis/maps/documentation/javascript/overlays.html#ImageMapTypes

               
            function get_points(t) {
               var projection = new MercatorProjection();
               t = t.split("\n")
               t = $.map(t, function(x, i) {
                  return $.trim(x)
               })
             
               
               // another way to loop thru array
               $(t).each(function(){
                  var row = this.split(",");
                  intensities.push(row[0]);
                  var point = new google.maps.LatLng(row[1], row[2])
                  lat_lngs.push(point);
                  world_coords.push(projection.fromLatLngToPoint(point));
               })

            }


           function rnd(low, high) {
                return Math.floor(Math.random() * (high-low+1)) + low
            }
           
           
           function thisMovie(movieName) {
               if (navigator.appName.indexOf("Microsoft") != -1) {
                   return window[movieName];
               } else {
                   return document[movieName];
               }
            }

           
           //parsing the points to values I need
           get_points(config.data);
           
           var div = this;
           var d = (new Date()).getTime() + "" + rnd(0,100);
           var callback = "heatmap_" + d; 
           if (callback in window) {
                    //
           } else {
                window[callback] = function(){
                    //only call once because It may tried to be called twice
                    window[callback] = function(){} 
                   //hide the flash                             
                   //$('#' + callback + '_id').css({'position': 'absolute', 'left' : '-3000px', 'top': '0'})
                   $('#' + callback + '_id').css({'width': '0px', 'height': '0px'})
           
                  if (config.map == '') {
                          if (config.mapOptions == '') {
                              var latlng = new google.maps.LatLng(33.4483771, -112.0740373);
                              config.mapOptions = {
                                zoom: 7,
                                center: latlng,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                              };
                          }

                          config.map = new google.maps.Map($(div)[0], config.mapOptions);
                         
                        }
                        
                        
                        if (navigator.appName.indexOf("Microsoft") != -1) {
                               config.map.overlayMapTypes.insertAt(0, heat_map)                               
                              //config.map.overlayMapTypes.insertAt(1, coordinateMapType) //works tile size 256
                              
                         } else {
                               if (config.useCanvas == true) {
                                  config.map.overlayMapTypes.insertAt(1, coordinateMapType) //works
                               } else {
                                  config.map.overlayMapTypes.insertAt(0, heat_map)
                               }
                               
                               
                             return document[movieName];
                         }
                        
                         
                         //config.map.mapTypes.set('coordinate',coordinateMapType);
                         //config.map.setMapTypeId('coordinate');
                 }
           }
           
           $(document.body).append('<div id="'+callback+'_id"></div>')
           
           var flashvars = {callback: callback}
           var params = {allowScriptAccess: 'allways', 'bgcolor' : '#869ca7'}
           var attributes = {}
           
           swfobject.embedSWF(config.swf, callback + "_id", "300", "120", "9.0.0", "",flashvars, params) //,config.swf, flashvars, params, attributes);
           //there is a bug where firefox and I guess chrome may load the swf twice.
           //http://code.google.com/p/swfobject/wiki/faq

           
        
        
      return this;
   };
 
 })(jQuery);