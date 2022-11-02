LET_IT_GO = document.getElementById("LET_IT_GO");
inyltfntr= document.getElementById("I_NEED_YOU_LIKE_THE_FLOWERS_NEED_THE_RAIN");

let_it_go=""; 
INYLTFNTR =""; 

Song1_status ="";
Song2_status ="";

l_w_x =0;
l_w_y =0;
score_l_w =0;

r_w_x =0;
r_w_y =0;

function preload(){
   let_it_go =loadSound('song_1.mp3');
   INYLTFNTR =loadSound('song_2.mp3');
    }

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video ,modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

   Song1_status = let_it_go.isPlaying();
   Song2_status = INYLTFNTR.isPlaying();

   if(score_l_w>0.2){

    circle(l_w_x, l_w_y, 20);

    INYLTFNTR.stop();

    if(Song1_status=false){
 let_it_go.play();

    LET_IT_GO.style.backgroundColor = 255, 255, 255, 0.15;
    }
   }
}

function modelLoaded(){
console.log('PoseNet is initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
		
	score_l_w =  results[0].pose.keypoints[9].score;
	console.log("scoreLeftWrist = " + score_l_w);
	
	r_w_x = results[0].pose.rightWrist.x;
	r_w_y = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + r_w_x +" rightWristY = "+ r_w_y);

	l_w_x = results[0].pose.leftWrist.x;
	l_w_y = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + l_w_x +" leftWristY = "+ l_w_y);
    }
}