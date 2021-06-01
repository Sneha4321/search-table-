
firebase.initializeApp(firebaseConfig);


  function SelectAllData(){
    var data = [];

    firebase.database().ref('student').on('value',
      function(AllRecords){
          AllRecords.forEach(
              function(CurrentRecord){
                var item = CurrentRecord.val();
                item.key = CurrentRecord.key;

                data.push(item);
                
              }
          )
          
          //Printing rollnumber and items
          data.forEach(function(item){
              console.log("RollNumber " + item.RollNo + " : ")
             
              const propertyNames = Object.values(item);  //Inorder to print in the form of array from objects
              console.log(propertyNames)
          })
          var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

           var table = document.createElement("table");
           table.className = "table table-striped"
           

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            for (var i = 0; i < data.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    var cellContent = data[i][col[j]];
                    if (cellContent === undefined) {
                        cellContent = ""
                    }
                    //gender td
                        // if the strings starts with "https://" then dom create hyperlink
                        if(cellContent.indexOf("https://")===0){
                            var a = document.createElement('a');
                            var linkText = document.createTextNode(cellContent);
                            a.appendChild(linkText);
                            a.title = cellContent;
                            a.href = cellContent;
                            a.target="_blank"
                            document.body.appendChild(a);
                            tabCell.append(a);
                        }else{
                                 tabCell.innerHTML = cellContent
                        }
                

                }
            }

            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);

      });

  }
  window.onload = SelectAllData;

  //-------------------Filling the table -----------------------------//

