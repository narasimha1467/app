// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.core.anouncementall')

/**
 * Controller to handle the courses list.
 *
 * @module mm.core.attendence
 * @ngdoc controller
 * @name mmAttendenceListCtrl
 */
.controller('mmAnouncementallListCtrl', function($scope, $mmanouncementall, $mmAnouncementallDelegate, $mmUtil) {

    // Convenience function to fetch courses.
    function fetchAnouncementall(refresh) {
        return $mmAnouncementall.getUserAnouncementall(refresh).then(function(anouncement) {
            $scope.anouncementall = anouncementall;
            angular.forEach(anouncementall, function(anouncementall) {
                anouncementall._handlers = $mmTimetableDelegate.getNavHandlersFor(anouncementall.id);
            });
            $scope.filterText = ''; // Filter value MUST be set after courses are shown.
        }, function(error) {
            if (typeof error != 'undefined' && error !== '') {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.anouncementall.errorloadcourses', true);
            }
        });
    }
    fetchAnouncementall().finally(function() {
        $scope.AnouncementallLoaded = true;
    });

    $scope.refreshAnouncementall = function() {
        fetchAnouncementall(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
});
