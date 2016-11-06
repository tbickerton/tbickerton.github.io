
(function($) {

	$(document).ready( function() {

		// form validation 
		Modernizr.load({
			test: Modernizr.input.autocomplete,		
			nope: ['assets/js/jquery.validate.js', 'assets/js/jquery.validate.bootstrap.js'],
		});

	  	// anagram checkcer
	    var anagram = function(str1, str2) {
      	  	return str1.split("").sort().join("") === str2.split("").sort().join("");
          	}

           $('.checkAna').on('click', function(e) {
    e.preventDefault();
    if ($('#string1').val() == '') {
      $('#string1').addClass('error');
      if ($('#string2').val() == '') {
        $('#string2').addClass('error');
      }
      $('.results').empty();
      $('.results').hide();
    } else {
      $('#string1').removeClass('error');
      if ($('#string2').val() == '') {
        $('#string2').addClass('error');
        $('.results').empty();
        $('.results').hide();
      } else {
        $('#string2').removeClass('error');
        var isAnagram = anagram($('#string1').val(), $('#string2').val());
        $('#string1').val('');
        $('#string2').val('')
        $('.results').show();
        $('.results').empty().append('Is Anagram: ' + isAnagram);
      }
    }
  });


});

		// ajax contact form
		$('.contact-form form').submit( function(e) {
			
			e.preventDefault();

			$theForm = $(this);
			$btn = $(this).find('#submit-button');
			$alert = $(this).parent().find('.alert');			

			// just to check if validation supported without response, such as safari 5.1. Removing JS error on chrome
			if( !Modernizr.input.autocomplete ) {
				
				$theForm.validate({

					messages: {
						email: { required: "Email is required", email: "Please enter a valid email address"}
					}
				});	

				if( !$theForm.valid() ) {
					return;
				}
			}

			$btn.addClass('loading');
			$btn.attr('disabled', 'disabled');

			$.post('contact.php', $(this).serialize(), function(data){
				
				$message = data.message;
				
				if( data.result == true ){
					$theForm.slideUp('medium', function() {
						$alert.removeClass('alert-danger');
						$alert.addClass('alert-success').html($message).slideDown('medium');	
					});				
				}else {
					$alert.addClass('alert-danger').html($message).slideDown('medium');	
				}

				$btn.removeClass('loading');
				$btn.removeAttr('disabled');

			})
			.fail(function() { console.log('AJAX Error'); });

		});

	});

})(jQuery);