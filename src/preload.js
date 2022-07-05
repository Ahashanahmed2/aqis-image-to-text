// const { contextBridge, ipcRenderer } = require('electron')

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('fil', {
    upl: (output) => ipcRenderer.send('upload',output)//click button
})

contextBridge.exposeInMainWorld('checkbox', {
  non: () => ipcRenderer.send('checkbox')//checkbox
})

  
  contextBridge.exposeInMainWorld('lena',{
    
     uplo:(uploada,callback)=>ipcRenderer.on(uploada,(event,value)=>{
    
    callback(value)


     }),
    down:(downloada,callback)=>ipcRenderer.on(downloada,(event,value)=>{
    
      callback(value)
  
  
       }),
    


     
       
         
     
  })

contextBridge.exposeInMainWorld('c',{
  cpu:(value)=>ipcRenderer.invoke('cpu',value)
})



contextBridge.exposeInMainWorld("timeset",{
  timeS:(timeset,callback)=>ipcRenderer.on(timeset,(event,value)=>{
 callback(value)

 
  })
})


contextBridge.exposeInMainWorld("timeClear",{
  time:()=>ipcRenderer.send('clear'),
})

