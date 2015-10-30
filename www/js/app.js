document.addEventListener("deviceready", function() {



}, false);


(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $rootScope) {



    $rootScope.hi_stream = "http://serv02.streamsfortheworld.com:8000/radiosama_hi";
    $rootScope.low_stream = "http://serv02.streamsfortheworld.com:8000/radiosama_low";

    $rootScope.active_stream = 2;
    $rootScope.active_stream_url = $rootScope.low_stream;
    $rootScope.isPlaying = false;

    $rootScope.audio = new Audio($rootScope.active_stream_url);

    $rootScope.classHigh = "disabled";
    $rootScope.classLow = "enabled";
    

    $scope.openContact = function() {

      $scope.navi.pushPage('contact.html');

    };

    $scope.openSkype = function() {

      alert("open skype");

    };

    $scope.play = function() {

      $rootScope.isPlaying = true;
      $rootScope.audio.play();

    };

    $scope.stop = function() {

      $rootScope.isPlaying = false;
       $rootScope.audio.pause();
       $rootScope.audio = null;
       $rootScope.audio = new Audio($rootScope.active_stream_url);


    };

    $scope.switchStream = function(stream) {

      if (stream != $rootScope.active_stream)
      {

        $rootScope.active_stream = stream;

        if (stream == 1)
        {
            $rootScope.active_stream_url = $rootScope.hi_stream;
            $rootScope.classHigh = "enabled";
            $rootScope.classLow = "disabled";
        }
        else
        {
            $rootScope.active_stream_url = $rootScope.low_stream;
            $rootScope.classHigh = "disbaled";
            $rootScope.classLow = "enabled";
        }

          
          if ($rootScope.isPlaying)
          {

         $rootScope.audio.pause();
         $rootScope.audio = null;
         $rootScope.audio = new Audio($rootScope.active_stream_url);
         $rootScope.audio.play();
       }

      }
    };

  });


  module.controller('MasterController', function($scope) {
   
  });

 
})();

