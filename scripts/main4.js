var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var clock = new THREE.Clock({ autostart: false });

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioTag = document.querySelector('audio');
//var media = audioCtx.createMediaElementSource(audioTag);
var time = audioTag.currentTime;

// OBJECTS
var steps = [];
var groups = [];
var stepsVariables = [];
var stepXPosition = 0;
var currentStep = 0;
var timepoints = [5.7, 7.6, 9.7, 11.5, 13.7, 21.7, 29.7, 37.6, 46.4, 54.6, 62.7, 70.7, 79.6, 87.6, 95.4, 99.7, 103.5, 107.6, 111.4, 115.8, 117.8, 119.6, 121.8, 123.6];
var material, shaderMaterial, basicMaterial;
var particle;
var cameraShouldNotTurn = true;
var autoClear = true;

// RENDERER
var renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// STATS
var stats = new Stats();
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


// var planeGeometry = new THREE.PlaneGeometry( 100, 100, 32, 32 );
// var planeShaderMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//         iGlobalTime: { type: 'f', value: 0 }
//     },
//     vertexShader: document.getElementById('shaderVS').innerHTML,
//     fragmentShader: document.getElementById('shaderFS').innerHTML,
//     wireframe: false,
//     transparent: true,
//     opacity: .5
// });
// var plane = new THREE.Mesh( planeGeometry, planeShaderMaterial );
// plane.position.set(camera.position)
// scene.add( plane );

var createStep1 = function(stepXPosition){
	var group = new THREE.Object3D();
    var floor = new THREE.Mesh( new THREE.CubeGeometry( 10, 20, 1 ), shaderMaterial );
    //var floor = new THREE.Mesh( new THREE.CubeGeometry( 10, 1, 100 ), shaderMaterial );
    //floor.position.y = -1;
    floor.position.z = -50
    group.add(floor);
	groups.push(group);
};
steps.push(createStep1);

/*var createStep1 = function(stepXPosition){
	console.log('createStep1')
	var group = new THREE.Object3D();
	var geometry = new THREE.Geometry(),
			lines = geometry.vertices,
			line;
	particle = new THREE.Sprite( material );
	particle.matrixAutoUpdate = false;
	for ( var j = 0; j < 300; j++ ) {
		lines.push(
			new THREE.Vector3( -5,  -5 , j-10 ),
			new THREE.Vector3( -5, 5 , j-10 ),
			new THREE.Vector3( 5, 5 , j-10 ),
			new THREE.Vector3(  5 , -5 , j-10 ),
			new THREE.Vector3( -5,  -5 , j-10 )
		);
	}
	line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xaaaaff } ) );
	line.position.z = -250;
	group.add(line);
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep1);*/

var createStep2 = function(stepXPosition){
	var group = new THREE.Object3D();
	var geometry = new THREE.Geometry(),
			lines = geometry.vertices,
			line;
	particle = new THREE.Sprite( material );
	particle.matrixAutoUpdate = false;
	for ( var j = 0; j < 300; j++ ) {
		lines.push(
			new THREE.Vector3( -5,  -5 , j-10 ),
			new THREE.Vector3( -5, 5 , j-10 ),
			new THREE.Vector3( 5, 5 , j-10 ),
			new THREE.Vector3(  5 , -5 , j-10 ),
			new THREE.Vector3( -5,  -5 , j-10 )
		);
	}
	line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xaaaaaa } ) );
	line.position.z = -250;
	group.add(line);
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep2);

/*var createStep3 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 6; i++) { // z 
		for (var j = 0; j < 20; j++) { // colonne
			for (var k = 0; k < 20; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.1, 10 ), shaderMaterial );
				//box.position.x = (stepXPosition-57/2)+k*3;
				box.position.x = (-57/2)+k*3;
				box.position.y = (-57/2)+j*3;
				box.position.z = -i*15;
				group.add( box );
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep3);*/

