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

angular.module('mm.core.anouncementall', [])

.config(function($stateProvider) {

    $stateProvider

    .state('site.mm_anouncementall', {
        url: '/mm_anouncementall',
        views: {
            'site': {
                templateUrl: 'core/components/anouncementall/templates/list.html',
                controller: 'mmAnouncementallListCtrl'
            }
        }
    });

})

.run(function($mmEvents, mmCoreEventLogin, mmCoreEventSiteUpdated, mmCoreEventLogout, $mmTimetableDelegate) {
    $mmEvents.on(mmCoreEventLogin, $mmCoursesDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmCoursesDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventLogout, $mmAttendenceDelegate.clearAttendenceHandlers);
});
