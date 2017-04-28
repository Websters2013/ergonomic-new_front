(function(){
    $( function(){
        $('.work__example').each( function(){
            new Example($(this));
        } );
    } );

    var Example = function (obj) {

        //private properties
        var _self = this,
            _images = obj.find( 'img' ),
            _wraper = obj.find( '> div' ),
            _window = $(window),
            _swiper = null,
            _hammer = null,
            _line = null,
            _wrapWidth = 0,
            _control = null,
            _percent = .5,
            _container = null,
            _canMove = false,
            _curLeftPos = 0,
            _tempLeftPos = 0,
            _isMove = false,
            _obj = obj;

        //private methods
        var _addEvents = function () {
                _window.on({
                    resize: function () {
                        _setSize();
                    }
                });
                _hammer.on('panstart', function(e) {
                    _canMove = true;
                    _tempLeftPos = _curLeftPos;
                });
                _hammer.on('panend', function(e) {
                    if(_isMove){
                        _setNewPercent(e);
                    }
                    _isMove = false;
                    _canMove = false;
                });
                _hammer.on('panmove', function(e) {
                    if(_canMove){
                        _isMove = true;
                        _setNewPercent(e);
                    }
                });
            },
            _init = function () {
                _startView();
                _initHammer();
                _addEvents();
            },
            _setNewPercent = function(e){
                var newPercent = ((_tempLeftPos+ e.deltaX)/_wrapWidth);

               if(newPercent > 1){
                   newPercent = 1;
               } else if (newPercent<0){
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
                _line.css({
                    left:  _curLeftPos
                });
                _control.css({
                    left:  _curLeftPos
                });
            },
            _initHammer = function(){
                _hammer = new Hammer.Manager(_control[0]);
                _hammer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
            },
            _startView = function(){
                _wraper.css( {
                    backgroundImage: 'url('+ _images[0].src +')'
                } );
                _wraper.append( '<div class="work__example-swiper"><div style="background-image: url('+ _images[1].src +')"></div></div>' );
                _swiper = _wraper.find('.work__example-swiper');
                _container = _swiper.find('div');
                _line = $('<div class="work__example-line"/>');
                _control = $('<div class="work__example-control"/>');
                _wraper.append(_line);
                _wraper.append(_control);
                _setSize();
            };

        //public properties

        //public methods


        _init();
    };

})();