var createStep3 = function(stepXPosition){
	var group = new THREE.Object3D();
	var geometry = new THREE.Geometry(),
			lines = geometry.vertices,
			line;
	for ( var i = 0; i < 20; i++ ) {
		particle = new THREE.Sprite( material );
		particle.matrixAutoUpdate = false;
		particle.updateMatrix();
		particle.position.y = 0;
		lines.push(
			new THREE.Vector3( -5, -5, -i*5 ),
			new THREE.Vector3( 0, 5, -i*5 ),
			new THREE.Vector3( 5, -5 , -i*5 ),
			new THREE.Vector3( -5,  -5, -i*5 ),
			new THREE.Vector3( 0,  0, -i*5 - 5 ),
			new THREE.Vector3( 0, 5, -i*5 ),
			new THREE.Vector3( 5, -5 , -i*5 ),
			new THREE.Vector3( 0,  0, -i*5 - 5 ),
			particle.position.z = i
		);
		line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xaaaaaa } ) );
		line.position.z = 5;
		group.add(line);
	}
	group.position.x = stepXPosition;
	groups.push(group);
}
steps.push(createStep3);

var createStep4 = function(stepXPosition){
	var group = new THREE.Object3D();
	var radius   = 10,
    segments = 64,
    color = 0xffffff,
    material = new THREE.LineBasicMaterial( { color: color } ),
    geometry = new THREE.CircleGeometry( radius, segments );
	geometry.vertices.shift();
	for (var i = 0; i < 17; i++) {
		if(i<10){
			color = '0x'+i+i+i+i+i+i+'';
		} else {
			var letter = 'a';
			if(i === 11){
				letter = 'b';
			} else if(i === 12){
				letter = 'c';
			} else if(i === 13){
				letter = 'd';
			} else if(i === 14){
				letter = 'd';
			} else if(i === 15){
				letter = 'e';
			} else if(i === 16){
				letter = 'c';
			}
			color = '0x'+letter+letter+letter+letter+letter+letter+'';
		}
		material = new THREE.LineBasicMaterial( { color: eval(color) } );
		var line = new THREE.Line( geometry, material );
		line.position.y = 0;
		line.position.z = -50+i*3;
		group.add( line );
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep4);

var createStep5 = function(stepXPosition){
	var group = new THREE.Object3D();
	var SUBDIVISIONS = 20;
	var geometry = new THREE.Geometry();
	var curve = new THREE.QuadraticBezierCurve3();
	var color = new THREE.Color( 0xaaaaaa );
	var lineMaterial = new THREE.LineBasicMaterial({color:color, linewidth: 1 });
	for (var i = 0; i < 11; i++) {
		var geometry = new THREE.Geometry();
		curve.v0 = new THREE.Vector3( i-5,  0, -Math.abs(i-5) );
		curve.v1 = new THREE.Vector3( i-5, (i-5)*(i-5), 50 );
		curve.v2 = new THREE.Vector3( i-5, 0, 100);
		for (var j = 0; j < SUBDIVISIONS; j++) {
			geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}
		var line = new THREE.Line(geometry, lineMaterial );
		line.position.set(0, -1, -90);
		group.add(line);
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep5);

var createStep6 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 15; i++) { // z 
		for (var j = 0; j < 5; j++) { // colonne
			for (var k = 0; k < 10; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( 0.05, 4, 1 ), material );
				box.position.x = (-57/2)+k*8;
				box.position.y = (-57/2)+j*14;
				box.position.z = -i*7;
				group.add( box );	
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep6);

var createStep7 = function(stepXPosition){
	var group = new THREE.Object3D();
	var line1 = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 760 ), material );
	var line2 = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 760 ), material );
	line1.position.set(-15, -10.5, -10);
	line2.position.set(15, -10.5, -10);
	group.add(line1);
	group.add(line2);
	for (var i = 0; i < 40; i++) {
		var j = 0;
		while(j < 2){
			var column = new THREE.Mesh( new THREE.BoxGeometry( 1, 100, 1 ), material );
			column.position.x = -15;
			if (j % 2 == 0) {
				column.position.x = 15;
			}
			column.position.y = 40;
			column.position.z = -i*10;
			group.add( column );	
			j = j+1;
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep7);

var createStep8 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 4; i++) { // z 
		for (var j = 0; j < 20; j++) { // colonne
			for (var k = 0; k < 20; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.1, 10 ), shaderMaterial );
				//box.position.x = (stepXPosition-57/2)+k*3;
				box.position.x = (-57/2)+k*3;
				box.position.y = (-57/2)+j*3;
				box.position.z = -i*25;
				group.add( box );
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep8);

