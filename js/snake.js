let canvas = document.querySelector("#snake");
let ctx = canvas.getContext("2d");
ctx.font = '20px serif';
let box = 20;
let cobra = [];
let pontos = 0;
let HighScore =0;
if(localStorage.length>0)
{
    HighScore = localStorage.getItem("highscore")
}
else
{
    localStorage.setItem("highscore","0")
}


cobra[0] = {
    x : 10 * box,
    y : 10 * box
};

let comida = {
    x : Math.floor(Math.random()*29)*box,
    y : Math.floor(Math.random()*29)*box
};

let rato; /*= {
    x : Math.floor(Math.random()*29)*box,
    y : Math.floor(Math.random()*29)*box
}*/

let imgComida = new Image();
imgComida.src = "sprites/OVO.gif";
let imgRato = new Image();
imgRato.src = "sprites/RATO.gif"

let direcao;

document.addEventListener("keydown",checkDirecao);

function checkDirecao(a)
{
    let key = a.keyCode;

    if(key == 37 && direcao != "right")
    {
        direcao = "left";
    }
    else if(key == 38 && direcao != "down")
    {
        direcao = "up";
    }
    else if(key == 39 && direcao != "left")
    {
        direcao = "right";
    }
    else if(key == 40 && direcao != "up")
    {
        direcao = "down";
    }
    else direcao = direcao;

}
let modoHard = false
function render()
{
    if(modoHard)
    {
        ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = "#00BB00";
        ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
    }
    else
    {
        ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);

        ctx.fillStyle = "#99FF99";
        ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
    }
    //console.log(direcao)
    
    for(let i = 0; i < cobra.length; i++)
    {
        ctx.fillStyle = (i == 0) ? "#009B00" : "#00BB00"
        ctx.fillRect(cobra[i].x,cobra[i].y,box,box);
               
    }

    //ctx.fillStyle = "green";
    //ctx.fillRect(comida.x,comida.y,box,box);

    let snakeX = cobra[0].x;
    let snakeY = cobra[0].y;

    if(direcao == "left") snakeX -= box;
    if(direcao == "right") snakeX += box;
    if(direcao == "up") snakeY -= box;
    if(direcao == "down") snakeY += box;

    if(snakeX == comida.x && snakeY == comida.y)
    {
        comida = {
            x : Math.floor(Math.random()*29)*box,
            y : Math.floor(Math.random()*29)*box
        };
        pontos++;
    }
    else if(ratoNaTela && (snakeX == rato.x && snakeY == rato.y))
    {
        //ratoNaTela = false;
        sumirRato()
        pontos+=5;
    }
    else
    {
        cobra.pop();
    }
    let novaCabeça = {
        x : snakeX,
        y : snakeY
    };
    
    
    if(snakeX < 0 || snakeX > canvas.width - box 
        || snakeY < 0 || snakeY > canvas.height + box || colisao(novaCabeça,cobra))
    {
        clearInterval(update)
        console.log("aa")
        //morreu
        if(pontos > HighScore)
        {
            HighScore = pontos;
            localStorage.setItem("highscore",HighScore)
        } 
        
    }
    cobra.unshift(novaCabeça)//coloca no inicio do vetor
    /*
    ctx.fillStyle = "black";
    ctx.fillRect(comida.x,comida.y,20,20);
    ctx.fillStyle = "red";
    ctx.fillRect(cobra[0].x,cobra[0].y,20,20);
    */

    renderOvo()
    renderRato()
    renderScore()
}
function colisao(cabeca, corpo)
{
    for(let i =0; i < corpo.length; i++)
    {
        if(cabeca.x == corpo[i].x && cabeca.y == corpo[i].y)
        {
            console.log("colidiu com o corpo")
            return true;
        }
    }
    return false;
}
let update = setInterval(render,130);



let ratoNaTela = false

setTimeout(spawnarRato,8000)

function spawnarRato()
{
    
    console.log("spawnou rato")
    rato = {
        x : Math.floor(Math.random()*29)*box,
        y : Math.floor(Math.random()*29)*box
    }
    ratoNaTela = true
    setTimeout(sumirRato,4000)
}
function sumirRato()
{
    if(ratoNaTela)
    {
        console.log("rato era pra sumir")
        ratoNaTela = false
        setTimeout(spawnarRato,8000)
    }
    else
    {
        ratoNaTela = false
    }
    
}
function renderScore()
{
    ctx.fillStyle = "black";
    ctx.fillText("Pontos: "+pontos+" Highscore: "+HighScore, 1, 20);
}
function renderOvo()
{
    ctx.drawImage(imgComida,comida.x, comida.y);
}
function renderRato()
{
    if(ratoNaTela)
    {
        ctx.drawImage(imgRato,rato.x,rato.y)
    }
}
let teste;
let hard;
ligarContador()
function pintarTela()
{
    console.log("dificil")
    modoHard = true;
    clearInterval(hard)
    teste = setInterval(modoFacil,2000)
}
function modoFacil()
{
    console.log("facil")
    modoHard = false;
    clearInterval(teste)
    ligarContador()
}

function ligarContador()
{
    hard = setInterval(pintarTela,20000)
}