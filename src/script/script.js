var vm = new Vue({
  el: '#mycounter',
  data: {
    count: 0
  },
  methods: {
    countUp: function() {
            this.count++;
            changeRotateSpeed ();
      }
  }
});

var vm_stop = new Vue({
  el: '#mystop',
  methods: {
    hsStop: function() {
            Speed_0();
    }
  }
});

let howManySpinners = 2;
let scene = new THREE.Scene();
let box;
let controls;
let renderer;
let camera;
let model = [];
//let model = {};
let model2 = {};
let model3 = {};
let rotate_speed = 0.05;
let r_radian = 0;
let c_radian = 0;
let geometry;
let material;
var hs_color;
var hs_rotate;

//////////////////////////
// firebase 処理
/////////////////////////


var db = firebase.database();
var fbHandSpinners = db.ref("/handspinners/");
//

//
function changeData() {
	hs_color = document.getElementById("new_color").value;
	hs_rotate = document.getElementById("new_rotate").value;
	let randId =  Math.floor(Math.random()*1000);
	let randX = 600 * Math.random()-300;
	let randY = 600 * Math.random()-300;
	let randZ = 400 * Math.random()-200;


	fbHandSpinners.push(
//		{ "handspinners" :
				{ [Math.floor(Math.random()*1000)] :
				//{ randId :
		 			{"color": hs_color, "rotate": hs_rotate,
					　"x_position": randX, "y_position": randY, "z_position": randZ
					}

//				}
		});



	// fbColor.on("value", function(snapshot) {
	//document.getElementById("hsColor").innerText =  //snapshot.val().text;
	// 	hs_color = snapshot.val().text;
	// 	console.log(hs_color);
	// 	var text = document.getElementById("my_text").value;
	//   fbColor.set({"color": hs_color});
	// });


	// console.log(return_val);

	// for (let i=0 ; i < howManySpinners; i++) {
	//   	model[i].material.color = new THREE.Color(hs_color);
	// }
}

fbHandSpinners.on("child_added", function(snapshot) {

	//console.log (snapshot);
	//console.log(JSON.stringify(snapshot));
	let myJson = JSON.stringify(snapshot);

	//console.log(myJson);

	// for (let key  in snapshot) {
	let row_data = snapshot.val();
	let tmp_key = (Object.keys(row_data))[0];
	// console.log(row_data);
	// console.log(tmp_key);
  //
	// console.log(row_data[tmp_key]);
	// console.log(row_data[row_data[tmp_key]].color);
	// console.log(	row_data[tmp_key].x_position);


	// }
	// console.log (Object.keys(myJson));

	//renderHandSpinner(snapshot);


	addHandSpinner(
	 	row_data[tmp_key].color,
	 	row_data[tmp_key].rotate,
	 	row_data[tmp_key].x_position,
	 	row_data[tmp_key].y_position,
	 	row_data[tmp_key].z_position,
	);


  // document.getElementById("hsColor").innerText = snapshot.val().color;
 	// hs_color = snapshot.val().color;
  //
	// console.log(snapshot);
  //
	// for (let i=0 ; i < howManySpinners; i++) {
	// 	model[i].material.color = new THREE.Color(hs_color);
	// }

});


//////////////////////////
//
///////////////////////////

