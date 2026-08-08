/******
 Part-1 
******/
/*==================================================
    CSE'23 Quiz Challenge
    Developed by Ratul

    ===== EASY SETTINGS =====
==================================================*/

// Quiz Time (Seconds)
// Example:
// 300 = 5 Minutes
// 600 = 10 Minutes

const QUIZ_TIME = 600;

// Marks

const CORRECT_MARK = 1;
const NEGATIVE_MARK = 0.25;

// Student ID fixed prefix. User only types the last 2 digits.
// Example: prefix "CE260" + typed "01" = "CE26001"

const ID_PREFIX = "CE260";


/*==================================================
      QUESTIONS
      Edit only this section

      ---- HOW TO ADD AN IMAGE (16:9) ----
      1) Question image:
         image: "https://your-image-link.jpg"

      2) Option image (per option), turn the option
         from plain text into an object:
         { text: "1. Option text", image: "https://your-image-link.jpg" }

      Images are auto-cropped to a 16:9 box, so any
      image works, but a 16:9 source looks best.
==================================================*/

const questions = [

{
question:"1. Which one is incorrect for Resistant R=0?",
options:[
"1. I=infinity",
"2. Short circuit",
"3. Insulator becomes super conductor",
"4. Insulator does not cross breakdown power"
],
answer:3,
explanation:"Check notes"
},

{
question:"2. Which one is incorrect for ohm's law?",
options:[
"1. V proportional to I",
"2. I inverse proportional to R",
"3. V inverse proportional to R",
"4. None of these"
],
answer:2,
explanation:"Check notes"
},

{
question:"3. 2 elements are in series if- ",
options:[
"1. 1 terminal in common",
"2. Current is same",
"3. Voltage is same",
"4. Both a&b"
],
answer:3,
explanation:"Check notes"
},

{
question:"4. Incorrect for Power- ",
options:[
"1. V=P/I",
"2. VR=V^3/P",
"3. PR=I^2×R^2",
"4. P/R=I"
],
answer:3,
explanation:"Check notes"
},

{
question:"5. Find these values",
image:"ques5.jpeg",
options:[
"1. Rt=8ohm, Is= 2.5A, V1= 12.5V, V2= 5V, V3= 2.5V, P1= 31.25W, P2= 12.5W, P3= 6.25, Pdel= 50W ",
"2. Rt=8ohm, Is= 2.5A, V1= 12.5V, V2= 5V, V3= 2.5V, P1= 6.25W, P2= 12.5W, P3= 31.25, Pdel= 50W ",
"3. Rt=8ohm, Is= 2.5A, V1= 12.5V, V2= 5V, V3= 2.5V, P1= 12.5W, P2= 12.5W, P3= 6.25, Pdel= 50W ",
"4. Rt=8ohm, Is= 2.5A, V1= 12.5V, V2= 5V, V3= 2.5V, P1= 12.25W, P2= 12.5W, P3= 31.25, Pdel= 50W "
],
answer:0,
explanation:"Check notes: value changed"
},

{
question:"6. Find the Total Voltage",
image:"ques6.jpeg",
options:[
"1. 15V",
"2. 10V",
"3. 16V",
"4. 21V"  // Fixed: changed from "1. 21V" to "4. 21V"
],
answer:0,
explanation:"Check notes types"
},

{
question:"7. Determine the current resulting from the application of a 9V battery across a network with a resistance of 2.2ohm",
options:[
"1. 4.084",
"2. 4.08",
"3. 4.09",
"4. 4.079"
],
answer:2,
explanation:"Check notes"
},

{
question:"8. Plot the curve of I (vertical axis) versus V (horizontal axis) for a 120 Ω resistor. Use a horizontal scale of 0 to 100 V and a vertical scale of 0 to 1 A.",
//image:"ques8.png",
options:[
{text:"1.", image:"ques8-1.jpeg"},
{text:"2.", image:"ques8-2.jpeg"},
{text:"3.", image:"ques8-3.jpeg"},
{text:"4.", image:"ques8-4.jpeg"}
],
answer:0,
explanation:"check notes: problem-1 (ohm's law plot)"
},

{
question:"9. Predict the output- ",
image:"ques9.jpeg",
options:[
"1. a=5, b=7, c=6, d=7",
"2. a=6, b=7, c=7, d=8",
"3. a=6, b=7, c=7, d=7",
"4. a=5, b=6, c=6, d=8"  
],
answer:0,
explanation:"Run the codes"
},

{
question:"10. Predict the output-",
image:"ques10.jpeg",
options:[
{text:"1.", image:"ques10-1.jpeg"},
{text:"2.", image:"ques10-2.jpeg"},
{text:"3.", image:"ques10-3.jpeg"},
{text:"4.", image:"ques10-4.jpeg"}
  ],
answer:2,
explanation:"Run the codes"
}

];

