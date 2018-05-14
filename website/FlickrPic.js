'use strict';
angular.module('myApp', ['ngMaterial'])
  .controller('AppCtrl', function ($scope, $mdDialog) {
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.showAdvanced = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        template: '<div class="dialog"><div class="search"><input class="search-input" type="text" ng-model="query" placeholder="Search for names.." title="Type in a name"></div><div><span ng-repeat="photo in photoList | filter:query"><span><a href="{{photo.url}}"><img src={{photo.url}} title={{photo.title}}/></a></span></span></div><div><md-button class="button" ng-click="cancel()">Exit</md-button></div></div>',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        fullscreen: $scope.customFullscreen
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };
    function DialogController($scope, $mdDialog) {
      $scope.apiFlicker = "https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=4ef2fe2affcdd6e13218f5ddd0e2500d&user_id=141840526@N02&format=json&nojsoncallback=1&per_page=500";

      $.getJSON($scope.apiFlicker, function (result) {
        $scope.photoList = result.photos.photo;
        $scope.photoList.forEach(function (element) {
          element.url = "https://farm1.staticflickr.com/" + element.server + "/" + element.id + "_" + element.secret + "_m.jpg";
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