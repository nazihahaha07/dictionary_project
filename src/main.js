const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')
var btnUpdate = document.getElementById('btnUpdate');

let pathName = path.join(__dirname, 'Files')

btnCreate.addEventListener('click', function(){ //creating text file when user click CREATE button
    let file = path.join(pathName, fileName.value + '.txt')
    let contents = fileContents.value
    fs.writeFile(file, contents, function(err){ //param1: textfile yg kita nak write param2: apa yg kita nak write ke text file
        if(err){
            return console.log(err)
        }
        var txtfile = document.getElementById("fileName").value
        alert(txtfile + " text file was created") 
        console.log("The file was created")
    })
})

btnRead.addEventListener('click', function(){ //read contents of the created text file
    let file = path.join(pathName, fileName.value + '.txt')

    fs.readFile(file, function(err, data){ 
        if(err){
            return console.log(err)
        }
        fileContents.value = data
        console.log("The file was read!")
        alert("File read successfully")
    })
})

btnDelete.addEventListener('click', function(){ 
    let file = path.join(pathName, fileName.value + '.txt')

    fs.unlink(file, function(err){ 
        if(err){
            return console.log(err)
        }
        fileName.value = ""
        fileContents.value = ""
        console.log("The file was deleted!")
        alert("File " + file + " has been deleted")
    })
})            

btnUpdate.addEventListener('click', function(){ 
    let file = path.join(pathName, fileName.value + '.txt');
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err){ 
        if(err){
            return console.log(err);
        }
        var txtfile = document.getElementById("fileName").value
        alert(txtfile + " text file was updated") 
        console.log("The file was updated!");
        fileName.value = ""
        fileContents.value = ""
    });
});