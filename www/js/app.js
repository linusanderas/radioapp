document.addEventListener("deviceready", function() {



}, false);


(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $rootScope) {



    $rootScope.hi_stream = "http://serv02.streamsfortheworld.com:8000/radiosama_hi";
    $rootScope.low_stream = "http://serv02.streamsfortheworld.com:8000/radiosama_low";

    $rootScope.stream_hi = true;

    $rootScope.audio = new Audio($rootScope.low_stream);
    

    $scope.openContact = function() {

      $scope.navi.pushPage('contact.html');

    };

    $scope.openSkype = function() {

      alert("open skype");

    };

    $scope.play = function() {

       $rootScope.audio.play();

    };

    $scope.stop = function() {

       $rootScope.audio.pause();
       $rootScope.audio = null;
       $rootScope.audio = new Audio($rootScope.low_stream);


    };


  });


  module.controller('MasterController', function($scope) {
   
  });

 
})();

