import configs from "../configs";
import { getBooks, displayBooks } from "./books";
import { signIn, signUp, signUpHandler, signInHandler } from "./auth";
import {getAccaountData,displayAccaountData} from "./profile";
const { BASE_URL } = configs;
import Swal from '../node_modules/sweetalert2/dist/sweetalert2';

window.addEventListener("popstate", (e) => {
  location.reload();
});
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
  }
  if (location.pathname === "/auth.html") {
    signInHandler();
    signUpHandler();
  }
  if (location.pathname === "/index.html" || location.pathname === "/") {
    getBooks().then((data) => {
      displayBooks(data);
    });
  }
  if (location.pathname === "/profile.html") {
   getAccaountData().then((data) => {
     console.log(data,'hello');
     displayAccaountData(data);
   })
  }
});
