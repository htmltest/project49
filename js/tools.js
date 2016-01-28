var sliderPeriod    = 5000;
var sliderTimer     = null;

(function($) {

    $(document).ready(function() {

        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            curSlider.find('.slider-content li:first').css({'z-index': 2});
            $('.slider-ctrl a:first').addClass('active');
            sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
        });

        function sliderNext() {
            var curSlider = $('.slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('.slider-content li').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('.slider-ctrl a.active').removeClass('active');
                curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        $('.slider').on('click', '.slider-ctrl a', function(e) {
            if (!$(this).hasClass('active')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;

                var curSlider = $('.slider');
                if (curSlider.data('disableAnimation')) {
                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.slider-ctrl a').index($(this));

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                    curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1}).show();

                    curSlider.find('.slider-ctrl a.active').removeClass('active');
                    curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                    curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                        curSlider.data('disableAnimation', true);
                        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                    });
                }
            }

            e.preventDefault();
        });

        $('.main-popular .other-list').easyTicker({
            direction: 		'up',
            speed: 			'slow',
            interval: 		4000,
            height: 		'auto',
            visible: 		2,
            mousePause: 	1,
            controls: {
                up: '.main-popular-up',
                down: '.main-popular-down'
            },
        });

        $('.owl-carousel').owlCarousel({
            items :             4,
            itemsDesktop :      [1300, 4],
            itemsDesktopSmall : [885, 3],
            itemsTablet :       [885, 3],
            itemsTabletSmall :  [650, 2],
            itemsMobile :       [450, 1],
            singleItem :        false,
            itemsScaleUp :      false,

            slideSpeed :        200,
            paginationSpeed :   800,
            rewindSpeed :       1000,

            autoPlay :          true,
            stopOnHover :       true,

            navigation :        false,
            rewindNav :         true,
            scrollPerPage :     false,

            pagination :        true,
            paginationNumbers : false,

            responsive :        true,
            autoHeight :        false,
            mouseDrag :         true,
            touchDrag :         true
        });

        $('input.maskPhone').mask('+7 999 999-99-99');

        $.extend($.validator.messages, {
            required: 'Не заполнено поле',
            email: 'Введен некорректный e-mail'
        });

        $('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

        $('form').each(function() {
            $(this).validate();
        });

        $('.form-radio input:checked').parent().addClass('checked');
        $('.form-radio div').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.form-radio input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('.form-file input').change(function() {
            $(this).parent().parent().find('.form-file-title').html($(this).val().replace(/.*(\/|\\)/, '')).show();
        });

        $('.product-info-detail-link a').click(function(e) {
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.data('text'));
            curLink.data('text', curText);
            curLink.parent().prev().toggle();
            e.preventDefault();
        });

        $('.subscribe-tabs ul li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                $('.subscribe-tabs ul li.active').removeClass('active');
                curLi.addClass('active');

                var curIndex = $('.subscribe-tabs ul li').index(curLi);
                $('.subscribe-content.active').removeClass('active');
                $('.subscribe-content').eq(curIndex).addClass('active');
            }
            e.preventDefault();
        });

        var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        $('.subscribe-inner').each(function() {
            var curForm = $(this);

            var startFromMonth  = Number(curForm.find('.subscribe-start-from').html().split('.')[0]);
            var startFromYear   = Number(curForm.find('.subscribe-start-from').html().split('.')[1]);
            var startToMonth    = Number(curForm.find('.subscribe-start-to').html().split('.')[0]);
            var startToYear     = Number(curForm.find('.subscribe-start-to').html().split('.')[1]);
            var margin          = Number(curForm.find('.subscribe-min').html());

            var rangeFromMonth  = Number(curForm.find('.subscribe-range-from').html().split('.')[0]);
            var rangeFromYear   = Number(curForm.find('.subscribe-range-from').html().split('.')[1]);
            var rangeToMonth    = Number(curForm.find('.subscribe-range-to').html().split('.')[0]);
            var rangeToYear     = Number(curForm.find('.subscribe-range-to').html().split('.')[1]);

            var curFirst = 0;
            var curLast  = 0;

            while (!(startFromMonth == startToMonth && startFromYear == startToYear)) {
                curForm.find('.subscribe-monthes').append('<div class="subscribe-month" data-month="' + startFromMonth + '" data-year="' + startFromYear + '">' + months[startFromMonth - 1].substr(0, 3) + '</div>');
                if (curForm.find('.subscribe-month').length == 1 || startFromMonth == 1) {
                    curForm.find('.subscribe-month:last').append('<span>' + startFromYear + '</span>');
                }
                if (startFromMonth == rangeFromMonth && startFromYear == rangeFromYear) {
                    curFirst = curForm.find('.subscribe-month').length;
                }
                if (startFromMonth == rangeToMonth && startFromYear == rangeToYear) {
                    curLast = curForm.find('.subscribe-month').length;
                }
                startFromMonth++;
                if (startFromMonth == 13) {
                    startFromMonth = 1;
                    startFromYear++;
                }
            }
            curForm.find('.subscribe-monthes').append('<div class="subscribe-month" data-month="' + startFromMonth + '" data-year="' + startFromYear + '">' + months[startFromMonth - 1].substr(0, 3) + '</div>');
            if (startFromMonth == 1) {
                curForm.find('.subscribe-month:last').append('<span>' + startFromYear + '</span>');
            }
            if (startFromMonth == rangeToMonth && startFromYear == rangeToYear) {
                curLast = curForm.find('.subscribe-month').length;
            }

            var curWidth = 100 / curForm.find('.subscribe-month').length;
            curForm.find('.subscribe-month').css({'width': curWidth + '%'});
            curForm.find('.subscribe-slider').css({'margin-left': '' + (curWidth / 2 + curWidth * (curFirst - 1)) + '%', 'width': curWidth * (curLast - curFirst + 1) + '%'});

            noUiSlider.create(curForm.find('.subscribe-slider')[0], {
                start: [curFirst, curLast + 1],
                step: 1,
                margin: margin,
                range: {
                    'min': [curFirst],
                    'max': [curLast + 1]
                }
            }).on('update', function(values, handle) {
                curForm.find('.subscribe-month.active').removeClass('active');
                var results = curForm.find('.subscribe-slider')[0].noUiSlider.get();
                curForm.find('.subscribe-month:gt(' + (Number(results[0]) - 2) + ')').addClass('active');
                curForm.find('.subscribe-month:gt(' + (Number(results[1]) - 1) + ')').removeClass('active');

                var curStartMonth   = curForm.find('.subscribe-month.active:first').data('month');
                var curStartYear    = curForm.find('.subscribe-month.active:first').data('year');
                var curStopMonth    = curForm.find('.subscribe-month.active:last').prev().data('month');
                var curStopYear     = curForm.find('.subscribe-month.active:last').prev().data('year');

                var curStartMonthText = curStartMonth;
                if (curStartMonth < 10) {
                    curStartMonthText = '0' + curStartMonthText;
                }
                var curStopMonthText = curStopMonth;
                if (curStopMonth < 10) {
                    curStopMonthText = '0' + curStopMonthText;
                }
                curForm.find('input[name="start"]').val(curStartMonthText + '.' + curStartYear);
                curForm.find('input[name="stop"]').val(curStopMonthText + '.' + curStopYear);

                curForm.find('.subscribe-cost-period').html(months[curStartMonth - 1] + ' ' + curStartYear + ' – ' + months[curStopMonth - 1] + ' ' + curStopYear);

                function num_ending(number) {
                    var endings = Array('номеров', 'номер', 'номера');
                    var num100 = number % 100;
                    var num10 = number % 10;
                    if (num100 >= 5 && num100 <= 20) {
                        return endings[0];
                    } else if (num10 == 0) {
                        return endings[0];
                    } else if (num10 == 1) {
                        return endings[1];
                    } else if (num10 >= 2 && num10 <= 4) {
                        return endings[2];
                    } else if (num10 >= 5 && num10 <= 9) {
                        return endings[0];
                    } else {
                        return endings[2];
                    }
                }
                var count = Number(results[1]) - Number(results[0]);
                curForm.find('.subscribe-cost-results-count').html('<span>' + count + '</span>' + ' ' + num_ending(count));

                curForm.find('input[name="count"]').val(Number(curForm.find('.subscribe-count-value').html()));

                curForm.find('.subscribe-cost-summ span').html(count * Number(curForm.find('.subscribe-count-value').html()) * Number(curForm.find('.subscribe-cost-summ').data('price')));
            });
        });

        $('.subscribe-count-value').bind('keydown', function(e) {
            var key = e.charCode || e.keyCode || 0;
            return (
                key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });

        $('.subscribe-count-value').bind('keyup paste click', function(e) {
            var curField = $(this);
            if (curField.html().match(/[^0-9]/g)) {
                curField.html(curField.html().replace(/[^0-9]/g, ''));
            }

            var curForm = curField.parents().filter('.subscribe-inner');
            var curSlider = curForm.find('.subscribe-slider')[0].noUiSlider;
            curSlider.set(curSlider.get());
        });

        $('.subscribe-count-inc').click(function(e) {
            var curForm = $(this).parents().filter('.subscribe-inner');
            var count = Number(curForm.find('.subscribe-count-value').html());
            count++;
            curForm.find('.subscribe-count-value').html(count);

            var curSlider = curForm.find('.subscribe-slider')[0].noUiSlider;
            curSlider.set(curSlider.get());

            e.preventDefault();
        });

        $('.subscribe-count-dec').click(function(e) {
            var curForm = $(this).parents().filter('.subscribe-inner');
            var count = Number(curForm.find('.subscribe-count-value').html());
            count--;
            if (count < 1) {
                count = 1;
            }
            curForm.find('.subscribe-count-value').html(count);

            var curSlider = curForm.find('.subscribe-slider')[0].noUiSlider;
            curSlider.set(curSlider.get());

            e.preventDefault();
        });

        $('.other-more').click(function(e) {
            var curLink = $(this);
            var curBlock = curLink.parent();
            $.ajax({
                url: curLink.attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                curBlock.find('.other-list').append(html);
            });
            e.preventDefault();
        });

    });

})(jQuery);