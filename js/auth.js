import axios from "./axios";
import Swal from '../node_modules/sweetalert2/dist/sweetalert2'
export function signUp(data) {
  return axios.post("/sign-up", data);
}
export function signIn(data) {
  return axios.post("/login", data);
}

export function signInHandler() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };
    signIn(data).then((response) => {
      console.log(response);
      if (response.success = true) {
        localStorage.setItem("token", response.data.token);
        history.pushState('', `/index.html`);
            location.reload();
      } 
      else  {
        Toast.fire({
          icon: 'error',
          title: `${ response.msg}`,
        })
      }

    })
  });
}

export function signUpHandler() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  document.forms[1].addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      firstName: form.firstname.value,
      lastName: form.lastname.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      role: form.role.value,
      date_of_birth:form.dateofbirth.value,
      date_od_death:form.dateofdeath.value,
    };
    signUp(data).then((response) => {
      if (response.data.success = true) {
        let token = JSON.stringify(response.data.token);
        localStorage.setItem("token", token);
        history.pushState('', `/index.html`);
      } else {
        Toast.fire({
          icon: 'error',
          title: `${ response.data.message}`,
        })
      }
    });
  });
}

export function signOut() {}
