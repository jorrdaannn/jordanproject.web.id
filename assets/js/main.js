// main.js - handles form validation and UI interactions for the contact form
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('regForm');
  if(!form) return;

  const show = (id, showFlag) => {
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.toggle('hidden', !showFlag);
  };

  form.addEventListener('submit', function(e){
    e.preventDefault();
    // get values
    const fullname = document.getElementById('fullname').value.trim();
    const nim = document.getElementById('nim').value.trim();
    const email = document.getElementById('email').value.trim();
    const faculty = document.getElementById('faculty').value;
    const dob = document.getElementById('dob').value;
    const genderEls = document.getElementsByName('gender');
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();

    let gender = '';
    for(const g of genderEls) if(g.checked) gender = g.value;

    // validations
    let ok = true;
    if(!fullname){ show('err-fullname', true); ok=false; } else show('err-fullname', false);
    if(!nim){ show('err-nim', true); ok=false; } else show('err-nim', false);
    if(!email || !/^\S+@\S+\.\S+$/.test(email)){ show('err-email', true); ok=false; } else show('err-email', false);
    if(!faculty){ show('err-faculty', true); ok=false; } else show('err-faculty', false);
    if(!dob){ show('err-dob', true); ok=false; } else show('err-dob', false);
    if(!gender){ show('err-gender', true); ok=false; } else show('err-gender', false);
    if(!address){ show('err-address', true); ok=false; } else show('err-address', false);
    if(!/^\d{10,}$/.test(phone)){ show('err-phone', true); ok=false; } else show('err-phone', false);

    if(!ok){
      // focus first invalid
      const firstErr = document.querySelector('.text-red-600:not(.hidden)');
      if(firstErr){
        const input = firstErr.previousElementSibling;
        if(input && typeof input.focus === 'function') input.focus();
      }
      return;
    }

    // success
    const formMsg = document.getElementById('formMsg');
    formMsg.classList.remove('hidden');
    form.reset();

    // hide message after 4s
    setTimeout(()=> formMsg.classList.add('hidden'), 4000);
  });

  // highlight inputs on focus with Tailwind classes already present; add a little JS visual tweak
  document.querySelectorAll('input,textarea,select').forEach(el=>{
    el.addEventListener('focus', ()=> el.classList.add('ring','ring-green-200'));
    el.addEventListener('blur', ()=> el.classList.remove('ring','ring-green-200'));
  });
});
