window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

( function(){
    $( function(){

        new Page();

        $.each($('.map-container'), function () {
            new MapControl($(this));
        });

        $.each($('.map'), function () {
            new Map($(this));
        });
        $.each($('.treasury__grid'), function () {
            new TreasuryGrid($(this));
        });



    } );

    var MapControl = function (obj) {

        //private properties
        var _self = this,
            _items = obj.find('.map-container__item'),
            _btnOpenMapWrap = obj.find('.map-container__open'),
            _btnOpenMap = obj.find('.map-container__open a'),
            _btnCloseMap = obj.find('.map-container__maximize');

        //private methods
        var _addEvents = function () {
                $(window).on({
                    'resize': function(){
                        _windowsWidth();
                        $('.map-container__address').removeClass('active');
                        if(_self.winWidth<1025){
                            setTimeout(function(){
                                _items.css({display:'block'});
                                _btnOpenMapWrap.css({display:'block'});
                            },100);
                            setTimeout(function(){
                                _items.css({opacity:1});
                            },500);
                        }else{
                            setTimeout(function(){
                                _items.css({display:'inline-block'});
                                _btnOpenMapWrap.css({display:'inline-block'});
                            },100);
                            setTimeout(function(){
                                _btnOpenMapWrap.css({opacity:1});
                            },500);
                        }
                    }
                });
                $(window).on({
                    'load': function(){
                        _windowsWidth();
                    }
                });
                _btnOpenMap.on({
                    'click': function(){
                        var curItem = $(this),
                            curItemParent = curItem.parents('.map-container__address');
                        curItemParent.addClass('active');
                        if(_self.winWidth<1025){
                            _items.css({opacity:0, display:'none'});
                        }else{

                            _btnOpenMapWrap.css({opacity:0, display:'none'});
                        }

                        return false;
                    }
                });
                _btnCloseMap.on({
                    'click': function(){
                        var curItem = $(this),
                            curItemParent = curItem.parents('.map-container__address');
                        curItemParent.removeClass('active');
                        if(_self.winWidth<1025){
                            setTimeout(function(){
                                _items.css({display:'block'});
                                _btnOpenMapWrap.css({display:'block'});
                            },100);
                            setTimeout(function(){
                                _items.css({opacity:1});
                            },500);
                        }else{
                            _items.css({opacity:0, display:'none'});
                            setTimeout(function(){
                                _items.css({display:'inline-block'});
                                _btnOpenMapWrap.css({display:'inline-block'});
                            },100);
                            setTimeout(function(){
                                _items.css({opacity:1});
                                _btnOpenMapWrap.css({opacity:1});
                            },500);
                        }

                        return false;
                    }
                });
            },
            _windowsWidth = function(){
                _self.winWidth = $(window).width();
            },
            _init = function () {

                _addEvents();

            };

        //public properties

        //public methods


        _init();
    };

    var Map = function (obj) {

        //private properties
        var _self = this,
            _window = $(window),
            _mapData = obj.data('map'),
            _map = null,
            _obj = obj;

        //private methods
        var _addEvents = function () {

            },
            _getMapData = function(){
                _mapData.center = new google.maps.LatLng(_mapData.center[0], _mapData.center[1]);

                $.each(_mapData.points, function (i) {
                    _mapData.points[i] = new google.maps.LatLng(this[0], this[1]);

                });
            },
            _init = function () {
                _getMapData();

                google.maps.event.addDomListener(window, 'load', _initMap);

                _addEvents();
            },
            _initMap= function(){

                var MY_MAPTYPE_ID = 'custom_style',
                    featureOpts = [
                        {
                            featureType: "administrative",
                            elementType: "geometry",
                            stylers: [
                                { saturation: -100 }
                            ]
                        },{
                            featureType: "landscape",
                            stylers: [
                                { saturation: -100 }
                            ]
                        },{
                            featureType: "poi",
                            stylers: [
                                { saturation: -100 }
                            ]
                        },{
                            featureType: "road",
                            stylers: [
                                { saturation: -100 }
                            ]
                        },{
                            featureType: "transit",
                            stylers: [
                                { saturation: -100 }
                            ]
                        },{
                            featureType: "water",
                            stylers: [
                                { hue: "#0099dd" },
                                { gamma: 0.26 }
                            ]
                        }
                    ],
                    mapOptions = {
                        zoom: _mapData.zoom,
                        scrollwheel: false,
                        center: _mapData.center,
                        disableDefaultUI: true,
                        mapTypeControlOptions: {
                            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                        },
                        mapTypeId: MY_MAPTYPE_ID
                    },
                    styledMapOptions = {
                        name: 'Custom Style'
                    },
                    customMapType = null,
                    image = 'img/map.png';

                _map = new google.maps.Map(_obj[0], mapOptions);

                customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

                _map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

                $.each(_mapData.points, function () {
                    new google.maps.Marker({
                        position: this,
                        map: _map,
                        icon: image
                    });
                });

            };

        //public properties

        //public methods


        _init();
    };

    var Page = function () {

        //private properties
        var _self = this,
            _window = $( window ),
            _preloader = $('.preloader'),
            _preloaderWrap = _preloader.find(">div"),
            _preloaderCanvas = document.createElement('canvas'),
            _ctx = _preloaderCanvas.getContext('2d'),
            _site = $('.site'),
            _startAnimationTime = 0,
            _selfTime = 0,
            _duration = 500,
            _canDraw = false,
            _header = $('.site__header').not('.no-action'),
            _headerSubTitle = _header.find('.site__header-hero-wrap'),
            _scrollIcon = _header.find('.site__header-scroll-icon'),
            _menu = new Menu( _header.find('.menu') ),
            _headerHammer = null,
            _action = true,
            _siteScroll = null,
            _canScroll = false,
            _body = $('body');

        _preloaderCanvas.width = _preloaderCanvas.height = _preloaderWrap.width() + 4;
        _preloaderWrap.append($(_preloaderCanvas));

        //private methods
        var _addEvents = function () {
                _window.on({
                    load: function(){
                        _showSite();
                    }
                });
                _scrollIcon.on({
                    click: function () {
                        _checkScroll(1);
                    }
                });
            },
            _addEventsOnLoad = function(){
                _window.on({
                    'DOMMouseScroll':function(e){
                        var delta =  e.originalEvent.detail;

                        if( delta ){
                            var direction = ( delta > 0 ) ? 1 : -1;

                            if( !_action ){
                                _checkScroll(direction);
                            }

                            if( _action || !_canScroll ){
                                return false;
                            }
                        }

                    },
                    'mousewheel': function(e){
                        var delta = e.originalEvent.wheelDelta;

                        if( delta ){
                            var direction = ( delta > 0 ) ? -1 : 1;


                            if( !_action ){
                                _checkScroll(direction);
                            }

                            if( _action || !_canScroll ){
                                return false;
                            }
                        }



                    }
                });
                _headerHammer.on("panup", function(e){
                    if(e.pointerType == 'touch'){
                        if( !_action || _canScroll ){
                            _checkScroll(1);
                        }
                    }
                });
                _headerHammer.on("panstart", function(e){
                    if(e.pointerType == 'touch') {
                        _menu.moveMenu(e.pointers[0].pageX,e.deltaX, e.type);
                    }
                });
                _headerHammer.on("panend", function(e){
                    if(e.pointerType == 'touch') {
                        _menu.moveMenu(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });
                _headerHammer.on("panright", function(e){
                    if(e.pointerType == 'touch') {
                        _menu.moveMenu(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });
                _headerHammer.on("panleft", function(e){
                    if(e.pointerType == 'touch') {
                        _menu.moveMenu(e.deltaX,e.pointers[0].pageX, e.type)
                    }
                });
                _headerHammer.on("pandown", function(e){
                    if(e.pointerType == 'touch') {
                        if (!_action || _canScroll) {
                            _checkScroll(-1);
                        }
                    }
                });
            },
            _checkScroll = function(direction){
                if( direction > 0 && !_canScroll && !_menu.opened ){
                    _hideHeader();
                    _canScroll = true;
                } else if(direction < 0 && _canScroll && ( _site.scrollTop() == 0 ) ){
                    _showHeader();
                    _canScroll = false;
                }

                if(direction > 0 && _header.hasClass('site__header_hidden') && !_header.hasClass('site__header_hidden_out')  && !_action ){
                    _header.addClass('site__header_hidden_out');
                }

                if(direction < 0 && _header.hasClass('site__header_hidden_out') && !_action ){
                    _header.removeClass('site__header_hidden_out');
                }

            },
            _hideHeader = function(){
                if(!_action){
                    _action = true;

                    _header.addClass('site__header_hidden');

                    //for css animation
                    setTimeout(function(){
                        _action = false;
                    }, 1000);
                }
            },
            _init = function () {
                _body[0].page = _self;
                if(device.ios()){
                    _site.niceScroll({
                        horizrailenabled: false
                    });
                }
                _initHammer();
                _addEvents();
                _loop(0);
            },
            _initHammer = function(){
                _headerHammer = new Hammer.Manager($('body')[0]);

                _headerHammer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
            },
            _showHeader = function(){
                if(!_action){
                    _action = true;

                    _header.removeClass('site__header_hidden_out');
                    _header.removeClass('site__header_hidden');

                    //for css animation
                    setTimeout(function(){
                        _action = false;
                    }, 1000);
                }
            },
            _addCircle = function(fillPercent){
                _ctx.clearRect(0, 0, _preloaderCanvas.width, _preloaderCanvas.height );
                _ctx.beginPath();
                _ctx.arc(101, 101, 99, 1.5*Math.PI, (1.5 + 2*fillPercent) * Math.PI);

                _ctx.lineWidth=3;
                _ctx.strokeStyle="#96c11f";
                _ctx.stroke();
            },
            _draw = function(time){
                var fillPercent = ( time - _startAnimationTime )/_duration;
                _addCircle(fillPercent);
                if ( fillPercent == 1 ){
                    _canDraw = false;
                }
            },
            _loop = function(time){
                _selfTime = time;

                if ( _canDraw ){
                    _draw(time);
                }
                requestAnimFrame(_loop);

            },
            _initHeadline = function(){

                headLine($);

            },
            _showSite = function(){
                setTimeout(function(){
                    _startAnimationTime = _selfTime;
                    _canDraw = true;
                },500);

                setTimeout(function(){
                    _preloader.addClass('preloader_loaded');
                    _headerSubTitle.addClass('loaded');
                    _initHeadline();
                    setTimeout(function(){
                        _action = false;
                        _preloader.remove();
                        _addEventsOnLoad();
                    },500);
                }, 1000 );
            };

        //public properties

        //public methods


        _init();
    };

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _window = $(window),
            _body = $('body'),
            _showBtn = $('<button class="menu__btn"><span></span></button>'),
            _isMove = false,
            _panRight = false,
            _panLeft = false,
            _scroll = null,
            _obj = obj;

        //private methods
        var _addEvents = function () {
                document.body.addEventListener('touchstart', function(e){

                });
                document.body.addEventListener('touchmove', function(e){

                });
                document.body.addEventListener('touchend', function(e){

                });
                _showBtn.on({
                    click: function (event) {
                        var event = event || window.event; // кросс-браузерно
                        if (event.stopPropagation) {
                            // Вариант стандарта W3C:
                            event.stopPropagation();
                        } else {
                            // Вариант Internet Explorer:
                            event.cancelBubble = true;
                        }

                        if(_self.opened){
                            _hide();
                        } else {
                            _show();
                        }
                    }
                });
                _window.on({
                    resize: function () {
                        _hide();
                    }
                });
                _body.click(function(e){

                    var elem=$(e.target);

                    if( !elem.hasClass('menu') && !elem.parents('.menu').length ){
                        if(_self.opened) {
                            _hide();
                        }
                    }

                });
            },
            _appendMenuBtn = function(){
                _body.append(_showBtn);
            },
            _hide = function(){
                _self.opened = false;
                _obj.removeClass('menu_opened');
                _showBtn.removeClass('menu__btn_opened');
            },
            _init = function () {
                _appendMenuBtn();
                _addEvents();
                _initScroll();
            },
            _initScroll = function(){
                _scroll = _obj.niceScroll({
                    horizrailenabled: false
                });
            },
            _show = function() {
                _self.opened = true;

                _obj.addClass('menu_opened');
                _showBtn.addClass('menu__btn_opened');
            };

        //public properties
        _self.opened = false;

        //public methods
        _self.moveMenu = function(touchPosX, deltaX, type){

            if( type == 'panstart' && (touchPosX < 50 || _self.opened)){
                _isMove = true;
            } else if ( type == 'panright' && _isMove){
                _panRight = true;
            } else if ( type == 'panleft' && _isMove){
                _panLeft = true;
            } else if( type == 'panend'){
                if(_isMove && _panRight && !_self.opened){
                    _show();
                } else if(_isMove && _panLeft && _self.opened){
                    _hide();
                }
                _isMove = false;
                _panRight = false;
                _panLeft = false;

            }

        };

        _init();
    };

    var TreasuryGrid = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.treasury__grid-card'),
            _link = _items.find("a[target=_blank]");

        //private methods
        var _addEvents = function () {
                _items.on({
                    click: function(){
                        if ( $(this).hasClass("treasury__grid-card_new-tab") ){
                            var url = $( this).find('a').attr('href');
                            window.open(url, '_blank');
                        } else {
                            location.href = $( this).find('a').attr('href');
                        }
                    }
                });
                _link.on({
                    click: function(event){
                        event = event || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                });
            },
            _init = function () {
                _addEvents();
                _obj[0].treasuryGrid = _self;
            };

        //public properties

        //public methods


        _init();
    };

} )();