// Hardness Level bonus question (no marks, shown after the last question)
const hardnessOptions = ["Very Easy", "Easy", "Standard", "Hard"];


/*==================================================
        DOM
==================================================*/

const loginPage=document.getElementById("loginPage");
const quizPage=document.getElementById("quizPage");
const resultPage=document.getElementById("resultPage");
const answerPage=document.getElementById("answerPage");

const nickname=document.getElementById("nickname");
const studentId=document.getElementById("studentId");

const resultForm=document.getElementById("resultForm");

const startBtn=document.getElementById("startBtn");

const questionText=document.getElementById("questionText");
const optionsDiv=document.getElementById("options");
const questionCard=document.getElementById("questionCard");
const bonusBadge=document.getElementById("bonusBadge");

const currentQuestion=document.getElementById("currentQuestion");
const totalQuestion=document.getElementById("totalQuestion");

const timer=document.getElementById("timer");

const progressBar=document.getElementById("progressBar");

const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");

const submitBtn=document.getElementById("submitBtn");


/*==================================================
      VARIABLES
==================================================*/

let current=0;

let answers=new Array(questions.length).fill(null);

let locked=new Array(questions.length).fill(false);

let score=0;

let correct=0;

let wrong=0;

let skipped=0;

let attempt=0;

let timeLeft=QUIZ_TIME;

let timerInterval;

let submitted=false;  // Declared once (removed duplicate)

let fullStudentId="";  // ID_PREFIX + typed 2 digits

let hardnessAnswer=null;   // index into hardnessOptions

let hardnessLocked=false;


/*==================================================
      STUDENT ID INPUT - digits only, max 2
==================================================*/

studentId.addEventListener("input", function(){

this.value = this.value.replace(/\D/g,"").slice(0,2);

});


/*==================================================
      START QUIZ
==================================================*/

startBtn.onclick=function(){

if(nickname.value.trim()==""){

alert("Enter Nickname");

return;

}

let idNum = parseInt(studentId.value.trim(), 10);

if(!/^\d{1,2}$/.test(studentId.value.trim()) || idNum<1 || idNum>63){

alert("Enter a valid ID between 01-63");

return;

}

fullStudentId = ID_PREFIX + String(idNum).padStart(2,"0");

loginPage.classList.add("hidden");

quizPage.classList.remove("hidden");

totalQuestion.innerText=questions.length;

loadQuestion();

startTimer();

};


/*==================================================
      TIMER
==================================================*/

function startTimer(){

timerInterval=setInterval(function(){

timeLeft--;

let m=Math.floor(timeLeft/60);

let s=timeLeft%60;

timer.innerText=
String(m).padStart(2,"0")
+":"
+
String(s).padStart(2,"0");

if(timeLeft<=0){

clearInterval(timerInterval);

submitQuiz();

}

},1000);

}


/*==================================================
      LOAD QUESTION
==================================================*/

function loadQuestion(){

if(current===questions.length){

loadHardnessQuestion();

return;

}

let q=questions[current];

currentQuestion.innerText=current+1;

progressBar.style.width=
((current+1)/questions.length)*100+"%";

questionCard.classList.remove("bonusMode");
bonusBadge.classList.add("hidden");
nextBtn.classList.remove("bonusNext");

let questionImageHtml = q.image
? `<img src="${q.image}" alt="Question Image" class="questionImage">`
: "";

questionText.innerHTML = questionImageHtml + `<span class="qText">${q.question}</span>`;

optionsDiv.innerHTML="";

nextBtn.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;

q.options.forEach(function(option,index){
let div=document.createElement("div");

div.className="option";

let optText = (typeof option === "string") ? option : option.text;

let optImage = (typeof option === "object" && option.image) ? option.image : null;

div.innerHTML =
(optImage ? `<img src="${optImage}" alt="Option Image" class="optionImage">` : "")
+ `<span class="optText">${optText}</span>`;

div.dataset.index=index;

/* Show previous selected answer */

if(answers[current]!==null){

if(answers[current]===index){

div.classList.add("selected");

}

if(locked[current]){

div.classList.add("locked");

}

}

/* Click - Fixed event handler */
div.onclick=function(){

if(locked[current]) return;

// Remove selection from all options
document.querySelectorAll(".option").forEach(function(op){
op.classList.remove("selected");
});

// Add selection to clicked option
div.classList.add("selected");

// Store the answer
answers[current]=index;
locked[current]=true;

// Lock all options
document.querySelectorAll(".option").forEach(function(op){
op.classList.add("locked");
});

};

optionsDiv.appendChild(div);

});
}


/*==================================================
      LOAD HARDNESS LEVEL (BONUS, NO MARKS)
==================================================*/

