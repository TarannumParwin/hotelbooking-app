$(document).ready(function() {

	// Handle form submission
	$('#booking-form').submit(function(event) {
	  // Prevent the form from submitting via the default HTML form submission
	  event.preventDefault();


	  
  
	  // Get the form data
	  var formData = {
		name: $('#name').val(),
		email: $('#email').val(),
		phone: $('#phone').val(),
		address: $('#address').val(),
		rooms: getCartItems()
	  };
  
	  // Submit the form data using POST method
	  $.post('http://localhost:3000/book', formData)
		.done(function(response) {
		  // Handle success response
		  alert('Your booking has been confirmed. Thank you!');
		  clearCart();
		  $('#booking-form')[0].reset();
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
		  // Handle error response
		  alert('An error occurred while processing your request. Please try again later.');
		  console.error(textStatus, errorThrown);
		});
	});
  
	// Helper functions for shopping cart
	function getCartItems() {
	  // Return the cart items as an array of objects
	  var cartItems = [];
	  $('#cart tbody tr').each(function() {
		var item = {
		  type: $(this).find('.cart-room-type').text(),
		  price: parseFloat($(this).find('.cart-room-price').text().substring(1)),
		  quantity: parseInt($(this).find('.cart-qty').text()),
		  total: parseFloat($(this).find('.cart-total').text().substring(1))
		};
		cartItems.push(item);
	  });
	  return cartItems;
	}
  
	function clearCart() {
	  // Remove all items from the cart
	  $('#cart tbody').empty();
	  updateCartSummary();
	}
  
  });
  