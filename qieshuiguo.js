var isPlaying=false;
//1.banana2.pears3.orange4.melon5.pineapple6.strawberry7.lemon8.basket9.grapes
var fruits=["http://www.pngmart.com/files/1/Banana-Fruit-PNG.png","https://pre00.deviantart.net/6c5b/th/pre/i/2012/041/9/3/pear_vector_by_silver_wolf_studios-d4paumq.png","http://www.freepngimg.com/download/fruit/5-2-fruit-free-png-image.png","http://www.pngpix.com/wp-content/uploads/2016/03/Watermelon-PNG-Image.png","https://vignette.wikia.nocookie.net/epicrapbattlesofhistory/images/5/57/Pineapple-2.png/revision/latest?cb=20160703145656","http://www.freepngimg.com/thumb/strawberry/1-strawberry-png-images-thumb.png","http://www.pngpix.com/wp-content/uploads/2016/02/Lemon-PNG-image.png","http://pngimagesfree.com/Fruit/Mix-fruit-png/fruit-basket_png_one.png","http://pngimagesfree.com/Fruit/Grapes-png/Thumb/jind_grapes_png.png"]
var score;
var lives=3;
var fallcount;
var movefruit;
$('button').on('click',function(){
  if(isPlaying==true){
    score=0;
    isPlaying=false;
    lives=3;
    clearInterval(movefruit);
    $('#life').html("");
    $('#score').html(score);
    $('.start').html('start');
    $('.fruit').hide();
    $("#getfruit").attr("src","");
  }else{
    score=0;
    lives=3;
    isPlaying=true;
    $('#score').html(score);
    $('.start').html('reset');
    $('.gameover').hide();
    showLives();
    getFruits();
    }
})
$("#getfruit").mouseover(function(){
  score++;
  $("#score").html(score);
  $("#sound")[0].play();
  clearInterval(movefruit);
  $("#getfruit").hide("explode",500);
  setTimeout(getFruits,500);
});

function showLives(){
      $("#life").empty();
      for(var i=0;i<lives;i++){
    $('#life').append('<i class="fa fa-gratipay" aria-hidden="true"></i>');
    }
}
var fruitnum;
function getFruits(){
  $('.fruit').show();
  fruitnum=Math.floor(Math.random()*9);
  console.log(fruitnum)
  $("#getfruit").attr("src",fruits[fruitnum]);
  $("#getfruit").css({'top':-40,'left':Math.random()*($('.fruitbox').width()-100)})
  fallcount=Math.floor(Math.random()*5)+1;
  movefruit=setInterval(function(){
    $("#getfruit").css('top',$("#getfruit").position().top+fallcount);
    if($("#getfruit").position().top>$(".fruitbox").height()){
    if(lives>1){
        fruitnum=Math.floor(Math.random()*4);
  console.log(fruitnum)
  $("#getfruit").attr("src",fruits[fruitnum]);
  $("#getfruit").css({'top':-40,'left':Math.random()*($('.fruitbox').width()-100)})
  fallcount=Math.floor(Math.random()*5)+1;
      lives--;
      showLives();
    }else{
     lives=0;
      showLives();
      isPlaying=false;
      $('.start').text('start')
      clearInterval(movefruit);
      $('.gameover').show();
      $('#finalscore').html(score);
    }
  }
  },10);
  
}
