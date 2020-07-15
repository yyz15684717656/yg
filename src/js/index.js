swiper();
function swiper(){
    var mySwiper = new Swiper ('.swiper-container', {
        autoplay:2000,
        direction : 'horizontal',
        speed:300,
        effect : 'fade',
        fade: {
                crossFade: true,
                },
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        scrollbar: '.swiper-scrollbar',
        }) 
}
//城市选择
city();
function city(){
    var cityPicker = new IIInsomniaCityPicker({
        data: cityData,
        target: '#cityChoice',
        valType: 'k-v',
        hideCityInput: '#city',
        hideProvinceInput: '#province',
        callback: function (city_id) {
            alert(city_id);
        }
    });
    
    cityPicker.init();
}    