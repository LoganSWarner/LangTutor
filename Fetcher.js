/* 
 * @author Logan Warner
 */

"use strict";

function Fetcher(imageHandlerIn){
  this.imageReq = new XMLHttpRequest();
  this.langReqs = [];
  this.imageHandler = imageHandlerIn;
  this.handledList = [];
  
  this.fetch = function(languageChoiceHandlerIn){
    //Store stuff ahead of time to not keep calling getById
    var translations = getById("translations");
    var transString = getById("transString").value;
    var imageArea = getById("imageArea");
    //clear translations, list of handled translations, and reset image cycle
    translations.innerHTML = "";
    for(var i=0; i<this.handledList.length; i++){
      this.handledList[i] = false;
    }
    imageArea.innerHTML = "";
    //only actually fetch translations if they put something in the textbox
    if(transString !== ""){
      this.sendImageRequest(transString);
      this.sendLanguagesRequest(transString, languageChoiceHandlerIn.numTranslations);
    }else{
      //clear image if they didn't put anything
      imageArea.innerHTML = "";
    }
    return false;
  };
  
  this.sendImageRequest = function(transStringIn){
    var query = 'bing_search_proxy.php?&service=Image&query=' 
     + encodeURIComponent(transStringIn);
    var ourself = this;
    this.sendRequest(query, this.imageReq, function(){ourself.handleImageResponse();});
  };

  
  this.sendLanguagesRequest = function(transStringIn, numTranslationsIn){
    var translationsArea = getById("translations");
    for(var i = 0; i < numTranslationsIn; i++){
	    this.langReqs[i] = new XMLHttpRequest();
	    //make room in the HTML for the translations
      var curTranslation = document.createElement("p");
      curTranslation.id = "translation" + i;
      //Silly JS
	    translationsArea.insertBefore(curTranslation, null);
      var languageAbbreviation = getById("languageSelector" + i).value;
      this.sendLanguageRequest(transStringIn, this.langReqs[i], languageAbbreviation, numTranslationsIn);
	  }
  };
  
  this.sendLanguageRequest = function(transStringIn, reqObjectIn, 
   languageAbbreviationIn, numTranslationsIn){
    var query = 'bing_translate_proxy.php?text=' + 
     encodeURIComponent(transStringIn) + '&to=' + 
	   encodeURIComponent(languageAbbreviationIn) +
     '&from=en';
    var ourself = this;
    this.sendRequest(query, reqObjectIn, function(){ourself.handleTranslationResponse(numTranslationsIn);});
  };
  
  this.sendRequest = function(queryIn, reqObjectIn, handlerFunctionIn){
    //Only fire when ready
    if(reqObjectIn.readyState === 4 || reqObjectIn.readyState === 0){
	    reqObjectIn.open("GET", queryIn, true);
	    reqObjectIn.onreadystatechange = handlerFunctionIn;
	    reqObjectIn.send(null); 
	  }
  };
  
  //Handle a response for an image request
  this.handleImageResponse = function(){
    if(this.imageReq.readyState === 4 && this.imageReq.status === 200){
      var imageResults = JSON.parse(this.imageReq.responseText).d;
      var imageArea = getById("imageArea");
      this.imageHandler.processImages(imageResults.results);
      imageArea.setAttribute("style", "text-align:center");
    }
  };
  
  this.handleTranslationResponse = function(numTranslationsIn){
    for(var i = 0; i < numTranslationsIn; i++){
	      if(this.langReqs[i].readyState === 4 && this.langReqs[i].status === 200
         && !(this.handledList[i])){
          this.handledList[i] = true;
	    	  var results= JSON.parse(this.langReqs[i].responseText);
          var curSelector = getById("languageSelector" + i);
	    	  getById("translation" + i).innerHTML = "<p><b>" +
            curSelector.options[curSelector.selectedIndex].text + "</b>: " +
	    		  results.d.results[0].Text + "</p>";
	      }
    	}
  };
}
