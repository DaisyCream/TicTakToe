function $$(idName){
    return document.getElementById(idName);
}
////////////////////////////////////////////////////////////////

WELCOME = $$("welcome");
GAME = $$("game");
GAMEOVER = $$("gameOver");
WELCOME.domStarBtn = $$("star");
/***
 *
 * @param state when state is ture,style's display;else
 */
WELCOME.toShow = function(state){
    if(state){
        WELCOME.style.display="block";
    }
    else{
        WELCOME.style.display="none";
    }
};

GAME.toShow = function(state){
    if(state){
        GAME.style.display="block";
    }
    else{
        GAME.style.display="none";
    }
};

WELCOME.domStarBtn.onclick = function(){
    WELCOME.toShow(false);
    GAME.toShow(true);
};


window.onload=function(){
    WELCOME.toShow(true);
};
var cell = document.getElementsByClassName("cell");
var index=1;

for(var i=0;i<cell.length;i++){
    cell[i].num=i;
    cell[i].time=0;
    cell[i].onclick=function(){
        this.time++;
        if(this.time>1){
            return;
        }
        if(index%2==0){
            this.style.backgroundImage = "url(img/false.png)";
        }
        else{
            this.style.backgroundImage = "url(img/true.png)";
        }
        index++;
    }

}