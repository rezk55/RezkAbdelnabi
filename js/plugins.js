
$(document).ready(function() {

    //active section 
    $('nav .collapse a').on('click', function() {
        // console.log($(this).parent().siblings().children());
        $('nav .collapse a').removeClass('active')
        $(this).addClass('active');
        $('.navbar-toggler').click();

    })


    //function to add active class to element
    function addActiveClass(parent, child) {

        $(`.${parent} ${child}`).on('click', function() {
            $(`.${parent} ${child}`).removeClass('active');
            $(this).addClass('active');
        })
    }

    //navbar toggler
    $('.navbar-toggler').on('click', function() {
        $('.navbar-close').toggle();
        $('.navbar-open').toggle();
    })

    //active tab of about item
    $('.about-tabs a').on('click', function() {
        $('.about-tabs a').removeClass('active');
        $(this).addClass('active');

        $('.about div').removeClass('tab-active');
        if ($(this).data('target') == '.skills') {
            $('.about .skills').addClass('tab-active');
        } else if ($(this).data('target') == '.experience') {
            $('.about .experience').addClass('tab-active');
        } else {
            $('.about .education').addClass('tab-active');
        }
    })

    //add active class to portolio filter
    addActiveClass('portfolio-filter', 'span');

    //mix it up 
    var mixer = mixitup('.portfolio-items');

});

// دوال التحكم في الـ Modal
function showModal() {
    document.getElementById('thank-you-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('thank-you-modal').style.display = 'none';
}
(function(){
        emailjs.init("D8WQgXq4zS_0Inmo7"); // حط هنا الـ Public Key بتاعك
    })();

    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // تغيير نص الزرار عشان اليوزر يعرف إن الإرسال شغال
        const btn = document.querySelector('.send-massege');
        btn.innerText = 'Sending...';

        // إرسال الفورم
        emailjs.sendForm('service_yfh7xf6', 'template_ambr4j4', this)
            .then(function() {
                        showModal(); 

            btn.innerText = 'Send message';
            contactForm.reset(); // مسح البيانات بعد الإرسال
            }, function(error) {
            alert('للأسف حدث خطأ ما.. حاول مرة أخرى.');
            btn.innerText = 'Send message';
            });
});
