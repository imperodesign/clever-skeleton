export default (app) => {

  app.on('appStarted', () => {
    console.log(`${app.config.name} started`);
  });

  app.on('createUser', (form) => {
    const $createUserError = $('#createUserError');
    const $createUserErrorMessage = $('#createUserError .message');
    const postData = $(form).serialize();
    const formURL = $(form).attr('action');
    const $createUserBtn = $('#createUserBtn');

    // Clear the error message div
    $createUserError.addClass('hidden');

    $.ajax({
      url : formURL,
      type: 'POST',
      data : postData,
      success:function(data, textStatus, jqXHR) {
        location.href = '/';
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Show the errors to the user
        $createUserErrorMessage.html(`${jqXHR.responseJSON[0].msg}.`);
        $createUserError.removeClass('hidden');

        // Enable the submit form button
        $createUserBtn.removeClass('disabled');
      }
    });

    // Disable the submit form button
    $createUserBtn.addClass('disabled');
  });

  return app;
}
