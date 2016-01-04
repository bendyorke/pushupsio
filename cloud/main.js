'use strict';

Parse.Cloud.beforeSave('User', function (request, _ref) {
  var success = _ref.success;
  var error = _ref.error;

  request.object.set('email', request.object.get('email').toLowerCase());
  request.object.set('username', request.object.get('username').toLowerCase());
  success();
});
'use strict';

Parse.Cloud.define('initialize', function (request, _ref) {
  var success = _ref.success;
  var error = _ref.error;
  var user = request.user;

  var Record = Parse.Object.extend('Record');
  var recordQuery = new Parse.Query(Record);
  recordQuery.equalTo('user', user);
  recordQuery.include('user');
  recordQuery.find().then(function (records) {
    return success({
      records: records,
      user: records[0] ? records[0].attributes.user : user
    });
  }, error);
});
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isRelation = function isRelation(key) {
  return (/^_[A-Z]/.test(key)
  );
};

/**
 * @param {Parse.Model} Model
 * @param Object        params
 * @return {Parse.Object}
 *
 * findOrCreate(Record, { day: Date.Object, _User: id })
 * => Parse.Object(id, attributes)
 */
var findOrCreate = function findOrCreate(Model, params) {
  var query = new Parse.Query(Model);

  /**
   * If a relation is passed in, handle it accordingly.
   * A relation is any key starting with _[A-Z]
   */
  var attributes = Object.keys(params).reduce(function (memo, key) {
    if (isRelation(key)) {
      var modelName = key.slice(1);
      var fieldName = modelName.toLowerCase();
      var Relation = Parse.Object.extend(modelName);
      var relation = new Relation();
      relation.id = params[key];

      return _extends({}, memo, _defineProperty({}, fieldName, relation));
    } else {
      return _extends({}, memo, _defineProperty({}, key, params[key]));
    }
  }, {});

  Object.keys(attributes).forEach(function (key) {
    query.equalTo(key, attributes[key]);
  });

  var promise = new Parse.Promise();

  query.first().then(function (data) {
    if (data) return promise.resolve(data);

    var instance = new Model();
    instance.set(attributes);
    instance.save().then(function (data) {
      return promise.resolve(data);
    }, function (error) {
      return promise.reject(error);
    });
  }).fail(function (error) {
    return promise.reject(error);
  });

  return promise;
};

/**
 * Parse.Cloud.run('findOrCreate', { model: 'Record',
 *   $where: { day: Date.Object, _User: id, count: 0 },
 * })
 */
Parse.Cloud.define('findOrCreate', function (request, response) {
  var _request$params = request.params;
  var modelName = _request$params.model;
  var $where = _request$params.$where;

  var Model = Parse.Object.extend(modelName);

  findOrCreate(Model, where).then(response.success, response.error);
});

/**
 * Parse.Cloud.run('updateOrCreate', { model: 'Record',
 *   $where: { day: Date.Object, _User: id },
 *   $update: { count: 100000000000000000000000 },
 * })
 */
Parse.Cloud.define('updateOrCreate', function (request, response) {
  var _request$params2 = request.params;
  var modelName = _request$params2.model;
  var $where = _request$params2.$where;
  var $update = _request$params2.$update;

  var Model = Parse.Object.extend(modelName);

  findOrCreate(Model, $where).then(function (instance) {
    instance.set($update);
    instance.save(response);
  }).fail(response.error);
});
"use strict";

var express = require('express');
var app = express();
var environments = {
  "JPiiqF69y6gBwRLvcJAhympE23USkPNTxPIr84GI": "prod",
  "iYHw28DmfKV2v7JYAAdrl8ViR7cSMWXDvHvK0i8E": "dev"
};

app.set('view engine', 'ejs');

app.get('*', function (req, res) {
  var env = environments[Parse.applicationId];
  res.render('cloud/index.ejs', { env: env });
});

app.listen();
