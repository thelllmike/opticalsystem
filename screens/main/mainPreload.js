// Import necessary modules
const { contextBridge, ipcRenderer } = require("electron");
const globals = require("../../globals");
const Frames = require("../../models/Frame"); // Assuming this is the correct class name

// Create an instance of the Frames class using URI and DB_NAME from globals
const frames = new Frames(globals.URI, globals.DB_NAME);

// Define callback functions
let gotFrameCallback;
let gotFrameUpdatedCallback;
let gotDeletedResultCallback;

// Function to get frames from the database and call the registered callback
let getFrames = () => {
  console.log(`mainPreload > getFrames`);

  frames.getFrames().then((res) => {
    gotFrameCallback(res);

  });
};

// Function to set the callback for receiving frames data
let gotFrame = (callback) => {
  gotFrameCallback = callback;
};

// Function to save a frame to the database
let saveFrame = (frame) => {
  console.log(
    `mainPreload > Frame: ${frame.frame}, Brand: ${frame.brand}, Model: ${frame.model}, Size: ${frame.size}`
  );
  return frames.addFrame(frame);
  
};

// Function to delete a frame from the database and call the registered callback
let deleteFrame = (id) => {
  console.log(`mainPreload > Delete : ${id}`);

  frames.deleteFrame(id).then((res) => {
    gotDeletedResultCallback(res);
 
  });
};

// Function to set the callback for receiving the result of a deleted frame
let gotDeletedResult = (callback) => {
  gotDeletedResultCallback = callback;
};

// Function to update a frame in the database and call the registered callback
let updateFrame = (id, frm) => {
  console.log(`mainPreload > updateFrame : ${id}`);

  const frame = {
    frame: frm.frame,
    brand: frm.brand,
    model: frm.model,
    size: frm.size,
  };

  frames.updateFrame(id, frame).then((res) => {
    gotFrameUpdatedCallback(res);

  });
};

// Function to set the callback for receiving the result of an updated frame
let gotFrameUpdatedResult = (callback) => {
  gotFrameUpdatedCallback = callback;
};

// Expose functions to the renderer process through contextBridge
contextBridge.exposeInMainWorld("api", {
  getFrames,
  gotFrame,
  saveFrame,
  updateFrame,
  gotFrameUpdatedResult,
  gotDeletedResult,
  deleteFrame,
});
