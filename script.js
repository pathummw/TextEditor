document.getElementById("saveBtn").addEventListener("click", saveText);
document.addEventListener("DOMContentLoaded", function() {
    pageOnLoad();
  });


//textArea
let textValue;
let currentKey;

function saveText(){
    textValue = document.getElementById("textArea").value;
    console.log(textValue);
    fetchLocalStorageLastKey();  //check local storage is browser support..if support fetch the last key
    saveTextToLocalStorage();
}

function saveTextToLocalStorage(){
    if(currentKey !=0){
        localStorage.setItem(currentKey,textValue);
        document.getElementById("textArea").value = "";
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
   
    /* document.body.appendChild(div); */


    /* let divTag = document.createElement('div');
    divTag.id = currentKey;
    divTag.style.display = 'inline-block';
    divTag.className = 'divTag';
    

    divTag.innerHTML = 'Hi there!'; */


    /* let p = document.createElement("p");  //created new p element
            p.style.backgroundColor = "#7bed9f";
            p.style.padding = '0.25em 0.5em';
            p.style.borderRadius = '1em';

            p.

    divTag.appendChild(p); */

    let leftCanvas = document.getElementById("leftCanvas");
    leftCanvas.appendChild(div);
}



//Read localStorage and display in left panel
function pageOnLoad(){

    let div;
    let leftCanvas = document.getElementById("leftCanvas");

    for(let i in localStorage){
        console.log("Item: "+i+"is"+ localStorage[i]);

        div = document.createElement('div');
        div.id = i;
        div.innerHTML = i;
        div.className = 'divTag';
        leftCanvas.appendChild(div);
    }
    /* let div = document.createElement('div');
    div.id = currentKey;
    div.innerHTML = textValue;
    div.className = 'divTag'; */

    
    

}