document.addEventListener("deviceready", function() {

      if (device.platform == "Android")
      {
        $rootScope.audio = new Media($rootScope.active_stream_url, function(){});
        window.audioplayer.configure( function(){}, function(){});
      }


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

    navigator.startApp.check(scheme, function(message) { /* success  */
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


$scope.openViber = function() {

    var scheme;

    if (device.platform === 'iOS') {
        scheme = 'viber://';
    } else if (device.platform === 'Android') {
        scheme = 'com.viber.voip';
    } 

    navigator.startApp.check(scheme, function(message) { /* success */
        navigator.startApp.start([["action", "VIEW"], ["viber://calls"]], function(message) {
        }, function(error) { // error 
            ons.notification.alert({
              message: 'Viber could not be started!'
            });
        });
    }, function(error) {
            ons.notification.alert({
              message: 'Viber is not installed!'
            });
    });
  };


$scope.openWhatsApp = function() {

    var scheme;

    if (device.platform === 'iOS') {
        scheme = 'whatsapp://';
    } else if (device.platform === 'Android') {
        scheme = 'com.whatsapp';
    } 

    navigator.startApp.check(scheme, function(message) { /* success */
        navigator.startApp.start([["action", "VIEW"], ["whatsapp://send?text=Hi"]], function(message) {
        }, function(error) { // error 
            ons.notification.alert({
              message: 'WhatsApp could not be started!'
            });
        });
    }, function(error) {
            ons.notification.alert({
              message: 'WhatsApp is not installed!'
            });
    });
  };

$scope.openWebsite= function() {

   cordova.InAppBrowser.open('http://www.radiosama.net', '_blank', 'location=yes');

  };

$scope.openPhone = function(number) {


ons.notification.confirm({
      message: 'Are you sure you want to call ' + number + '?',
      callback: function(idx) {
        switch (idx) {
          case 0:
            
            break;
          case 1:

            window.plugins.CallNumber.callNumber(function(){}, function(){

            ons.notification.alert({
              message: 'Could not make the call'
            });


            }, number, false);


            break;
        }
      }
      });



   
  };

$scope.openEmail = function(email) {

  cordova.plugins.email.open({
      to:      email,
      subject: 'Hi',
      body:    'Hello...'
  });

   
  };



  $scope.copy_text = function(text){

    cordova.plugins.clipboard.copy(text);

    window.plugins.toast.showLongBottom(text + ' has been copied to clipboard');

  }


    $scope.play = function() {

      $rootScope.isPlaying = true;

    window.plugins.toast.showLongCenter('Buffering the streaming. Please wait.');


window.audioplayer.playstream( successCallback,
                               failureCallback,
                               // stream urls to play on android/ios
                               {
                                 android: $rootScope.active_stream_url,
                                 ios: $rootScope.active_stream_url
                               },
                               // metadata used for iOS lock screen, Android 'Now Playing' notification
                               {
                                 "title": "Radio Sama Line",
                                 "artist": "Radio Sama",
                                 "image": {
                                   "url": "https://media2.wnyc.org/i/300/300/l/80/1/governor_andrew_cuomo.jpg"
                                 },
                                 "imageThumbnail": {
                                   "url": "https://media2.wnyc.org/i/60/60/l/80/1/governor_andrew_cuomo.jpg"
                                 },
                                 "name": "Radio Sama Station",
                                 "description": "Description"
                               },
                               // javascript-specific json represenation of audio to be played, which will be passed back to 
                               // javascript via successCallback when a stream is launched from a local notification (eg, the
                               // alarm clock
                               extra
                             );

      if (device.platform == "Android")
      {
        if (!$rootScope.audio)
          $rootScope.audio = new Media($rootScope.active_stream_url, function(){});
      } else {
        $rootScope.audio = new Audio($rootScope.active_stream_url);
      }

     // $rootScope.audio.play();

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

