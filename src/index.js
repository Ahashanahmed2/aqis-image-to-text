const { app, BrowserWindow, ipcMain,dialog} = require('electron');
const windowStateKeeper = require('electron-window-state');
const Tesseract = require("tesseract.js");
const isDev = require('electron-is-dev');
const path = require('path');
const si = require('systeminformation');

const fs = require('fs');

const { title } = require('process');







let mainWindow;




// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
   
    defaultWidth: 700,
    defaultHeight: 570,
  });
  // Create the browser window.
  mainWindow = new BrowserWindow({
    x:mainWindowState.x,
    y:mainWindowState.y,
    width:mainWindowState.width,
    height:mainWindowState.height,
    resizable:true,
   autoHideMenuBar: true ,
   title:"AQIS Image To Text Converter",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '/icon/note.png')
  });

  

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
 

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

 
  
// stuff



   mainWindowState.manage(mainWindow);
};







 
  



app.whenReady().then(() => {
 
  createWindow();

  
})
ipcMain.handle('cpu',async()=>{
  let usage = await si.currentLoad();
  return usage;
          })

        
         
const fileupload = (_,output) => {




  let len ='ara+ben';
if(output.length == 1){
len = output.toString()

}else{
 let l = output.toString()
let ll = l.replaceAll(',','+');
len = ll;

}
  dialog.showOpenDialog({
    properties: ['multiSelections', 'openFile'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] },

    ]

  }).then(result => {
    result.canceled && app.replace()
   
    dialog.showSaveDialog({
       properties: ['createDirectory'],
      defaultPath: path.join(__dirname, '/../../'),


    }).then(save => {
      save.canceled && app.replace()

      mainWindow.webContents.send('uploada',result.filePaths.length)
         

     let timeset=()=>{
      mainWindow.webContents.send('timeset',1)
      
     }



      let clear =  setInterval(timeset,1000);
      


      if (!fs.existsSync(path.join(`${save.filePath}`))) {
        fs.mkdir(path.join(`${save.filePath}`), err => {
         err && dialog.showErrorBox({title:'Error',content:`${err}`})
        })

      }
     

      imageToText()
      function imageToText() {
       
       let aa = result.filePaths[0].match(/([\w | \d | - | _]*\.\w{3,4}$)/i)
        let cc = ''
        aa.map(v => {

          cc = v.replace(/\.\w*$/i, '.text')

        })




        fs.readFile(path.join(result.filePaths[0]), (err, data) => {
          err &&  dialog.showErrorBox({title:'Error',content:`${err}`})
try{  Tesseract.recognize(data,len, {
  logger: (m) => {
    console.log(m);
  },
}).then(({ data: { text } }) => {


//এখানে ডাটা আসে .....
  fs.writeFile(
    `${path.join(`${save.filePath}`)}/${cc}`,
    text,
    { encoding: "utf8" },
    (err) => {
      if (err) {
        dialog.showErrorBox({title:'Error',content:`${err}`})
      }
    }
  );

//ipc main ........




  result.filePaths.shift()


  fs.readdir(path.join(save.filePath),(err,data)=>{
  err &&  dialog.showErrorBox({title:'Error ',content:`${err}`})
    mainWindow.webContents.send('downloada',data.length)
  })
  
  


  if (result.filePaths.length > 0) {


    imageToText()
  }

  ipcMain.on('clear',()=>{
    clearInterval(clear)
  }
    )
  


}).catch(err=>{
  dialog.showErrorBox({title:'Error : Pleace Internet connected',content:'internet need for this process'})
})}
catch{
dialog.showErrorBox({title:'error'})
}
        
        })

      }


    })





  })
  .catch(err=>alert({message:'please internet connect'}))

}



// Do something with webContents




ipcMain.on('upload',(_,output)=>fileupload(_,output))
fs.readdir(path.join(app.getAppPath()), (err, data) => {
  if (err) return console.log({ message: err });

  let vv = /\w*(.traineddata)/;
  data.map((v, i) => {
    let va = vv.test(v)
    if (va) {
      fs.unlink(v, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

  });

});






 

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
