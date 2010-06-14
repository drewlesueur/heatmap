 (function($) {
 
   $.fn.heatmap = function(settings) {
   
       var config = {'radius': 25, opacity: 0.5, centerValue: 10, 
       //gradient :   [0,167772262,336396403,504430711,672727155,857605496,1025311865,1193542778,1361445755,1529480062,1714226559,1882326399,2050229378,2218264197,2386232710,2571044231,2739013001,2906982028,3075081868,3243050383,3427796369,3595765395,3763734164,3931768213,4099736983,4284614554,4284745369,4284876441,4285007513,4285138585,4285334937,4285466009,4285597081,4285728153,4285924505,4286055577,4286186649,4286317721,4286514073,4286645145,4286776217,4286907289,4287103641,4287234713,4287365785,4287496857,4287693209,4287824281,4287955353,4288086425,4288283033,4288348568,4288414103,4288545431,4288610966,4288742293,4288807829,4288938900,4289004691,4289135763,4289201554,4289332625,4289398161,4289529488,4289595024,4289726351,4289791886,4289922958,4289988749,4290119820,4290185612,4290316683,4290382218,4290513546,4290579081,4290710409,4290776198,4290841987,4290907777,4290973822,4291039612,4291105401,4291171447,4291237236,4291303026,4291369071,4291434861,4291500650,4291566696,4291632485,4291698275,4291764320,4291830110,4291895899,4291961945,4292027734,4292093524,4292159569,4292225359,4292291148,4292422730,4292422983,4292489029,4292489282,4292555328,4292621118,4292621627,4292687417,4292753462,4292753972,4292819762,4292885807,4292886061,4292952106,4292952360,4293018406,4293084195,4293084705,4293150750,4293216540,4293217050,4293282839,4293348885,4293349138,4293415184,4293481230,4293481485,4293481996,4293547788,4293548299,4293614091,4293614602,4293614858,4293680905,4293681416,4293747208,4293747719,4293747975,4293814022,4293814278,4293880325,4293880581,4293881092,4293947139,4293947395,4294013442,4294013698,4294014209,4294080001,4294080512,4294146560,4294146816,4294147328,4294213376,4294213632,4294214144,4294280192,4294280704,4294280960,4294347008,4294347520,4294347776,4294413824,4294414336,4294480384,4294480640,4294481152,4294547200,4294547456,4294547968,4294614016,4294614528,4294614784,4294680832,4294681344,4294747392,4294747648,4294747904,4294748416,4294748672,4294749184,4294749440,4294749952,4294750208,4294750464,4294750976,4294751232,4294751744,4294752000,4294752512,4294752768,4294753280,4294753536,4294753792,4294754304,4294754560,4294755072,4294755328,4294755840,4294756096,4294756608,4294756869,4294757130,4294757391,4294757652,4294757913,4294758174,4294758435,4294758696,4294758957,4294759219,4294759480,4294759741,4294760258,4294760519,4294760780,4294761041,4294826838,4294827099,4294827360,4294827622,4294827883,4294828144,4294828405,4294828666,4294829183,4294829444,4294829705,4294829966,4294830227,4294830489,4294830750,4294831011,4294831272,4294897069,4294897330,4294897591,4294897852,4294898369,4294898630,4294898892,4294899153,4294899414,4294899675,4294899936,4294900197,4294900458,4294900719,4294900980,4294901241,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295],
       map: '', mapOptions : '', 'swf' : 'HelloWorld.swf', echo : 'data-proxy.php'};
       if (settings) $.extend(config, settings);
       
       $(this).attr('data-radius', config.radius)
       $(this).attr('data-centerValue', config.centerValue)
       $(this).attr('opacity', config.opacity)
       var the_mappy = this;
       
       var intensities = []
       var lat_lngs = []
       var world_coords = []
   
       if (!window.google || (window.google && !window.google.maps)) {
          
          //$.getScript("http://maps.google.com/maps/api/js?sensor=false")
          //$(document.body).append('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>');
       }
       
       //if you need to create a map
       
       
       function CoordMapType() {
        }

       CoordMapType.prototype.tileSize = new google.maps.Size(256,256);
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
                for (var i in world_coords) {
                   worldCoordinate = world_coords[i];
                   var pixelCoordinate = get_pixel_coord(worldCoordinate);
                   var tileCoordinate = get_tile_coord(pixelCoordinate);
                   //if (Math.abs(tileCoordinate.x - coord.x) < 2 && Math.abs(tileCoordinate.y - coord.y) < 2) { //cut off
                   
                   var tile_pixel_coord = {x: coord.x * 256, y: coord.y * 256}
                   
                   var left_dist = pixelCoordinate.x - tile_pixel_coord.x
                   var right_dist = tile_pixel_coord.x + 256 - pixelCoordinate.x
                   var top_dist = pixelCoordinate.y - tile_pixel_coord.y;
                   var bottom_dist = tile_pixel_coord.y + 256 - pixelCoordinate.y;
                   var buffer = -1 * config.radius * 2  //better algorithm?
                         if (left_dist > buffer && right_dist > buffer && top_dist > buffer && bottom_dist > buffer) {
                             var x = pixelCoordinate.x - 256 * coord.x;
                             var y = pixelCoordinate.y - 256 * coord.y;
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
                
                
                
                var data = flash.drawHeatMap({
                    'points' : my_points,
                    'radius' : config.radius,
                    'opacity' : config.opacity,
                    'centerValue' : config.centerValue,
                    'gradient' : config.gradient //[0,50331903,100663551,167772415,218104063,285212927,335544575,385876223,452985077,503316726,570425591,620757240,671088889,738197753,788529401,855638266,905969914,956301562,1023410427,1073742071,1140850935,1191182584,1241514232,1308623096,1358954744,1426063609,1476395257,1526726905,1593835770,1644167418,1711276282,1761607930,1811939578,1879048440,1929380090,1996488954,2046820603,2097152251,2164261113,2214592761,2281701625,2332033273,2382364923,2449473787,2499805436,2566914298,2617245946,2667577594,2734686458,2785018106,2852126972,2902458620,2952790267,3019899132,3070230780,3137339644,3187671292,3238002939,3305111803,3355443452,3422552316,3472883964,3523215612,3590324477,3640656124,3707764988,3758096636,3808428285,3875537149,3925868797,3992977662,4043309309,4093640957,4160749822,4211081470,4278190335,4278386939,4278583544,4278845684,4279042289,4279304430,4279501034,4279697639,4279959779,4280156384,4280418525,4280615129,4280811734,4281073874,4281270479,4281532620,4281729224,4281925829,4282187969,4282384574,4282646715,4282843319,4283039924,4283302064,4283498669,4283760810,4283957414,4284154019,4284416159,4284612764,4284874905,4285071509,4285268114,4285530254,4285726859,4285989000,4286185604,4286382209,4286644349,4286840954,4287103095,4287299699,4287496304,4287758444,4287955049,4288217190,4288413794,4288610399,4288872539,4289069144,4289331285,4289527889,4289724494,4289986634,4290183239,4290445380,4290641984,4290838589,4291100729,4291297334,4291559475,4291756079,4291952684,4292214824,4292411429,4292673570,4292870174,4293066779,4293328919,4293525524,4293787665,4293984269,4294180874,4294443014,4294639619,4294901760,4294902531,4294903302,4294904330,4294905101,4294906129,4294906900,4294907671,4294908699,4294909470,4294910498,4294911269,4294912040,4294913068,4294913839,4294914867,4294915638,4294916409,4294917437,4294918208,4294919236,4294920007,4294920778,4294921806,4294922577,4294923605,4294924376,4294925147,4294926175,4294926946,4294927974,4294928745,4294929516,4294930544,4294931315,4294932343,4294933114,4294933885,4294934913,4294935684,4294936712,4294937483,4294938254,4294939282,4294940053,4294941081,4294941852,4294942623,4294943651,4294944422,4294945450,4294946221,4294946992,4294948020,4294948791,4294949819,4294950590,4294951361,4294952389,4294953160,4294954188,4294954959,4294955730,4294956758,4294957529,4294958557,4294959328,4294960099,4294961127,4294961898,4294962926,4294963697,4294964468,4294965496,4294966267,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295]
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
                for (var i in world_coords) {
                   worldCoordinate = world_coords[i];
                   var pixelCoordinate = get_pixel_coord(worldCoordinate);
                   var tileCoordinate = get_tile_coord(pixelCoordinate);
                   //if (Math.abs(tileCoordinate.x - coord.x) < 2 && Math.abs(tileCoordinate.y - coord.y) < 2) { //cut off
                   
                   var tile_pixel_coord = {x: coord.x * 256, y: coord.y * 256}
                   
                   var left_dist = pixelCoordinate.x - tile_pixel_coord.x
                   var right_dist = tile_pixel_coord.x + 256 - pixelCoordinate.x
                   var top_dist = pixelCoordinate.y - tile_pixel_coord.y;
                   var bottom_dist = tile_pixel_coord.y + 256 - pixelCoordinate.y;
                   var buffer = -1 * config.radius * 2  //better algorithm?
                         if (left_dist > buffer && right_dist > buffer && top_dist > buffer && bottom_dist > buffer) {
                             var x = pixelCoordinate.x - 256 * coord.x;
                             var y = pixelCoordinate.y - 256 * coord.y;
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
                
                
                
                var data = flash.drawHeatMap({
                    'points' : my_points,
                    'radius' : $(the_mappy).attr('data-radius'), //config.radius,
                    'opacity' : $(the_mappy).attr('data-opacity'), //config.opacity,
                    'centerValue' : $(the_mappy).attr('data-centerValue'), //config.centerValue
                    'gradient' : config.gradient //[0,50331903,100663551,167772415,218104063,285212927,335544575,385876223,452985077,503316726,570425591,620757240,671088889,738197753,788529401,855638266,905969914,956301562,1023410427,1073742071,1140850935,1191182584,1241514232,1308623096,1358954744,1426063609,1476395257,1526726905,1593835770,1644167418,1711276282,1761607930,1811939578,1879048440,1929380090,1996488954,2046820603,2097152251,2164261113,2214592761,2281701625,2332033273,2382364923,2449473787,2499805436,2566914298,2617245946,2667577594,2734686458,2785018106,2852126972,2902458620,2952790267,3019899132,3070230780,3137339644,3187671292,3238002939,3305111803,3355443452,3422552316,3472883964,3523215612,3590324477,3640656124,3707764988,3758096636,3808428285,3875537149,3925868797,3992977662,4043309309,4093640957,4160749822,4211081470,4278190335,4278386939,4278583544,4278845684,4279042289,4279304430,4279501034,4279697639,4279959779,4280156384,4280418525,4280615129,4280811734,4281073874,4281270479,4281532620,4281729224,4281925829,4282187969,4282384574,4282646715,4282843319,4283039924,4283302064,4283498669,4283760810,4283957414,4284154019,4284416159,4284612764,4284874905,4285071509,4285268114,4285530254,4285726859,4285989000,4286185604,4286382209,4286644349,4286840954,4287103095,4287299699,4287496304,4287758444,4287955049,4288217190,4288413794,4288610399,4288872539,4289069144,4289331285,4289527889,4289724494,4289986634,4290183239,4290445380,4290641984,4290838589,4291100729,4291297334,4291559475,4291756079,4291952684,4292214824,4292411429,4292673570,4292870174,4293066779,4293328919,4293525524,4293787665,4293984269,4294180874,4294443014,4294639619,4294901760,4294902531,4294903302,4294904330,4294905101,4294906129,4294906900,4294907671,4294908699,4294909470,4294910498,4294911269,4294912040,4294913068,4294913839,4294914867,4294915638,4294916409,4294917437,4294918208,4294919236,4294920007,4294920778,4294921806,4294922577,4294923605,4294924376,4294925147,4294926175,4294926946,4294927974,4294928745,4294929516,4294930544,4294931315,4294932343,4294933114,4294933885,4294934913,4294935684,4294936712,4294937483,4294938254,4294939282,4294940053,4294941081,4294941852,4294942623,4294943651,4294944422,4294945450,4294946221,4294946992,4294948020,4294948791,4294949819,4294950590,4294951361,4294952389,4294953160,4294954188,4294954959,4294955730,4294956758,4294957529,4294958557,4294959328,4294960099,4294961127,4294961898,4294962926,4294963697,4294964468,4294965496,4294966267,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295,4294967295]
                });
                
                
                 
                return "data:image/png;base64," + data;
                //can return an html element too  
              },
              tileSize: new google.maps.Size(256, 256),
              isPng: true
    };  
    var heat_map = new google.maps.ImageMapType(heat_map_options);
       
       
            //http://code.google.com/apis/maps/documentation/javascript/overlays.html#TileCoordinates
            //http://code.google.com/apis/maps/documentation/javascript/examples/map-coordinates.html
            var MERCATOR_RANGE = 256;
             
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

                   //hide the flash
                   //chrome doesn't like when you hide it this way                         
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
                              config.map.overlayMapTypes.insertAt(1, coordinateMapType) //works
                         } else {
                               config.map.overlayMapTypes.insertAt(0, heat_map)
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
           

           //swfobject.embedSWF("HelloWorld.swf", "map", "100", "100", "9"); // , expressInstallSwfurl, flashvars, params, attributes, callbackFn) 
            
            /*
            $(document.body).append('<object  classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' 
                             + ' id="'+callback+"_id"+'" width="300" height="300" type="application/x-shockwave-flash" '
                             +'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">' 
                             +'<param name="movie" value="'+config.swf+'" /> '
                             +'<param name="quality" value="high" /> '
                             +'<param name="bgcolor" value="#869ca7" />' 
                             +'<param name="flashVars" value="callback='+callback+'" /> '
                             +'<param name="allowScriptAccess" value="always" /> '
                             +'<embed src="'+config.swf+'" quality="high" bgcolor="#869ca7"'
                             +   'width="300" height="300" name="'+callback+"_id"+'" align="middle"'
                             +   'play="true" loop="false" quality="high" allowScriptAccess="always"'
                             +   'type="application/x-shockwave-flash"'
                             +   'pluginspage="http://www.macromedia.com/go/getflashplayer" flashVars="callback='+callback+'"> '
                             +'</embed>'
                             + '</object> ')
           
        */
        
      return this;
   };
 
 })(jQuery);