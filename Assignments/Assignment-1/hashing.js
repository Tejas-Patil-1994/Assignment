var fs = require('fs');
fs.open('input.txt', 'r', (error, fileToRead) => { // open file
    fs.readFile(fileToRead, { encoding: 'utf-8' }, function (err, data) { // read file
        if (!err) {
            hashing(data);
        } else {
            console.log(err);
        }
    });
}, error => {
    console.log('error1' + error);
})

function hashing(fileArray) {
    let arrayList = [];
    let hashList = [];
    let input = process.argv[process.argv.length - 1]; // read user input
    arrayList = fileArray.split('\n'); // split the file content
    let data = arrayList.map(element => Math.floor((((element.charCodeAt() * 400) / 959) % arrayList.length)));  // add hasing logic
    for (let index = 0; index < data.length; index++) { // store them in hashList 
        if (!hashList[data[index]]) {
            hashList[data[index]] = [];
        }
        hashList[data[index]].push(arrayList[index]);
    }
    let value = Math.floor(((((input).charCodeAt() * 400) / 959) % arrayList.length));
    if (hashList[value] && (hashList[value].findIndex(item => item == input) > -1)) {
        console.log('found');
    }
    else {
        console.log('Not found');
    }
}