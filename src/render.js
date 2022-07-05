

    const btn = document.getElementById('btn')
    const cpuCurrentSpeed = document.getElementById('cpuCurrentSpeed')
   
    document.querySelector('#btn').addEventListener('click',()=>{
       
    let output = [];
        let checke = document.querySelectorAll('input[name="inlineRadioOptions"]:checked');
checke.forEach((v)=>{
    output.push(v.value)


})







        
         if(output.length == 0){
           
            
            alert('check the checkbox')
           
          }else{
            window.fil.upl(output)
          }
    

 
  

});




let upload =document.querySelector('#upload');
let download =document.querySelector('#download');
let runn_comp = document.querySelector('#runn_comp');
 let slash = document.querySelector('#slash');
 let time = document.querySelector('#time');

let prog = document.querySelector('#prog');



function pro(v){
 
     upload.textContent = v;
   
    if(upload.textContent !== download.textContent){

        runn_comp.innerHTML=`<div class="d-grid justify-content-center"><h3 class="text-warning bg-secondery">Running Converter</h3>
        
        <h4 class="text-info">The better the CPU,The faster the conversion</h4>
        </div>`
time.classList.remove("d-none")

    }  

    prog.innerHTML = `<progress style="width:100%" class="progress-bar progress-bar-striped" value="0" max=${v}></progress>`;
    btn.className = "d-none"
}
lena.uplo('uploada',(value)=>{

pro(value)
   
  
   
    
})


lena.down('downloada',(value)=>{

    dow(value)

   
   
})

function dow(v){
    
    download.textContent = v;

    if(slash.className.match(/d-none/)){
       
        slash.classList.remove('d-none')
    }
   
  
    let aac = document.querySelector('progress')
aac.value = v;
aac.style.width = v;
    if(upload.textContent === download.textContent){

        runn_comp.textContent="compleate";
timeClear.time()

    }  


}



    

 function aaa(){
    c.cpu().then(v=>{
        cpuCurrentSpeed.textContent =`CPU-Speed : ${v.currentLoad.toFixed(2)}%`;
    })
 }


 setInterval(aaa, 1500);

 let s = document.querySelector('#s')
    let m = document.querySelector('#m')
    let h= document.querySelector('#h')
    let seconed = 0
    let minute = 0
    let houre = 0
  timeset.timeS('timeset',value=>{
  console.log(value)
   
  


    seconed+=value

  
   s.textContent = seconed;
m.textContent = minute;
h.textContent = houre;
 
   if(seconed === 60){
    seconed = 0;
    minute +=1
       }else if(minute === 60){
        minute = 0
        houre +=1
       }
  
 })
 
 function checkConnection() {
  
    if(navigator.onLine) {
      document.getElementById('online').innerText = ' ';
    } else {
      btn.className ='d-none'
      document.getElementById('online').innerHTML = `<div class="text-light bg-danger px-2 py-1">Please check your internet connection and try-restart</div>` ;
    }
  
}

checkConnection()