var createStep9 = function(stepXPosition){
	var group = new THREE.Object3D();
	var geometry = new THREE.Geometry(),
			lines = geometry.vertices,
			line;
	for ( var i = 0; i < 25; i++ ) {
		particle = new THREE.Sprite( material );
		particle.matrixAutoUpdate = false;
		particle.updateMatrix();
		particle.position.y = 0;
		var color = '0xffffff';

		if(i<10){
			color = '0x'+i+i+i+i+i+i+'';
		} else {
			var letter = 'a';
			if(i === 11){
				letter = 'b';
			} else if(i === 12){
				letter = 'c';
			} else if(i === 13){
				letter = 'd';
			} else if(i === 14){
				letter = 'd';
			} else if(i === 15){
				letter = 'e';
			} else if(i === 16){
				letter = 'c';
			}
			color = '0x'+letter+letter+letter+letter+letter+letter+'';
		}

		lines.push(
			new THREE.Vector3( -5,  -5 , i-10 ),
			new THREE.Vector3( -5, 5 , i-10 ),
			new THREE.Vector3( 5, 5 , i-10 ),
			new THREE.Vector3(  5 , -5 , i-10 ),
			new THREE.Vector3( -5,  -5 , i-10 ),
			particle.position.z = i
		);

		line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: eval(color) } ) );
		line.rotation.z = i*0.3;
		line.position.z = -i*10;
		group.add(line);
	}
	group.position.x = stepXPosition;
	groups.push(group);
}
steps.push(createStep9);

/* lignes horizontales
var createStep9 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 100; i++) { 
		var row = new THREE.Mesh( new THREE.BoxGeometry( 1000, 0.1, 0.1 ), material );
		row.position.y = -1;
		row.position.z = -10*i;
		group.add( row );
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep9);*/

/* triangles
var createStep11 = function(stepXPosition){
	var group = new THREE.Object3D();
	var geometry = new THREE.Geometry(),
			lines = geometry.vertices,
			line;
	for ( var i = 0; i < 100; i++ ) {
		particle = new THREE.Sprite( material );
		particle.matrixAutoUpdate = false;
		particle.updateMatrix();
		particle.position.y = 0;
		lines.push(
			new THREE.Vector3( -5, -5, -i*5 ),
			new THREE.Vector3( 0, 5, -i*5 ),
			new THREE.Vector3( 5, -5 , -i*5 ),
			new THREE.Vector3( -5,  -5, -i*5 ),
			particle.position.z = i
		);
		line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xaaaaaa } ) );
		line.position.z = -10;
		group.add(line);
	}
	group.position.x = stepXPosition;
	groups.push(group);
}
steps.push(createStep11); */

var createStep10 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 6; i++) { // z 
		for (var j = 0; j < 20; j++) { // colonne
			for (var k = 0; k < 20; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.1, i*4.2 ), material );
				box.position.x = (-57/2)+k*3;
				box.position.y = (-57/2)+j*3;
				box.position.z = -i*18;
				box.rotation.x = Math.sin(j)*0.5;
				group.add( box );	
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep10);

var createStep11 = function(stepXPosition){
	var group = new THREE.Object3D();

	var line1 = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 80, 120 ), shaderMaterial );
	line1.position.x = -2;
	line1.position.z = -50;
	group.add( line1 );

	var line2 = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 80, 120 ), shaderMaterial );
	line2.position.x = 2;
	line2.position.z = -50;
	group.add( line2 );

	var roof = new THREE.Mesh( new THREE.BoxGeometry( 10, 1, 120 ), shaderMaterial );
	roof.position.x = 0;
	roof.position.y = 10;
	roof.position.z = -50;
	group.add( roof );

	var floor = new THREE.Mesh( new THREE.BoxGeometry( 10, 1, 1000 ), shaderMaterial );
	floor.position.x = 0;
	floor.position.y = -10;
	floor.position.z = -50;
	group.add( floor );

	for (var i = 0; i < 30; i++) {
		var j = 0;
		while(j < 2){
			var column = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 3, 7 ), basicMaterial );
			column.position.x = -1.99;
			if (j % 2 == 0) {
				column.position.x = 1.99;
			}
			column.position.y = 3;
			column.position.z = -i*20;
			group.add( column );	
			j = j+1;
		}
	}

	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep11);

