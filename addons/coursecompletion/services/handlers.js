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

angular.module('mm.addons.coursecompletion')

/**
 * Course completion handlers factory.
 *
 * This factory holds the different handlers used for delegates.
 *
 * @module mm.addons.coursecompletion
 * @ngdoc service
 * @name $mmaCourseCompletionHandlers
 */
.factory('$mmaCourseCompletionHandlers', function($mmaCourseCompletion, $mmSite, $state) {

    var self = {};

    /**
     * View user completion handler.
     *
     * @module mm.addons.coursecompletion
     * @ngdoc method
     * @name $mmaCourseCompletionHandlers#viewCompletion
     */
    self.viewCompletion = function() {

        var self = {};

        /**
         * Check if handler is enabled.
         *
         * @return {Boolean} True if handler is enabled, false otherwise.
         */
        self.isEnabled = function() {
            return $mmaCourseCompletion.isPluginViewEnabled();
        };

        /**
         * Check if handler is enabled for this user in this context.
         *
         * @param {Object} user     User to check.
         * @param {Number} courseId Course ID.
         * @return {Boolean}        True if handler is enabled, false otherwise.
         */
        self.isEnabledForUser = function(user, courseId) {
            return $mmaCourseCompletion.isPluginViewEnabledForCourse(courseId);
        };

        /**
         * Get the controller.
         *
         * @param {Object} user     Course ID.
         * @param {Number} courseId Course ID.
         * @return {Object}         Controller.
         */
        self.getController = function(user, courseId) {

            /**
             * View course completion handler controller.
             *
             * @module mm.addons.coursecompletion
             * @ngdoc controller
             * @name $mmaCourseCompletionHandlers#viewCompletion:controller
             */
            return function($scope) {

                // Button title.
                $scope.title = 'mma.coursecompletion.viewcoursereport';

                $scope.action = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.course-completion', {
                        userid: user.id,
                        course: {id: courseId}
                    });

                };
            };

        };

        return self;
    };

    /**
     * Course nav handler.
     *
     * @module mm.addons.coursecompletion
     * @ngdoc method
     * @name $mmaCourseCompletionHandlers#coursesNav
     */
    self.coursesNav = function() {

        var self = {};

        /**
         * Check if handler is enabled.
         *
         * @return {Boolean} True if handler is enabled, false otherwise.
         */
        self.isEnabled = function() {
            return $mmaCourseCompletion.isPluginViewEnabled();
        };

        /**
         * Check if handler is enabled for this course.
         *
         * @param {Number} courseId Course ID.
         * @return {Boolean}        True if handler is enabled, false otherwise.
         */
        self.isEnabledForCourse = function(courseId) {
            return $mmaCourseCompletion.isPluginViewEnabledForCourse(courseId);
        };

        /**
         * Get the controller.
         *
         * @param {Number} courseId Course ID.
         * @return {Object}         Controller.
         */
        self.getController = function(courseId) {

            /**
             * Courses nav handler controller.
             *
             * @module mm.addons.coursecompletion
             * @ngdoc controller
             * @name $mmaCourseCompletionHandlers#coursesNav:controller
             */
            return function($scope, $state) {
                $scope.icon = 'ion-android-checkbox-outline';
                $scope.title = 'mma.coursecompletion.coursecompletion';
                $scope.action = function($event, course) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.course-completion', {
                        course: course
                    });
                };
            };
        };

        return self;
    };

    return self;
});
