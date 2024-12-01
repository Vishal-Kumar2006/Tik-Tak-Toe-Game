let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector("#new-btn");
let msgCotainer = document.querySelector(".msg-container");


let turnO = true;

let winPattern = 
[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6], 
    [3, 4, 5], 
    [6, 7, 8] 
];

const resetGame = ()=> {
    turnO = true;
    enabled();
    msgCotainer.classList.add("hide");
}

const disabled = ()=> {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enabled = ()=> {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    resetBtn.classList.remove("hide");
}


boxes.forEach((box)=> {
    box.addEventListener("click", ()=> {
        if(turnO) {
            box.innerText = "O";
            box.classList.remove("Xcolor");
            box.classList.add("Ocolor");
            console.log(box,"O");
        }
        else {
            box.innerText = "X";
            box.classList.remove("Ocolor");
            box.classList.add("Xcolor");
            console.log(box,"X");

        }
        box.classList.add("click");
        setTimeout(() => {
            box.classList.remove("click");
        }, 100);

        resetAuto();
        checkWinner();
        turnO = !turnO;
        box.disabled = true;
    })
}) 

const resetAuto = ()=> {
    let callReset = true;
    for(let i=0; i<9; i++) {
        if(boxes[i].innerText == "X" || boxes[i].innerText == "O") {
            continue;
        }
        
        else {
            callReset = false;
            break;
        }
    }

    if(callReset) {
        msg.innerText = "Try Again!! Nobody win The GAME";
        msgCotainer.classList.remove("hide");
        newBtn.classList.add("hide");
        setTimeout(()=> {
            resetGame();
            newBtn.classList.remove("hide");
        },3000);
        
    }
}

const checkWinner = ()=> {
    for(let patter of winPattern) {
        let postval1 = boxes[patter[0]].innerText;
        let postval2 = boxes[patter[1]].innerText;
        let postval3 = boxes[patter[2]].innerText;
        
        if(postval1 != "" && postval2 != "" && postval3 != "") {
            if(postval1 === postval2 && postval2 === postval3) {
                announceWinner(postval1);
            }
        }  
    }
}

const announceWinner = (winner)=> {
    msg.innerText = `Congratulation's The Winner is ${winner}`;
    resetBtn.classList.add("hide");
    msgCotainer.classList.remove("hide");
    disabled();
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