var createStep12 = function(stepXPosition){
	var group = new THREE.Object3D();
	var lambertMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
	for (var i = 0; i < 4; i++) { // z 
		for (var j = 0; j < 20; j++) { // colonne
			for (var k = 0; k < 20; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 10 ), lambertMaterial  );
				box.position.x = (-57/2)+k*3;
				box.position.y = (-57/2)+j*3;
				box.position.z = -i*20;
				group.add( box );	
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep12);

var createStep13 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 100; i++) {
		var box = new THREE.Mesh( new THREE.BoxGeometry( 0.02, 0.02, 1 ), material );
		box.position.x = -Math.sin(i/5);
		box.position.y = -Math.cos(i/5);
		box.position.z = -i;
		box.rotation.z = Math.tan(i/5);
		group.add( box );	

		var box = new THREE.Mesh( new THREE.BoxGeometry( 0.02, 0.02, 1 ), material );
		box.position.x = Math.sin(i/5);
		box.position.y = Math.cos(i/5);
		box.position.z = -i;
		box.rotation.z = Math.atan(i/5);
		group.add( box );	
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep13);

var createStep14 = function(stepXPosition){
	var group = new THREE.Object3D();
	var bg = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1 ), basicMaterial );
	bg.position.set(0, 0, -400);
	group.add(bg);

	for (var i = 0; i < 100; i++) { 
		var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0, 7 ), material );
		box.position.y = -0.7;
		box.position.z = -i*10;
		group.add( box );
	}

	for (var i = 0; i < 40; i++) {
		var j = 0;
		while(j < 2){
			var height = (1.5+Math.sin(i))*40;
			var column = new THREE.Mesh( new THREE.BoxGeometry( Math.random()*10, height, 1 ), shaderMaterial );
			column.position.x = -15 + i/40 * 10;
			if (j % 2 == 0) {
				column.position.x = 15 - i/40 * 10;
			}
			column.position.y = height/2;
			column.position.z = -i*10;
			group.add( column );	
			j = j+1;
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep14);

var createStep15 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 6; i++) { // z 
		for (var j = 0; j < 5; j++) { // colonne
			for (var k = 0; k < 10; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( 0.05, 0.05, 100 ), material );
				box.position.x = (-57/2)+k*8;
				box.position.y = (-57/2)+j*14;
				box.position.z = -i*10;
				box.rotation.x = i/6;
				group.add( box );	
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep15);

var createStep16 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 15; i++) { // z 
		for (var j = 0; j < 5; j++) { // colonne
			for (var k = 0; k < 10; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( .1, .1, 10 ), material );
				box.position.x = (-57/2)+k*7;
				box.position.y = (-57/2)+j*13 + 10*(Math.random() - Math.random());
				box.position.z = -i*7;
				box.rotation.z = (Math.random() - Math.random())*3;
				box.rotation.x = (Math.random() - Math.random())*3;
				box.rotation.y = (Math.random() - Math.random())*3;
				group.add( box );	
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep16);

var createStep17 = function(stepXPosition){
	var group = new THREE.Object3D();

	for (var i = 0; i < 40; i++) {
		var positionX = (Math.random()-Math.random()) * i * 5;
		var positionZ = -i*7 + Math.random()*90;
		var positionY = Math.random()*60;
		var height = 20 + (Math.random()-Math.random())*2;
		var box = new THREE.Mesh( new THREE.BoxGeometry( .25, .25, height ), basicMaterial );
		box.position.x = positionX;
		box.position.z = positionZ;
		box.position.y = positionY;
		group.add( box );

		var boxo = new THREE.Mesh( new THREE.BoxGeometry( height/2, .25, .25 ), basicMaterial );
		boxo.position.x = positionX;
		boxo.position.z = positionZ - height/3;
		boxo.position.y = positionY;
		boxo.rotation.z = Math.PI/4;
		group.add( boxo );

		var boxu = new THREE.Mesh( new THREE.BoxGeometry( height/2, .25, .25 ), basicMaterial );
		boxu.position.x = positionX;
		boxu.position.z = positionZ - height/3;
		boxu.position.y = positionY;
		boxu.rotation.z = -Math.PI/4;
		group.add( boxu );
	}
	var boxa = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1, 1000 ), basicMaterial );
	boxa.position.x = 0;
	boxa.position.y = -10;
	boxa.position.z = -50;
	group.add(boxa);

	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep17);

