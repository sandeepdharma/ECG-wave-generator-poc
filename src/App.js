// import { Upload } from "antd";
import "./App.css";
function App() {
  let imageURL;

  function submitHandler() {
    // console.log("click");
    const fileInput = document.getElementById("fileInput");
    // console.log(fileInput.files);
    const image = fileInput.files[0];
    // Multipart file
    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("size", "auto");
    const apiKey = "VeNSvD4RXMKdwDhsLc8mjA4Z";
    fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
    })
      .then(function (reponse) {
        return reponse.blob();
      })
      .then(function (blob) {
        console.log(blob);
        const url = URL.createObjectURL(blob);
        imageURL = url;
        const img = document.createElement("img");
        img.src = url;
        document.body.appendChild(img);
      })
      .catch();
  }

  function downloadFile() {
    var anchorElement = document.createElement("a"); //<a></a>
    anchorElement.href = imageURL;
    anchorElement.download = "naciasv.png";
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    console.log("img downloaded");
  }
  return (
    <div className="container mt-4">
      <div className="row mt-4">
        <div className="col-md-12 card mt-4">
          <form>
            <div className="form-group">
              <label htmlFor="fileInput">Select a File: </label>
              <input id="fileInput" className="form-control" type="file" />
            </div>
            {/* <Upload onChange={() => submitHandler()} listType="picture-circle">
              Upload
            </Upload> */}
            <input
              className="btn btn-primary m-1"
              type="button"
              onClick={() => submitHandler()}
              value="Upload"
            />
          </form>

          <button className="btn btn-warning" onClick={() => downloadFile()}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
