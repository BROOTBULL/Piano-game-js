

var ai=[];
var playerIp=[];
var game=false;
var s=false;


//////////////////////// Piano keys Action ////////////////////////////
$(".btn").click(function() 
{
    var btnvalue =$(this).attr("id");
    makeSound(btnvalue);
    btnAnimation(btnvalue);
});

$(document).on("keypress",function(ev)
{
    console.log(ev.key);
    k=true;
    makeSound(ev.key);
    if(k)
    btnAnimation(ev.key);
if(s==true&&ev.key=="Enter")
gameStart();
else if(ev.key=="-")
backButton();
else if(ev.key=="p")
PlayGame();
else if(ev.key=="b")
crtAns();

});

///////////////////////// function to make sound ////////////////////////////////////

function makeSound(key)
{
    
    switch (key) {
        case "a":
            case 0:
                case "0":
            var A =new Audio("pianonotes/pianoA.wav");
            A.play();
            break;
        case "s":
            case 1:
                case "1":
            var B =new Audio("pianonotes/pianoB.wav");
            B.play();
            break;
        case "d":
            case 2:
                case "2":
            var C =new Audio("pianonotes/pianoC.wav");
            C.play();
            break;
        case "h":
            case 3:
                case "3":
            var D =new Audio("pianonotes/pianoD.wav");
            D.play();
            break;
        case "j":
            case 4:
                case "4":
            var E =new Audio("pianonotes/pianoE.wav");
            E.play();
            break;
        case "k":
            case 5:
                case "5":
            var F =new Audio("pianonotes/pianoF.wav");
            F.play();
            break;
        case "l":
            case 6:
                case "6":
            var G =new Audio("pianonotes/pianoG.wav");
            G.play();
            break;
        

        case "w":
            var Gg=new Audio("pianonotes/pianoGg.wav"); 
            Gg.play();
            break;
        case "e":
            var Aa=new Audio("pianonotes/pianoAa.wav");
            Aa.play();
            break;
        case "u":
            var Cc =new Audio("pianonotes/pianoCc.wav");
            Cc.play();
            break;
        case "i":
            var Dd=new Audio("pianonotes/pianoDd.wav");
            Dd.play();
            break;
        case "o":
            var Ff=new Audio("pianonotes/pianoFf.wav");
            Ff.play();
            break;
        case "Enter":
            break;
        case "-":
            break;
        case "p":
            break;
        case "b":
            break;
        default:
            k=false;
            err();
            break;

    }
       
}
//////////////// Animation for game window//////////////////

// Slides Up

$(".sxn1 .playgame").on("click",PlayGame);
function PlayGame()
{
    $(".sxn1").animate({opacity:0},200).slideUp(900);
    $(".bkbtn").animate({
        width:30,
        height:30,
        fontSize:20,
        borderWidth:1
    });
    $(".grey").animate({left:-190},700);
    $(".sxn2").fadeIn();
    setTimeout(function(){
        $(".gname").animate({opacity:1},200);
        $(".sxn2 .playgame").fadeIn();
        },1000);
    $(".PlayerTurn").fadeOut();
    s=true;
}

//Slides Down

$(".bkbtn").on("click",backButton);
function backButton()
{
    $(".sxn1").animate({opacity:0},200).slideDown().animate({opacity:1});
    $(".bkbtn").animate({
        width:0,
        height:0,
        fontSize:0,
        borderWidth:0
    });
    $(".gname").animate({opacity:0},100);
    $(".sxn2 .playgame").fadeOut();
    $(".sxn2").slideDown(1000).fadeOut();
    $(".PlayerTurn").fadeOut();
    $(".grey").animate({left:-1430},700);
    s=false;

}
    
//////////////////////////// function to give numeric value to the key /////////////////////////////
//helps in ai key and user key comparision

function valueGenerator(k)
{
var value;
    switch (k) {
        case "a":
            case "0":
                value=0;
            break;
        case "s":
            case "1":
                value=1;
            break;
        case "d":
            case "2":
                value=2;
            break;
        case "h":
            case "3":
                value=3;
            break;
        case "j":
            case "4":
                value=4;
            break;
        case "k":
            case "5":
                value=5;
            break;
        case "l":
            case "6":
                value=6;
            break;
        
}
return value;
}

/////////////////////// to glow when key is pressed or clicked /////////////////////////////

function btnAnimation(keypressed)
{
    if(s!=true)
    $("."+keypressed).addClass("pressed");
    else
    $("."+keypressed).addClass("press"+keypressed);
    setTimeout(function(){
    $("."+keypressed).removeClass("pressed");
    $("."+keypressed).removeClass("press"+keypressed);
    },200);
}

////////////////////// give a red glow on error //////////////////////////////
function err()
{
    $(" .keyboard").addClass("eror");
    setTimeout(function(){
    $(" .keyboard").removeClass("eror");
    },2000);
}

////////////////////// give a white glow on correct //////////////////////////////
function crtAns()
{
    $(".sxn2 .keyboard").addClass("correct");
    $(".sxn2 .btns").addClass("pressed");
    setTimeout(function(){
    $(".sxn2 .keyboard").removeClass("correct");
    $(".sxn2 .btns").removeClass("pressed");
    },2000);
}


/////////////////////////// FOLLOW THE TUNE GAME ////////////////////////////


/////// button that start the game 

$(".sxn2 .playgame").on("click",gameStart);
function gameStart()
{
    playerIp=[];
    ai=[];
      game=true;
    aiTune();
  
}

//////// User input and check 

    $(".btns").click(function() {
        if(game==true){
        var userinput =$(this).attr("id");
        console.log(userinput);
    
        makeSound(userinput);
        var v=valueGenerator(userinput);
        btnAnimation(v);
        playerIp.push(v);
        checkAnswer(playerIp.length-1,v)
        console.log(playerIp);
        }
    
      });
    
      $(document).on("keydown",function(ev) {
        if(game==true){
        var userinput =ev.key;
        console.log(userinput);
    
        makeSound(userinput);
        var v=valueGenerator(userinput);
        btnAnimation(v);
        playerIp.push(v);
        checkAnswer(playerIp.length-1,v)
        console.log(playerIp);
        }
    
      });



/////// Generate ai notes

function aiTune()
{
    
    $(".sxn2 .playgame").fadeOut();
    var r;
    for(var i=0;i<5;i++)
    {
        r=Math.floor(Math.random()*7);
        ai.push(r);
        loop(r);
    }
    console.log(ai);

    function loop(r)
    {
        setTimeout(function(){makeSound(r),btnAnimation(r)},1000*i);
    }

    setTimeout( function(){$(".PlayerTurn").fadeIn()},5000 );

}

/////// Check Answer

function checkAnswer(index,value)
{
    if(ai[index]==value)
    {
        if(index==4)
        {
            console.log("crct");
            crtAns();
            $(".PlayerTurn").hide();
            $(".sxn2 .playgame").fadeIn();
            game=false;
        }
      
    }
    else
    {
        console.log("wrng");
        err();
        $(".PlayerTurn").hide();
        $(".sxn2 .playgame").fadeIn();
        playerIp=[];
        ai=[];
        game=false;
    
    }

}

