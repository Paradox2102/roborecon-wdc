(function () {
    //it's a constructor that predefines methods in the connector object
    var myConnector = tableau.makeConnector();

    //the schema defines how to map the data in Tableau
    myConnector.getSchema = function (schemaCallback) {
        // Schema for scouting report data
        var scouting_rpt_cols = [
        {id: "id", alias: "ID", dataType: tableau.dataTypeEnum.string }, 
        {id: "event_id", alias: "Event ID", dataType: tableau.dataTypeEnum.string }, 
        {id: "team_id", alias: "Team ID", dataType: tableau.dataTypeEnum.string},
        {id: "scored_at", alias: "Scored At", dataType: tableau.dataTypeEnum.datetime}, 
        {id: "scored_by_name", alias: "Scored By", dataType: tableau.dataTypeEnum.string},
        {id: "scored_by_email", alias: "Scored By Email", dataType: tableau.dataTypeEnum.string},
        {id: "rating_overall_gear_effeciency_auto", alias: "Auto Gear Effeciency", dataType: tableau.dataTypeEnum.int},
        {id: "rating_overall_gear_placement_auto", alias: "Auto Side Gear Placement", dataType: tableau.dataTypeEnum.int},
        {id: "rating_overall_pilot_competency", alias: "Pilot Competency", dataType: tableau.dataTypeEnum.int},
        {id: "rating_overall_robot_stability", alias: "Robot Stability", dataType: tableau.dataTypeEnum.int},
        {id: "rating_scoring_airship_climb", alias: "Airship Climb", dataType: tableau.dataTypeEnum.int},
        {id: "rating_scoring_base_line_made_auto", alias: "Auto Base Line Crossing", dataType: tableau.dataTypeEnum.int},
        {id: "rating_scoring_gears_made", alias: "Teleop Gears Made", dataType: tableau.dataTypeEnum.int},
        {id: "rating_scoring_gears_made_auto", alias: "Auto Gears Made", dataType: tableau.dataTypeEnum.int},
        {id: "rating_scoring_high_goals_made", alias: "Teleop High Goals Made", dataType: tableau.dataTypeEnum.int},
        {id: "rating_scoring_high_goals_made_auto", alias: "Auto High Goals Made", dataType: tableau.dataTypeEnum.int},
        {id: "rating_scoring_low_goals_made", alias: "Teleop Low Goals Made", dataType: tableau.dataTypeEnum.int},
        {id: "rating_scoring_low_goals_made_auto", alias: "Auto Low Goals Made", dataType: tableau.dataTypeEnum.int}
        ];

        //schema for overall stats including ranking stats
        var overall_stats_cols = [
        {id: "team_id", alias: "Team ID", dataType: tableau.dataTypeEnum.string},
        {id: "event_id", alias: "Event ID", dataType: tableau.dataTypeEnum.string }, 
        {id: "ccwms", alias: "CCWMS", dataType: tableau.dataTypeEnum.float},
        {id: "dprs", alias: "DPRS", dataType: tableau.dataTypeEnum.float},
        {id: "orps", alias: "OPRS", dataType: tableau.dataTypeEnum.float},
        {id: "pressure", alias: "Total Pressure", dataType: tableau.dataTypeEnum.int},
        {id: "ranking", alias: "Rank", dataType: tableau.dataTypeEnum.int},
        {id: "rankingAuto", alias: "Total Auto Points", dataType: tableau.dataTypeEnum.int},
        {id: "rankingMatchPoints", alias: "Total Match Points", dataType : tableau.dataTypeEnum.int},
        {id: "rankingPlayed", alias: "Matches Played", dataType : tableau.dataTypeEnum.int},
        {id: "rankingRecord", alias: "Record", dataType: tableau.dataTypeEnum.string},
        {id: "rankingRotor", alias: "Total Rotor Points", dataType : tableau.dataTypeEnum.int},
        {id: "rankingScore", alias: "Ranking Score", dataType : tableau.dataTypeEnum.float},
        {id: "rankingTouchpad", alias: "Total Climbing Points", dataType : tableau.dataTypeEnum.int},
        {id: "updated_at", alias: "Updated At", dataType : tableau.dataTypeEnum.datetime}
        ];

        var event_match_stats_cols = [
        {id: "team_id", alias: "Team ID", dataType : tableau.dataTypeEnum.string},
        {id: "event_id", alias: "Event ID", dataType : tableau.dataTypeEnum.string}, 
        {id: "match_id", alias: "Match ID", dataType: tableau.dataTypeEnum.string},
        {id: "adjustPoints", alias: "Adjust Points", dataType : tableau.dataTypeEnum.int},
        {id: "autoFuelHigh", alias: "Auto Fuel High", dataType : tableau.dataTypeEnum.int},
        {id: "autoFuelLow", alias: "Auto Fuel Low", dataType : tableau.dataTypeEnum.int},
        {id: "autoFuelPoints", alias: "Auto Fuel Points", dataType : tableau.dataTypeEnum.int},
        {id: "autoMobilityPoints", alias: "Auto Mobility Points", dataType : tableau.dataTypeEnum.int},
        {id: "autoPoints", alias: "Auto Points", dataType : tableau.dataTypeEnum.int},
        {id: "autoRotorPoints", alias: "Auto Rotor Points", dataType : tableau.dataTypeEnum.int},
        {id: "foulCount", alias: "Foul Count", dataType : tableau.dataTypeEnum.int},
        {id: "foulPoints", alias: "Foul Points", dataType : tableau.dataTypeEnum.int},
        {id: "kPaBonusPoints", alias: "kPa Bonus Points", dataType : tableau.dataTypeEnum.int},
        {id: "kPaRankingPointAchieved", alias: "kPa Ranking Point Achieved", dataType : tableau.dataTypeEnum.int},
        {id: "match_time", alias: "Match Time", dataType : tableau.dataTypeEnum.datetime},
        {id: "robot1Auto", alias: "Robot 1 Auto", dataType : tableau.dataTypeEnum.string},
        {id: "robot2Auto", alias: "Robot 2 Auto", dataType : tableau.dataTypeEnum.string},
        {id: "robot3Auto", alias: "Robot 3 Auto", dataType : tableau.dataTypeEnum.string},
        {id: "rotor1Auto", alias: "Rotor 1 Auto", dataType : tableau.dataTypeEnum.int},
        {id: "rotor2Auto", alias: "Rotor 2 Auto", dataType : tableau.dataTypeEnum.int},
        {id: "rotor1Engaged", alias: "Rotor 1 Engaged", dataType : tableau.dataTypeEnum.int},
        {id: "rotor2Engaged", alias: "Rotor 2 Engaged", dataType : tableau.dataTypeEnum.int},
        {id: "rotor3Engaged", alias: "Rotor 3 Engaged", dataType : tableau.dataTypeEnum.int},
        {id: "rotor4Engaged", alias: "Rotor 4 Engaged", dataType : tableau.dataTypeEnum.int},
        {id: "rotorBonusPoints", alias: "Rotor Bonus Points", dataType : tableau.dataTypeEnum.int},
        {id: "rotorRankingPointAchieved", alias: "Rotor Ranking Point Achieved", dataType : tableau.dataTypeEnum.int},
        {id: "tba_rpEarned", alias: "RP Earned", dataType : tableau.dataTypeEnum.int},
        {id: "techFoulCount", alias: "Tech Foul Count", dataType : tableau.dataTypeEnum.int},
        {id: "teleopFuelHigh", alias: "Teleop Fuel High", dataType : tableau.dataTypeEnum.int},
        {id: "teleopFuelLow", alias: "Teleop Fuel Low", dataType : tableau.dataTypeEnum.int},
        {id: "teleopFuelPoints", alias: "Teleop Fuel Points", dataType : tableau.dataTypeEnum.int},
        {id: "teleopPoints", alias: "Total Teleop Points", dataType : tableau.dataTypeEnum.int},
        {id: "teleopRotorPoints", alias: "Teleop Rotor Points", dataType : tableau.dataTypeEnum.int},
        {id: "teleopTakeoffPoints", alias: "Teleop Takeoff Points", dataType : tableau.dataTypeEnum.int},
        {id: "totalPoints", alias: "Total Points", dataType : tableau.dataTypeEnum.int},
        {id: "touchpadFar", alias: "Far Touchpad", dataType : tableau.dataTypeEnum.string},
        {id: "touchpadMiddle", alias: "Middle Touchpad", dataType : tableau.dataTypeEnum.string},
        {id: "touchpadNear", alias: "Near Touchpad", dataType : tableau.dataTypeEnum.string},
        {id: "xTotalFuelPoints", alias: "Total Fuel Points", dataType : tableau.dataTypeEnum.int},
        {id: "xTotalHighFuels", alias: "Total High Fuel Points", dataType : tableau.dataTypeEnum.int},
        {id: "xTotalLowFuels", alias: "Total Low Fuel Points", dataType : tableau.dataTypeEnum.int},
        {id: "xTotalRotorPoints", alias: "Total Rotor Points", dataType : tableau.dataTypeEnum.int},
        {id: "xTotalRotorsEngaged", alias: "Total Rotors Engaged", dataType : tableau.dataTypeEnum.int}
        ];

        var scoutingReportsTableInfo = {
            id: "scoutingReports",
            alias: "Scouting Reports",
            columns: scouting_rpt_cols
        };

        var overallStatsTableInfo = {
            id: "overallStats",
            alias: "Overall Stats",
            columns: overall_stats_cols,
            //joinOnly: true
        };

        var eventMatchStatsTableInfo = {
            id: "eventMatchStats",
            alias: "Event Match Stats",
            columns: event_match_stats_cols,
            //joinOnly: true
        }

        var scoutingRptOverallStatConnection = {
            "alias": "Joined Scouting and TBA Overall Stat Data",
            "tables": [
                {"id": "overallStats", "alias": "Overall Stats"},
                {"id": "scoutingReports", "alias": "Scouting Reports"},    
                {"id": "eventMatchStats", "alias": "Event Match Stats"}
            ],
            "joins": [
                {
                    "right": {"tableAlias": "Scouting Reports", "columnId": "team_id"},
                    "left":{"tableAlias": "Overall Stats", "columnId": "team_id"},
                    "joinType": "inner"
                },
                {
                    "right": {"tableAlias": "Scouting Reports", "columnId": "event_id"},
                    "left":{"tableAlias": "Overall Stats", "columnId": "event_id"},
                    "joinType": "inner"
                },

                {
                    "right": {"tableAlias": "Event Match Stats", "columnId": "team_id"},
                    "left":{"tableAlias": "Overall Stats", "columnId": "team_id"},
                    "joinType": "inner"
                },
                {
                    "right": {"tableAlias": "Event Match Stats", "columnId": "event_id"},
                    "left":{"tableAlias": "Overall Stats", "columnId": "event_id"},
                    "joinType": "inner"
                }
            ]
        }

        // var scoutingRptMatchStatConnection = {
        //     "alias": "Joined Scouting and TBA Match Stat Data",
        //     "tables": [{"id": "scoutingReports", "alias": "Scouting Reports"},
        //                {"id": "eventMatchStats", "alias": "Event Match Stats"}],
        //     "joins": [
        //         {
        //             "left": {"tableAlias": "Scouting Reports", "columnId": "team_id"},
        //             "right":{"tableAlias": "Event Match Stats", "columnId": "team_id"},
        //             "joinType": "inner"
        //         },
        //         {
        //             "left": {"tableAlias": "Scouting Reports", "columnId": "event_id"},
        //             "right":{"tableAlias": "Event Match Stats", "columnId": "event_id"},
        //             "joinType": "inner"
        //         }
        //     ]
        // }

        schemaCallback([scoutingReportsTableInfo, overallStatsTableInfo, eventMatchStatsTableInfo], [scoutingRptOverallStatConnection]);
    };

    //in the getData function, the table parameter lets you add data, and the doneCallback parameter signals that you're done
    myConnector.getData = function (table, doneCallback) {
        //converts the String value from tableau.connectionData back into an object (why?)
        var teamObj = JSON.parse(tableau.connectionData);
        var teamNum = teamObj.team_number;
        var apiKey = teamObj.api_key;

        var tableData = [];

        if (table.tableInfo.id == "scoutingReports") {
            RoboreconDb.getEventScoutingReports(teamNum, apiKey, "2017cada").then(function (snapshot) {
                var data = snapshot.val();
                $.each(data, function (k, v) {
                    //console.log(k);
                    tableData.push({
                        "id": k,
                        "event_id": v.event_id,
                        "team_id": v.team_id,
                        "scored_at": new Date(v.scored_at),
                        "scored_by_name": v.scored_by.name,
                        "scored_by_email": v.scored_by.email,
                        "rating_overall_gear_effeciency_auto": v.rating_overall_gear_effeciency_auto,
                        "rating_overall_gear_placement_auto": v.rating_overall_gear_placement_auto,
                        "rating_overall_pilot_competency": v.rating_overall_pilot_competency,
                        "rating_overall_robot_stability": v.rating_overall_robot_stability,
                        "rating_scoring_airship_climb": v.rating_scoring_airship_climb,
                        "rating_scoring_base_line_made_auto": v.rating_scoring_base_line_made_auto,
                        "rating_scoring_gears_made": v.rating_scoring_gears_made,
                        "rating_scoring_gears_made_auto": v.rating_scoring_gears_made_auto,
                        "rating_scoring_high_goals_made": v.rating_scoring_high_goals_made,
                        "rating_scoring_high_goals_made_auto": v.rating_scoring_high_goals_made_auto,
                        "rating_scoring_low_goals_made": v.rating_scoring_low_goals_made,
                        "rating_scoring_low_goals_made_auto": v.rating_scoring_low_goals_made_auto
                    });
                });
                //adds the array of table data to the table object
                table.appendRows(tableData);
                doneCallback();
            });
        }

       if (table.tableInfo.id == "overallStats") {
            RoboreconDb.getOverallRobotStats("2017cada").then(function (snapshot) {
                var data = snapshot.val();
                var eventId = snapshot.key;
                $.each(data, function(k, v) {
                    tableData.push({
                        "team_id": k,
                        "event_id": eventId,
                        "ccwms": v.ccwms,
                        "dprs": v.dprs,
                        "oprs": v.oprs,
                        "pressure": v.pressure,
                        "ranking": v.ranking,
                        "rankingAuto": v.rankingAuto,
                        "rankingMatchPoints": v.rankingMatchPoints,
                        "rankingPlayed": v.rankingPlayed,
                        "rankingRotor": v.rankingRotor,
                        "rankingScore": v.rankingScore,
                        "rankingTouchpad": v.rankingTouchpad,
                        "updated_at": new Date(v.updated_at)
                    });
                });
                table.appendRows(tableData);
                doneCallback();
            });
        };

        if (table.tableInfo.id == "eventMatchStats") {
            RoboreconDb.getOverallRobotStats("2017cada").then(function (snapshot) {
                var data = snapshot.val();
                var eventId = snapshot.key;
                var matches = [];

                

                $.each(data, function(k, v) {
                    //console.log(k);
                    $.each(v.scores, function(matchKey, matchValue){
                        tableData.push({
                            "team_id": k,
                            "event_id": eventId,
                            "autoPoints": matchValue.autoPoints,
                            "adjustPoints": matchValue.adjustPoints,
                            "autoFuelHigh": matchValue.autoFuelHigh,
                            "autoFuelLow": matchValue.autoFuelLow,
                            "autoFuelPoints": matchValue.autoFuelPoints,
                            "autoMobilityPoints": matchValue.autoMobilityPoints,
                            "autoPoints": matchValue.autoPoints,
                            "autoRotorPoints": matchValue.autoRotorPoints,
                            "foulCount": matchValue.foulCount,
                            "foulPoints": matchValue.foulPoints,
                            "kPaBonusPoints": matchValue.kPaBonusPoints,
                            "kPaRankingPointAchieved": matchValue.kPaRankingPointAchieved,
                            "match_time": matchValue.match_time,
                            "robot1Auto": matchValue.robot1Auto,
                            "robot2Auto": matchValue.robot2Auto,
                            "robot3Auto": matchValue.robot3Auto,
                            "rotor1Auto": matchValue.rotor1Auto,
                            "rotor2Auto": matchValue.rotor2Auto,
                            "rotor1Engaged": matchValue.rotor1Engaged,
                            "rotor2Engaged": matchValue.rotor2Engaged,
                            "rotor3Engaged": matchValue.rotor3Engaged,
                            "rotor4Engaged": matchValue.rotor4Engaged,
                            "rotorBonusPoints": matchValue.rotorBonusPoints,
                            "rotorRankingPointAchieved": matchValue.rotorRankingPointAchieved,
                            "tba_rpEarned": matchValue.tba_rpEarned,
                            "techFoulCount": matchValue.techFoulCount,
                            "teleopFuelHigh": matchValue.teleopFuelHigh,
                            "teleopFuelLow": matchValue.teleopFuelLow,
                            "teleopFuelPoints": matchValue.teleopFuelPoints,
                            "teleopPoints": matchValue.teleopPoints,
                            "teleopRotorPoints": matchValue.teleopRotorPoints,
                            "teleopTakeoffPoints": matchValue.teleopTakeoffPoints,
                            "totalPoints": matchValue.totalPoints,
                            "touchpadFar": matchValue.touchpadFar,
                            "touchpadMiddle": matchValue.touchpadMiddle,
                            "touchpadNear": matchValue.touchpadNear,
                            "xTotalFuelPoints": matchValue.xTotalFuelPoints,
                            "xTotalHighFuels": matchValue.xTotalHighFuels,
                            "xTotalLowFuels": matchValue.xTotalLowFuels,
                            "xTotalRotorPoints": matchValue.xTotalRotorPoints,
                            "xTotalRotorsEngaged": matchValue.xTotalRotorsEngaged
                        })
                    })
                });
                table.appendRows(tableData);
                doneCallback();
            });
        };
        
    };

    //validates the connector object before initializing
    tableau.registerConnector(myConnector);

    //runs the code in the block right when the page loads
    $(document).ready(function () {
        var tn = Cookies.get('teamNum');
        var ak = Cookies.get('apiKey');

        if(tn !== undefined){
            $('#teamNum').val(tn);
        }

        if(ak !== undefined){
            $('#apiKey').val(ak)
        }

        $("#submitButton").click(function () {
            //The date input fields are stored here
            var teamObj = {
                //trim removes spaces
                team_number: $('#teamNum').val().trim(),
                api_key: $('#apiKey').val().trim(),
            };

            Cookies.set('teamNum', teamObj.team_number);
            Cookies.set('apiKey', teamObj.api_key);

            tableau.connectionData = JSON.stringify(teamObj);
            tableau.connectionName = "Roborecon Scouting WDC";
            tableau.submit();
        });
    });
})()