
/*
Notes
	BECAUSE SCOPE.DATA IS LOADED ASYNCHRONOUSLY, A CONSOLE.LOG RIGHT BELOW WILL YIELD ONLY EMPTY/UNDEFINED

	need to fix lat/long
	add google analytics
	add bunn's event form
	google maps selected info window
	attend button
	show markers for all events on the map
	*/

	angular.module('MyApp', ["firebase"])
	.controller('AppCtrl', function($scope, $firebaseArray) {
		var ref = firebase.database().ref('events')/*.child("messages");*/
		$scope.eventsVar = $firebaseArray(ref);		
		$scope.attendingEvent = function(){
			alert("You are attending the event!");
		}
		$scope.cardClicked = function(latitude, longitude, eventName, startTime, endTime, eventLocation, eventDescription) {
			longitude = longitude * -1;
			console.log("going to coordinates" + latitude + " " + longitude);
			var location = {lat: latitude, lng: longitude}
			updateMapLocation(location, eventName, startTime, endTime, eventLocation, eventDescription);			
		}
		console.log($scope.eventsVar);	
    //view event function
});

	function initMap() {

		var uluru = {lat: 37.4419, lng: -122.1430};

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: uluru
		});

		var marker = new google.maps.Marker({
			position: uluru,
			map: map
		});
	}

	function updateMapLocation(newLocation, eventName, startTime, endTime, eventLocation, eventDescription) {

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 20,
			center: newLocation
			/*map.animateCamera(CameraUpdateFactory.newLatLngZoom(newLocation, 15));*/
		});


		var marker = new google.maps.Marker({
			title: eventName,
			position: newLocation,
			map: map		
		});


		/*
			startTime: startTime,
			endTime: endTime,
			location: eventLocation,
			description: eventDescription
			*/

			//create the content string
			var contentString = '<h1>' + eventName + '</h1>' + '<b>Start: </b><p1>' + startTime + '</p1> <br>'  + '<b>End: </b><p1>' + endTime + '</p1> <br>' + '<b>Location: </b><p1>' + eventLocation + '</p1> <br>' + '<b>Description: </b><p1>' + eventDescription + '</p1> <br>';

		/*

						
								
			'<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
			'<div id="bodyContent">'+
			'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
			'sandstone rock formation in the southern part of the '+
			'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
			'south west of the nearest large town, Alice Springs; 450&#160;km '+
			'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
			'features of the Uluru - Kata Tjuta National Park. Uluru is '+
			'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
			'Aboriginal people of the area. It has many springs, waterholes, '+
			'rock caves and ancient paintings. Uluru is listed as a World '+
			'Heritage Site.</p>'+
			'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
			'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
			'(last visited June 22, 2009).</p>'+
			'</div>'+
			'</div>';
		*/



			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});	
			infowindow.open(map, marker);
			//infowindow.setContent(marker.startTime, marker.endTime, marker.location, marker.description);
//			infowindow.open(this.map, marker);
			window.google.maps.event.addListener(marker, 'click', function () {
				infowindow.open(map, marker);


			});
		//google.maps.event.trigger(marker, "click")
		//google.maps.event.trigger(marker, 'click');
	}


