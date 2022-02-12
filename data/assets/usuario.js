 //Elementos globales
 chequearSesion();

 var myModalEl = document.getElementById('exampleModal')
 var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
   keyboard: false
 })
 var listUsers;
 const user             = document.querySelector('#txt-usuario');
 const email            = document.querySelector('#txt-email');
 const rol              = document.querySelector('#rol-user');
 const password         = document.querySelector('#txt-password');
 const confirmPassword  = document.querySelector('#txt-confirm-password');
 const userId           = document.querySelector('#user-id');
 const modalTitle       = document.querySelector('#modal-title');
 const btnForm          = document.querySelector('.btn-form');

 const cargarUsuarios = () => {
   fetch('/user')
     .then(response => response.json())
     .then(data => {     
       listUsers = data;        

       let filas = ''
       data.forEach((e, index) => {            
         filas += `
           <tr>
             <td>${ index += 1 }</td>
             <td>${ e.usuario }</td>
             <td>${ e.email }</td>
             <td>${ e.rol }</td>
             <td>
               <button class="btn btn-primary btn-sm btn-action" 
                 onclick="editarUsuario('${e.id}','${e.usuario}', '${e.email}', '${e.rol}')">
                 Editar
               </button>
               <button class="btn btn-danger btn-sm btn-action" 
                 onclick="eliminarUsuario('${e.id}')">
                 Eliminar
               </button>
             </td>
           </tr>`});   
           
       document.querySelector(".tr-users").innerHTML = filas

     })
 }

 const editarUsuario = ( ...usuario ) => {
   myModal.show();
   sessionStorage.setItem('statusForm', "edit");
   modalTitle.innerHTML = "Editar Usuario";
   btnForm.innerHTML = "Editar";
   password.required = false;
   confirmPassword.required = false;

   userId.value = usuario[0];
   user.value   = usuario[1];
   email.value  = usuario[2];
   rol.value    = usuario[3];
 }
 
 const limpiarFormulario = () => {
   user.value            = ''
   email.value           = ''
   password.value        = ''
   confirmPassword.value = ''
 }
 
 myModalEl.addEventListener('hidden.bs.modal', function (event) {
   limpiarFormulario();
 })

 const eliminarUsuario = async (id) => {      
   const result = listUsers.filter(usuario => usuario.id != id);

   const data  = await fetch('/user', {
       method: "DELETE",    
       body: JSON.stringify(result),
       headers: {
         "Content-type": "application/json"
       }                
     }).then(r => r.text());

     if(data == 'ok'){
       Toast.fire({
           icon: 'success',
           title: 'Usuario Eliminado'
       })
       cargarUsuarios();          
     }
 }
 
 document.addEventListener("DOMContentLoaded", function() {
  
   const crearUsuario = async () => {

     if(password.value !== confirmPassword.value){
         return alert("Las contraseñas no son iguales")
     }       

     listUsers.unshift({
       id: uuid.v4(),
       email: email.value,
       password: btoa(password.value),
       usuario: user.value,
       rol: rol.value
     });

     const data  = await fetch("/user", {
       method: "POST",
       body: JSON.stringify(listUsers),
       headers: {
         "Content-type": "application/json"
       }
     }).then(r => r.text());

     if(data == 'ok'){
       myModal.hide();
       cargarUsuarios();
       Toast.fire({
           icon: 'success',
           title: 'Usuario Creado'
       })
     }
   }

   const editarUsuario = async () => {

     let updatePassword = false;
     if(password.value.length > 0){
       if(password.value !== confirmPassword.value){
           return alert("Las contraseñas no son iguales");
       }
       updatePassword = true;
     }

     const indice = listUsers.findIndex(x => x.id === userId.value);
     listUsers[indice].email   = email.value;
     listUsers[indice].usuario = user.value;
     if(updatePassword) listUsers[indice].password = btoa(password.value);
     listUsers[indice].rol     = rol.value;

     const data  = await fetch("/user", {
       method: "PUT",
       body: JSON.stringify(listUsers),
       headers: {
         "Content-type": "application/json"
       }
     }).then(r => r.text());

     if(data == 'ok'){
       myModal.hide();
       cargarUsuarios();
       Toast.fire({
           icon: 'success',
           title: 'Usuario Editado'
       })
     }
   }
   
   cargarUsuarios();     

   document.querySelector('.btn-crear').addEventListener('click', () => {  
     sessionStorage.setItem('statusForm', "create");        
     modalTitle.innerHTML = "Crear Usuario";
     btnForm.innerHTML = "Crear";
     password.required = true;
     confirmPassword.required = true;
     myModal.show();
   })        
     
   document.querySelector("#formCrearUsuario").addEventListener("submit", (e) => {
       e.preventDefault();          

       const status = sessionStorage.getItem('statusForm')

       if(status == 'create'){
         crearUsuario();
       }else{
         editarUsuario();
       }
         
     })
 });      