  let boxes = document.querySelectorAll(".box");
let  message = document.querySelector(".msg");
let  newBtn = document.querySelector("#new");
let  p = document.querySelector("#msgg");
let reset = document.querySelector("#reset");

// take the first element O 
let turnO = true;

// ALso make the Winning PAttern 

let patterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [6,4,2],
];

boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        console.log("box was click")
        if(turnO===true){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
            
        }
          box.disabled =true;
          checkWinner()
    })
})

const checkWinner = ()=>{
    for(let patten of patterns){
        let p1 = boxes[patten[0]].innerText;
        let p2 = boxes[patten[1]].innerText;
        let p3 = boxes[patten[2]].innerText;
        if (p1!="" && p2 !=""  && p3 != ""){
            if(p1 ===p2 && p2 ===p3){
                console.log("winner is ",p1)
                showWinner(p1)
            }
        }
    }
}

const showWinner = (winner) => {
    p.innerText = `COngratulation winner is ' ${winner} '`
    message.classList.remove("hide")
    disable()
}
const disable = ()=>{
    for(let box of boxes ){
        box.disabled = true;
    }
}
const enable = ()=>{
    for(let box of boxes ){
        box.disabled = false;
        box.innerText = ""
        message.classList.add("hide");
    }
}

reset.addEventListener("click",enable);
newBtn.addEventListener("click",enable);



let btn = document.querySelector("#btn");
btn.addEventListener("click",()=>{
    foodItem();
})

async function foodItem(){
  // HardWare check
    if(!navigator.online){
        alert("Check Your internet Connection  thank You")
        return 
    }
    try{ 
    const url = `https://api.frontendexpert.io/api/fe/glossary-suggestions?query=${foodItem}`
    let d = document.querySelector("#message");
    let input = document.querySelector("#health").value;
     let response = await fetch(url)
     let data = await response.json();
     console.log(data)
    }
    catch(error){

    }

}


