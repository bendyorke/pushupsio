'use strict';

Parse.Cloud.beforeSave('Record', function (request, _ref) {
  var _success = _ref.success;
  var error = _ref.error;

  var record = request.object;
  if (record && record.id) return _success();

  var query = new Parse.Query('Record');
  query.equalTo('user', record.get('user'));
  query.equalTo('date', record.get('date'));
  query.first({
    success: function success(_record) {
      if (_record) {
        /**
         * You can't actually modify the ID of the request in a
         * beforeSave handler.  You also can return anything besides
         * an error unless you return an error.  So for now,
         * the only solution is to  return response.error('success')...
         *
         *
         *
         * Seriously
         */
        dirtySuccess = function () {
          return error('success');
        };
        _record.set('count', record.get('count'));
        _record.save({ success: dirtySuccess, error: error });
      } else {
        return _success();
      }
    },
    error: error
  });
});
'use strict';

Parse.Cloud.beforeSave('User', function (request, _ref) {
  var success = _ref.success;
  var error = _ref.error;

  request.object.set('email', request.object.get('email').toLowerCase());
  request.object.set('username', request.object.get('username').toLowerCase());
  success();
});
'use strict';

Parse.Cloud.define('data', function (request, _ref) {
  var success = _ref.success;
  var error = _ref.error;

  success(request.user);
});