var createStep18 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 6; i++) { // z 
		for (var j = 0; j < 20; j++) { // colonne
			for (var k = 0; k < 20; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( 6, 0.1, 0.1 ), material );
				box.position.x = (-60/2)+k*3;
				box.position.y = (-57/2)+j*3;
				box.position.z = -i*10;
				box.rotation.y = Math.sin(i) * (k-10);
				group.add( box );
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep18);

/*var createStep19 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 6; i++) { // z 
		for (var j = 0; j < 20; j++) { // colonne
			for (var k = 0; k < 20; k++) { // ligne
				var box = new THREE.Mesh( new THREE.BoxGeometry( 30, 0.01, 0.1 ), material );
				box.position.x = (-60/2)+k*2;
				box.position.y = (-57/2)+j*2;
				box.position.z = -i * Math.random() * 10;
				box.rotation.y = i % 1.2;
				group.add( box );
			}
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep19);*/

var createStep19 = function(stepXPosition){
	var group = new THREE.Object3D();
	var SUBDIVISIONS = 100;
	var geometry = new THREE.Geometry();
	var curve = new THREE.QuadraticBezierCurve3();
	var color = new THREE.Color( 0xaaaaaa );
	var lineMaterial = new THREE.LineBasicMaterial({color:color, linewidth: 1 });
	for (var i = -50; i < 50; i++) {
		var geometry = new THREE.Geometry();
		curve.v0 = new THREE.Vector3( 0,  0, -400 );
		curve.v1 = new THREE.Vector3( 130*Math.sin(i), 10*Math.random()*i, -200 );
		curve.v2 = new THREE.Vector3( 0, 10*Math.cos(i), 0);
		for (var j = 0; j < SUBDIVISIONS; j++) {
			geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}
		var line = new THREE.Line(geometry, lineMaterial );
		line.position.set(0, 0, 15);
		group.add(line);
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep19);

var createStep20 = function(stepXPosition){
	var group = new THREE.Object3D();

	var geometry = new THREE.SphereGeometry( 300, 64, 64 );
	var sphereBG = new THREE.Mesh( geometry, basicMaterial );
	sphereBG.position.set(0, 0, -500);
	group.add( sphereBG );

	var geometry = new THREE.SphereGeometry( 5, 64, 64 );
	var sphere = new THREE.Mesh( geometry, blackMaterial );
	sphere.position.set(100, 5, -200);
	group.add( sphere );

	var geometry = new THREE.SphereGeometry( 3, 64, 64 );
	var sphere = new THREE.Mesh( geometry, blackMaterial );
	sphere.position.set(-140, 50, -230);
	group.add( sphere );

	var spoutnik = new THREE.Object3D();
	var geometry = new THREE.SphereGeometry( 1, 64, 64 );
	var spout = new THREE.Mesh( geometry, blackMaterial );
	spout.position.set(-10, -1, -10);
	spoutnik.add( spout );

	var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.1, 10 ), blackMaterial );
	box.position.set(-8.5, -2, -5);
	box.rotation.set(0.2, 0.2, 0);
	spoutnik.add( box );

	var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.1, 10 ), blackMaterial );
	box.position.set(-10.5, 0, -5);
	box.rotation.set(-0.2, -0.2, 0);
	spoutnik.add( box );

	var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.1, 10 ), blackMaterial );
	box.position.set(-10.5, -2, -5);
	box.rotation.set(0.2, -0.2, 0);
	spoutnik.add( box );

	var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.1, 10 ), blackMaterial );
	box.position.set(-8.5, 0, -5);
	box.rotation.set(-0.2, 0.2, 0);
	spoutnik.add( box );

	spoutnik.position.set(0, 0, -80);
	spoutnik.rotation.set(0, 0, 0.3);
	group.add(spoutnik);

	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep20);



var createStep21 = function(stepXPosition){
	var group = new THREE.Object3D();
	var segments = 64;
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );

	for (var i = 0; i < 50; i++) { // z 
		var radius = i/3;
		var geometry = new THREE.CircleGeometry( radius, segments );
		geometry.vertices.shift();
		var line = new THREE.Line( geometry, lineMaterial );
		line.position.set(0,0,-i*2);
		group.add( line );
	}

	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep21);

var createStep22 = function(stepXPosition){
	var group = new THREE.Object3D();
	for (var i = 0; i < 40; i++) { // z 
		for (var k = 0; k < 20; k++) { // ligne
			var box = new THREE.Mesh( new THREE.BoxGeometry( 1, 3, 1 ), material );
			box.position.x = (-57/2)+k*3;
			box.position.y = -4;
			box.position.z = -i*10;
			group.add( box );	

			var box = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 4, 0.1 ), basicMaterial );
			box.position.x = (-57/2)+k*3 - 1;
			box.position.y = -6;
			box.position.z = -i*10 + 1;
			//group.add( box );	
		}
	}
	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep22);

