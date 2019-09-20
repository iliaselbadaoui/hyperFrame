'use strict';
let hiddenMenu = true;
hyperFrame.setUpCountDown('content', new Date(2019, 11, 20, 0, 0, 0, 0));
hyperFrame.on('menuIcon', 'click', function () {
    if(hiddenMenu){
        hyperFrame.changeClassName('back_main','background_without_menu','background_with_menu');
        hyperFrame.changeClassName('back_menu','menu_back_without_menu','menu_back_with_menu');
        hyperFrame.changeClassName('menuIcon','white_icon','black_icon');
        hyperFrame.changeClassName('menuBars','fa-bars','fa-arrow-right');
        hiddenMenu = false;
    }else{
        hyperFrame.changeClassName('back_main','background_with_menu','background_without_menu');
        hyperFrame.changeClassName('back_menu','menu_back_with_menu','menu_back_without_menu');
        hyperFrame.changeClassName('menuIcon','black_icon','white_icon');
        hyperFrame.changeClassName('menuBars','fa-arrow-right','fa-bars');
        hiddenMenu = true;
    }
});