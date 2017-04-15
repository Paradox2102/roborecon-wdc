'use strict';

var RoboreconDb = (function () {
    // private attributes
    var dbRootUrl = "https://paradox-scout-dc256.firebaseio.com/",
        dbConfig = {
            apiKey: "AIzaSyDleJPx9RQChKn4DlLV9nXqMNafP7BvhG0",
            authDomain: "paradox-scout-dc256.firebaseapp.com",
            databaseURL: "https://paradox-scout-dc256.firebaseio.com",
            storageBucket: "paradox-scout-dc256.appspot.com",
            messagingSenderId: "777517430963"
        },

        // firebase references
        dbRef = firebase.initializeApp(dbConfig).database().ref(),

        // private methods
        getEventScoutingReports = function (teamNum, apiKey, eventKey) {
            //return dbRef.child(`team_scouting_reports/${teamNum}/${apiKey}/${eventKey}`).once('value');
            return dbRef.child('team_scouting_reports/' + teamNum + '/' + apiKey + '/' + eventKey).once('value');
        },

        getOverallRobotStats = function (eventKey){
            return dbRef.child('event_scores/' + eventKey).once('value');
        },

        // ----------------------------------------------------------------------
        // UTILITY METHODS
        // ----------------------------------------------------------------------
        cleanUserKey = function (email) {
            // firebase keys cannot include ., $, #, [, ], / characters
            return email.toLowerCase()
                .replace(/\./g, '%2E')
                .replace(/\$/g, '%24')
                .replace(/\#/g, '%23')
                .replace(/\[/g, '%5B')
                .replace(/\]/g, '%5D')
                .replace(/\//g, '%2F');
        };

    // public api
    return {
        //what does this do
        getEventScoutingReports: getEventScoutingReports,
        getOverallRobotStats: getOverallRobotStats
    };
})();