var createStep23 = function(stepXPosition){
	var group = new THREE.Object3D();
	var segments = 3;
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );

	for (var i = 0; i < 100; i++) { // z 
		var radius = 100-i;
		var geometry = new THREE.CircleGeometry( radius, segments );
		geometry.vertices.shift();
		var line = new THREE.Line( geometry, lineMaterial );
		line.position.set(0,0,-i*2);
		line.rotation.set(0,0,Math.sin(i/11));
		group.add( line );
	}

	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep23);

var createStep24 = function(stepXPosition){
	var group = new THREE.Object3D();
	var numberOfCircles = 200;

	for (var i = 0; i < numberOfCircles; i++) {

		var tab = ['f', 'e', 'd', 'c', 'b', 'a', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
		tab.reverse();
		var letter = '1';

		//letter = tab[ Math.floor(i / (numberOfCircles/tab.length/2) ) ];
		letter = tab[ Math.floor(Math.random() * (Math.cos(i/10)*10)) ];
		//letter = tab[ Math.floor(Math.random() * (Math.cos(i*3)*3)) ];
		//letter = tab[ Math.round(i / (numberOfCircles/tab.length/1.9) ) ];
		//letter = tab[Math.floor(Math.cos(i/3)*3 * tab.length)];
		if(!!letter === false) {
			letter = '1';
		}
		var color = '0x'+letter+letter+letter+letter+letter+letter+'';
		var specialMaterial = new THREE.LineBasicMaterial( { color: eval(color) } );

		//var rand = Math.floor(Math.random() * 2.7) + 1;
		var curve = new THREE.EllipseCurve(
		    i, i,             // ax, aY
		    120, 120, 	          // xRadius, yRadius
		    1, 2/2 * Math.PI, // aStartAngle, aEndAngle
		    false             // aClockwise
		);
		var points = curve.getSpacedPoints( 64 );
		var path = new THREE.Path();
		var geometry = path.createGeometry( points );
		var line = new THREE.Line( geometry, specialMaterial );
		var scale = 0.1 + i/numberOfCircles;
		line.scale.set(scale, scale, scale);
		line.position.set(0,0,-2*i);
		line.rotation.z = i/3;
		group.add( line );
	}

	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep24);

var createStep25 = function(stepXPosition){
	var group = new THREE.Object3D();
	var segments = 64;
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );
	var numberOfCircles = 60;

	for (var i = 0; i < numberOfCircles; i++) { // z 
		var radius = 5;
		var geometry = new THREE.CircleGeometry( radius, segments );
		geometry.vertices.shift();

		var tab = ['f', 'e', 'd', 'c', 'b', 'a', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
		var letter = '1';

		letter = tab[ Math.floor(i / (numberOfCircles/tab.length/2) ) ];
		if(!!letter === false) {
			letter = '1';
		}
		var color = '0x'+letter+letter+letter+letter+letter+letter+'';

		var specialMaterial = new THREE.LineBasicMaterial( { color: eval(color) } );
		var line = new THREE.Line( geometry, specialMaterial );
		line.position.set(Math.cos(i/3)*3,0,-i*2);
		line.rotation.set(0,0,i);
		group.add( line );
	}

	group.position.x = stepXPosition;
	groups.push(group);
};
steps.push(createStep25);


var debugStep = function(n){
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
	console.log('showStep' + number + ' (createStep'+ parseInt(number+1) +')');

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

	// if(time > timepoints[currentStep] - 0.5){
	// 	autoClear = false;
	// } else {
	// 	autoClear = true;
	// }

	/*if(currentStep === 24){
		autoClear = false;
	} else {
		autoClear = true;
	} */
	renderer.autoClear = autoClear;

	if(time > timepoints[currentStep]){
		if(stepsVariables[currentStep] === false){
			showStep(currentStep+1);
		}
		currentStep += 1;
	}

	camera.position.z -= 0.1;

	cameraShouldNotTurn = (currentStep === 0 || currentStep === 2 || currentStep === 6 || currentStep === 10 || currentStep === 13 ||currentStep === 14 || currentStep === 16 || currentStep === 20 || currentStep === 22);
	 if(!cameraShouldNotTurn){
	 	camera.rotation.z -= 0.001;
	} else {
		camera.rotation.z = 0;
	}

	//document.title = (time);

	stats.update();
	renderer.render(scene, camera);

	// debug, n = number of the slide to debug/create
	//debugStep(25);
};

initApp();

document.addEventListener('DOMContentLoaded', function(event) { 
  //clock.start();
  audioTag.play();
  render();
});
