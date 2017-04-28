( function(){
    $(window).on( {
        load: function(){
            $.each($('.paralax'), function () {

                new Paralax($(this));

            });
        }
    } );

    var Paralax = function (obj) {

        //private properties
        var _self = this,
            _site = $('.site'),
            _window = $(window),
            _obj = obj,
            _items = _obj.find('img'),
            _offsetTop = _obj.offset().top;

        //private methods
        var _addEvents = function () {
                _site.on( {
                    scroll: function(){
                        $.each(_items, function () {
                            _setPosition( $(this) );
                        });
                    }
                } );
            },
            _init = function () {
                $.each(_items, function () {
                    this.startTop = parseInt( $(this).css('top') );
                    this.distance = $(this).data('dictance');
                });
                _addEvents();
            },
            _setPosition = function( item ){
                var startTop = item[0].startTop,
                    distance = item[0].distance,
                    direction = distance/Math.abs(distance),
                    maxTop = startTop + (Math.abs(distance)/2),
                    minTop = startTop -  (Math.abs(distance)/2),
                    minScroll = _offsetTop + minTop,
                    maxScroll = _offsetTop + maxTop + item[0].height,
                    curPos = minTop,
                    curScroll = _site.scrollTop()+150;

                if(curScroll<= minScroll){
                    if(direction<0){
                        curPos = maxTop;
                    } else {
                        curPos = minTop;
                    }

                } else if(curScroll>= maxScroll){
                    if(direction<0){
                        curPos = minTop;
                    } else {
                        curPos = maxTop;
                    }
                } else {
                    var t = (curScroll-minScroll)/(maxScroll-minScroll)*distance;
                    if(direction<0){
                        curPos = maxTop + t;
                    } else {

                        curPos = minTop + t;

                    }
                }
                item.css({
                    top: curPos
                });
            };

        //public properties

        //public methods


        _init();
    };
} )();