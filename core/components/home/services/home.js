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

angular.module('mm.core.home')

/**
 * Service to handle notifications (messages).
 *
 * @module mm.addons.notifications
 * @ngdoc service
 * @name $mmaNotifications
 */
.factory('$mmaNotifications', function($q, $log, $mmSite, $mmSitesManager) {

    $log = $log.getInstance('$mmHome');

    var self = {};

    // Function to format notification data.
    function formatNotificationsData(notifications) {
        angular.forEach(notifications, function(notification) {
            // Set message to show.
            if (notification.contexturl && notification.contexturl.indexOf('/mod/forum/')) {
                notification.mobiletext = notification.smallmessage;
            } else {
                notification.mobiletext = notification.fullmessage;
            }

            // Try to set courseid the notification belongs to.
            var cid = notification.fullmessagehtml.match(/course\/view\.php\?id=([^"]*)/);
            if (cid && cid[1]) {
                notification.courseid = cid[1];
            }
        });
    }

    /**
     * Get cache key for notification list WS calls.
     *
     * @return {String} Cache key.
     */
    function getNotificationsCacheKey() {
        return 'mmaNotifications:list';
    };

    /**
     * Get notifications from site.
     *
     * @module mm.addons.notifications
     * @ngdoc method
     * @name $mmaNotifications#getNotifications
     * @param {Boolean} read       True if should get read notifications, false otherwise.
     * @param {Number} limitFrom   Position of the first notification to get.
     * @param {Number} limitNumber Number of notifications to get.
     * @return {Promise}           Promise resolved with notifications.
     */
 


    /**
     * Check if plugin is available.
     *
     * @module mm.addons.notifications
     * @ngdoc method
     * @name $mmaNotifications#isPluginEnabled
     * @return {Boolean} True if plugin is available, false otherwise.
     */


    /**
     * Check if plugin is available for a certain site.
     *
     * @module mm.addons.notifications
     * @ngdoc method
     * @name $mmaNotifications#isPluginEnabledForSite
     * @param {String} siteid Site ID.
     * @return {Promise}      Resolved when enabled, otherwise rejected.
     */
    self.isPluginEnabledForSite = function(siteid) {
        return $mmSitesManager.getSite(siteid).then(function(site) {
            if (!site.wsAvailable('core_test100')) {
                return $q.reject();
            }
        });
    };
	    self.isPluginEnabled = function() {
        return $mmSite.wsAvailable('core_test100');
    };
	
	 var self = {};
 
    self.Test = function(userId) {
        var data = {
            userid : userId,
         };
        return $mmSite.read('core_test100', data);
    };
 self.getTestData = function(test, userid) {
        var promises = [];
 
        angular.forEach(test, function(test) {
            var promise = $mmUser.getProfile(test.userid);
            promises.push(promise);
            promise.then(function(user) {
                test.userfullname = user.fullname;
                test.userprofileimageurl = user.profileimageurl;
            }, function() {
                // Error getting profile. Set default data.
                return $translate('mm.notes.userwithid', {id: test.userid}).then(function(str) {
                    test.userfullname = str;
                });
            });
        });
        return $q.all(promises).then(function() {
            return test;
        });
    };

    return self;
});
