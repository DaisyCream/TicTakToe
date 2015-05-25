function $$(idName){
    return document.getElementById(idName);
}
function preLoadImg(url) {
    var img = new Image();
    img.src = url;
}
////////////////////////////////////////////////////////////////
preLoadImg("img/false.png");
preLoadImg("img/true.png");
////////////////////////////////////////////////////////////////
WELCOME = $$("welcome");
GAME = $$("game");
GAMEOVER = $$("gameOver");
WELCOME.domStarBtn = $$("star");
GAMEOVER.result;
GAMEOVER.text = $$("gameOverText");
GAMEOVER.btu = $$("gameOverBtu");
speed = 2;
GAMEOVER.mask = $$("mask");
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
        GAMEOVER.mask.style.display="block";
    }
    else{
        GAMEOVER.style.display="none";
        GAMEOVER.mask.style.display="none";
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
var cellInset = document.getElementsByClassName("cellInset");
var index=1;

for(var i=0;i<cellInset.length;i++){
    cell[i].num=i;
    cell[i].time=0;
    cell[i].onclick=function(){
        this.time++;
        if(this.time>1){
            return;
        }
        if(index%2==0){//the munber is x;
            cellInset[this.num].style.backgroundImage = "url(img/false.png)";
            cellInset[this.num].style.backgroundSize = 50+"px";
            cellAnimation(1,cellInset[this.num],50);
            cellArray[parseInt(this.num/3)][this.num%3] = -1;

        }
        else{//the munber is o;
            cellInset[this.num].style.backgroundImage = "url(img/true.png)";
            cellInset[this.num].style.backgroundSize = 50+"px";
            cellAnimation(1,cellInset[this.num],50);
            cellArray[parseInt(this.num/3)][this.num%3] = 1;

        }
        index++;
        if(index>4){
            if(checkWin('o')){
                GAMEOVER.result = 'o';
                result(GAMEOVER.result);
                clearOnlick();
                return;
            }
            if(checkWin('x')){
                GAMEOVER.result = 'x';
                result(GAMEOVER.result);
                clearOnlick();
                return;
            }
            if(index==10){
                GAMEOVER.result = '=';
                result(GAMEOVER.result);
                clearOnlick();
                return;
            }
        }

    }

}

/***
 * y = x1+at2;
 * count = x1;
 * @param sign
 */

function cellAnimation(n,target,count){
    var sum = count + speed*n*n;//y=x1+at2;
    if(count>=90) return;
    target.style.width = sum + "px";
    target.style.height = sum + "px";
    target.style.marginLeft = -parseInt(parseInt(sum/2));
    target.style.marginTop = -parseInt(parseInt(sum/2));
    target.style.backgroundSize = sum + "px";

    setTimeout(function(){cellAnimation(n+1,target,sum);},10);
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
        cellInset[i].onclick = null;
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