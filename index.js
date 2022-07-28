import keyInput from "./KeyInput.js";
import connect from "./Connect.js";


const ratio=window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75,ratio , 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight(0x484848);
const dLight = new THREE.DirectionalLight(0xffffff,0.5);

light.add(dLight);
scene.add(light);

const geometry = new THREE.BoxGeometry( 50,0.1,50);
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const ground = new THREE.Mesh( geometry, material );
scene.add( ground );

const plotGeometry1 = new THREE.BoxGeometry( 10,0.5,10);
const plotMaterial1 = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
const plotGround1 = new THREE.Mesh( plotGeometry1, plotMaterial1 );
const plotGround2 = new THREE.Mesh( plotGeometry1, plotMaterial1 );

const plotGeometry2 = new THREE.BoxGeometry( 24,0.5,10);
const plotMaterial2 = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
const plotGround3 = new THREE.Mesh( plotGeometry2, plotMaterial2 );
const plotGround4 = new THREE.Mesh( plotGeometry2, plotMaterial2 );

const plotGeometry3 = new THREE.BoxGeometry( 10,0.5,30);
const plotMaterial3 = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
const plotGround5 = new THREE.Mesh( plotGeometry3, plotMaterial3 );
const plotGround6 = new THREE.Mesh( plotGeometry3, plotMaterial3 );

scene.add( plotGround1 );
scene.add( plotGround2 );
scene.add( plotGround3 );
scene.add( plotGround4 );
scene.add( plotGround5 );
scene.add( plotGround6 );

plotGround1.position.set(-7,0,0);
plotGround2.position.set(7,0,0);
plotGround3.position.set(0,0,-15);
plotGround4.position.set(0,-0,15);
plotGround5.position.set(-19,0,0);
plotGround6.position.set(19,0,0);

camera.position.set(5,15,15);

function animate() {
	requestAnimationFrame( animate );
    
    if(keyInput.isPressed(38)){
        camera.position.y += 0.5;
        camera.position.x += 0.5;
    }
    if(keyInput.isPressed(40)){
       camera.position.y -= 0.5;
        camera.position.x -= 0.5;
    }
    if(keyInput.isPressed(37)){
        camera.position.x -= 0.5;
    }
    if(keyInput.isPressed(39)){
        camera.position.x += 0.5;
    }

    camera.lookAt(ground.position);
	renderer.render( scene, camera );
}
animate();


connect.then((result)=>{
    console.log(result);
    result.buildings.forEach((b)=> {
        //display if it's occupied
        if(b.owner != "0x0000000000000000000000000000000000000000"){
            const boxgeometry = new THREE.BoxGeometry(b.sizeX,b.sizeY,b.sizeZ);
            const boxmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            const box = new THREE.Mesh( boxgeometry, boxmaterial );
            box.position.set(b.posX,b.posY,b.posZ);
            scene.add( box );
        }
    });
});


renderer.render(scene,camera);

