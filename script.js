document.getElementById("saveBtn").addEventListener("click", saveText);

//Tool box
document.getElementById("boldBtn").addEventListener("click", boldText);
document.getElementById("italicBtn").addEventListener("click", italicText);
document.getElementById("underlineBtn").addEventListener("click", underlineText);
document.getElementById("increaseFontBtn").addEventListener("click", increaseFont);




document.addEventListener("DOMContentLoaded", function() {
    pageOnLoad();
  });

let textAreaElement = document.getElementById("textArea");

//textArea
let textValue;
let currentKey;
let objListTextDoc = [];
let today;
let objFavoriteList = [];

function saveText(){
    today = new Date();
    let singleObject = {};
    textValue = document.getElementById("textArea").innerHTML;
    console.log(textValue);
    singleObject['id'] = objListTextDoc.length; 
    /* singleObject['name'] = name; */
    singleObject['text'] = textValue;
    singleObject['time'] = today;
    objListTextDoc.push(singleObject);  //push single object to objectList

    console.log(objListTextDoc[1]);

    fetchLocalStorageLastKey();  //check local storage is browser support..if support fetch the last key



    saveTextToLocalStorage(singleObject);
}

function saveTextToLocalStorage(singleObject){
    if(currentKey !=0){
        console.log("Single object: "+singleObject);
        localStorage.setItem(currentKey,JSON.stringify(singleObject));
        document.getElementById("textArea").innerHTML = "";
        addPageToSavedList();  //Add the saved text to saved list and display in leftSide
    }else{
        console.log("Browser not supporting local storage or error")
    }
    
    
}

function fetchLocalStorageLastKey(){
    //check browser support
    if(typeof(Storage) !== "undefined"){
        currentKey = localStorage.length + 1;
        console.log("Current key: "+currentKey);
    }

}

function addPageToSavedList() {

    let div = document.createElement('div');
    div.id = currentKey;
    div.innerHTML = textValue;
    div.className = 'divTag';
    div.addEventListener("click", function(){onClickDiv(event,this)},true);

    //Add a checkbox to mark as favorite
    let checkBox = document.createElement('input')
    checkBox.type = 'checkbox';
    checkBox.style.height = "20px";
    checkBox.style.width = "20px";
    checkBox.addEventListener( 'change', onChangeCheckBox(event,this));
    div.appendChild(checkBox);


    let leftCanvas = document.getElementById("leftCanvas");
    leftCanvas.appendChild(div);
}



//Read localStorage and display in left panel
function pageOnLoad(){

    let div;
    let leftCanvas = document.getElementById("leftCanvas");
    let p;
    let h1;

    for(let i=1; i <= localStorage.length;i++){
        console.log("Item: "+i+"is"+ localStorage[i]);

        div = document.createElement('div');
        div.id = i;
        //div.innerText = JSON.parse(localStorage.getItem(i)).time;
        div.className = 'divTag';

        p = document.createElement('p');
        p.innerHTML = JSON.parse(localStorage.getItem(i)).time; 
        div.appendChild(p);

        h1 = document.createElement('h1');
        h1.innerHTML = JSON.parse(localStorage.getItem(i)).text; 
        div.appendChild(h1);
        /* console.log(JSON.parse(localStorage.getItem(i)).time);
        console.log(JSON.parse(localStorage.getItem(i))); */

        div.addEventListener("click", function(){onClickDiv(event,this)},true);

        leftCanvas.appendChild(div);



        
    }


}

function onClickDiv(event){

    //para = event.target.parentNode;   //get the div that clicked 
   /*  textAreaElement.style.fontWeight = "900";
    textAreaElement.style.fontFamily = "Impact,Charcoal,sans-serif";
    textAreaElement.style.fontSize= "2em"; */
    textAreaElement.innerHTML = event.target.innerHTML;
}

function onChangeCheckBox(event){
    //alert("Changed")
    //Save to favorite list
    objFavoriteList.push(event.target.id);
    console.log("Favorite List: "+objFavoriteList)

}


//*********************TEXT MODIFY FUNCTIONS***************************** */
function boldText(){
    document.execCommand('bold');
}
function italicText(){
    document.execCommand('italic');
}
function underlineText(){
    document.execCommand('underline')
}
function increaseFont(){
    document.execCommand('increaseFontSize')
}

//****************************END TEXT MODIFY*********************** */