export function dragDrop(dropZone, upload, errorText) {
    let file
    dropZone.addEventListener('dragenter', (e) => {
        e.preventDefault()
        dropZone.classList.add('dragging')
    })
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropZone.classList.add('dragging')
    })
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault()
        dropZone.classList.remove('dragging')
        console.log("dragleave")
    })
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault()
        dropZone.classList.remove('dragging')
        const dt = e.dataTransfer
        file = dt.files
        // console.log(files)
        // console.log(123)
        // handleDropFiles(upload, files)
        handleDropFiles(file, upload,errorText)
    })
    // return file
}
function handleDropFiles(files, upload,errorText) {

    const dataTransfer = new DataTransfer()
    for (let i = 0; i < files.length; i++) {
        // console.log(files[i])
        const file = files[i]
        const fileExt = file.name.slice(file.name.lastIndexOf("."))
        console.log("file extension ", fileExt)
        if (fileExt == ".doc" || fileExt == ".docx") {
            dataTransfer.items.add(file)
        } else {
            errorText.textContent = "Only docx or doc files are allowed"
        }
    }
    console.log("data transfer ", dataTransfer)
    upload.files = dataTransfer.files
    // topdf.convert()
    console.log('handle', files)
    console.log('uploaded file', upload.files)

}
// function handleDropFiles(upload, files){
//     upload.files = files
//     // topdf.convert()
//     console.log('uploaded file',upload.files)
//     console.log('handle',files)
// }