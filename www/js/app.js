document.addEventListener("deviceready", function() {



}, false);


(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $rootScope) {



    $rootScope.hi_stream = "http://serv02.streamsfortheworld.com:8000/radiosama_hi";
    $rootScope.low_stream = "http://serv02.streamsfortheworld.com:8000/radiosama_low";
    $rootScope.skype_name = "viktorsilfver";




    $rootScope.active_stream = 2;
    $rootScope.active_stream_url = $rootScope.low_stream;
    $rootScope.isPlaying = false;



    

    $scope.openContact = function() {

      $scope.navi.pushPage('contact.html');

    };

    $scope.openSkype = function() {

    var scheme;

    if (device.platform === 'iOS') {
        scheme = 'skype://';
    } else if (device.platform === 'Android') {
        scheme = 'com.skype.raider';
    } 

    navigator.startApp.check(scheme, function(message) { /* success */
        navigator.startApp.start([["action", "VIEW"], ["skype:" + $rootScope.skype_name + "?chat"]], function(message) {
        }, function(error) { // error 
            ons.notification.alert({
              message: 'Skype could not be started!'
            });
        });
    }, function(error) {
            ons.notification.alert({
              message: 'Skype is not installed!'
            });
    });
  };


$scope.openFacebook = function() {

    var scheme;

    if (device.platform === 'iOS') {
        scheme = 'fb://';
    } else if (device.platform === 'Android') {
        scheme = 'com.facebook.katana';
    } 

    navigator.startApp.check(scheme, function(message) { /* success */
        navigator.startApp.start([["action", "VIEW"], ["fb://profile/248584335233490"]], function(message) {
        }, function(error) { // error 
            ons.notification.alert({
              message: 'Facebookapp could not be started!'
            });
        });
    }, function(error) {
            ons.notification.alert({
              message: 'Facebookapp is not installed!'
            });
    });
  };


    $scope.play = function() {

      $rootScope.isPlaying = true;
      if (device.platform == "Android")
      {
        $rootScope.audio = new Media($rootScope.active_stream_url, function(){});
      } else {
        $rootScope.audio = new Audio($rootScope.active_stream_url);
      }

      $rootScope.audio.play();

    };

    $scope.stop = function() {

      $rootScope.isPlaying = false;
       $rootScope.audio.pause();

      
      if (device.platform == "Android")
      {
        $rootScope.audio.release();
        $rootScope.audio = new Media($rootScope.active_stream_url, function(){});
      } else {
        $rootScope.audio = null;
        $rootScope.audio = new Audio($rootScope.active_stream_url);
      }


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

