'use strict';


angular.module('myApp', ['ngMaterial'])

  .controller('AppCtrl', function ($scope, $mdDialog) {
    debugger;
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.apiFlicker = "https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=4ef2fe2affcdd6e13218f5ddd0e2500d&user_id=141840526@N02&format=json&nojsoncallback=1&per_page=500";

    /*$(document).ready(function () {
      debugger;
      $("md-button").click(function () {
        debugger;
        $.getJSON(apiFlicker, function (result) {
          debugger;
          $.each(result, function (i, photo) {
            var photoList = photo.photo;
          });
        });
      });
    });*/

    $scope.showAdvanced = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'Dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog) {

      $.getJSON(apiFlicker, function (result) {
        debugger;
        $.each(result, function (i, photo) {
          debugger;
          $scope.photoList = photo.photo;
        });
      });



      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }
  });