function loadHardnessQuestion(){

currentQuestion.innerText="Bonus";

progressBar.style.width="100%";

questionCard.classList.add("bonusMode");
bonusBadge.classList.remove("hidden");
nextBtn.classList.add("bonusNext");

questionText.innerHTML = `<span class="qText">Q. Hardness Level</span>`;

optionsDiv.innerHTML="";

nextBtn.innerHTML = `Finish Quiz <i class="fa-solid fa-flag-checkered"></i>`;

hardnessOptions.forEach(function(option,index){

let div=document.createElement("div");

div.className="option";

div.innerHTML = `<span class="optText">${option}</span>`;

div.dataset.index=index;

if(hardnessAnswer!==null){

if(hardnessAnswer===index){

div.classList.add("selected");

}

if(hardnessLocked){

div.classList.add("locked");

}

}

div.onclick=function(){

if(hardnessLocked) return;

document.querySelectorAll(".option").forEach(function(op){
op.classList.remove("selected");
});

div.classList.add("selected");

hardnessAnswer=index;
hardnessLocked=true;

document.querySelectorAll(".option").forEach(function(op){
op.classList.add("locked");
});

};

optionsDiv.appendChild(div);

});

}


/*==================================================
      PREVIOUS BUTTON - Defined once
==================================================*/

prevBtn.onclick=function(){

if(current>0){

current--;

loadQuestion();

}

};


/*==================================================
      NEXT BUTTON - Defined once
      (current can go up to questions.length, which
      is the bonus Hardness Level page)
==================================================*/

nextBtn.onclick=function(){

if(current<questions.length){

current++;

loadQuestion();

}else{

if(hardnessAnswer===null){

alert("Please select a Hardness Level before submitting -- it's required.");

return;

}

if(confirm("Do you want to submit the quiz?")){

submitQuiz();

}

}

};


/*==================================================
      SUBMIT BUTTON - Defined once
==================================================*/

submitBtn.onclick=function(){

if(submitted) return;

if(hardnessAnswer===null){

alert("Please answer the Hardness Level question before submitting -- it's required.");

current=questions.length;

loadQuestion();

return;

}

if(confirm("Are you sure you want to submit?")){

submitQuiz();

}

};


/*==================================================
      SHORTCUT
==================================================*/

document.addEventListener("keydown",function(e){

if(quizPage.classList.contains("hidden")) return;

if(e.key==="ArrowLeft"){

prevBtn.click();

}

if(e.key==="ArrowRight"){

nextBtn.click();

}

});


/*==================================================
      SUBMIT QUIZ - RESULT CALCULATION
==================================================*/

function submitQuiz(){

submitted=true;

clearInterval(timerInterval);

quizPage.classList.add("hidden");

resultPage.classList.remove("hidden");

correct=0;
wrong=0;
skipped=0;
score=0;

answers.forEach(function(ans,index){

if(ans===null){

skipped++;

}

else if(ans===questions[index].answer){

correct++;

score+=CORRECT_MARK;

}

else{

wrong++;

score-=NEGATIVE_MARK;

}

});

attempt=correct+wrong;

let accuracy=0;

if(attempt>0){

accuracy=((correct/attempt)*100).toFixed(2);

}

let totalTime=QUIZ_TIME-timeLeft;

let minute=Math.floor(totalTime/60);

let second=totalTime%60;

// Hardness Level - no points, just carries the feedback text
let difficultyText = (hardnessAnswer!==null) ? hardnessOptions[hardnessAnswer] : "Not Answered";

/*==================================
SHOW RESULT
==================================*/

document.getElementById("rTotal").innerText=questions.length;

document.getElementById("rAttempt").innerText=attempt;

document.getElementById("rCorrect").innerText=correct;

document.getElementById("rWrong").innerText=wrong;

document.getElementById("rSkip").innerText=skipped;

document.getElementById("rScore").innerText=score.toFixed(2);

document.getElementById("rAccuracy").innerText=accuracy+"%";

document.getElementById("rTime").innerText=
minute+" Min "+second+" Sec";

document.getElementById("rDifficulty").innerText=difficultyText;

/*==================================
FORMSPREE DATA
==================================*/

document.getElementById("mailName").value=
nickname.value;

document.getElementById("mailID").value=
fullStudentId;

document.getElementById("mailScore").value=
score.toFixed(2);

document.getElementById("mailCorrect").value=
correct;

document.getElementById("mailWrong").value=
wrong;

document.getElementById("mailAccuracy").value=
accuracy+"%";

document.getElementById("mailSkipped").value=
skipped;

document.getElementById("mailTime").value=
minute+" Min "+second+" Sec";

document.getElementById("mailDifficulty").value=
difficultyText;

/*==================================
SEND RESULT
==================================*/

/*
  Fixed: the previous version sent a raw JSON body with a
  'Content-Type: application/json' header. That forces the
  browser into a CORS preflight, and fetch() also resolves
  its promise on 4xx/5xx responses (it only rejects on a
  network failure) -- so a rejected/invalid submission was
  still silently logged as "Result Sent".

  Fix: submit the actual hidden <form id="resultForm"> as
  FormData (Formspree's own recommended AJAX method -- no
  preflight), and explicitly check response.ok so failures
  are no longer swallowed.
*/

let resultFormData = new FormData(resultForm);

fetch(resultForm.action,{

method:"POST",

body:resultFormData,

headers:{

'Accept':'application/json'

}

})

.then(function(response){

if(response.ok){

console.log("Result Sent");

}else{

response.json()
.then(function(data){
console.log("Sending Failed:", data);
})
.catch(function(){
console.log("Sending Failed: HTTP "+response.status);
});

}

})

.catch(function(error){

console.log("Sending Failed:", error);

});

}


