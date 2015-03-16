/* 
 * @author Logan Warner
 * Object to hold image-related stuff
 */

"use strict";

function ImageHandler(){
  //Array of strings, each of which contains an image URL and a size
  //separated by a space
  this.imageDescriptions = [];
  //Track which image in the list is in use; set to -1 so we can just always increment
  this.imageIndex = -1;
  
  this.processImages = function(results){
    //Clear so old results aren't kept around
    this.imageDescriptions = [];
    var numImages = results.length;
    if((typeof results[0]) !== "undefined"){
      var imageArea = getById("imageArea");
      for(var i = 0; i < numImages; i++){
        this.imageDescriptions[i] = results[i].MediaUrl + 
         this.getCorrectedImageSize(results[i], imageArea.offsetWidth, imageArea.offsetHeight);
      }
      cycleImage();
    }else{
      getById("imageArea").innerHTML = '<b>No images found!<br/>Check that' +
       ' the word exists.</b>';
    }
  };
  
  this.getCorrectedImageSize = function(image, maxWidth, maxHeight){
    var heightDesired = image.Height;
    var widthDesired = image.Width;
    var correctedHeightOut;
    var correctedWidthOut;
    if(heightDesired > maxHeight || widthDesired > maxWidth){
      var tooBigRatio = (widthDesired/maxWidth)/(heightDesired/maxHeight);
      if(tooBigRatio > 1){//width is the main problem
        var scaleFactor = widthDesired/maxWidth;
        correctedHeightOut = heightDesired/scaleFactor;
        correctedWidthOut = maxWidth;
      }else{//height is the main problem
        var scaleFactor = heightDesired/maxHeight;
        correctedHeightOut = maxHeight;
        correctedWidthOut = widthDesired/scaleFactor;
      }
    }else{//Neither is a problem
      correctedHeightOut = heightDesired;
      correctedWidthOut = widthDesired;
    }
    return '" height="' + correctedHeightOut + '" width="' + correctedWidthOut + '"';
  };

  //Determine next image for image area cyclically
  this.getNextImageIndex = function(){
    this.imageIndex++;
    if(this.imageIndex === this.imageDescriptions.length || 
     this.imageIndex === 10){
      this.imageIndex = 0;
    }
    return this.imageIndex;
  };
}