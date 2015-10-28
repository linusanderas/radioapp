(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope) {

    $scope.openContact = function() {

      $scope.navi.pushPage('contact.html');

    };

    $scope.openSkype = function() {

      alert("open skype");

    };

    $scope.play = function() {

      alert("open skype");

    };


  });


  module.controller('MasterController', function($scope) {
   
  });

 
})();

