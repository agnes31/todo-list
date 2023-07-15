window.addEventListener('DOMContentLoaded', function () {
    let elsForm = document.querySelectorAll('[data-js-form]');
   
    for(let i=0, l=elsForm.length; i< l; i++) {
      new Form(elsForm[i]);
    }
});
