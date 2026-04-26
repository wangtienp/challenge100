import './style.css'
import { dragDrop } from './drag'
import ConvertApi from 'convertapi-js';
import {saveAs} from 'file-saver'
import JSZip, { file } from 'jszip'

const authentication = "Reh3VNKh6nqwtFYAAP2Qen9n9vjJFYY0"

document.querySelector("#app").innerHTML = `
 
  <div class="drop-zone">
        <input type="file" class="upload-converter" multiple 
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
        <p class='error-message'></p>
  </div>
  <div class="button-zone">
      <button class ="convert-button">Convert <span class="loading"></span</button>
  </div>
`
// let dropFiles = dragDrop(document.querySelector(".drop-zone"))
const dropZone = document.querySelector(".drop-zone")
const upload = document.querySelector(".upload-converter")
const convertButton = document.querySelector(".convert-button")
const errorText = document.querySelector(".error-message")
const loading = document.querySelector(".loading")
dragDrop(dropZone, upload, errorText)

upload.addEventListener("change", (e) => {
  let files = e.target.files
  // console.log(files)
  const dataTransfer = new DataTransfer()
  for (let i = 0; i < files.length; i++) {
    // console.log(files[i])
    const file = files[i]
    const fileExt = file.name.slice(file.name.lastIndexOf("."))
    // console.log("file extension ", fileExt)
    if (fileExt == ".doc" || fileExt == ".docx") {
      dataTransfer.items.add(file)
    } else {
      errorText.textContent = "Only docx or doc files are allowed"
    }
  }
  // console.log("data transfer ", dataTransfer)
  upload.files = dataTransfer.files
})

convertButton.addEventListener('click', convertDocx2PDF)
async function convertDocx2PDF() {
  if (upload.files.length > 5) {
    errorText.textContent = "Cannot be more than 5 files"
    return
  }
  // let convertApi = ConvertAPIModule.ConvertApi.auth(authentication)
  let convertApi = ConvertApi.auth(authentication)
  let results =[]
  // params.add('File',upload.files[0])
  // console.log("upload files body", upload.files[0])
  try {
    errorText.textContent = ''
    startLoading()
    for (let i = 0; i < upload.files.length; i++) {
      let fileParams = convertApi.createParams()
      fileParams.add('File', upload.files[i]);
      console.log('upload file ', upload.files[i])
      let result = await convertApi.convert('docx', 'pdf', fileParams)
      results.push(result.dto.Files[0])
      console.log(result)
    }
    downloadFile(results)
    // finish loading
    finishLoading()
  } catch (error) {
    console.log(error)
    const validationMessage = error?.InvalidParameters?.File?.[0];

    errorText.textContent = validationMessage || error.message || "something unexpected has happened"
    // finish loading even got error
    finishLoading()
    // errorText.textContent = error.InvalidParameters.File[0]
  }
}
function startLoading() {
  loading.style.setProperty("--display", 'grid')
  convertButton.disabled = true;
  convertButton.style.cursor = 'not-allowed'
}
function finishLoading() {
  loading.style.setProperty("--display", 'none')
  convertButton.disabled = false;
  convertButton.style.cursor = "pointer"
}

async function downloadFile(results){
  upload.value = ''
  if(results.length<2){
    const fileName = results[0].FileName
    const fileURL = results[0].Url
    saveAs(fileURL,fileName)
  }else{
    const zip = new JSZip()
    for(const result of results){
      const res = await fetch(result.Url)
      const blob = await res.blob()
      zip.file(result.FileName, blob)
    }
    
    zip.generateAsync({type:'blob'}).then((content)=>{
      saveAs(content , 'ConvertedFiles.zip')
    })
  }
}