/* 
 * @author Logan Warner
 */

"use strict";

function OptionsHandler(langSelectAreaIn, langListIn){
  this.langSelectArea = langSelectAreaIn;
  this.langList = langListIn;
  this.numTranslations = 0;

  //Add another translation option area
  this.addTranslation = function(){
    this.numTranslations++;
    var selector = document.createElement("select");
    selector.id = "languageSelector" + (this.numTranslations-1);
    for(var i = 0; i < this.langList.length; i++){
      var curOption = this.createOption(this.langList[i]);
      //insert at the end (JS is silly)
      selector.insertBefore(curOption, null);
    }
    var selectionParagraph = document.createElement("p");
    selectionParagraph.appendChild(selector);
    this.langSelectArea.appendChild(selectionParagraph);

    this.cleanupButtons();

    return false;
  };
  
  this.createOption = function(langDescriptionIn){
    var langName = langDescriptionIn.Name;
    var option = document.createElement("option");
    option.name = langName;
    option.setAttribute("value", langDescriptionIn.Abbreviation);
    option.innerHTML = langName;
    return option;
  };
  
  //Remove a translation option area
  this.removeTranslation = function(){
    this.numTranslations--;
    //In javascript, suicide is forbidden, but infanticide is the law of the land
    var lastLanguageSelector = getById("languageSelector" + this.numTranslations);
    this.langSelectArea.removeChild(lastLanguageSelector.parentNode);
    this.cleanupButtons(this.langSelectArea);
    return false;
  };
  
  this.cleanupButtons = function(){
    var addButton = getById("addButton");
    var delButton = getById("deleteButton");
    if(addButton){
      this.langSelectArea.removeChild(addButton);
    }
    if(delButton){
      this.langSelectArea.removeChild(delButton);
    }
    if(this.numTranslations < this.langList.length){
      this.makeAddButton(this.langSelectArea);
    }
    if(this.numTranslations > 1){
      this.makeRemoveButton(this.langSelectArea);
    }
  };
  
  this.makeAddButton = function(){
    var addButton = document.createElement("input");
    addButton.id = "addButton";
    addButton.setAttribute("value", "Add another language");
    addButton.setAttribute("type", "submit");
    this.langSelectArea.appendChild(addButton);
    var ourself = this;
    addButton.addEventListener("click", function(){ourself.addTranslation();});
  };

  this.makeRemoveButton = function(){
    var delButton = document.createElement("input");
    delButton.id = "deleteButton";
    delButton.setAttribute("type", "submit");
    delButton.setAttribute("value", "Delete last language");
    this.langSelectArea.appendChild(delButton);
    var ourself = this;
    delButton.addEventListener("click", function(){ourself.removeTranslation();});
  };
}