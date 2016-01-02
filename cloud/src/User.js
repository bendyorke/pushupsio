Parse.Cloud.beforeSave('User', (request, {success, error}) => {
  request.object.set('email', request.object.get('email').toLowerCase())
  request.object.set('username', request.object.get('username').toLowerCase())
  success()
})
