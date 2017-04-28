@extends('layouts.site')

@section('pageStyles')
    <link rel="stylesheet" href="{{ url('css/jquery.fullpage.css') }}">
    <link rel="stylesheet" href="{{ url('css/home.css') }}">
@stop

@section('content')

    <!-- site -->
    <div class="site site_index">

        <div id="fullpage">

            <div class="section section1">

                <!-- site__message -->
                <div class="site__message">
                    <div class="site__message-layout">
                        En poursuivant votre navigation sur ce site vous acceptez l’utilisation de cookies. <a href="#" class="site__message-btn">J’accepte</a>
                    </div>
                </div>
                <!-- /site__message -->

            @include('partials.header', ['additionalClass' => 'site__header_home'])

            <!-- hero -->
                <div class="hero" style="background-image: url('{{ url('pic/poster-video.jpg') }}')">

                    <div class="hero__video">
                        <video playsinline autoplay width="640" height="360"  loop muted data-autoplay>
                            <source src="{{ url('video/preview15sec2.mp4') }}" type="video/mp4" />
                            <source src="{{ url('video/preview15sec2.webm') }}" type="video/webm" />
                            <source src="{{ url('video/preview15sec2.ogv') }}" type="video/ogg" />
                        </video>
                    </div>

                    <!-- hero__layout -->
                    <div class="hero__layout">

                        <h1 class="hero__title">Vous n’imaginerez pas tout ce qu’il est possible de faire <span>pour vendre votre maison</span>
                        </h1>
                    </div>
                    <!-- /hero__layout -->

                    <a href="#real-agency" class="hero__down scroll-to"></a>

                    <!--hero__note-->
                    <div class="hero__note">
                        The <span>human</span> agency
                    </div>
                    <!--/hero__note-->

                </div>
                <!-- /hero -->

                <!-- real-agency -->
                <div class="real-agency" id="real-agency">

                    <!-- real-agency__layout -->
                    <div class="real-agency__layout">

                        <div>
                            <h2 class="real-agency__title">L'immobilier, professionnel <span>sans être conventionnel</span></h2>
                        </div>
                        <div>
                            <p>We invest, c’est la volonté de réunir en une seule et même équipe les meilleures compétences pour le succès de la vente de votre maison.
                                La collaboration entre nos agents, notre équipe juridique et nos marketeurs, garantit une stratégie adaptée à votre bien, afin d’obtenir une visibilité et une attractivité optimale.</p>
                        </div>

                    </div>
                    <!-- /real-agency__layout -->

                </div>
                <!-- /real-agency -->

            </div>
            <div class="section">

                <!-- intro -->
                <div class="intro">

                    <!--intro__dots-->
                    <div class="intro__dots">

                        <ul>
                            <li>
                                <a class="scroll-to" href="#photos">Photos et homestaging</a>
                            </li>
                            <li>
                                <a class="scroll-to" href="#video">Vidéo et Drone</a>
                            </li>
                            <li>
                                <a class="scroll-to" href="#virtuelle">Visite virtuelle</a>
                            </li>
                        </ul>

                    </div>
                    <!--/intro__dots-->

                    <div class="intro__layout">

                        <h2 class="intro__slider-title">Nos services</h2>

                        <!--intro__list-->
                        <div class="intro__list">

                            <!--intro__item-->
                            <div id="photos" class="intro__item">

                                <!--intro__slide-title-->
                                <h3 class="intro__slide-title">
                                    Photos et homestaging
                                </h3>
                                <!--/intro__slide-title-->

                                <!--intro__slide-text-->
                                <p class="intro__slide-text">
                                    Attirez les acheteurs et distinguez votre bien grâce à des
                                    photos professionnelles
                                </p>
                                <!--/intro__slide-text-->

                                <!-- intro__pic -->
                                <div class="intro__pic-bg">

                                    <!--pic-example__note-->
                                    <div class="pic-example__note">

                                        <p><mark>Avant</mark> We Invest</p>
                                        <p><mark>Après</mark> We Invest</p>

                                    </div>
                                    <!--/pic-example__note-->

                                    <!-- pic-example -->
                                    <div class="pic-example pic-example_home">

                                        <div>

                                            <img src="/pic/Photo_We_Invest_Touch.jpg" alt="weinvest">
                                            <img src="/pic/Photo_Without_We_Invest_Touch.jpg" alt="weinvest">

                                        </div>

                                    </div>
                                    <!-- /pic-example -->

                                </div>
                                <!-- /intro__pic -->

                            </div>
                            <!--/intro__item-->

                            <!--intro__item-->
                            <div id="video" class="intro__item">

                                <!--intro__slide-title-->
                                <h3 class="intro__slide-title">
                                    Vidéo et drones
                                </h3>
                                <!--/intro__slide-title-->

                                <!--intro__slide-text-->
                                <p class="intro__slide-text">
                                    Dynamisez et rendez votre bien exclusif
                                </p>
                                <!--/intro__slide-text-->

                                <!-- intro__pic -->
                                <div class="intro__pic-bg">

                                    <!--intro__pic-wrap-->
                                    <div class="intro__pic-wrap">

                                        <video playsinline autoplay width="640" height="360" loop muted data-autoplay>
                                            <source src="{{ url('video/Video_drone_Showreel_small-size.mp4') }}" type="video/mp4" />
                                            <source src="{{ url('video/Video_drone_Showreel_small-size.ogv') }}" type="video/ogg" />
                                        </video>

                                    </div>
                                    <!--/intro__pic-wrap-->

                                </div>
                                <!-- /intro__pic -->

                            </div>
                            <!--/intro__item-->

                            <!--intro__item-->
                            <div class="intro__item intro__item_iframe">

                                <!--intro__slide-title-->
                                <h3 class="intro__slide-title">
                                    Visites virtuelles
                                </h3>
                                <!--/intro__slide-title-->

                                <!--intro__slide-text-->
                                <p class="intro__slide-text">
                                    Aidez vos potentiels acquéreurs à se projeter dans votre bien
                                </p>
                                <!--/intro__slide-text-->

                                <!-- intro__pic -->
                                <div class="intro__pic-bg intro__pic-bg_iframe">
                                    <iframe src="https://s3-eu-west-1.amazonaws.com/drawbotics-hosting/panoramas/production/7037/tour.html" scrolling="no" frameborder="0"></iframe>
                                </div>
                                <!-- /intro__pic -->

                            </div>
                            <!--/intro__item-->

                        </div>
                        <!--/intro__list-->

                    </div>

                </div>
                <!-- /intro -->

            </div>
            <div class="section section1">

                <!-- some-numbers -->
                <div class="some-numbers">

                    <!-- some-numbers__layout -->
                    <div class="some-numbers__layout">

                        <h2 class="some-numbers__title">
                            En quelques chiffres
                        </h2>

                        <!-- some-numbers__items -->
                        <div class="some-numbers__items">

                            <!-- some-numbers__item -->
                            <div class="some-numbers__item">
                                <span><span class="gradient" data-count="7">7</span> %</span>
                                <p>Ecart maximum entre notre
                                    estimation et le prix de vente</p>
                            </div>
                            <!-- /some-numbers__item -->

                            <!-- some-numbers__item -->
                            <div class="some-numbers__item">
                                <span><span class="gradient" data-count="48">48</span> jours</span>
                                <p>Temps moyen de vente</p>
                            </div>
                            <!-- /some-numbers__item -->

                            <!-- some-numbers__item -->
                            <div class="some-numbers__item">
                                <span><span class="gradient" data-count="91">91</span> %</span>
                                <p>Taux de réussite de
                                    notre agence</p>
                            </div>
                            <!-- /some-numbers__item -->

                        </div>
                        <!-- /some-numbers__items -->

                    </div>
                    <!-- /some-numbers__layout -->

                </div>
                <!-- /some-numbers -->

                <!-- reviews -->
                <div class="reviews">

                    <!-- reviews__slider-top -->
                    <div class="reviews__slider-top swiper-container">

                        <div class="swiper-wrapper">

                            <div class="swiper-slide">

                                <!-- reviews__slider-content -->
                                <div class="reviews__slider-content">
                                    Cette agence bruxelloise parvient à briser les codes établis, sans pour autant mettre son professionnalisme de côté. Une alliance de la technologie et de l’humain pour offrir la meilleure qualité de service possible.
                                </div>
                                <!-- /reviews__slider-content -->

                            </div >

                            <div class="swiper-slide">

                                <!-- reviews__slider-content -->
                                <div class="reviews__slider-content">
                                    Une agence immobi­lière qui a beaucoup de points com­muns avec les célèbres start­up de la Silicon Valley, ça ne court pas les rues en Belgique. De l’aveu de sa co­fondatrice, la Bruxelloise Gabrielle Amandt, on aime bousculer les co­des chez We Invest.
                                </div>
                                <!-- /reviews__slider-content -->

                            </div>

                            <div class="swiper-slide">

                                <!-- reviews__slider-content -->
                                <div class="reviews__slider-content">
                                    L'optimisme ambiant est l’un des atout principal de l’entreprise . Une manière d’épanouir les employés et de rendre leur travail plus productif.
                                </div>
                                <!-- /reviews__slider-content -->

                            </div>

                        </div>

                    </div>
                    <!-- /reviews__slider-top -->

                    <!-- reviews__slider-thumbs -->
                    <div class="reviews__slider-thumbs swiper-container">

                        <div class="swiper-wrapper">
                            <div class="swiper-slide"><img src="pic/reviews-slider-dott1.png"></div>
                            <div class="swiper-slide"><img src="pic/reviews-slider-dott2.png"></div>
                            <div class="swiper-slide"><img src="pic/reviews-slider-dott3.png"></div>
                        </div>

                    </div>
                    <!-- /reviews__slider-thumbs -->

                </div>
                <!-- /reviews -->

                <!-- choose-plan -->
                <div class="choose-plan">

                    <!-- choose-plan__container -->
                    <div class="choose-plan__container">

                        <h2 class="choose-plan__title">Chez nous, c’est <span>vous</span> qui choisissez</h2>

                        <!-- choose-plan__list -->
                        <div class="choose-plan__list">

                            <!-- choose-plan__item -->
                            <div class="choose-plan__item choose-plan__item_bronze">

                                <!-- choose-plan__item-title -->
                                <div class="choose-plan__item-title">
                                    <span>Bronze</span>
                                    950 €
                                </div>
                                <!-- /choose-plan__item-title -->

                                <p>Marketing de base</p>
                            </div>
                            <!-- /choose-plan__item -->

                            <!-- choose-plan__item -->
                            <div class="choose-plan__item choose-plan__item_silver">

                                <!-- choose-plan__item-title -->
                                <div class="choose-plan__item-title">
                                    <span>Silver</span>
                                    1490 €
                                </div>
                                <!-- /choose-plan__item-title -->

                                <p>Marketing spécialisé</p>
                            </div>
                            <!-- /choose-plan__item -->

                            <!-- choose-plan__item -->
                            <div class="choose-plan__item choose-plan__item_gold">

                                <!-- choose-plan__item-title -->
                                <div class="choose-plan__item-title">
                                    <span>Gold</span>
                                    3%
                                </div>
                                <!-- /choose-plan__item-title -->

                                <p>Marketing spécialisé</p>
                                <p>Agent immobilier</p>
                                <p>Protection Juridique</p>
                            </div>
                            <!-- /choose-plan__item -->

                        </div>
                        <!-- /choose-plan__list -->

                        <a href="{{ url('prices') }}" class="btn btn_3"><span>Découvrir les packs</span></a>

                    </div>
                    <!-- /choose-plan__container -->

                </div>
                <!-- /choose-plan -->

            </div>
        </div>

    @include('partials.footer')

    <!-- popup -->
        <div class="popup">

            <!-- popup__wrap -->
            <div class="popup__wrap">
                @include('partials.popup-work-with-us')
            </div>
            <!-- /popup__wrap -->

        </div>
        <!-- /popup -->


    </div>
    <!-- /site -->

@stop

@section('pageScripts')
    <script src="{{ url('js/vendors/hammer.min.js') }}"></script>
    <script src="{{ url('js/vendors/swiper.jquery.min.js') }}"></script>
    <script src="{{ url('js/index.min.js') }}"></script>
@stop
