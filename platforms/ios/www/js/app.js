document.addEventListener("deviceready", function() {
   angular.bootstrap(document, ['app']);
}, false);


(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $rootScope) {



    $rootScope.hi_stream = "http://serv02.streamsfortheworld.com:8000/radiosama_hi";
    $rootScope.low_stream = "http://serv02.streamsfortheworld.com:8000/radiosama_low";

    $rootScope.stream_hi = true;

    $rootScope.media = new Media($rootScope.hi_stream, function(){}, function(){}, function(status){

      if (status == 1) status = "Starting";
      if (status == 2) status = "Playing";
      if (status == 3) status = "Paused";
      if (status == 4) status = "Stopped";

      $rootScope.Playerstatus = status;

    });



    $scope.openContact = function() {

      $scope.navi.pushPage('contact.html');

    };

    $scope.openSkype = function() {

      alert("open skype");

    };

    $scope.play = function() {

       $rootScope.media.play();

    };

    $scope.stop = function() {

       $rootScope.media.stop();

    };


  });


  module.controller('MasterController', function($scope) {
   
  });

 
})();

