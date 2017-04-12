(function () {
    //it's a constructor that predefines methods in the connector object
    var myConnector = tableau.makeConnector();

    //the schema defines how to map the data in Tableau
    myConnector.getSchema = function(schemaCallback) {
        // Schema for magnitude and place data

        /*
            mag_place_cols is an array that contains objects for the columns
            magPlaceTable is a varaiable that defines a table schema object
        */
        var mag_place_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "mag",
            alias: "magnitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "title",
            alias: "title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "lat",
            alias: "latitude",
            columnRole: "dimension",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "lon",
            alias: "longitude",
            columnRole: "dimension",
            dataType: tableau.dataTypeEnum.float
        }];

        var magPlaceTable = {
            id: "magPlace",
            alias: "Magnitude and Place Data",
            columns: mag_place_cols
        };

        // Schema for time and URL data
        var time_url_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "time",
            alias: "time",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "url",
            alias: "url",
            dataType: tableau.dataTypeEnum.string
	}];

                    var timeUrlTable = {
                        id: "timeUrl",
                        alias: "Time and URL Data",
                        columns: time_url_cols
                    };

                    var standardConnection = {
                    "alias": "Joined earthquake data",
                    "tables": [{
                        "id": "magPlace",
                        "alias": "Magnitude and Place"
                    }, {
                        "id": "timeUrl",
                        "alias": "Time and URL"
                    }],
                    "joins": [{
                        "left": {
                            "tableAlias": "Magnitude and Place",
                            "columnId": "id"
                        },
                        "right": {
                            "tableAlias": "Time and URL",
                            "columnId": "id"
                        },
                        "joinType": "inner"
                    }]
                };

	schemaCallback([magPlaceTable, timeUrlTable]);
};
    //in the getData function, the table parameter lets you add data, and the doneCallback parameter signals that you're done
    myConnector.getData = function(table, doneCallback) {
    //converts the String value from tableau.connectionData back into an object (why?)
	var dateObj = JSON.parse(tableau.connectionData),
		dateString = "starttime=" + dateObj.startDate + "&endtime=" + dateObj.endDate,
		apiCall = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&" + dateString + "&minmagnitude=4.5";

	$.getJSON(apiCall, function(resp) {
		var feat = resp.features,
			tableData = [];

		var i = 0;

        //determines which table schema should be used when pushing data to the tableData array
		if (table.tableInfo.id == "magPlace") {
			for (i = 0, len = feat.length; i < len; i++) {
				tableData.push({
					"id": feat[i].id,
					"mag": feat[i].properties.mag,
					"title": feat[i].properties.title,
					"lon": feat[i].geometry.coordinates[0],
					"lat": feat[i].geometry.coordinates[1]
				});
			}
		}

		if (table.tableInfo.id == "timeUrl") {
			for (i = 0, len = feat.length; i < len; i++) {
				tableData.push({
					"id": feat[i].id,
					"url": feat[i].properties.url,
					"time": new Date(feat[i].properties.time) // Convert to a date format from epoch time
				});
			}
		}

        //adds the array of table data to the table object
		table.appendRows(tableData);
		doneCallback();
	});
};

    //validates the connector object before initializing
    tableau.registerConnector(myConnector);

    //runs the code in the block right when the page loads
    $(document).ready(function () {
        $("#submitButton").click(function() {
        //The date input fields are stored here
        var dateObj = {
            //trim removes spaces
            startDate: $('#start-date-one').val().trim(),
            endDate: $('#end-date-one').val().trim(),
        };
        //takes a string, determines if it's a valid date
        function isValidDate(dateStr) {
            var d = new Date(dateStr);
            return !isNaN(d.getDate());
        }

         //If the date is valid, it turns it into a String
        if (isValidDate(dateObj.startDate) && isValidDate(dateObj.endDate)) {
            //lets you pass data to the getSchema and getData functions
            tableau.connectionData = JSON.stringify(dateObj);
            tableau.connectionName = "USGS Earthquake Feed";
            tableau.submit();
        } else {
            $('#errorMsg').html("Enter valid dates. For example, 2016-05-08.");
        }
    });
    });

})();