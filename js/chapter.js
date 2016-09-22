$(function(){
    $('#organized-switch').on('change',function(){
        if($(this).is(':checked')){
            $('#original').addClass('organized');
        } else {
            $('#original').removeClass('organized');
        }
    });

    if($('.align').length == 0){
        $('#alignment-switch').parent().hide();
    }

    $('.align').each(function(){
        var number = $(this).data('align-no');
        if($.isArray(alignableElements[number])== false){
            alignableElements[number] = [];
        }
        alignableElements[number].push( $(this) );
    });

    $('#alignment-switch').on('change',function(){
        if($(this).is(':checked')){
            alignSummary();
            $(window).on('resize.alignment',alignSummary);
        } else {
            $('.align').css('marginTop',0);
            $('body').removeClass('aligned');
            $(window).off('resize.alignment');
            lastSummaryWidth = 0;
        }
    });

    $(".summary").wrap( "<div class='summary-container'></div>" );
    $(".summary-container").each(function(){
        var title = $(this).children('ul').prop('title');
        $(this).prepend('<span>'+title+'</span>');
    })
    .on('click','> span',function(){
        $(this).next().slideToggle();
        $(this).parent().toggleClass('open');
    });

    $original = $('#original');
    $summary = $('#summary');
});

var alignableElements = {},
    lastSummaryWidth = 0,
    $summary, $original;
function alignSummary(){
    var summaryWidth = $('#summary').outerWidth();

    // check if the state has change since the last alignment
    if(summaryWidth == lastSummaryWidth){
        return true;
    }
    //update the the state
    lastSummaryWidth = summaryWidth;

    if($summary.offset().top != $original.offset().top){
        //mobile state
        $.each(alignableElements,function(i, elements) {
            elements[0].css('marginTop', '');
            elements[1].css('marginTop', '');
        });
        $('body').removeClass('aligned');
        return true;
    }

    $('body').addClass('aligned');

    // split view state
    $.each(alignableElements, function (i, elements) {
        var $el1 = elements[0];
        var $el2 = elements[1];
        var top1 = $el1.css('marginTop', 0).offset().top;
        var top2 = $el2.css('marginTop', 0).offset().top;
        var diff = top1 - top2;

        if (top1 > top2) {
            //this means that the first prhase is lower than the second
            $el2.css('marginTop', diff);
        } else {
            diff *= -1;
            $el1.css('marginTop', diff);
        }

    });

}