/*==================================================
      COMMON RESTART FUNCTION - Fixed
==================================================*/

function restartQuiz(){

clearInterval(timerInterval);

current=0;

answers=new Array(questions.length).fill(null);

locked=new Array(questions.length).fill(false);

score=0;

correct=0;

wrong=0;

skipped=0;

attempt=0;

submitted=false;

hardnessAnswer=null;

hardnessLocked=false;

fullStudentId="";

timeLeft=QUIZ_TIME;

timer.innerText=
String(Math.floor(QUIZ_TIME/60)).padStart(2,"0")
+":"
+
String(QUIZ_TIME%60).padStart(2,"0");

progressBar.style.width="0%";

currentQuestion.innerText="1";

questionText.innerHTML="Question Here";

optionsDiv.innerHTML="";

resultPage.classList.add("hidden");

answerPage.classList.add("hidden");

quizPage.classList.add("hidden");

loginPage.classList.remove("hidden");

/* Clear inputs if needed */
nickname.value="";
studentId.value="";

}


/*==================================================
      SHOW ANSWERS
==================================================*/

const showAnswerBtn=document.getElementById("showAnswerBtn");
const restartBtn=document.getElementById("restartBtn");
const answerContainer=document.getElementById("answerContainer");

showAnswerBtn.onclick=function(){

resultPage.classList.add("hidden");

answerPage.classList.remove("hidden");

answerContainer.innerHTML="";

/* Bonus Hardness Level feedback, shown first */

let diffDiv=document.createElement("div");

diffDiv.className="answerItem";

diffDiv.innerHTML=`

<h3>Bonus. Hardness Level</h3>

<p><b>Your Answer :</b> ${(hardnessAnswer!==null) ? hardnessOptions[hardnessAnswer] : "Not Answered"}</p>

<p class="explanation">This bonus question carries no marks.</p>

`;

answerContainer.appendChild(diffDiv);

questions.forEach(function(q,index){

let userAnswer="Not Answered";

if(answers[index]!==null){

let opt=q.options[answers[index]];

userAnswer=(typeof opt==="string") ? opt : opt.text;

}

let correctOpt=q.options[q.answer];

let correctText=(typeof correctOpt==="string") ? correctOpt : correctOpt.text;

let questionImageHtml = q.image
? `<img src="${q.image}" alt="Question Image" class="questionImage">`
: "";

let div=document.createElement("div");

div.className="answerItem";

div.innerHTML=`

<h3>Q${index+1}. ${q.question}</h3>

${questionImageHtml}

<p><b>Your Answer :</b> ${userAnswer}</p>

<p class="correctAnswer">
<b>Correct Answer :</b> ${correctText}
</p>

<p class="explanation">
<b>Explanation :</b>
${q.explanation}
</p>

`;

answerContainer.appendChild(div);

});

};


/*==================================================
      RESTART BUTTON - Using common function
==================================================*/

restartBtn.onclick=function(){

if(confirm("Restart Quiz?")){

restartQuiz();

}

};


/*==================================================
BACK TO RESULT
==================================================*/

const backResultBtn=document.getElementById("backResultBtn");
const restartFromAnswerBtn=document.getElementById("restartFromAnswerBtn");

backResultBtn.onclick=function(){

answerPage.classList.add("hidden");

resultPage.classList.remove("hidden");

};


/*==================================================
RESTART FROM ANSWER PAGE - Using common function
==================================================*/

restartFromAnswerBtn.onclick=function(){

if(confirm("Restart Quiz?")){

restartQuiz();

}

};


/*==================================================
WINDOW REFRESH WARNING
==================================================*/

window.onbeforeunload=function(){

if(!quizPage.classList.contains("hidden") && !submitted){

return "Quiz is running. Are you sure you want to leave?";

}

};


/*==================================================
END OF SCRIPT
==================================================*/

console.log("CSE'23 Quiz Challenge Loaded Successfully");