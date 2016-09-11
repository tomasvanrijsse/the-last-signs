$(function(){
    $('#organized-switch').on('change',function(){
        if($(this).is(':checked')){
            $('.original').addClass('organized');
        } else {
            $('.original').removeClass('organized');
        }
    })
})