jQuery(document).ready(function ($) {

	// Ajax Contact
	if ($("#enquiryForm")[0]) {
		$('#enquiryForm').submit(function () {
			$('#enquiryForm .error').remove();
			$('#enquiryForm .requiredField').removeClass('fielderror');
			$('#enquiryForm .requiredField').addClass('fieldtrue');
			$('#enquiryForm span strong').remove();
			var hasError = false;
			$('#enquiryForm .requiredField').each(function () {
				if (jQuery.trim($(this).val()) === '') {
					var labelText = $(this).prev('label').text();
					$(this).addClass('fielderror');
					$('#enquiryForm span').html('<strong>*Please fill out all fields.</strong>');
					hasError = true;
				} else if ($(this).hasClass('email')) {
					var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if (!emailReg.test(jQuery.trim($(this).val()))) {
						var labelText = $(this).prev('label').text();
						$(this).addClass('fielderror');
						$('#enquiryForm span').html('<strong>Is incorrect your email address</strong>');
						hasError = true;
					}
				}
			});
			if (!hasError) {
				$('#enquiryForm').slideDown('normal', function () {
					$("#enquiryForm #sendMessage").addClass('load-color');
					$("#enquiryForm #sendMessage").attr("disabled", "disabled").addClass("btn-success").val('Sending message. Please wait...');
				});
				var formInput = $(this).serialize();
				$.post($(this).attr('action'), formInput, function (data) {
					$('#enquiryForm').slideUp("normal", function () {
						$(this).before('<div class="notification-box notification-box-success"><p><strong>Thanks!</strong> Your email was successfully sent.</p></div>');
					});
				});
			}
			return false;
		});
	}
		
});