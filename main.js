scoreLeft=0;
scoreRight=0;
leftwristX=0;
rightwristX=0;
leftwristY=0
rightwristY=0;
song="";
function preload() {
    // song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}
function modelLoaded(){
    console.log("poseNetisloaded")
}
function gotposes(results){
        console.log(results);
        scoreRight=results[0].pose.keypoints[10].score;
        scoreLeft=results[0].pose.keypoints[9].score;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("rightWristX="+rightwristX+"rightwristY="+rightwristY+"leftWristX="+leftwristX+"leftwristY"+leftwristY);
        
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreRight>0.2){
        circle (rightwristX,rightWristY,20);
        if(rightWristY> 0 && rightWristY<= 100){
            document.getElementById("speed").innerHTML="Speed=0.5x";
            song.rate(0.5); 
        }
      else if(rightWristY> 100 && rightWristY<= 200){
            document.getElementById("speed").innerHTML="Speed=1x";
            song.rate(1); 
        }
       else if(rightWristY> 200 && rightWristY<= 300){
            document.getElementById("speed").innerHTML="Speed=1.5x";
            song.rate(1.5); 
        }
       else if(rightWristY> 300 && rightWristY<= 400){
            document.getElementById("speed").innerHTML="Speed=2x";
            song.rate(2); 
        }
       else if(rightWristY> 400 && rightWristY<= 500){
            document.getElementById("speed").innerHTML="Speed=2.5x";
            song.rate(2.5); 
        }
    }
    if(scoreLeft>0.2){
        circle(leftwristX,leftwristY,20);
        leftwristY=Number(leftwristX);
        remove=floor(leftwristY);
        volume=remove/500;
        document.getElementById("volume").innerHTML="Volume="+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}