// меню
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Меню')
      .addItem('Информация об исполнителе','displayArtistData')
      .addToUi();
}
 
// функции для вызова iTunes API 
function calliTunesAPI(artist) {
  
  // вызов iTunes API
  var response = UrlFetchApp.fetch("https://itunes.apple.com/search?term=" + artist + "&limit=200");
  
  // просмотр json файла
  var json = response.getContentText();
  return JSON.parse(json);
  
}
 
//вызов данных
function displayArtistData() {
  
  // поиск
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  var artist = sheet.getRange(1,2).getValue();
  
  var tracks = calliTunesAPI(artist);
  
  var results = tracks["results"];

  // Вывести JSON полученный от API:

  // Browser.msgBox(
  //   'Running Experimental API Test',
  //   'Data:'+JSON.stringify(results,null,'  '),
  //   Browser.Buttons.OK
  // );
  
  var output = []
  
  results.forEach(function(elem,i) {
    
    
    output.push([elem["artistName"],elem["collectionName"],elem["trackName"]]);
    sheet.setRowHeight(i+5,65);
  });
  
  
  var len = results.length;
  
  // чистка предыдущей информации
  sheet.getRange(5,1,500,3).clearContent();
  
  // вставить значения
  sheet.getRange(5,1,len,3).setValues(output);
  
  // форматирование
  sheet.getRange(5,1,500,3).setVerticalAlignment("middle");
  sheet.getRange(5,5,500,1).setHorizontalAlignment("center");
  sheet.getRange(5,2,len,2).setWrap(true);
}
