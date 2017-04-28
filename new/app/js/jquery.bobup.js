window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        function(callback ){
            window.setTimeout(callback, 1000 / 60);
        };

})();
( function(){

    $( function(){

        new Page();

        $.each($('.bobup__tabs'), function () {
            new Tabs( $( this ) );
        });
        $.each($('.site__header_min'), function () {
            new MenuBtn($(this));
        });
        $.each($('.bobup__review'), function () {
            new Paralax($(this));
        });
        $('.bobup__content-title').each( function(){
            new BobupTitles( $( this ) );
        } );
        $.each( $('.bobup__header-pic'), function () {
            new Slides( $(this),.5 );
        });
        $.each( $('.bobup__concept-photo'), function () {
            new Slides( $(this),.5 );
        });
        $.each( $('.bobup__design-list'), function () {
            new Slides( $(this),.5 );
        });
        $.each( $('.bobup__experience-sheet'), function () {
            new Slides( $(this),.5 );
        });
        $.each( $('.bobup__mac'), function () {
            new Slides( $(this),.5 );
        });
        $.each( $('.bobup__design-colors'), function () {
            new Slides( $(this),.5 );
        });
        $.each( $('.bobup__review-workers'), function () {
            new Slides( $(this),.5 );
        });
    } );

    var Paralax = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _animBlock = _obj.find('.bobup__review-workers'),
            _objTopPos = _obj.offset().top,
            _nextTopPos = $('.bobup__experience').offset().top,
            _window = $( window ),
            _site = $( '.site' );

        //private methods
        var _addEvents = function () {
                _site.on({
                    scroll: function () {
                        _checkScroll();
                    }
                });

                _window.on({
                    resize: function () {
                        _objTopPos = _obj.offset().top;
                        _nextTopPos = $('.bobup__experience').offset().top;
                    }
                });
            },
            _checkScroll = function(){

                    var siteScroll = _site.scrollTop();

                    if (siteScroll>_objTopPos-700 && siteScroll<_nextTopPos-700 && _window.width()>=1200) {
                        _animBlock.addClass('active');
                        _animBlock.css({
                            'transform': 'translateY('+ siteScroll/2*1.5+'px)',
                            '-webkit-transform': 'translateY('+ siteScroll/2*1.5+'px)',
                            '-ms-transform': 'translateY('+ siteScroll/2*1.5+'px)'
                        });
                    }

                    if (siteScroll>_objTopPos-700 && siteScroll<_nextTopPos-700 && _window.width()>=1920) {
                        _animBlock.addClass('active');
                        _animBlock.css({
                            'transform': 'translateY('+ siteScroll/2*1.7+'px)',
                            '-webkit-transform': 'translateY('+ siteScroll/2*1.7+'px)',
                            '-ms-transform': 'translateY('+ siteScroll/2*1.7+'px)'
                        });
                    }



            },
            _init = function () {
                _addEvents();
                _checkScroll();
            };

        //public properties

        //public methods


        _init();
    };

    var Tabs = function (obj) {

        var _obj = obj,
            _tabBtn = _obj.find('li'),
            _tabWrap = _obj.find('.bobup__tabs-wrapper'),
            _tabItem = _tabWrap.find(' > div'),
            _tabControls = _obj.find(' ul ');

        var _addEvents = function () {

                _tabBtn.on({
                    click: function(){
                        var curItem = $(this),
                            index = curItem.index();

                        _tabBtn.removeClass("active");
                        _tabBtn.eq(index).addClass("active");

                        _showTab(index);

                        _tabControls.removeClass("active");
                    }
                });

            },

            _loadTab = function(){
                var index = _tabBtn.filter('.active').index();

                if ( index == "-1" ){
                    index = 0;
                    _tabBtn.eq(index).addClass("active");
                }

                _showTab(index);
            },
            _showTab = function(i){

                var activeTab = _tabItem.eq(i);

                _tabItem.fadeOut(200);

                setTimeout(function () {
                    activeTab.fadeIn(200);
                },300);

                if (activeTab.find('.bobup__tabs-marketing-chart').length) {
                    setTimeout(function () {
                        $('.bobup__tabs-marketing-chart').addClass('animation')
                    },500);
                }else if (activeTab.find('.bobup__tabs-print-sheet').length) {
                    setTimeout(function () {
                        $('.bobup__tabs-print-sheet').addClass('animation')
                    },500);
                }else if (activeTab.find('.bobup__tabs-chart').length) {
                    setTimeout(function () {
                        $('.bobup__tabs-chart').addClass('animation')
                    },500);
                }

            },
            _init = function () {
                _addEvents();
                _loadTab();
            };

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
            if(_site.scrollTop()>=_header.outerHeight()){
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

    var BobupTitles = function (obj) {

        //private properties
        var _self = this,
            _window = $( window ),
            _triangle = $( '<div/>'),
            _obj = obj,
            _content = _obj.find( 'h2' );

        //private methods
        var _addEvents = function () {
                _window.on( {
                    resize: function(){
                        _setSize();
                    }
                } );
            },
            _createTriangle = function(){
                _obj.append( _triangle );
            },
            _init = function () {
                _addEvents();
                _createTriangle();
                _setSize();
                _obj[0].bobupTitles = _self;

            },
            _setSize = function (){
                _triangle.css( {
                    borderRightWidth: _content.outerWidth(),
                    borderLeftWidth: _content.outerWidth()
            } );
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

    var Page = function () {

        //private properties
        var _self = this,
            _window = $( window ),
            _preloader = $('.preloader'),
            _preloaderWrap = _preloader.find(">div"),
            _preloaderCanvas = document.createElement('canvas'),
            _ctx = _preloaderCanvas.getContext('2d'),
            _header = $('.site__header'),
            _menu = new Menu( _header.find('.menu') ),
            _action = true,
            _startAnimationTime = 0,
            _selfTime = 0,
            _duration = 500,
            _canDraw = false;

        _preloaderCanvas.width = _preloaderCanvas.height = _preloaderWrap.width() + 4;
        _preloaderWrap.append($(_preloaderCanvas));

        //private methods
        var _addEvents = function () {
                _window.on({
                    load: function(){
                        _showSite();
                    }
                });
            },
            _init = function () {
                _addEvents();
                _loop( 0 );
            },
            _addCircle = function(fillPercent){

                _ctx.clearRect(0, 0, _preloaderCanvas.width, _preloaderCanvas.height );
                _ctx.beginPath();
                _ctx.arc(101, 101, 99, 1.5*Math.PI, (1.5 + 2*fillPercent) * Math.PI);

                _ctx.lineWidth=3;
                _ctx.strokeStyle="#96c11f";
                _ctx.stroke();
            },
            _draw = function(){
                var fillPercent = ( _selfTime - _startAnimationTime )/_duration;
                _addCircle(fillPercent);
                if ( fillPercent == 1 ){
                    _canDraw = false;
                }
            },
            _loop = function(time){
                _selfTime = time;

                if ( _canDraw ){
                    _draw();
                }
                requestAnimFrame(_loop);

            },
            _showSite = function(){
                setTimeout( function(){
                    _startAnimationTime = _selfTime;
                    _canDraw = true;
                }, _duration );

                setTimeout(function(){
                    _preloader.addClass( 'preloader_loaded' );
                    setTimeout( function(){
                        _action = false;
                        _canDraw = false;
                        _preloader.remove();
                    }, 500 );
                }, _duration * 2 );
            };

        //public properties

        //public methods


        _init();
    };

    var Slides = function (obj, shownPercent) {

        //private properties
        var _self = this,
            _obj = obj,
            _shownPercent = shownPercent || 0.75,
            _window = $( window ),
            _site = $( '.site' );

        //private methods
        var _addEvents = function () {
                _site.on({
                    scroll: function () {
                        _checkScroll();
                    }
                });
            },
            _checkScroll = function(){
                var windowH = _window.height(),
                    topPos = _obj.offset().top,
                    visiblePercent = 1-(topPos/windowH);

                if( visiblePercent > _shownPercent ){
                    if( !_obj.hasClass('animation') ){
                        _obj.addClass('animation');
                    }
                }

            },
            _init = function () {
                _obj[0].slides = _self;
                _addEvents();
                _checkScroll();
            };

        //public properties

        //public methods


        _init();
    };

} )();


$('.treasury__grid-card').on('click', function(event) {
    event.preventDefault();
    window.location.href = $(this).find('a').attr('href');
});
