angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.myProfile', {
    url: '/menu.myProfile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('menu.myClasses', {
    url: '/myClasses',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myClasses.html',
        controller: 'myClassesCtrl'
      }
    }
  })

  .state('menu.myExams', {
    url: '/menu.myExams',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myExams.html',
        controller: 'myExamsCtrl'
      }
    }
  })

  .state('menu.openClassesDetails', {
      url: '/openClassesDetails/:subj_ID',
    views: {
      'side-menu21': {
        templateUrl: 'templates/openClassesDetails.html',
        controller: 'openClassesDetailsCtrl'
      }
    }
  })

  .state('menu.openClassesList', {
    url: '/openClassesList',
    views: {
      'side-menu21': {
        templateUrl: 'templates/openClassesList.html',
        controller: 'openClassesListCtrl'
      }
    }
  })

  .state('menu.announcements', {
    url: '/announcements',
    views: {
      'side-menu21': {
        templateUrl: 'templates/announcements.html',
        controller: 'announcementsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});