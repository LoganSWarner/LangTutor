/**
 * @author Logan Warner
 * URL: http://104.131.16.42/LangTutor.html
 */

"use strict";

window.addEventListener("load", ready);

var imageHandler;
var optionsHandler;
var fetcher;
function ready(){
  var langList = getLanguageOptionsList();

  //Track number of translation option areas
  imageHandler = new ImageHandler();
  optionsHandler = new OptionsHandler(getById("languageSelectionArea"), langList);
  optionsHandler.addTranslation();
  
  fetcher = new Fetcher(imageHandler);
  getById("go").addEventListener("submit", function(event){event.preventDefault(),
   fetcher.fetch(optionsHandler);});
}

//Convenience function to reduce verbosity
function getById(idIn){
  return document.getElementById(idIn);
}

//For clicking on an image in the image area
//MUST BE GLOBAL to avoid infinite recursion problems involving firebug
function cycleImage(){
  var curImageIndex = imageHandler.getNextImageIndex();
  var imageArea = getById("imageArea");

  imageArea.innerHTML = 
    '<img src = "' + imageHandler.imageDescriptions[curImageIndex] + '"/>';
  imageArea.style = "\"text-align:center\"/";
  imageArea.addEventListener("click", cycleImage);
};