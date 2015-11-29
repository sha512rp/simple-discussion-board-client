'use strict';

/* Controllers */

var boardApp = angular.module('boardApp', []);

boardApp.controller('ThreadListCtrl', function($scope) {
  $scope.threads = [
    {'title': 'Nexus S',},
    {'title': 'Motorola XOOM™ with Wi-Fi'},
    {'title': 'MOTOROLA XOOM™'}
  ];
});
