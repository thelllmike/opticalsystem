window.addEventListener("load", () => {
  
    const btnSave = document.getElementById("btnSave");
    btnSave.addEventListener("click", btnSaveClick);

    // Get button
    const btnGet = document.getElementById("btnGet");
    btnGet.addEventListener("click", btnGetClick);

    // Callbacks
    window.api.gotFrame(gotFrame);
    window.api.gotFrameUpdatedResult(gotFrameUpdatedResult);
    window.api.gotDeletedResult(gotDeletedResult);
  
});


let frameData = {};

const gotFrame = (frames) => {
  frameData = frames;

  console.log("view gotFrame");

  var frmData = frames
    .map((frame) => {
      var res = `<tr>
      <td>${frame.frame}</td>
      <td>${frame.brand}</td>
      <td>${frame.model}</td>
      <td>${frame.size}</td>
      <td><input type="button" onclick="Delete('${frame.id}')" value="Delete" /></td>
      <td><input type="button" onclick="Edit('${frame.id}')" value="Edit Employee" /></td>
    </tr>`;

      return res;
    })
    .join("");

  var tbData = document.getElementById("tbFrames");
  tbData.innerHTML = frmData;
};

const btnGetClick = (event) => {
  console.log("Get button clicked");
  event.preventDefault();

  window.api.getFrames();
};

const btnSaveClick = (event) => {
  console.log("Save button clicked");
  event.preventDefault();

  const frame = document.getElementById("frame").value;
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const size = document.getElementById("size").value;
  const frmId = document.getElementById("frmId").value;

  console.log(
    `frame: ${frame}, brand: ${brand}, model: ${model},size: ${size}, frmId: ${frmId}`
  );

  if (frmId == "") {
    window.api.saveFrame({ frame, brand, model ,size }).then(() => {
      alert("Record saved");
    });
  } else {
    window.api.updateFrame(frmId, { frame, brand, model ,size  });
    alert("Record updated");
  }
};

const gotDeletedResult = (result) => {
  if (result) {
    alert("Record deleted");
  }
};

function Delete(frmId) {
  console.log(`mainView > Delete : ${frmId}`);
  window.api.deleteFrame(frmId);
}

function Edit(frmId) {
  const frm = frameData.find((frame) => frame.id === frmId);

  const inputId = document.getElementById("frmId");
  const frame = document.getElementById("frame");
  const brand = document.getElementById("brand");
  const model = document.getElementById("model");
  const size = document.getElementById("size");

  inputId.value = frmId;
  frame.value = frm.frame;
  brand.value = frm.brand;
  model.value = frm.model;
  size.value = frm.size;
}

const gotFrameUpdatedResult = (result) => {
  if (result) window.api.getFrames();
};