function renderHandSpinner (snapshot) {
  'use strict';
  let light;
  let ambient;
  let gridHelper;
	let axisHelper;
  let lightHelp;
  let width = 1200;
  let height = 1200;
	let modelPath ;

   //light
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 200, 80);
  scene.add(light);
  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

	//camera
  camera = new THREE.PerspectiveCamera(45, width /　height, 1 , 1000);
  camera.position.set(0, 400, 300);
  camera.lookAt(scene.position);

  // helper 現在は非表示
  //gridHelper = new THREE.GridHelper(200, 50);
  //scene.add(gridHelper);
  //axisHelper = new THREE.AxisHelper(1000);
  //scene.add(axisHelper);
  //lightHelper = new THREE.DirectionalLightHelper(light , 20)
  //scene.add(lightHelper);

  //controls
  controls = new THREE.OrbitControls(camera);
  //cameraの自動回転
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

	//modelPath = 'src/bear.json';
	//modelPath = 'src/handspiner_3d.json';
  //modelPath = '../src/data/handspiner_3d_geo.json';
  //modelPath = './src/data/handspiner_3d_geo.json';
  modelPath = './data/handspiner_3d_geo.json';
	//modelPath = '/Users/yoshimurahiroyuki/workspace/threejs/src/handspiner.json';

  let loader = new THREE.JSONLoader();　　
  loader.load(modelPath, function(geo, mat) {　　　
    //let phongMat = new THREE.MeshPhongMaterial(mat);
    //let phongMat2 = new THREE.MeshPhongMaterial(mat);
    //let phongMat3 = new THREE.MeshPhongMaterial(mat);
    //for (let mt of faceMat.materials) {
    //  mt.color = new THREE.Color(0xffcc88);
  	//}
    geometry = geo;
    material = mat;

		//for (let i=0; i < howManySpinners; i++ ) {
		for (let i=0; i < 20; i++ ) {
      let phongMat = new THREE.MeshPhongMaterial(mat);
      model[i] = new THREE.Mesh(geo, phongMat);

			let randX = 600 * Math.random()-300;
			let randY = 600 * Math.random()-300;
			let randZ = 400 * Math.random()-200;

      if (i==0) {
				model[i].position.set(0, 20, 0);
			} else {
				model[i].position.set(randX, randY, randZ);
			}　　

    	model[i].scale.set(0.5, 0.5, 0.5);　
    	// let randColor = Math.random() * 0xffffff ;
			model[i].material.color = new THREE.Color(hs_color);　　　
    	//model[i].material.color = new THREE.Color(randColor);
    	scene.add(model[i]);　　　
		}
    render();
  });　
}

function addHandSpinner (new_color, new_rotate, new_x, new_y, new_z ) {
  let phongMat = new THREE.MeshPhongMaterial(material);
  model.push (new THREE.Mesh(geometry, phongMat));

  //let size = Math.random();
	console.log(new_x);


	//model[model.length - 1].scale.set(size, size, size);　　　
  model[model.length - 1].position.set(new_x, new_y, new_z);

	//model.material.color = new THREE.Color(randColor);
	model[model.length - 1].material.color = new THREE.Color(new_color);
	model[model.length - 1].rotate = new_rotate;
	console.log(model);

	scene.add(model[model.length - 1]);　
}

function render () {

  requestAnimationFrame(render);
  r_radian += 0.01;

	for (let i=0; i < model.length; i++ ) {
  	//model[i].rotation.y += rotate_speed;
		let rotate_speed = model[i].rotate ? model[i].rotate : 0.01;
		console.log(rotate_speed);
		model[i].rotation.y += Number(rotate_speed);
		// model[i].rotation.y += 0.1;
		// //model[i].rotation.y += rotate_speed;
		// model[i].rotation.y += 0.1;
		if (i%2==0) model[i].rotation.y += 0.06 ;
		if (i%7==0) model[i].rotation.y += 0.1 ;

    model[i].position.y += (Math.sin(r_radian) - Math.sin(r_radian-0.01))*150 ;
	}

	c_radian += 0.007;
  let cameraZ = 150 * (Math.sin(c_radian)) +150;
 // let cameraZ = 0;
	camera.position.set(0, 600, cameraZ);

  controls.update();
  renderer.render(scene, camera);
}

function changeRotateSpeed () {
  //controls.autoRotateSpeed = vm.count*10;
 	rotate_speed += vm.count*0.01;
  for (let i=0 ; i < howManySpinners; i++) {
		// model[i].material.color = new THREE.Color(hs_color);
		model[i].rotation.y = 1.8*vm.count;
  }
}

function Speed_0 () {
  vm.count = 0;
  rotate_speed = 0;
 	//addSpinner();
}

renderHandSpinner();
