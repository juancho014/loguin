
const form= document.querySelector('.login2');

form.addEventListener('submit',(e)=>{
  e.preventDefault();

  const formData=new FormData(form);
  const body= Object.fromEntries(formData);
  const stringJson = JSON.stringify(body);

  console.log(stringJson);

  fetch('http://localhost:3000/signup',{
    method:'POST',
    body:stringJson,
    headers:{
        'Content-Type':'application/json'
    }
  }).then((res)=>{if(res.ok){
    alert( 'bienvenido' );
    
    form.reset();
  }else{
    alert('hubo un error al ingresar un dato')
    form.reset()
  }
}).catch(err=>console.log(err))
    
});