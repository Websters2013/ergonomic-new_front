(function(){
    $( function(){
        $( '.pic-example' ).each( function(){

            new Example( $( this ) );
        } );
    } );

    var Example = function ( obj ) {

        //private properties
        var _obj = obj,
            _showBtn = $( '.popup__open' ).filter( '[data-popup=photos]' ),
            _images = _obj.find( 'img' ),
            _wraper = _obj.find( '> div' ),
            _window = $( window ),
            _swiper = null,
            _hammer = null,
            _line = null,
            _wrapWidth = 0,
            _control = null,
            _percent = .5,
            _prevPercent = 0,
            _container = null,
            _canMove = false,
            _curLeftPos = 0,
            _tempLeftPos = 0,
            _isMove = false,
            _interval = null;

        //private methods
        var _addEvents = function () {
                _window.on({
                    resize: function () {

                        _setSize();
                    }

                });
                _showBtn.on({
                    click: function () {

                        _setSize();
                    }
                });

                _control.on({
                    mouseenter: function () {

                        _animationControl( false );

                    }
                });

                _hammer.on( 'panstart', function() {

                    _animationControl( false );

                    _canMove = true;
                    _tempLeftPos = _curLeftPos;
                });
                _hammer.on( 'panend', function( e ) {

                    if( _isMove ){

                        _setNewPercent( e );
                    }

                    _isMove = false;
                    _canMove = false;
                });
                _hammer.on( 'panmove', function( e ) {

                    if( _canMove ){

                        _isMove = true;
                        _setNewPercent( e );
                    }
                });
            },
            _init = function () {

                _startView();
                _initHammer();
                _addEvents();
            },
            _setNewPercent = function(e){

                var newPercent = ( ( _tempLeftPos+ e.deltaX ) / _wrapWidth );

                if( newPercent > 1 ){

                    newPercent = 1;

                } else if ( newPercent < 0 ){

                    newPercent = 0;
                }
                _percent = newPercent;

                _setSize();
            },
            _setSize= function(){

                _wrapWidth =  _wraper.width();

                _container.width( _wrapWidth );

                _curLeftPos = _wrapWidth * _percent;

                _swiper.width( _curLeftPos );

                _line.css( {
                    left:  _curLeftPos
                } );

                _control.css( {
                    left:  _curLeftPos
                } );
            },
            _initHammer = function(){
                _hammer = new Hammer.Manager(_control[0]);
                _hammer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
            },
            _startView = function(){

                _wraper.css( {
                    backgroundImage: 'url('+ _images[0].src +')'
                } );

                _wraper.append( '<div class="pic-example__swiper"><div style="background-image: url('+ _images[1].src +')"></div></div>' );
                _swiper = _wraper.find( '.pic-example__swiper' );
                _container = _swiper.find( 'div' );
                _line = $( '<div class="pic-example__line"/>' );
                _control = $( '<div class="pic-example__control"/>' );
                _wraper.append( _line );
                _wraper.append( _control );

                _setSize();

                _line.addClass( 'animation' );
                _control.addClass( 'animation' );
                _swiper.addClass( 'animation' );

                _animationControl( true );

            },
            _animationControl = function ( flag ) {

                if ( flag ) {

                    _interval = setInterval(function () {

                        if ( _percent == .5 && _prevPercent == 0 ) {

                            _prevPercent = 'left';
                            _percent = _percent + .25;

                        } else if ( _percent == .75 && _prevPercent == 'left' ) {

                            _prevPercent = 'right';
                            _percent = _percent - .5;

                        } else if ( _percent == .25 && _prevPercent == 'right' ) {

                            _prevPercent = 'left';
                            _percent = _percent + .5;
                        }

                        _setSize();

                    }, 3000);

                } else {

                    clearInterval( _interval );

                    _line.removeClass( 'animation' );
                    _control.removeClass( 'animation' );
                    _swiper.removeClass( 'animation' );
                }
            };

        //public properties

        //public methods
        _init();
    };
})();
