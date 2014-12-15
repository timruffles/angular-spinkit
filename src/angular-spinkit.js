/**
 * angular-spinkit module
 * SpinKit (https://github.com/tobiasahlin/SpinKit) spinners for AngularJS
 *
 * Author: Urigo - https://github.com/Urigo
 */
'use strict';

var MODULES = [
    'ngRotatingPlaneSpinner',
    'ngDoubleBounceSpinner',
    'ngWaveSpinner',
    'ngWanderingCubesSpinner',
    'ngPulseSpinner',
    'ngChasingDotsSpinner',
    'ngCircleSpinner',
    'ngThreeBounceSpinner',
    'ngCubeGridSpinner',
    'ngWordPressSpinner',
    'ngFadingCircleSpinner',
    'ngSpinkitImagePreloader'
  ];

angular.module('angular-spinkit', MODULES);

if(animationSupported()) {

angular.module('ngRotatingPlaneSpinner', []).directive('rotatingPlaneSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/rotatingPlaneSpinner.html'
  };
});

angular.module('ngDoubleBounceSpinner', []).directive('doubleBounceSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/doubleBounceSpinner.html'
  };
});

angular.module('ngWaveSpinner', []).directive('waveSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/waveSpinner.html'
  };
});

angular.module('ngWanderingCubesSpinner', []).directive('wanderingCubesSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/wanderingCubesSpinner.html'
  };
});

angular.module('ngPulseSpinner', []).directive('pulseSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/pulseSpinner.html'
  };
});

angular.module('ngChasingDotsSpinner', []).directive('chasingDotsSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/chasingDotsSpinner.html'
  };
});

angular.module('ngCircleSpinner', []).directive('circleSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/circleSpinner.html'
  };
});

angular.module('ngThreeBounceSpinner', []).directive('threeBounceSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/threeBounceSpinner.html'
  };
});

angular.module('ngCubeGridSpinner', []).directive('cubeGridSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/cubeGridSpinner.html'
  };
});

angular.module('ngWordPressSpinner', []).directive('wordPressSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/wordPressSpinner.html'
  };
});

angular.module('ngFadingCircleSpinner', []).directive('fadingCircleSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/fadingCircleSpinner.html'
  };
});

} else {

  var replacement = function() {
    return {
      restrict: "E",
      templateUrl: "src/templates/fallback.html",
    }
  };

  MODULES.forEach(function(name) {
    var directiveName = name.replace(/^ng(\w)(\w+)/, function(_, fc, rest) {
      return fc.toLowerCase() + rest;
    });
    angular.module(name, []).directive(directiveName, replacement)
  });

}

angular.module('ngSpinkitImagePreloader', []).directive('spinkitImagePreloader', ['$compile', '$injector', function ($compile, $injector) {
  return {
    restrict: 'A',
    scope: {
      ngSrc: '@',
      spinkitImagePreloader: '@',
      spinkitImagePreloaderClass: '@'
    },
    link: function(scope, element, attrs) {
      var spinnerWrapper,
          spinnerWrapperClass = scope.spinkitImagePreloaderClass || 'spinner-wrapper',
          spinner;

      // Check for the existence of the spinkit-directive
      if(!$injector.has(attrs.$normalize(scope.spinkitImagePreloader) + 'Directive'))
        return;

      // Create and configure DOM-spinner-elements
      spinnerWrapper = angular.element('<div/>').addClass(spinnerWrapperClass),
      spinner = $compile('<' + scope.spinkitImagePreloader + '/>')(scope);
      spinnerWrapper.append(spinner);
      spinnerWrapper.css('overflow', 'hidden');

      element.after(spinnerWrapper);

      // Copy dimensions (inline and attributes) from the image to the spinner wrapper
      if(element.css('width'))
        spinnerWrapper.css('width', element.css('width'));

      if(attrs.width)
        spinnerWrapper.css('width', attrs.width + 'px');

      if(element.css('height'))
        spinnerWrapper.css('height', element.css('height'));

      if(attrs.height)
        spinnerWrapper.css('height', attrs.height + 'px');

      element.on('load', function () {
        spinnerWrapper.css('display', 'none');
        element.css('display', 'block');
      });

      scope.$watch('ngSrc', function () {
        spinnerWrapper.css('display', 'block');
        element.css('display', 'none');
      });
    }
  };
}]);

function animationSupported() {
  var animation = false,
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    elm = document.createElement("div"),
    pfx  = '';

  if( elm.style.animationName !== undefined ) { animation = true; }    

  if( animation === false ) {
    for( var i = 0; i < domPrefixes.length; i++ ) {
      if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
        pfx = domPrefixes[ i ];
        animationstring = pfx + 'Animation';
        keyframeprefix = '-' + pfx.toLowerCase() + '-';
        animation = true;
        break;
      }
    }
  }

  return animation;
}

