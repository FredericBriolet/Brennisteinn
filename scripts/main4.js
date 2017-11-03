// OBJECTS
var groups = [];
var stepsVariables = [];
var stepXPosition = 0;
var currentStep = 0;
var timepoints = [5.7, 7.6, 9.7, 11.5, 13.7, 21.7, 29.7, 37.6, 46.4, 54.6, 62.7, 70.7, 79.6, 87.6, 95.4, 99.7, 103.5, 107.6, 111.4, 115.8, 117.8, 119.6, 121.8, 123.6];
var cameraShouldNotTurn = true;
var autoClear = true;
var experienceHasBegun = false;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var material, shaderMaterial, basicMaterial, particle;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, screenWidth/screenHeight, 0.1, 1000 );
var clock = new THREE.Clock({ autostart: false });

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioTag = document.querySelector('audio');
//var media = audioCtx.createMediaElementSource(audioTag);
var time = audioTag.currentTime;


// RENDERER
// var renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
var renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
renderer.setSize( screenWidth, screenHeight );
document.body.appendChild( renderer.domElement );

var gui = new dat.GUI();

var composer = new WAGNER.Composer( renderer, { useRGBA: false } );
composer.setSize( screenWidth, screenHeight );

var fxaaPass = new WAGNER.FXAAPass();
fxaaPass.fxaaPassActive = false;

var invertPass = new WAGNER.InvertPass();
invertPass.invertPassActive = false;

var bloomPass = new WAGNER.MultiPassBloomPass();
bloomPass.bloomPassActive = false;
bloomPass.params.blurAmount = 1.5;
bloomPass.params.zoomBlurStrength = 1;


var postprocess = gui.addFolder('postprocessing')
var fxaaPassActiveGui = postprocess.add(fxaaPass, 'fxaaPassActive');

var invertPassActiveGui = postprocess.add(invertPass, 'invertPassActive');

var bloomPassActiveGui = postprocess.add(bloomPass, 'bloomPassActive');
postprocess.add( bloomPass.params, 'blurAmount' ).min(0).max(2);
postprocess.add( bloomPass.params, 'applyZoomBlur' );
postprocess.add( bloomPass.params, 'zoomBlurStrength' ).min(0).max(2);

renderer.autoClearColor = true;
composer.reset();
composer.render( scene, camera );
composer.pass( bloomPass );
composer.pass( invertPass );
composer.toScreen();

// STATS
var stats = new Stats();

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
stats.domElement.style.display = 'none';

document.body.appendChild( stats.domElement );

// LIGHTS
var light = new THREE.AmbientLight( 0x111111 );
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0x111111, 10 );
//scene.add( directionalLight );

var spotLight = new THREE.SpotLight( 0xffffff, 10, 1000 );
spotLight.position.set(0, 0, 1000);
spotLight.angle = Math.PI / 2;
spotLight.exponent = 9000;
spotLight.target.position.set(0,0,-10000);
scene.add( spotLight );

var spotLightHelper = new THREE.SpotLightHelper( spotLight );
//scene.add( spotLightHelper );

// standard materials
material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
blackMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        iGlobalTime: { type: 'f', value: 0 }
    },
    vertexShader: document.getElementById('shaderVS').innerHTML,
    fragmentShader: document.getElementById('shaderFS').innerHTML,
    wireframe: false
});


window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


var debugStep = function(n){
	currentStep = n-1;
	if(time > 2){
		if(stepsVariables[n-1] === false){
			showStep(n-1);
			stepsVariables[n-1] = true;
		}
	}
	timepoints = [];
};

var showStep = function(number){
	
	// show step's group
	scene.add(groups[number]);
	groups[number].visible = true;
	//console.log('showStep' + number + ' (createStep'+ parseInt(number+1) +')');

	camera.position.x = (1000*number);
	camera.position.y = 0;
	camera.position.z = 0;
	//directionalLight.position.set( (1000*number), 10, 100 );
	spotLight.position.set( (1000*number), 0, 900 );
	spotLight.target.position.set( (1000*number),0,-10000);

	// remove and hide other groups
	for (var i = 0; i <= number-1; i++) {
		groups[i].visible = false;
		scene.remove(groups[i]);
	}
	autoClear = true;
};

var goToSecond = function(desiredTime = 40) {
	audioTag.currentTime = parseFloat(desiredTime);

	for (var i = 0; i <= timepoints.length-1; i++) {
		if(desiredTime >= timepoints[i] && desiredTime <= timepoints[i+1]) {
			currentStep = i;
			showStep(currentStep);
			return;
		}
	}
	currentStep = 0;
	showStep(currentStep);
}

var timeRange = gui.add(audioTag, 'currentTime', 0, 443).listen();
timeRange.onChange(function(value) {
	goToSecond(value);
});

dat.GUI.toggleHide();
document.addEventListener('keydown', function(event){
	if(event.keyCode === 72) {
		const display = stats.domElement.style.display === 'none' ? 'block' : 'none';
		stats.domElement.style.display = display;
	}
})

var initApp = function() {

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 0;

	for (var i = 0; i <= steps.length - 1; i++) {
		steps[i](stepXPosition);
		stepXPosition += 1000;
		groups[i].visible = false;
		//scene.add(groups[i]);
		stepsVariables.push(false);
	};
	scene.add(groups[0]);
	groups[0].visible = true;
	showStep(0);

}

var render = function () {

	requestAnimationFrame( render );
	time = audioTag.currentTime;

	// renderer.autoClear = autoClear;

	if(time > timepoints[currentStep]){
		if(stepsVariables[currentStep] === false){
			showStep(currentStep+1);
		}
		currentStep += 1;
	}

	if(experienceHasBegun){
		camera.position.z -= 0.1;
	} else {
		camera.position.z -= 0.001;
	}

	cameraShouldNotTurn = (currentStep === 0 || currentStep === 2 || currentStep === 6 || currentStep === 10 || currentStep === 13 ||currentStep === 14 || currentStep === 16 || currentStep === 20 || currentStep === 22 || currentStep === 25);
	// cameraShouldNotTurn = (currentStep === 0 || currentStep === 2 || currentStep === 6 || currentStep === 10 || currentStep === 13 ||currentStep === 14 || currentStep === 20 || currentStep === 22 || currentStep === 25);
	 if(!cameraShouldNotTurn){
	 	camera.rotation.z -= 0.001;
	} else {
		camera.rotation.z = 0;
	}

	stats.update();
	renderer.render(scene, camera);

	const postProccessEnabled = fxaaPass.fxaaPassActive || invertPass.invertPassActive || bloomPass.bloomPassActive;
	if(postProccessEnabled) {
		composer.reset();
		composer.render( scene, camera );

		if(invertPass.fxaaPassActive) {
			composer.pass( fxaaPass );
		}

		if(invertPass.invertPassActive) {
			composer.pass( invertPass );
		}

		if(bloomPass.bloomPassActive) {
			composer.pass( bloomPass );
		}
		composer.toScreen();
	}

	// debug, n = number of the slide to debug/create
	// debugStep(17);
};

initApp();

var body = document.querySelector('body');
var introContainer = document.querySelectorAll('.intro-container')[0];
var start = document.querySelectorAll('.btn-start')[0];
start.addEventListener('click', function(event) { 
  //clock.start();
  body.className += " isPlaying";
  // do this with TweenMax
  setTimeout(function(){
  	introContainer.style.display = "none"
  }, 400);

  audioTag.play();
  camera.position.z = 0;
  experienceHasBegun = true;
});

render();
