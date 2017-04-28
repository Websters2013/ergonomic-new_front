$(function(){

} );

var Gallery = function( obj ){
    this.obj = obj;
    this.items = obj.find('.gallery__pic-preview a');

    this.init();
};
Gallery.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this;

        return {
            addEvents: function(){
                self.items.on({
                   click: function(){
                       if(!$(this).hasClass('active')){
                           self.core.changeImg($(this));
                       }
                       return false;
                   }
                });
                self.points.on( {
                    'click': function(){
                        if(!$(this).hasClass('active')){
                            self.core.changeImg($(this));
                        }
                    }
                } );
                self.btnPrev.on({
                    'click': function(){
                        var actItem = self.items.filter('.active'),
                            nextElem = actItem.prev();
                        if(actItem.index()==0){
                            nextElem = self.items.eq(-1);
                        }
                        self.core.changeImg(nextElem);
                        return false;
                    }
                });
                self.btnNext.on({
                    'click': function(){
                        var actItem = self.items.filter('.active'),
                            nextElem = actItem.next();
                        if(actItem.index()==self.items.length-1){
                            nextElem = self.items.eq(0);
                        }
                        self.core.changeImg(nextElem);
                        return false;
                    }
                });
                Hammer(self.div).on("swipeleft panleft", function(event) {
                    var actItem = self.items.filter('.active'),
                        nextElem = actItem.prev();
                    if(actItem.index()==0){
                        nextElem = self.items.eq(-1);
                    }
                    self.core.changeImg(nextElem);
                });
                Hammer(self.div).on("swiperight panright", function(event) {
                    var actItem = self.items.filter('.active'),
                        nextElem = actItem.next();
                    if(actItem.index()==self.items.length-1){
                        nextElem = self.items.eq(0);
                    }
                    self.core.changeImg(nextElem);
                });
                $(window).on({
                    'resize': function(){
                        self.wrap.height(self.div.height());
                    }
                });
                $(window).on({
                    'load': function(){
                        setTimeout(function(){
                            self.wrap.height(self.div.height());
                        },500);
                    }
                })
            },
            build: function(){
                self.core.starView();
                self.core.addEvents();
            },
            changeImg: function(curItem){
                self.items.removeClass('active');
                self.points.removeClass('active');
                var eq = curItem.index();
                self.core.loadImg(eq);

            },
            starView: function(){
                var count = self.items.length,
                    i,
                    points = $( '<div class="gallery__pic-points"><ul></ul></div>' );

                self.wrap = $('<div class="gallery__pic-screen"></div>');
                self.div = $('<div></div>');
                self.btnPrev = $('<a href="#" class="gallery__btn-prev">prev</a>');
                self.btnNext = $('<a href="#" class="gallery__btn-next">next</a>');
                for( i = 0; i < count; i++ ){
                    points.find('ul').append( '<li></li>' );
                }

                self.wrap.append(self.div,self.btnPrev,self.btnNext);
                self.obj.prepend(self.wrap);
                self.obj.append(points);
                self.points = points.find( 'li' );

                self.core.loadImg(0);
                self.div.find('img').css({opacity:1});
                setTimeout(function(){
                    self.wrap.height(self.div.height());
                },500);

            },
            loadImg: function(i){
                var src = self.items.eq(i).attr('data-src'),
                    newImg = $('<img/>');
                newImg.attr({'src':src,'alt':'gallery'});
                self.div.find('img').css({opacity:0});
                setTimeout(function(){
                    self.div.html('');
                    self.div.append(newImg);
                },300);
                setTimeout(function(){
                    self.div.find('img').css({opacity:1});
                },300);
                self.items.eq(i).addClass('active');
                self.points.eq(i).addClass('active');
            }
        };
    }
};

$(window).on({
    load: function () {
        $.each( $( '.gallery__pic' ), function(){
            new Gallery( $( this ) );
        } );
    }
});