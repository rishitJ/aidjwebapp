song_1 = ""

leftWristY = 0
leftWristX = 0

rightWristY = 0
rightWristX = 0

score_leftWrist = 0
score_rightWrist = 0

function preload() 
{
    song_1 = loadSound("music.mp3")
}
function setup() 
{
    canvas = createCanvas(500, 460)
    canvas.position(485, 200)

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotposes)
}
function modelLoaded() 
{
    console.log("Posenet is initialized")
}
function play() 
{
    song_1.play()
    song_1.volume(1)
    song_1.rate(1)
}
function gotposes(results) 
{
   if (length > 0) 
   {
    score_leftWrist = results.length[9].keypoints
    score_rightWrist = results.length[10].keypoints

    leftWristX = results[0].pose.leftWrist.x
    righttWristX = results[0].pose.righttWrist.x

    leftWristyY= results[0].pose.leftWrist.y
    rightWristY = results[0].pose.rightWrist.y
   }
}
function draw() 
{
    image(video, 0, 0, 500, 460)
    fill("red")
    stroke("red")
    console.log("scorerightWrist = " + score_rightWrist)
    if (score_rightWrist > 0.2) 
    {
        circle(rightWristX, rightWristY, 30)
    if (rightWristY > 0 && rightWristY <=100) 
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x"
        song_1.rate(0.5)
    }    
    else if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x"
        song_1.rate(1)
    }
    else if(rightWristY >200 && rightWristY <=300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x"
        song_1.rate(1.5)
    }
    else if(rightWristY >300 && rightWristY <=400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x"
        song_1.rate(2)
    }
    else if(rightWristY >400)
    {
        document.getElementById("speed").innerhtml = "Speed = 2.5x"
        song_1.rate(2.5)
    }
    }
    if (score_leftWrist > 0.2) 
    {
        circle(leftWristX, leftWristY, 30)

        InNumberleftWristY = Number(leftWristyY)
        remove_decimal = floor(InNumberleftWristY)
        volume = remove_decimal/460
        document.getElementById("volume").innerHTML = "Volume = " + volume
        song_1.setVolume(volume)
    }
}