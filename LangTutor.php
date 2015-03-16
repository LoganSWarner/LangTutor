<!doctype html>

<!-- 
  Author: Logan Warner
  URL: http://104.131.16.42/Warner_LangTutor/LangTutor.php
  Description: Uses bing search and translation APIs to get the first page
    of image results and translations (for selected languages) for the given 
    search term using AJAX with JSON.
 -->
<head>
  <title>Logan's Language Tutor</title>
  <script>
    function getLanguageOptionsList(){
      var jsonString = <?php
        $myFile = \fopen("LanguageOptions.json", "r");      
        echo "'".\preg_replace('~[\r\n]+~', '', \fread($myFile, \filesize("LanguageOptions.json")))."'";
      ?>;
      return JSON.parse(jsonString).List;
    }
  </script>
  <script
    src="ImageHandler.js">
  </script>
  <script
    src="OptionsHandler.js">
  </script>
  <script
    src="Fetcher.js">
  </script>
  <script
    src="LangTutor.js">
  </script>
</head>
<body>
  <table>
    <tr height="450">
      <td id="inputArea" height="250" valign="top">
        <b>English:</b>
        <form id="go">
	        <input type="text" id="transString"/>
	        <input type="submit" id="goButton" value="Go"/>
        </form>
        <form id="languageSelectionArea">
          <!-- Javascript fills in the rest -->
        </form>
        
      </td>
      <td id="imageArea" width="800" height="450" valign="top">
      </td>
      <td id=translations valign="top">
      </td>
    </tr>
  </table>
</body>
