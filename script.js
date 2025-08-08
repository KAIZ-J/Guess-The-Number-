
  let objTry = {0:true,1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true}
  let arrayNums = [0,1,2,3,4,5,6,7,8,9];
  const hintBtn = document.getElementById("hint");
  const actionDialog = document.getElementById("actionDialog")
  const scoreText =  document.getElementById("score")
  const dialogInstruction = document.getElementById("instructions")
  const home = document.getElementById("home")
  const resultBox =  document.getElementById("result-box")
  const checker = document.getElementById("checker");
  checker.innerHTML=arrayNums.map(el=>`<button type="button" onclick="addNumber(this)" class="num-btn">${el}</button>`).join(" ")
  checker.innerHTML+=`<button type="button" onclick="deleteInput()" id="remove" >X</button>
  <button type="button" onclick="continueGame(this)" id="check-btn" >Check</button>`;
  const container= document.getElementById("container");

  function mode(array){
    const obj = {};
    array.forEach(el=>{
      if(obj[el]){
        obj[el]+=1
      }
      else{
        obj[el]=1
      }
    })
    return obj;
  }
  let counter = 1;
   let cIn = 1;
  let score=0;
  
  
  function random(array){
    let num = "";
    for(let i=0;;i++){
        const j = Math.floor(Math.random()*array.length)
        if(!num.includes(array[j])){
num+=array[j]
        }
        if(num.length===4) break;
      
    }
    return num;
  }
    let randomNum = random(arrayNums)
      console.log(randomNum)
      
      let randomArray = randomNum.split("").map(Number);
      //input adding 
  function addInput(){
   let countOut = 1;
    for(let i=0;i<5;i++){
        let elem = document.createElement("div")
 let countIn = 1;
for(let i=0;i<4;i++){
     elem.innerHTML+=`<input type="number" readonly class="input input-${countOut} input-${countOut}-${countIn}" oninput="checkInput(this);"/> `
     countIn++;
   }
   countOut++;
   container.append(elem)
    }
   
  }

     //whole prcosess of checking the number inputed by user
  function check(){
    let numBtns = [...document.querySelectorAll(`.num-btn`)];
      let userInput = [...document.querySelectorAll(`.input-${counter}`)];
      let userInputValues = [...document.querySelectorAll(`.input-${counter}`)].map(item=>item.value=item.value===""?"0":item.value).map(Number)
      let pcCount = mode(randomArray)
  let userCount = mode(userInputValues)
      for(let i=0;i<4;i++){
        let numCurrent = numBtns.find(el=>Number(el.textContent)===userInputValues[i]);
     if(userInputValues[i]===randomArray[i]){
   userInput[i].style.backgroundColor="#00FA9A";
   userInput[i].style.animation="anima 0.4s";
  //  numCurrent.style.animation="rotate 1s ease-in-out forwards";
   numCurrent.style.backgroundColor="#00FA9A";
   objTry[userInputValues[i]]=false;
   
   
   userCount[userInputValues[i]]-=1;
   pcCount[userInputValues[i]]-=1;
        }
        else if(randomArray.includes(userInputValues[i]) && pcCount[userInputValues[i]] > userCount[userInputValues[i]]-pcCount[userInputValues[i]]){
userInput[i].style.backgroundColor="#FFD700";
if(objTry[userInputValues[i]]===true){
numCurrent.style.backgroundColor="#FFD700";
objTry[userInputValues[i]]=false;
}

        }
        else{
          userCount[userInputValues[i]]-=1;
          userInput[i].style.backgroundColor="gray";
          if(objTry[userInputValues[i]]===true){
numCurrent.style.backgroundColor="gray";
}
          
          userInput[i].style.animation="shake .2s"
        }
      }
      //if the user input is right beofre 5 tries or in the 5th
      if(userInputValues.join("")===randomNum){
        checker.style.display="none";
        hintBtn.style.display="none";
          container.style.display="none";
          resultBox.style.display="flex";
          resultBox.innerHTML=`<h2>You Got it Right</h2>
          <h3>+5 Points</h3>
          <div>
            <button type="button" onclick="goHome()" >Home</button>
            <button type="button" onclick="playAgain()" >Play Again</button>
            </div>`;
            score+=5;
        scoreText.textContent=score;
      }
      //when trial ends
      else if(counter>=5){
        checker.style.display="none";
         hintBtn.style.display="none";
        container.style.display="none";
        resultBox.style.display="flex";
          resultBox.innerHTML=`<h2>You Lost the Game</h2>
          <h3><strong>${randomNum}</strong> was the answer</h3>
          <div>
            <button type="button" id="backHome" onclick="goHome()">Home</button>
            <button type="button" id="" onclick="playAgain()" >Play Again</button>
            </div>`;
      }
      counter++;
      cIn = 1;
    }
    //start buton pressed
    function startGame(elem){
        addInput();
        container.style.display="flex";
        checker.style.display="grid";
        hintBtn.style.display="block";
     elem.parentElement.style.display="none";
     checkInput()
 
    }
    //when check button clicked
    function continueGame(elem){
  check();
        const all =  document.querySelectorAll(".input");
     all.forEach(item=>item.setAttribute("disabled",true));
    }
   //add to input
    function addNumber(elem){
       let save = document.querySelector(`.input-${counter}-${cIn}`);
       if(save!==null && cIn<=4){
        cIn++; 
   save.value=elem.innerText;
       }
       else{
        cIn=4;
        save = document.querySelector(`.input-${counter}-${cIn}`)
       save.value=elem.innerText;
       }
    
    }
    //bacspace
    function deleteInput(){
        let save = document.querySelector(`.input-${counter}-${cIn}`);
        if(save!==null){
if(save.value==="" && cIn>1){
          cIn--;
          save = document.querySelector(`.input-${counter}-${cIn}`);
          save.value=""
        }
       else{
        save.value=""
       }
        }
        else{
          cIn=4;
        }
     
    }
     function goHome(){
      counter=1;
      randomNum=random(arrayNums);
      randomArray = randomNum.split("").map(Number)
      container.innerHTML=""
  home.style.display="flex";
  resultBox.style.display="none";
  document.querySelectorAll(`.num-btn`).forEach(el=>{el.style.backgroundColor="";
    el.style.animation=""
  })
     }
     function playAgain(){
       counter=1;
      randomNum=random(arrayNums);
      randomArray = randomNum.split("").map(Number)
      container.innerHTML=""
  resultBox.style.display="none"
      addInput();
        container.style.display="flex";
        checker.style.display="grid";
        hintBtn.style.display="block";
        document.querySelectorAll(`.num-btn`).forEach(el=>{el.style.backgroundColor="";
    el.style.animation=""
  })
     }
    function openDialog(){
dialogInstruction.showModal()
    }
    function closeDialog(elem){
      elem.parentElement.close()
    }
    function openActionDialog(elem){
      actionDialog.showModal();
      actionDialog.innerHTML= score>=6? `
      <h1>Get Answer</h1>
      <p>You have ${score} points <p/>
      <p>Get answer with 6 points</p>
      <button type="button" onclick="buyHint(this)">Buy</button>
      <button onclick="closeDialog(this)" type="button">Cancel</button>
      `:`You Have No enough Points <button type="button" onclick="closeDialog(this)">Close</button>`
    }
    function buyHint(elem){
      if(score>=6){
        actionDialog.innerHTML=`Here You Go ${randomNum};
        <button type="button" onclick="closeDialog(this)">Close</button>`;
        score-=6;
        elem.style.display="none";
        hintBtn.style.display="none";
        
      }
    }