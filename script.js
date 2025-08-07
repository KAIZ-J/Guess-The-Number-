
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
  let score=0;
  let scoreObj = {scoreValue:score}
  const hintBtn = document.getElementById("hint");
  const actionDialog = document.getElementById("actionDialog")
  const scoreText =  document.getElementById("score")
  const dialogInstruction = document.getElementById("instructions")
  const home = document.getElementById("home")
  const resultBox =  document.getElementById("result-box")
  const checker = document.getElementById("checker")
  const container= document.getElementById("container");
  let arrayNums = [0,1,2,3,4,5,6,7,8,9];
  function random(array){
    let num = "";
    for(let i=0;i<4;i++){
      num+=array[Math.floor(Math.random()*array.length)]
    }
    return num;
  }
    let randomNum = random(arrayNums)
      console.log(randomNum)
      
      let randomArray = randomNum.split("").map(Number);
  function addInput(){
    counter++;
    let elem = document.createElement("div")
   for(let i=0;i<4;i++){
     elem.innerHTML+=`<input type="number" class="input input-${counter}"/>`
   }
   container.append(elem)
  }

     
  function check(){
    
      let userInput = [...document.querySelectorAll(`.input-${counter}`)];
      let userInputValues = [...document.querySelectorAll(`.input-${counter}`)].map(item=>item.value=item.value===""?"-1":item.value).map(Number)
      let pcCount = mode(randomArray)
  let userCount = mode(userInputValues)
      for(let i=0;i<4;i++){
     if(userInputValues[i]===randomArray[i]){
   userInput[i].style.backgroundColor="#00FA9A";
   userCount[userInputValues[i]]-=1;
   pcCount[userInputValues[i]]-=1;
        }
        else if(randomArray.includes(userInputValues[i]) && pcCount[userInputValues[i]] > userCount[userInputValues[i]]-pcCount[userInputValues[i]]){
userInput[i].style.backgroundColor="#FFD700";
        }
        else{
          userCount[userInputValues[i]]-=1;
        }
      }
      if(userInputValues.join("")===randomNum){
        checker.style.display="none";
        hintBtn.style.display="none";
          container.style.display="none";
          resultBox.style.display="flex";
          resultBox.innerHTML=`<h2>You Got it Right</h2>
          <p>5points added to your score</p>
          <div>
            <button type="button" onclick="goHome()" >Home</button>
            <button type="button" onclick="playAgain()" >Play Again</button>
            </div>`;
            score+=5;
        scoreText.textContent=score;
      }
      else if(counter>5){
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
      
    }
    function checkInput(){
        const inputs = document.querySelectorAll(".input");
     inputs.forEach(item=>item.addEventListener("input",function(){
        if(this.value.length>1){
      this.value=this.value.slice(0,1);
       
        }
     }))
    }
    function startGame(elem){
        addInput();
        container.style.display="flex";
        checker.style.display="block";
        hintBtn.style.display="block";
     elem.parentElement.style.display="none";
     checkInput()
 
    }
    function continueGame(elem){
  check();
        const all =  document.querySelectorAll(".input");
     all.forEach(item=>item.setAttribute("disabled",true));
        
     if(counter<6){
       addInput();
    }
   else{
    return;
   }
    }
     function goHome(){
      counter=1;
      randomNum=random(arrayNums);
      randomArray = randomNum.split("").map(Number)
      container.innerHTML=""
  home.style.display="flex";
  resultBox.style.display="none"
     }
     function playAgain(){
       counter=1;
      randomNum=random(arrayNums);
      randomArray = randomNum.split("").map(Number)
      container.innerHTML=""
  resultBox.style.display="none"
      addInput();
        container.style.display="flex";
        checker.style.display="block";
        hintBtn.style.display="block";
        checkInput()
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