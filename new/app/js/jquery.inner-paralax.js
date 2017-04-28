window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        function(callback ){
            window.setTimeout(callback, 1000 / 60);
        };

})();

( function(){

    $( function(){

        $.each($('.swiper-container'), function () {
            new InitSwiper($(this));
        });

        $.each($('.map'), function () {
            new Map($(this));
        });

        $.each($('.map-container'), function () {
            new MapControl($(this));
        });

        $.each($('.site__header_min'), function () {
            new MenuBtn($(this));
        });

        new Page();

        if ( $( "#project-order__slider").length ){
            var min = $( "#project-order__slider").data('min'),
                max = $( "#project-order__slider").data('max'),
                defMax = $( "#project-order__slider").data('default-max'),
                defMin = $( "#project-order__slider").data('default-min'),
                nod = document.createTextNode(String.fromCharCode(8364)),
                txt = nod.textContent;

            $( "#project-order__slider" ).slider({
                range: true,
                min: min,
                max: max,
                values: [ defMin, defMax ],
                slide: function( event, ui ) {
                    //$( "#amount" ).val( txt);
                    $( "#amount" ).val( txt + Math.round(ui.values[ 0 ]/1000)+ "K - " + txt + Math.round(ui.values[ 1 ]/1000) + "K" );
                }
            });
            $( "#amount" ).val( txt + " " + Math.round($( "#project-order__slider" ).slider( "values", 0 )/1000) +
            "K - " + txt + " " + + Math.round($( "#project-order__slider" ).slider( "values", 1 )/1000) + "K" );

        }

        $.each($('.tabs'), function () {
            new Tabs ($(this));
        });

        $.each($('.play-teaser'), function () {
            new PlayTeaser ($(this));
        });

        $.each($('.estimation-alvarez__video'), function () {
            new PlayTeaser ($(this));
        });

        $.each($('.dapper'), function () {
            new BlockAnimation ($(this));
        });

        $.each( $('.slides'), function () {
            new Slides( $(this) );
        });

        $.each( $('.site__header_landing'), function () {
            new Stars();
            new ScrollPanel( $(this) );
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

    var MenuBtn = function (obj) {

        //private properties
        var _self = this,
            _menuBtn = obj.find('.site__header__open-menu'),
            _logo = obj.find('.logo'),
            _menu = obj.find('.menu');

        //private methods
        var _addEvents = function () {
                $(window).on({
                    'resize': function(){
                        if($(this).width()<1025){
                            _menuBtn.removeClass('active');
                            _logo.attr('style','');
                            _menu.attr('style','');
                        }
                    }
                });

                _menuBtn.on({
                    'click': function(){
                        if(!$(this).hasClass('active')){
                            $(this).addClass('active');
                            _menu.css({display:'block'});
                            _logo.css({opacity:'0'});
                            setTimeout(function(){
                                _logo.css({display:'none'});
                                _menu.css({opacity:1});
                            },300);
                        }else{
                            $(this).removeClass('active');
                            _menu.css({opacity:'0'});
                            _logo.css({display:'block'});
                            setTimeout(function(){
                                _logo.css({opacity:'1'});
                                _menu.css({display:'none'});
                            },300)
                        }

                        return false;
                    }
                })

            },
            _init = function () {

                _addEvents();

            };

        //public properties

        //public methods


        _init();
    };

    var InitSwiper = function (obj) {

        //private properties
        var _self = this,
            _items = obj.find('.swiper-slide'),
            _img = obj.find('img');

        //private methods
        var _addEvents = function () {
                $(window).on({
                    'resize': function(){
                        _self.imgHeight = _img.height();
                        _items.css({height:''+_self.imgHeight+' !important'});
                        if($(this).width()<=1025){
                            _self.swiper.destroy(false, true);
                            _initSwiperMobile();
                        }else{
                            _self.swiper.destroy(false, true);
                            _initSwiperDesktop();

                        }
                    }

                });
                $(window).on({
                    'load': function(){
                        if($(this).width()<=1025){
                            _initSwiperMobile();

                        }else{
                            _initSwiperDesktop();
                        }
                    }

                });

            },
            _initSwiperDesktop = function(){
                _self.swiper = new Swiper(obj, {
                    pagination: '.swiper-pagination',
                    direction: 'vertical',
                    paginationClickable: true
                });
            },
            _initSwiperMobile = function(){
                _self.swiper = new Swiper(obj, {
                    pagination: '.swiper-pagination',
                    direction: 'horizontal',
                    paginationClickable: true,
                });
            },
            _init = function () {
                //_initSwiper();
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
                        //disableDefaultUI: true,
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
            _header = $('.site__header'),
            _headerImage = $('<div class="site__header-image"></div>'),
            _headerSubTitle = _header.find('.site__header-title'),
            _menu = new Menu( _header.find('.menu') ),
            _action = true,
            _siteScroll = null,
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
                _site.on({
                    scroll: function () {
                        _checkHeaderBack();
                        _menu.checkMenu();
                    }
                });
            },
            _addHeagerImage = function(){
                _headerImage.append('<div>');
                _headerImage.find('div').css({
                    'background-image':_header.css('background-image')
                });
                _header.prepend(_headerImage);
            },
            _checkHeaderBack = function(){

                _headerImage.find('div').css({
                    '-webkit-transform': 'translate(0px, '+_site.scrollTop()/2+'px)',
                    'transform': 'translate(0px, '+_site.scrollTop()/2+'px)'
                });
            },
            _init = function () {
                _body[0].page = _self;
                _addHeagerImage();
                _addEvents();
                _initTriangles();
                _loop(0);
            },
            _initTriangles = function(){
                $.each($('.triangle'), function () {
                    new Triangle( $(this) );
                });
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
            _showSite = function(){
                setTimeout(function(){
                    _startAnimationTime = _selfTime;
                    _canDraw = true;
                },500);

                setTimeout(function(){
                    _preloader.addClass('preloader_loaded');
                    _headerSubTitle.addClass('site__header-title_loaded');
                    setTimeout(function(){
                        _action = false;
                        _preloader.remove();
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
            _site = $('.site'),
            _header = $('.site__header'),
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
                    },
                    'DOMMouseScroll':function(e){

                        var delta =  e.originalEvent.detail;

                        if( delta ) {
                            var direction = ( e.originalEvent.detail > 0 ) ? 1 : -1;

                            if (direction > 0 && _obj.hasClass('menu_fixed_shown') && !_obj.hasClass('menu_fixed-out')) {
                                _obj.addClass('menu_fixed-out');
                            }

                            if (direction < 0 && _obj.hasClass('menu_fixed-out')) {
                                _obj.removeClass('menu_fixed-out');
                            }
                        }
                    },
                    'mousewheel': function(e){

                        var delta = e.originalEvent.wheelDelta;

                        if( delta ) {
                            var direction = ( e.originalEvent.wheelDelta > 0 ) ? -1 : 1;

                            if (direction > 0 && _obj.hasClass('menu_fixed_shown') && !_obj.hasClass('menu_fixed-out')) {
                                _obj.addClass('menu_fixed-out');
                            }

                            if (direction < 0 && _obj.hasClass('menu_fixed-out')) {
                                _obj.removeClass('menu_fixed-out');
                            }
                        }

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

                if ($('.menu').length) {
                    _body.append(_showBtn);
                }

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
        _self.checkMenu = function(){
            if( _site.scrollTop()>=_header.outerHeight() && !_obj.hasClass( 'no-action' ) ){
                _obj.addClass('menu_fixed');
                setTimeout(function(){
                    _obj.addClass('menu_fixed_shown');
                }, 510)
            } else {
                _obj.removeClass('menu_fixed');
                _obj.removeClass('menu_fixed_shown');
            }
        };

        _init();
    };

    var Triangle = function (obj) {

        //private properties
        var _self = this,
            _window = $(window),
            _triangle = $('<div class="triangle__item"/>'),
            _obj = obj;

        //private methods
        var _addEvents = function () {
                _window.on({
                    resize: function () {
                        _setSize();
                    }
                });
            },
            _init = function () {
                _obj.prepend(_triangle);
                _addEvents();
                _setSize();
            },
            _setSize = function(){
                _triangle.css({
                    'border-width': '0 0 '+Math.round(_window.width() *.104166667)+'px '+_window.width()+'px'
                });
            };


        //public properties

        //public methods


        _init();
    };

    var Tabs = function (obj) {

        this.tabs = obj;
        this.dt = obj.find('dt');
        this.dd = obj.find('dd');

        var _self = this;

        var addEvents = function () {
                $(window).on({
                    'load': function(){
                        if ( $(window).width() >991 ){
                            var ddHeight = _self.dt.filter('.active').next('dd').innerHeight();
                            _self.tabs.css({'min-height': ddHeight+2+_self.dt.filter('.active').next('dd').position().top});
                            sizeCalculation();
                        }
                        if ( $(window).width() <992 ){
                            var ddHeight = _self.dt.filter('.active').next('dd').innerHeight();
                            _self.tabs.css({'min-height': ddHeight+2+_self.dt.filter('.active').next('dd').position().top});
                        }
                    }
                });
                $(window).on({
                    'resize': function(){
                        if ( $(window).width() > 991 ){
                            var ddHeight = _self.dt.filter('.active').next('dd').innerHeight();
                            _self.tabs.css({'min-height': ddHeight+2+_self.dt.filter('.active').next('dd').position().top});
                            sizeCalculation();
                        }
                        if ( $(window).width() < 992 ){
                            var ddHeight = _self.dt.filter('.active').next('dd').innerHeight();
                            _self.tabs.css({'min-height': ddHeight+2+_self.dt.filter('.active').next('dd').position().top});
                        }
                    }
                });
                _self.dt.on({
                    'click': function(){
                        var curItem = $(this),
                            curItemsNext = curItem.next(),
                            curItemsNextHeight = curItemsNext.innerHeight();
                        if ( $(window).width() > 991 ){
                            if(!curItem.hasClass('active')){
                                _self.dt.removeClass('active');
                                _self.dd.css('display','none');
                                curItem.addClass('active');
                                curItemsNext.fadeIn(300);
                                _self.tabs.animate({
                                    'min-height': curItemsNextHeight+2+_self.dt.filter('.active').next('dd').position().top
                                }, 300);
                            }
                        }
                        if ( $(window).width() < 992 ){
                            if(!curItem.hasClass('active')){
                                _self.dt.removeClass('active');
                                _self.dd.slideUp(700);
                                curItem.addClass('active');
                                curItemsNext.slideDown(700);
                                _self.tabs.animate({
                                    'min-height': curItemsNextHeight+2
                                }, 700, function(){
                                    curItemsNext.css({
                                        "display": "inline-block"
                                    });
                                });
                                $('html, body').stop().animate({
                                    scrollTop: _self.tabs.offset().top - 130
                                }, 700);
                                return false;
                            }
                        }
                    }
                })
            },
            startView = function(){
                _self.dt.filter('.active').next('dd').css('display','inline-block');

            },
            sizeCalculation = function(){
                var dlLeft = _self.tabs.offset().left,
                    dlRight = $(window).width() - dlLeft - _self.tabs.innerWidth();
                _self.dd.css({
                    "left": -dlLeft,
                    "right": -dlRight
                });
            },
            init = function () {
                startView();
                addEvents();
            };

        init();
    };

    var PlayTeaser = function (obj) {

        var _obj = obj,
            _videoPopup = $(".popup-video"),
            _centering = _videoPopup.find(".centering > div"),
            _videoClose = _videoPopup.find(".popup-video__close"),
            _videoInner = _videoPopup.find(".popup-video__inner"),
            _menuBtn = $(".menu__btn");

        var _addEvents = function () {

                _obj.on({
                    click: function(){
                        var way = $(this).attr('data-video');
                        _videoPopup.addClass('active');
                        _videoInner.append( way );
                        _menuBtn.css({
                            "visibility": "hidden",
                            "opacity": "0"
                        });
                        return false;
                    }
                });

                _centering.on( {
                    click: function(){
                        _closePopap();
                    }
                } );

                _videoClose.on({
                    click: function(){
                        _closePopap();
                        return false;
                    }
                });

                $(document).keydown(function(e) {
                    if (_videoPopup.hasClass("active")){
                        if (e.which == '27') {
                            _closePopap();
                        }
                    }
                });

            },
            _closePopap= function () {
                $('.popup-video__inner iframe').remove();
                _videoPopup.removeClass('active');
                _menuBtn.css({
                    "visibility": "visible",
                    "opacity": "1"
                });
            },

            _init = function () {
                _addEvents();
            };

        _init();
    };

    var BlockAnimation = function (obj) {

        var _obj = obj,
            _site = $(".site");

        var _addEvents = function () {

                _site.on({
                    scroll: function(){
                        var windowHeight = $(window).height();
                        if ( _obj.offset().top < windowHeight - 100 ){
                            _obj.addClass("active");
                        }
                    }
                });

            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

    var ScrollPanel = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _a = $('a[href*=#]'),
            _site = $('.site');

        //private methods
        var _addEvents = function () {
                _a.on({
                    'click': function(){
                        _scrollToElem()
                    }
                });
            },

            _filterPath = function (string) {
                return string
                    .replace(/^\//, '')
                    .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
                    .replace(/\/$/, '');
            },

            _scrollToElem = function () {

                var locationPath = _filterPath(location.pathname),
                    scrollElem = _scrollableElement('html', 'body', 'document', 'window', _site);

                $('a[href*=#]').each(function () {

                    var thisPath = _filterPath(this.pathname) || locationPath;

                    if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {

                        var $target = $(this.hash),
                            target = this.hash;

                        if (target) {

                            if ($target.offset()) {

                                var targetOffset = $target.offset().top,
                                    animSpeed = targetOffset/2;

                                event.preventDefault();

                                $(scrollElem).animate({

                                    scrollTop: targetOffset

                                }, animSpeed, function () {

                                    location.hash = target;

                                });
                            }

                        }
                    }
                });

            },

            _scrollableElement = function (els) {

                for (var i = 0, argLength = arguments.length; i < argLength; i++) {

                    var el = arguments[i],
                        $scrollElement = $(el);

                    if ($scrollElement.scrollTop() > 0) {
                        return el;
                    } else {
                        $scrollElement.scrollTop(1);
                        var isScrollable = $scrollElement.scrollTop() > 0;
                        $scrollElement.scrollTop(0);
                        if (isScrollable) {
                            return el;
                        }
                    }
                }
                return 'body';
            },

            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

    var Stars = function () {

        var _canvas,
            _canvasWidth,
            _canvasHeight,
            _ctx,
            _g,
            _numberOf,
            _parentCanvas = document.getElementById('header-stars'),
            _stars = new Array(),
            _window = $(window),
            _fps = 60;

        var _addEvents = function () {

                _window.on({
                    resize: function(){
                        _render()
                    }
                });

            },

            _initCanvas = function () {

                _canvas = document.getElementById('canvas');
                _ctx = _canvas.getContext('2d');

                _canvasWidth = _parentCanvas.offsetWidth;
                _canvasHeight = _parentCanvas.offsetHeight;

                _canvas.width = _canvasWidth;
                _canvas.height = _canvasHeight;

                if (window.innerWidth<768) {
                    _numberOf = 60;
                }else{
                    _numberOf = 100;
                }

                for(var i = 0; i < _numberOf; i++) {
                    _stars[i] = new Circle();
                    _stars[i].reset();
                }

                setInterval(_draw,_fps);

            },

            _render = function () {

                _canvasWidth = _parentCanvas.offsetWidth;
                _canvasHeight = _parentCanvas.offsetHeight;

                _canvas.width = _canvasWidth;
                _canvas.height = _canvasHeight;

                if (window.innerWidth<768) {
                    _numberOf = 60;
                }else{
                    _numberOf = 100;
                }

                for(var i = 0; i < _numberOf; i++) {
                    _stars[i] = new Circle();
                    _stars[i].reset();
                }

                _draw()

            },

            _draw = function () {

                _ctx.clearRect(0,0,_canvasWidth, _canvasHeight);

                for(var i = 0; i < _stars.length; i++) {

                    _stars[i].fade();
                    _stars[i].move();
                    _stars[i].draw();

                }

            },

            Circle= function () {

                var self = this;

                self.s = {
                    ttl:8000,
                    xmax:5,
                    ymax:2,
                    rmax:7,
                    rt:1,
                    xdef:960,
                    ydef:540,
                    random:true,
                    blink:true
                };

                self.reset = function() {

                    self.x = (self.s.random ? _canvasWidth*Math.random() : self.s.xdef);
                    self.y = (self.s.random ? _canvasHeight*Math.random() : self.s.ydef);
                    self.r = ((self.s.rmax-1)*Math.random()) + 1;
                    self.dx = (Math.random()*self.s.xmax) * (Math.random() < .5 ? -1 : 1);
                    self.dy = (Math.random()*self.s.ymax) * (Math.random() < .5 ? -1 : 1);
                    self.hl = (self.s.ttl/_fps)*(self.r/self.s.rmax);
                    self.rt = Math.random()*self.hl;
                    self.s.rt = Math.random()+1;
                    self.stop = Math.random()*.2+.4;

                };

                self.fade = function() {

                    self.rt += self.s.rt;

                };

                self.draw = function() {

                    if(self.s.blink && (this.rt <= 0 || this.rt >= self.hl)) self.s.rt = self.s.rt*-1;
                    else if(this.rt >= self.hl) self.reset();

                    var newo = 1-(self.rt/self.hl);

                    _ctx.beginPath();
                    _ctx.arc(self.x,self.y,self.r,0,Math.PI*2,true);
                    _ctx.closePath();

                    var cr = self.r*newo;

                    _g = _ctx.createRadialGradient(self.x,self.y,0,self.x,self.y,(cr <= 0 ? 1 : cr));
                    _g.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
                    _g.addColorStop(self.stop, 'rgba(77,101,181,'+(newo*.6)+')');
                    _g.addColorStop(1.0, 'rgba(77,101,181,0)');
                    _ctx.fillStyle = _g;
                    _ctx.fill();
                };

                self.move = function() {

                    self.x += (self.rt/self.hl)*self.dx;
                    self.y += (self.rt/self.hl)*self.dy;
                    if(self.x > _canvasWidth || self.x < 0) self.dx *= -1;
                    if(self.y > _canvasHeight || self.y < 0) self.dy *= -1;

                };

                self.getX = function() { return self.x; };
                self.getY = function() { return self.y; };

            },

            _init = function () {
                _addEvents();
                _initCanvas()

            };

        _init();
    };

    var TreasuryGrid = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.treasury__grid-card');

        //private methods
        var _addEvents = function () {
                _items.on({
                    click: function(){
                        location.href = $( this).find('a').attr('href');
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

    /*var Slides = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( '.site' );

        //private methods
        var _onEvents = function () {
                _window.on({
                    scroll: function () {

                        _checkScroll();

                    }
                });
            },
            _checkScroll = function(){

                var windowH = _window.height();

                _obj.each(function () {

                    var curItem = $(this),
                        topPos = _obj.offset().top;

                    if( _window.scrollTop() > (topPos - windowH/1.3) && !curItem.hasClass( 'animation' ) ){

                        curItem.addClass( 'animation' );

                    }
                })
            },
            _init = function () {
                _obj[0].slides = _self;
                _onEvents();
                _checkScroll();
            };

        //public properties

        //public methods

        _init();
    };*/

} )();


