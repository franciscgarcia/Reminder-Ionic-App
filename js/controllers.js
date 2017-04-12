angular.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup', 'API_ENDPOINT', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT, $rootScope) {
    $scope.data = {
        student_no: '',
        password: ''
    }
    console.log(API_ENDPOINT.url)

    $scope.login = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/login/',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response + ' >> this is the user_ID')
                $rootScope.USN = response
                $state.go('menu.myProfile')

            }).error(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: response
                })
            })
        })
    }

}])

.controller('signupCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup', 'API_ENDPOINT',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT) {
    $scope.data = {
        first_name: '',
        middle_name: '',
        last_name: '',
        student_no: '',
        password: '',
        course: '',
        year_level: '',
        email: ''
    }
    
    $scope.register = function () {

        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/student/',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                var reg_id = response
                {
                    return $q(function (resolve, reject) {
                    $http({
                        url: API_ENDPOINT.url + '/student/' + reg_id + '/verify',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: ''

                        }).success(function (response) {
                            console.log(response)
                            var alertPopup = $ionicPopup.alert({
                                title: 'Register success!',
                                template: 'Thank you! Please check your email to verify account.'
                            })
                            $state.go('login')
                        }).error(function (response) {
                            console.log(response)
                
                        })
                    })
                }                 

            }).error(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Register failed!',
                    template: response
                })
            })
        })
    }

}])

.controller('myProfileCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope',
    '$ionicPush',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope, $ionicPush) {
    $ionicPush.register().then(function (t) {
        return $ionicPush.saveToken(t);
    }).then(function (t) {
        console.log('Token saved:', t.token);
        $rootScope.registration_token = t.token
    });

    $scope.$on('cloud:push:notification', function (event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
    });

    $http.get(API_ENDPOINT.url + '/student/' + $rootScope.USN)
   .success(function (response) {
       $scope.studentdetails = response;
   })
   
}])

.controller('myClassesCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var stud_ID = $rootScope.USN
    console.log(stud_ID)

   $http.get(API_ENDPOINT.url + '/student/' + stud_ID + '/subject/')
   .success(function (response) {
       $scope.classes = response
       console.log(response)
   })

    /*
    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/student/' + stud_ID + '/subject/')
            .success(function (response) {
                $scope.classes = response;
                console.log(response)
            })
        $scope.$broadcast('scroll.refreshComplete');
    } */

}])

.controller('myExamsCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var stud_ID = $rootScope.USN

    $http.get(API_ENDPOINT.url + '/student/' + stud_ID + '/exam/')
     .success(function (response) {
        $scope.exams = response
        console.log(response)
    })


    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/announcement/')
            .success(function (response) {
                $scope.announcements = response;
                console.log(response)
            })
        $scope.$broadcast('scroll.refreshComplete');
    }

}])

.controller('openClassesListCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT',
    '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope) {
    var student_id = $rootScope.USN


    $http.get(API_ENDPOINT.url + '/subject?student_id=' + student_id)
    .success(function (response) {
        $scope.subjects = response
        console.log(response)
    })

    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/subject?student_id=' + student_id)
            .success(function (response) {
                $scope.subjects = response;
                console.log(response)
            })
        $scope.$broadcast('scroll.refreshComplete');
    }

}])

.controller('openClassesDetailsCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup', 
    'API_ENDPOINT', '$rootScope', '$stateParams',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT, $rootScope, $stateParams) {
    var stud_id = $rootScope.USN
    $scope.data = {
        student_id: stud_id
    }
    var subject_id = $stateParams.subj_ID
    console.log(subject_id + ' this is the subject id')
    
    $http.get(API_ENDPOINT.url + '/subject/' + subject_id)
    .success(function (response) {
        $scope.subjectDetails = response
        console.log(response.id)
    })
    
    $scope.register = function () {
            return $q(function (resolve, reject) {
                $http({
                    url: API_ENDPOINT.url + '/subject/' + subject_id + '/register',
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: $scope.data

                }).success(function (response) {
                    console.log(response)
                    var alertPopup = $ionicPopup.alert({
                        title: 'Register success!',
                        template: 'You may now view this subject on your list of classes. Please login again.'
                    })
                    $state.go('login')

                }).error(function (response) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Registeration failed.',
                        template: response
                    })
                })
            })
        }

}])

.controller('announcementsCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT) {
    $http.get(API_ENDPOINT.url + '/announcement/')
   .success(function (response) {
       $scope.announcements = response
       console.log(response.length)
   })


    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/announcement/')
            .success(function (response) {
                $scope.announcements = response;
                console.log(response)
            })
        $scope.$broadcast('scroll.refreshComplete');
    }


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
