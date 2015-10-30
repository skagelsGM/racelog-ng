(function() {
	var app = angular.module('rclog', []);
	var gridCtrl = null;
	var carCtrl  = null;
	var carKeys  = ['driver','number','raceteam','make','sponsor','status'];

	//
	// service: 	imageService
	// description: serves image source urls
	//
	app.factory('imageService', function($http) {
		var images = { 
		 "Ford":       "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Ford.png",
		  "Chevrolet":  "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Chevy.png",
		  "Toyota":     "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Toyota.png",
		  "McDonald's": "http://logodesignconsultant.com/blog/wp-content/uploads/2010/05/mcdonalds-logo.jpg",
		  "M&Ms": 		"http://www.mars.com/global/assets/images/center-content/mms.png",
		  "Lowe's": 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACXCAMAAAAvQTlLAAAAilBMVEUCP5r///8BP5oAO5gALZTw8vdSZKq+yuEAOJcAPZkAMJUANJYAK5UAMpaqtdWElMNld7FCYqlwhruZqs1Rb68AIpGirc7k5/BferTGz+OsutixvNcwUKHa4O53jL2ImsRSaat7hLkAHZAAEo0yWKYAAItCWqWGocoaRZ0lSp/R1ueUocn0+fp5frYz6smwAAAFXklEQVR4nO2aa3eiOhRAMYGaEOIDiBQBZdA6Prj//+/dEAQCYqvVSmets/uBNmiyCTknjxnDAAAAAADgAtT9ebzgGVUO3S0AAAAAAAAAAADAPwLsa4cBIWJy+tueE2FuppHLOR7aRAMh7MTTZDQaBeutwOi3dBpx9otgVBJEW4fRoY1kX1GTzMYjnXBlmAMHFMKmWB3zUYdkbZp4uE5DzJ57jVQQJY3aJGV8mD7DTMzHVtNH01js3WP9txX6guNXqyEs4lXTPdY4zWyMKMu2UdCUrnfipWaUCeQ17efezmZl+zK57tZNJ1qTOGOvskJ2KwKPU+FovYKwvXkPm1EXuvQV0Skj8GPVjKLReEbtbquIM3+pRedpI344OhGxd3oELgxB+lqkWNhrLTqXb+Tnki2iPNMjMJjGztVhLfPt3tUCI/SzJ0QnNZ1LxMHVYi2cf5EGZHSKWI/O6U701OrcMdNTupj00Dx+7r3JCPzy8YvoPGkdHPXVGt8hRi6mFh0ZgSa57Z3I6Mzc8LPa8u09Xtb1isYuMe9Y/yFk27Pl9eqe4xVMDk5vBH4GlQ9yCq7UeIMXohVXvGQEfm/ZJxeOenS2vUjV6pWK5bKTnGGFVxDP22w5+/4ymTJ7260vlK1YW3ZuFNP+F0HSsEb1zoZ0eGxbQXGnukzNZse6Ubd/KmWzzlsTPzutIRG2G5za+t3659Lrh/e1PV59+9oer2LQPWt7c1nRp/3V9cqtM3kivbiQ3DNVXIVdViTGTWNfenmmUUZtUcRXY8nk8PhaQNW0jFsVUaNqirtfezlVOpFFzkK90HumsCs4k6KiTiao86V9g5ep13b2ery/lNdRFCOa4ot8c0t/fe7VSkJqnYPPv1H9KnM4aqUr5RUJuV/JjL1TrsUoqZaxD3thmvo16U7uNoj6dU7pvrhuZUuq4EDx1teghdfJIenYynMrWcWMyG+kBv2OF7rwsluhna84ylQoRYzM1ZXjWN16JzzSP/pf4eVmdZk12RLXO72zp/QXX3VSXIxFoHst7cartbj5E/upT3XV3Hf/ulP+FC81SjSsN3KrF2fEbCduP11Nz4ucAb2IgbJyf2cdE7WM8vlhf94hPMfL8iTj27ysU/Fhb/GGDbRRQ/GIN2LvRvnIJ/WS6zlewd5mwr3NK9gwhewYtFF3FkIu9BiLvbTJ1k/ykvm/jIAbvD5MhXRAG/XR3BWMSjWTNO283suarhU7KWYuyrF2nGHenkFe76WNewNvq21D8scmetOP5tXHvBDz67/DWF80D9tfBjLT+igo2A06vka55iXboKtqI5kYzRgbYNzvUkW1tKS2qI7PVo3Gd71wuVtAtRe6OU+cN3tKixSnGojjdTnEnEe99o7KQTYuvRLDMbN2Xl0KsS2uk8wx2l4f569KIzJLi3N9RIWav4PmqO57XqPkzLso58egoOVlybv6tRlf5TeDmRxfTpQfpzHjnKtJLDHrZes3vSrcrDtvp2evC/ri0VElSeSVA2z56Hv8xGuOs36v2VWvmnmTKHq8uvttz9SKul5m2m79aFB96aMdWu7w5TrHaa1gPd60U3td32+3+svseBG+1k+gEvnI9FC1lnvz6igpeCeUXfQXf9cO2CP9GO3e94iIfgBsEoRsoZWI4k1g7X51sCvkhgQx/atYZYjMTk/ROAzHE9/RZ+57vTr/UIHaJbR9Rc3NyyONcwmVD8oJsR3W+shNXuinkcvUDrd4bczXk33tlYyH4Pil14CA15O8rGFZ8V4vengblmvHbBQPyy/4byoAAAAA8Lt5xn9mfnoNPRsqAAAAAAAAAAAAAOgD9rUAAAAA8M/wP4lJlomHjIsBAAAAAElFTkSuQmCC",
		  "GoDaddy": 	"https://lh5.googleusercontent.com/-4ELwL_o47R8/AAAAAAAAAAI/AAAAAAAAAAA/MQHqKH-O6ng/s0-c-k-no-ns/photo.jpg",
		  "Mobil": 		"http://www.sportsandentertainmentnews.com/nazphotopr/mobil_color1o5.gif",
		  "Best Buy": 	"data:image/png;base64,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",  
		  "Diet Mountain Dew": "data:image/jpeg;base64,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",
		  "The Home Depot": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAbFBMVEXucSX////ubhzyk2btZgDtZADucCL2uaDtYQDubBf+9vPtahD98eztaQn++PbsXQD86uP0qYj749r4zLrzo3/3w67veTj63dLzoHrynHTucy7xi1v508TwhlLyl3D518nvfUT1sZPwg0rsUgBfvDB/AAAOdklEQVRogb1b7bqjrA5VRBRRq7Zqa3c/7Nz/Pb4kIKBg2/2cM8OPeaa76pJkkZUEGkV/eaRzjOOU+t+R5G+j0yzWY/bx/zq8RY/j1sP/2/Cpgy7tT/8tPF2hS3zxL+HZE0F/svMp+ynk/xr2D+E55/e4zqaq4qKqprap2384e5pltEpuVM+YVey1Qf+b8Ln0e5YTsnyuUsG21/w9+BxZl5m1Ro/1+d8tvIXzmV5r7CU/nP8fC4+Rz9fYFbfg0wbwq/8ZnkzXLYO84UYbbX9+iX3838MzMcYegzfjsIo2WY5/rGD68WXl/1/DM97Jh1yrd9ekm1in5q/9sRK+38Ir9LhO3sy/2qBr/4uT+nBRr84r9mt4RiR6WdZxfd3ln4+u8A0b0f8kySLyS3hGqseYTPw1N7vw5O6jo/1Ft3yQ64/Iddhw8it4afnHn5SwqBKH3cmLOQQv+cfte50Fu9USn4hfwKPff3ImTeZEsw14Xk3Hn1c+BuxfXYtjf0T+E0YfMQjg9/BEWe8oKSPqHXzRNq0QgjDx8PErPlFK2bmJGxrxBP7WfA1PIj0jiQ8swsxtoyG44gj8kfEAPmofE1MysIhNoP9x+SU6Y8aex5zDGmolgYbV+keVadSSZGnA/ir+MHxBbZ8v0Q9H+5ifP7iG5vS8yh5VtDEZxSGA71xNj9/Dsyg7Zc/C4B+yuS/iWyTfwYiYXtcWIg3Z38L3X8MTMspgKZ6ltX+VDklUPSy+iSqXxSFB/xtvfQ+PrHuSiL8sPgXdreARMz7RifMWP8T/xTjVz5fwoHFxPHIWcWv/4yHS8fUBD1xpnFE1Flr/B/VV1HwHr1Um7gA/MvgP+Rj6o99jo3E2q9rln1r39flbdMCXGjHY+VMyxHFPo4DKWPtXO/6v4KnF7foJXtj3H6e1/+U6hxgYVbMH8Z5/VIZHQL/SD1GPCVI8GoMvWSgc/HROIYLws4cQX5YlxqqQ/fGWm/igeIyP8Z+cGKlE/ln7LyVzAMHhX8j/Ob3HT/FB78Hv3SEixv3K/1OxzF5fR24+vJ1/lIfszyvyIdtBjasHssInwD+0f18ZxamOHsCn9Y9fvoPXGldIwhHH/sA/WP9HavWOTAH4d/yrE/IBnhHtsxLwU0O4Uc5flDLuuxenoek7/Nvqn07V9+FZZO4oBp729tZO5EOtop4xAJPqUzfxdlx24s9Ty+IuPMvbuLb4L2l0Y/+mbCK4n2bHZ6qTPsxAAviGf47+FbdFlPfgCXvc7oOxaMGSgXP79B7uh1hXH18UX4BN0jtTAN/3f2GLtB14YF05CPvGhQz3jC3zP0K0WeL8cYAlFNFZvhV5h6/jZ+2UiGF4NgBQOXG7YpH/TD0dWedo3M9T5t0MvpxYGW+H8T9/4eenUyAF4RlXYlwMxDJa8k9OAF4roHFjciDiAml46uMv+ofCVD959B5eBpk+nZ59DSFHOPgEJxDWuDGhuXy3q9i1P7KjWBfnAXgCOW2fkvQ1xmfObEArJnHQGrft18Hokqt8i5QMYXxGyCMuN60BH56ojLrPI1IlcJvlX5n0p5Yyv4LW4yFj4Z0E8dNqkD4/DxytS3bhQeNijR+py9If+xzUuDyMrl5RKhTx/X88QksTE3wyNXe6B2+zs9405Kixfw/o4g069k1JgH+xJo1El18mNAhPouvV3GoUjS38w7+oLG1/+vIaEvn2j4sXGJMxVOskFPMh2jyvJpvoTcZA0f5K46CC7rKu9gHUaCVhAv5X0UYuHhW7El9wUWXuqc0d+kXVMGNeNI71vUjzod8CLNOfmDbxaqDGSb+f0lsCt975Fh47AzIPeVr8Zf55o6KNskWF/4osbAG8iYg1/lMsfr/INR11cZN7xofl3Ejy36z9Nf/SsfcKelbxrPDAIbCxLb7SOG2Sk6yQ6F1dtKYe4EMa7PBv4WiolcXokAVIrnJAYvVPxTrjEFmaR5x5vpfjIN1yldmMyz/GTVZFRCVEVdnWNEmHgAueKpNa+KdYxwbzpqfddS/xW0kK4fq/ndSr0sMtO/78HPt2OFQ6V7seUuLFgYfqI/Chtn5nuU3QjQr6QZdiIiOzSWdSd8iJ85eTz9X9C5tb6bGTL5DPGw7cVAqC8qM0Tlr+nFtH6fkHJEcb1uWffCH6/FkjxD+4TyHL9DFJU77mwKimAK006/fywGw0aOkO/DKM/yHWidbneJ0xrtoE47Wi0+y+wB1zwX5BR7EtV2qI+O/yfHFD+x9zWVi1HjiMBryaQxCRQkvZbP3VgbqQV9morJJhnnoj3MEH+7+tcjD+QLSpSL41vR7AIVgtcUcZq1LLgRYbt3muRJNwyEXko4iTjUFv9W2Nd6hRd2l2FWl2Gk4BIQEFxvlD9RWJtNWPL4lZnCylt3vykmlDwuXycfn3Fp5Nyu9nsJvgMvIEKlloVmDy0+Emi2CteknTxKqGvpReqaVhCrGKRnGbv509eQqmaNOhC0nU+fgwf2xTdSjQrIrQAjVT0ycOI+KJr9Wwbd/B4yLER+uGGOEB+wPLsevY5YjIKgocwFIkWqeeJeged9XwLTw8jOMUdchneQBfpsCKf43Ql4m8bTD0pFmbXifHZ6DzhFv8T/CqP/8wmQf37d9BWMMitLzkgld5Cvu3gE5uUB8Q6qybK3fxs4/wCu601EokwD/sbKo2Zdcmc/NYaEcf0DyX7+zgY0TQ/Gs/dbYY0XedLb43/2IApzs9FBXzZZIY6ySf2u9+4EEq/nxgPoBdl9tMrUao53/MRRRLcOhL1dYh7Lq5/c2rIsXHdY+2t+H2ZHul3vxxlS21T/3UdYQuxXDXz8bNEbfVGqj9P8K7xZytlcnW/7gyiErBbR233IzVUrXgYzJGElwDv4F3/D9t8MfcOMqpIs2u1h3wxYKPbSXc2N+H5yqfWe+LmR1wp9WlBqTBuMcSK40jMisT9LV8rapF/c6zaervwuenI9J3U9Ocrf/X/AM+YTGougf5re/KMTsYBVT+H7+EB2LiphC0rILzZ3Q1f9jCkTRtXhCCTFVe2PxMzR/tfzIdhh149DgyNNqUC5Z/6/iDokAGLIqDJZ7j/9t+gW3mrssgtWGymn8w/vSqg4Gax0LoCp9EhcqE3sDr+l0x2G8Xm16dq392j4gw0nbB8gfLysI9uhSCX3oXBfYiooM3lxD/zPYdmYouzyldPFM66XmS51XTOedHAvC2b6PwVeRc4xv+Gf1b/ImVFCR+yy5I/XK892jmanB2Xn14N87UE0qpL3Fnj38HB12ylpEFv3ilbr7TcQfdh193jUqYf2izwOKrym1M9SftjQdjOjI3XJYoiwOKmbjofom5qddKmH+okWX0T/lKLWVm08hR2h+ZCSWyLOjb/vHoT5yu0LfwPlAN86eBLH/RPzwRUmJNyZwkGvwvEtghV/kfp2la8TX4Fj7Us1LN1EAVr+MPtp3OKHhD/jhano0CusxXHr0ZK/jgjhDim90jdyj+c6jxVMgr+5w6Pb+HDMLt2wM+K3hOAd6PWMA/Z/fWjjatKi7rL0wvMH2TWU9u5/+ortszYvvwUuOeSTb98Q++wPx5YKsg7o5j/RL0xs2K6w9uz3NMvRN6e/CocXCir7p6MGj/4GZZDMkDcTonx9ScC46Rf9/Buxrnty2Rf3QONdJKyF2YzOTK45yNNYQ/avFHe1rxHbxacYmiKb17OBh//Q6HTJsxMD1bkQ2SCfnzDHCu/xnl+2+g4bW/lh0m6vtfxb/0ut4P7JJUFw2XA4Mjia1qKjn449y9dvEVvNG4Sa9SGrY/NAyi+aFt0/U3bC8p1kEYkrmB7n2ueu639/CuxukrRZh/ESQsFY9uyfXJhW6u6YK1TSMml+dRsd3x/2l/7QO8q3FFtFQIief/erGNzPM5WbTDNo8lPux8YNedMDMn/2D4Cn6jcdOyLenzrxz8CMpWzSLc+JIiQ64T0f5/hw7w8wZjmf9h80Ws9W89VsnARe3UHvNX3AmG/g/9KGAFv8XQPk5DvTTUP+aGEi4DpdMsOfRwnOksE7RGiLu7h/stPG5YRhXqaGD903RY+YAIbjeXJb6opguDwyRddarbzzHfn6PEx2qxHHz+FadjUTzNSkJL8MHBl/zn6sTkOAyfDvQCvK/l0scyUypePMA/GLrTQ6TeES4Ec5tlZ9Ushf9ePh4nlvDDHz+VlfjpD9RLgfgjB2YwLE/wyH+XEUoqp1mZ6qM03onsILzUuGCMU0EloH+1quMiG3977vbPpP1hBXyBroNuSOOW9e99p3vUueuz8pa6/s+TpWP+FXxEL36MMfF/7X+9HzdM7WN2arz7Cp93gR/h7MNHacj/Jv65f9b7cWV5kImdI8D3NHKaxenbDNODD2pcSP/sflwpdfzg4L+E5V/7HbqTbAVznK3+rfbjGmke57xOU5mK2/v5z2f4qArkmEb/lG82+3ES3zldICsdovz/VmX24IP80/NnKXxaWGfWWMOZs7s+5mr/63v0dZkR4p+av9rLUV0j5vC9zInTL6ywUHmvcW/gd3MsBs2C5cwJ6482QygZicwJ4ish1/KDxr2DD/NPatx0LrolD2VcOGLs8u8OR3u+5HwQPuT/4tQXxTRE7nOdTK6JDP/2f7HwLXzI/zDmzQ+aqDN/Wcmr+U8fSqov4EM5fqw1bnXZyfqfSv93eGjl+8GqNA2e1Qzon9K49XD9HxHIL+aP8u6gT/3Pz8xDjbUdjdsO1/6TJEPpWejN4GN7Os19GmorbvhX7/wIysUXly9yGwe9ndssOx1v4abqin+7P4Fy8Mv8+ZsVV/XPdhyT+RRuKXsaFx6p5d/5F3OHJlLS3n8O/WWnoW78b89VBvGX+X+tcWqw13i53U8PvredoBdWmHXOZQr/q8zKHeL8aOfHTSRy0QSH0rgb3fl6GfkM6PmHq/xBp/NF5uhJlIQHysr5uvOtHXL62eerdu/+D7reyTojQgG5AAAAAElFTkSuQmCC"
		};

		var service = this;

		// define handler mechanism
		service.all = function() {
			// load image map from $http		
			return $http.get('data/racecarimages.json')
				.then(
					function(result){
						return result;
					}
				);
		};

		var getImageSource = function(make) {
			return images[make];
		};

		service.loadImages = function(map) {
			images = map;
		}

		var init = function() {
			service.all().then(
				function(result) {
					service.loadImages(result.data.images);
				}
			);
		}

		// return public interface
		return {
			init: 			init,
			getImageSource: getImageSource
		}
	
	});

	//
	// model: 		 carModel
	// description:  The race car data model
	//
	app.service('carModel', function($http) {
		var service = this;

		service.all = function() {
			// load cars from $http
			return $http.get('data/racecarlog.json')
				.then(
					function(result){
						return result;
					}
				);
		};
	});	

	//
	// controller: 	RaceCarGridController
	// description: Controls the data grid for the list of race cars
	//
	app.controller( 'RaceCarGridController', ['$scope', '$rootScope', 'carModel', 'imageService', function($scope, $rootScope, carModel, imageService) {
		gridCtrl = this;

		$scope.title = 'Waiting for race car log to load...';
		$rootScope.isGridCtrlInitialized = true;

		$rootScope.updateSelected = function(car) {
			gridCtrl.updateSelected(car);
		};

		$rootScope.removeSelected = function() {
			gridCtrl.removeSelected();
		};

		$rootScope.add = function(car) {
			gridCtrl.cars.push(car);
		}

		this.data = {};
		this.selected = null;

		this.cars = [ 
			{
		      "driver":   "TEMPLATE",
		      "number":   "",
		      "raceteam": "",
		      "make":     "",
		      "sponsor":  "",
		      "status":   "Active"
		    }
	    ];

		// load cars from model
		carModel.all().then(
				function(result) {
					gridCtrl.data = result.data;
					$scope.title  = result.data.logName;
					gridCtrl.cars = result.data.cars;
				}
		);

		// imageService.init();

		this.carImgSrc = function(make) {
			return imageService.getImageSource(make);
	    }

		this.select = function(car) {
			this.selected = car;
			$rootScope.edit(car);
		}

		// Find and remove car from the log
		this.remove = function(car) {			
			var i = this.cars.indexOf(car);
			if (i != -1) {
				this.cars.splice(i, 1);
			}
		};	

		// remove the currently selected car
		this.removeSelected = function() {
			if (this.selected === null) {
				alert("Error: Cannot update selected car. No car is currently selected in the grid. ");
				return;
			}
		
			this.remove(this.selected);
			this.selected = null;
		};	

		// update the currently selected car	
		this.updateSelected = function(car) {
			if (this.selected === null) {
				alert("Error: Cannot update selected car. No car is currently selected in the grid. ");
				return;
			}

			this.removeSelected();
			this.cars.push(car);
			this.selected = null;
		};		       

	}]);

	//
	// controller: RaceCarController
	// description: Controls the race car editor/form
	//
	app.controller('RaceCarController', ['$scope', '$rootScope', function($scope, $rootScope) {
		carCtrl = this;

		$rootScope.edit = function(car) {
			carCtrl.editCar(car);
		}

		this.car = {};
		this.carInGrid = null;

		this.mode = function() {
			if (!$rootScope.isGridCtrlInitialized) { return 'init'; }
			return (this.carInGrid === null) ? 'add' : 'update';
		};

		this.show = function(mode) {
			var currMode = 'init';

			if ($rootScope.isGridCtrlInitialized) {
				currMode = (this.carInGrid === null) ? 'add' : 'update';
			} else {
				currMode = 'init';
			}

			if (currMode === 'init' || currMode === 'add') {
				return mode === currMode;
			}

			// show all mode buttons
			return true;
		};

		this.editCar = function(car) {
			// populate form
			this.carInGrid = car;
			for (var i in carKeys) {
				var key = carKeys[i];
				this.car[key] = this.carInGrid[key];	
			}			
		};

		// update car in the grid
		this.update = function() {
			$rootScope.updateSelected(this.car);
			// reset form
			this.carInGrid = null;
			this.car = {};			
		};

		// update car in the grid
		this.remove = function() {
			$rootScope.removeSelected(this.car);
			// reset form
			this.carInGrid = null;
			this.car = {};			
		};

		// add car to the grid
		this.add = function() {
			$rootScope.add(this.car);
			// reset form
			this.car = {};	
		};
	}]);

	// directives:
	// - title
	// - grid
	// - race car editor form
	app.directive('raceCarTitle', function(){
		return {
			restrict: 'E',
			templateUrl: 'race-car-title.html'			
		}
	});

	app.directive('raceCarGrid', function(){
		return {
			restrict: 'E',
			templateUrl: 'race-car-grid.html'			
		}
	});

	app.directive('raceCarForm', function() {
		return {
			restrict: 'E',
			templateUrl: 'race-car-form.html'
		};
	});
	
})();