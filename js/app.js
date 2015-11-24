(function(){
    var app = angular.module('TimerApp', []);
    app.controller('TimerCtrl', function($scope, $timeout) {
        $scope.standard = 600;
        $scope.counter = $scope.standard;
        $scope.fillHeight = 0 + '%';
        $scope.running = false;

        var mytimeout = null; // the current timeoutID
        // actual timer method, counts down every second, stops on zero
        $scope.onTimeout = function() {
            if($scope.counter ===  0) {
                $scope.$broadcast('timer-stopped', 0);
                $scope.running = false;
                $timeout.cancel(mytimeout);
                return;
            }
            $scope.counter--;
            $scope.fillHeight =  100 - $scope.counter / $scope.standard * 100 + '%';
            mytimeout = $timeout($scope.onTimeout, 1000);
        };
        $scope.startTimer = function() {
            if($scope.running === false){
                mytimeout = $timeout($scope.onTimeout, 1000);
                $scope.running = true;
            }
        };
        // stops timer
        $scope.stopTimer = function() {
            $scope.$broadcast('timer-stopped', $scope.counter);
            $scope.running = false;
            $timeout.cancel(mytimeout);
        };
        // resets timer
        $scope.resetTimer = function() {
            $scope.stopTimer();
            $scope.standard = 600;
            $scope.counter = $scope.standard;
            $scope.fillHeight = 0 + '%';
        };
        $scope.add = function(){
            if($scope.running === false && $scope.standard < 3540){
                $scope.standard += 60;
                $scope.counter += 60;
            }
        };
        $scope.subtract = function(){
            if($scope.running === false && $scope.standard > 60){
                $scope.standard -= 60;
                $scope.counter -= 60;
            }
        };
        // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
        $scope.$on('timer-stopped', function(event, remaining) {
            if(remaining === 0) {
                console.log('your time ran out!');
            }
        });
    });

    app.filter('secondsToDateTime', [function() {
        return function(seconds) {
            return new Date(1970, 0, 1).setSeconds(seconds);
        };
    }]);
})();
