function $$(idName){
    return document.getElementById(idName);
}
////////////////////////////////////////////////////////////////

WELCOME = $$("welcome");
GAME = $$("game");
GAMEOVER = $$("gameOver");
WELCOME.domStarBtn = $$("star");
GAMEOVER.domResult;
GAMEOVER.text = $$("gameOverText");
GAMEOVER.btu = $$("gameOverBtu");
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

GAMEOVER.btu.onclick = function(){
    location.href = "game.html";
}



GAME.toShow = function(state){
    if(state){
        GAME.style.display="block";
    }
    else{
        GAME.style.display="none";
    }
};

GAMEOVER.toShow = function(state){
    if(state){
        GAMEOVER.style.display="block";
    }
    else{
        GAMEOVER.style.display="none";
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
        if(index%2==0){//the munber is x;
            this.style.backgroundImage = "url(img/false.png)";
            cellArray[parseInt(this.num/3)][this.num%3] = -1;

        }
        else{//the munber is o;
            this.style.backgroundImage = "url(img/true.png)";
            cellArray[parseInt(this.num/3)][this.num%3] = 1;

        }
        index++;
        if(index>4){
            if(checkWin('o')){
                GAMEOVER.domResult = 'o';
                result(GAMEOVER.domResult);
                clearOnlick();
            }
            if(checkWin('x')){
                GAMEOVER.domResult = 'x';
                result(GAMEOVER.domResult);
                clearOnlick();
            }
            if(index==10){
                GAMEOVER.domResult = '=';
                result(GAMEOVER.domResult);
                clearOnlick();
            }
        }

    }

}

var cellArray = new Array();
for(var i=0;i<3;i++){
    cellArray[i] = new Array();
    for(var j=0;j<3;j++){
        cellArray[i][j] = 0;
    }
}

function clearOnlick (){
    for(var i=0;i<cell.length;i++){
        cell[i].onclick = null;
    }
}


/***
 *This is cheak the cell win or lose;
 */
function checkWin(munber){
    var num;
    var checkResult = false;
    if(munber=='o') num=1;
    if(munber=='x') num=-1;

    for(var i=0;i<3;i++){
        var flag1=0;
        var flag2=0;
        for(var j=0;j<3;j++){
            if(cellArray[i][j]==num) flag1++;
        }
        if(flag1==3){
            checkResult = true;
            return checkResult;
        }
        if(flag2==3){
            checkResult = true;
            return checkResult;
        }
    }
    for(var i=0;i<3;i++){
        var flag1=0;
        var flag2=0;
        for(var j=0;j<3;j++){
            if(cellArray[j][i]==num) flag1++;
        }
        if(flag1==3){
            checkResult = true;
            return checkResult;
        }
        if(flag2==3){
            checkResult = true;
            return checkResult;
        }
    }
    if((cellArray[0][2]==num&&cellArray[1][1]==num&&cellArray[2][0]==num)||
        (cellArray[0][0]==num&&cellArray[1][1]==num&&cellArray[2][2]==num)){
        checkResult = true;
        return checkResult;
    }
    return checkResult;
}

function result(theChar){
    if(theChar=='o') GAMEOVER.text.innerHTML="THE 'O' WIN";
    if(theChar=='x') GAMEOVER.text.innerHTML="THE 'X' WIN";
    if(theChar=='=') GAMEOVER.text.innerHTML="DRAW";
    GAMEOVER.toShow(true);
}