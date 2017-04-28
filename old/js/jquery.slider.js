( function(){
    $( function(){
        $.each( $('.slider'), function () {
            var curItem = $( this );

            new SliderSingle( {
                obj: curItem,
                wrap: curItem.find( '.slider__wrap' ),
                slides: curItem.find( '.slider__item'),
                duration: 1000,
                delay: 8000
            } );
        });
    } );

    var SliderSingle = function (params) {
        this.obj = params.obj;
        this.slides = params.slides;
        this.wrap = params.wrap;
        this.duration = params.duration || 300;
        this.delay = params.delay || 5000;
        this.easing = params.easing || 'linear';
        this.action = false;
        this.timer = setTimeout(function () {}, 1);
        this.window = $(window);
        this.videoLink = $('.video-card__lnk');

        this.init();
    };

    SliderSingle.prototype = {
        init: function () {
            var self = this;

            self.core = self.core();
            self.core.build();
        },
        core: function () {
            var self = this;

            return {
                addEvents: function () {

                    self.wrap.on({
                        mousemove: function () {
                            clearTimeout(self.timer);
                        },
                        mouseleave: function () {
                            self.core.autoSlide();
                        }
                    });

                    self.window.on({
                        resize: function () {
                            self.core.getSlideSize();

                            self.slides.css({ left: self.width });
                            self.slides.eq( self.active ).css({ left: 0 });
                        }
                    });

                    self.btnNext.on({
                        click: function () {
                            if (!self.action) {
                                self.core.slideTo(self.active + 1, 1);
                            }

                            return false;
                        }
                    });
                    self.btnPrev.on({
                        click: function () {
                            if (!self.action) {
                                self.core.slideTo((self.active - 1), -1);
                            }

                            return false;
                        }
                    });
                    self.points.on({
                        click: function () {
                            var curPoint = $(this);

                            if (!curPoint.hasClass('active') && !self.action) {
                                self.core.slideTo(curPoint.index());
                                self.points.removeClass('active');
                                curPoint.addClass('active');
                            }


                            return false;
                        }
                    });

                    self.videoLink.on( {
                        click: function(){
                            var parent = $(this).parents( '.slider' );

                            clearTimeout( self.timer );
                            parent.append('<div class="slider__video">\
                                <button class="slider__close">×</button>\
                                <iframe width="100%" height="100%" src="'+$(this).attr('data-video')+'" frameborder="0" allowfullscreen></iframe>\
                            </div>');

                            $( '.slider__close').on( {
                                click: function(){
                                    $( '.slider__close').parent().remove();
                                }
                            } );


                            return false;
                        }
                    } );
                },
                addControls: function () {
                    var pointsWrap = $('<ul class="' + self.className + '__points"/>');
                    self.btnPrev = $('<div title="prev" class="' + self.className + '__btn ' + self.className + '__btn_prev glyphicon glyphicon-chevron-left"></div>');
                    self.btnNext = $('<div title="next" class="' + self.className + '__btn ' + self.className + '__btn_next glyphicon glyphicon-chevron-right"></div>');


                    $.each(self.slides, function () {
                        pointsWrap.append('<li/>');

                    });
                    self.points = pointsWrap.find('li');
                    self.points.eq(self.active).addClass('active');

                    self.obj.append(self.btnPrev);
                    self.obj.append(self.btnNext);
                    self.obj.append(pointsWrap);

                },
                autoSlide: function () {
                    self.timer = setTimeout(function () {
                        //self.btnNext.trigger('click');
                    }, self.delay);
                },
                build: function () {
                    self.core.startView();
                },
                destroy: function () {
                    self.slides.removeAttr('style');
                    self.btnNext.remove();
                    self.btnPrev.remove();

                    self = null;
                },
                getSlideSize: function () {
                    self.width = self.wrap.width();
                    self.height = self.wrap.height();
                },
                moveSlide: function (delta) {
                    self.slides.css({
                        left: self.width
                    });

                    clearTimeout(self.timer);

                    var curSlide = self.slides.eq(self.active),
                        secondSlide;

                    if (delta > 0) {
                        secondSlide = self.slides.eq(self.active - 1);
                        secondSlide.css({
                            left: -self.width + delta
                        });
                    } else {
                        secondSlide = self.slides.eq(self.active + 1);

                        if (!secondSlide.length) {
                            secondSlide = self.slides.eq(0);
                        }
                        secondSlide.css({
                            left: self.width + delta
                        });
                    }

                    curSlide.css({
                        left: delta
                    });

                    self.core.autoSlide();


                },
                slideTo: function (index, direction) {
                    var newIndex = index,
                        nextItem = null,
                        activeItem = self.slides.eq( self.active ),
                        direction = direction || undefined,
                        count1 = 0,
                        count2 = 0;

                    if (direction == -1) {
                        direction = 0;
                    }

                    clearTimeout(self.timer);
                    self.action = true;

                    if (index < 0) {
                        newIndex = self.slides.length - 1;
                    } else if (index == self.slides.length) {
                        newIndex = 0;
                    }

                    nextItem = self.slides.eq(newIndex);

                    count1 = Math.abs(newIndex - self.active);

                    if (direction === undefined) {
                        direction = ( newIndex > self.active );

                        if (newIndex > self.active) {
                            count2 = ( self.slides.length - newIndex ) + ( self.active - 1 );

                            if (count1 > count2) {
                                direction = 0;
                            } else if (count1 < count2) {
                                direction = 1;
                            }
                        } else {
                            count2 = ( self.slides.length - self.active ) + ( newIndex - 1 );

                            if (count1 > count2) {
                                direction = 1;
                            } else if (count1 < count2) {
                                direction = 0;
                            }
                        }
                    }



                    self.points.removeClass('active');
                    self.points.eq(newIndex).addClass('active');

                    self.slides.removeAttr('class');
                    self.slides.addClass('slider__item');

                    if (direction) {
                        nextItem.addClass('slide-forward_next');
                        activeItem.addClass('slide-forward_cur');
                    } else {
                        nextItem.addClass('slide-backward_next');
                        activeItem.addClass('slide-backward_cur');
                    }


                    setTimeout(function () {
                        self.action = false;
                        self.active = newIndex;
                        self.core.autoSlide();
                    }, self.duration+1);

                },
                slideToNext: function (delta) {
                    var curSlide = self.slides.eq(self.active),
                        secondSlide = self.slides.eq(self.active + 1);

                    clearTimeout(self.timer);

                    self.action = true;
                    self.wrap.addClass('animated');

                    if (!secondSlide.length) {
                        secondSlide = self.slides.eq(0);
                    }

                    if (( Math.abs(delta) / self.width ) > 0.2) {
                        curSlide.css({
                            left: -self.width
                        });
                        secondSlide.css({
                            left: 0
                        });
                        self.active = secondSlide.index();
                        self.points.removeClass('active');
                        self.points.eq(self.active).addClass('active');
                    } else {
                        curSlide.css({
                            left: 0
                        });
                        secondSlide.css({
                            left: self.width
                        });
                    }
                    setTimeout(function () {
                        self.wrap.removeClass('animated');
                        self.action = false;
                        self.core.autoSlide();
                    }, self.duration);
                },
                slideToPrev: function (delta) {
                    var curSlide = self.slides.eq(self.active),
                        secondSlide = self.slides.eq(self.active - 1);

                    clearTimeout(self.timer);

                    self.action = true;
                    self.wrap.addClass('animated');

                    if (( Math.abs(delta) / self.width ) > 0.2) {
                        curSlide.css({
                            left: self.width
                        });
                        secondSlide.css({
                            left: 0
                        });
                        self.active = secondSlide.index();
                        self.points.removeClass('active');
                        self.points.eq(self.active).addClass('active');
                    } else {
                        curSlide.css({
                            left: 0
                        });
                        secondSlide.css({
                            left: -self.width
                        });
                    }
                    setTimeout(function () {
                        self.wrap.removeClass('animated');
                        self.action = false;
                        self.core.autoSlide();
                    }, self.duration);
                },
                startView: function () {
                    if (self.slides.length > 1) {

                        self.className = self.obj.attr('class').split(' ')[0];
                        self.core.getSlideSize();
                        self.active = 0;

                        self.slides.eq(self.active).addClass('slider__item_start');

                        self.core.addControls();

                        self.core.addEvents();
                        self.core.autoSlide();
                    }
                }
            };
        }
    };
} )();
