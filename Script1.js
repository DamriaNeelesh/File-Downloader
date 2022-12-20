
const fileInput = document.querySelector("input");
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault(); /*Taaki form submit na ho jae bina submit hue downloading wala kaam ho aje*/
    downloadBtn.innerText = "Downloading File...."; //Chaning the button text to "Downloading file.." during the downloading
    fetchFile(fileInput.value);
});

function fetchFile(url) {
/*Fetching file and return response as BLOB taaki bahut sara data store kr sakein 
 * BLOB - Binary Large OBject */
    fetch(url).then(res => res.blob()).then(file => {
        /* URL.createObjectUrl creates a url of passed object */
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a"); // <a> tag banaya
/* Link URL ko <a> tag ke andr daal diya*/
        aTag.href = tempUrl; /* passing tempUrl as href value of <a> tag*/
        /* passing filename as download value of <a> tag */
/*Same as <a href = https://www.xyz.com-URL*/
        // aTag.download = "filename";  
        aTag.download = url.replace(/^.*[\\\/]/, '') // Passing file last name as download value of <a> tag
        document.body.appendChild(aTag); //Adding <a> tag inside the body
        aTag.click(); // Clicking <a> tag so the file download
        aTag.remove(); // removing <a> tag once the file is downloaded
        URL.revokeObjectURL(tempUrl); // Removing tempURL from the document
        downloadBtn.innerText = "Download File";
    }).catch(() => {
        // catch method will call if any error comes during downloading
        downloadBtn.innerText = "Download File";
        alert("Failed to download file")
    })
}
