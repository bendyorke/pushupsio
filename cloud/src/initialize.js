Parse.Cloud.define('data', (request, {success, error}) => {
  success(request.user)
})
