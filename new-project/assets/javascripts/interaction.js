$(document).ready(function() {
    
});


function showPassword() {
    var key_attr = $('.key-pass').attr('type');

    if (key_attr != 'text') {
        $('.checkbox').addClass('show');
        $('.key-pass').attr('type', 'text');

    } else {
        $('.checkbox').removeClass('show');
        $('.key-pass').attr('type', 'password');

    }
}
