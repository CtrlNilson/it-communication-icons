const displayItems = Array.from(document.getElementsByClassName("progress-slider"));
const percentageTracker = Array.from(document.getElementsByClassName("percent-display"));
const controllItems = Array.from(document.getElementsByClassName("controll-item"));
const colorControllItems = Array.from(document.getElementsByClassName("color-item"));

console.log(displayItems);
console.log(controllItems);
console.log(colorControllItems);



for (let i = 0; i < displayItems.length; i++) {
    displayItems[i].style.width = controllItems[i].value + "%";
    displayItems[i].style.backgroundColor = colorControllItems[i].value;  

    controllItems[i].addEventListener("input", () => {
        displayItems[i].style.width = controllItems[i].value + "%";  
        percentageTracker[i].innerHTML = Math.floor(controllItems[i].value) + "%";  
   });
   colorControllItems[i].addEventListener("input", () => {
        displayItems[i].style.backgroundColor = colorControllItems[i].value;  
   })
}


const exportButton = document.getElementById("export");
const iconContainer = Array.from(document.getElementsByClassName("icon-container"));

console.log(document.getElementById("walk").style);

exportButton.addEventListener("click", () => {
     iconContainer.forEach(element => {

          let p = new Promise(function(resolve, reject){
                    html2canvas(element).then(canvas => { 
                    console.log(canvas.style);                     
                    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");                 
                    console.log(image);
                    resolve(image);
               });
          });

          p.then ( function (result) {
               console.log(element.children[0]);
               downloadImage(result, element.children[0].id+".png");
          });
     });

});

async function downloadImage(src, downloadName){
     const response = await fetch(src);
     const blobImage = await response.blob();
     const href = URL.createObjectURL(blobImage);
     const anchorElement = document.createElement('a');

     anchorElement.href = href;
     anchorElement.download = downloadName;
   
     document.body.appendChild(anchorElement);
     anchorElement.click();
   
     document.body.removeChild(anchorElement);
     window.URL.revokeObjectURL(href);
}
  