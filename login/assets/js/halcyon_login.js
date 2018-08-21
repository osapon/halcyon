$(function() {
$(document).on('focus', '#main #login_form_wrap .login_form .login_form_main input[name="acct"]', function(e) {
$(this).parent().addClass('active')
$(".login_form").addClass('expand');
})
$(document).on('blur', '#main #login_form_wrap .login_form .login_form_main input[name="acct"]', function(e) {
$(this).parent().removeClass('active')
$(".login_form").removeClass('expand');
})
$(document).on('mousedown', '.image_wrap .switch_button', function(e) {
const self = $(this);
self.addClass('active');
setTimeout(function() {
self.removeClass('active');
}, 500);
})
$(document).on('click', '.image_wrap .prev_button', function(e) {
const firstChild = $(this).parent(".image_wrap").find('ul li:first-child');
firstChild.appendTo(".image_wrap ul");
firstChild.addClass('fadein');
setTimeout(function() {
firstChild.removeClass('fadein');
}, 500);
})
$(document).on('click', '.image_wrap .next_button', function(e) {
const lastChild = $(this).parent(".image_wrap").find('ul li:last-child');;
lastChild.addClass('fadeout');
setTimeout(function() {
lastChild.prependTo(".image_wrap ul");
lastChild.removeClass('fadeout');
}, 500);
})
})
