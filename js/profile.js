import { createBook } from "./books";
import toast from "./toastify";
import axios from "./axios";
import configs from "../configs";
import moment from "moment";
import { countries } from "country-list-json";
const { DEFAULT_IMG } = configs;

export function getAvatar(data) {
  let { user } = data;
  let { image } = user;
  const imgUrl = image?.url ? image.url : DEFAULT_IMG;
  let img = document.querySelector(".profile-img");
  img.src = imgUrl;
}

export function displayCountries() {
  let countryList = document.querySelectorAll(".countries-list");
  let html = "";
  countries.forEach((country) => {
    html += `<option value="${country.name.toLocaleLowerCase().trim()}">${
      country.name
    }</option>`;
  });
  countryList.forEach((country) => {
    country.innerHTML = html;
  });
}

export function checkRole(localStorage) {
  let user = JSON.parse(localStorage.getItem("user"));
  let role = user.role;
  if (role === "reader") {
    let addbook = document.getElementById("addbook");
    let addbooktab = document.querySelector(".addbooktab");
    let mybook = document.getElementById("mybooks");
    let mybooktab = document.querySelector(".mybookstab");
    addbook.style.display = "none";
    addbooktab.style.display = "none";
    mybook.style.display = "none";
    mybooktab.style.display = "none";
  }
}

export function checkUser(localStorage) {
  let user = JSON.parse(localStorage.getItem("user"));
  let profileLogo = document.querySelector(".nav-auth");
  let linkAuth = document.querySelector(".link-auth");
  if ((user = null)) {
    profileLogo.style.display = "none";
    linkAuth.style.display = "block";
  }
}

export async function getAccaountData() {
  try {
    const res = await axios("/users");
    return res?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getShelfBooks() {
  try {
    const res = await axios("/users/shelf");
    return res?.data?.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMyBooks() {
  try {
    const res = await axios("/books/my-books");
    return res?.data?.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getBooksById(id) {
  try {
    const res = await axios(`/books/${id}`);
    return res?.data?.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function updateBook(id, data) {
  return axios.patch(`/books/${id}`, data);
}

export function deleteBookFromShelf(id) {
  return axios.delete(`/users/shelf/${id}`);
}

export function deleteBook(id) {
  return axios.delete(`/books/${id}`);
}

export function displayAccaountData(data) {
  let { user } = data;
  let { firstName, lastName, date_of_birth, phone, image, role, email } = user;
  const imgUrl = image?.url ? image.url : DEFAULT_IMG;
  const profilWrapper = document.querySelector(".profile-about-content");
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  let html = "";
  html += `
      <div class="profil-info-left pe-3">
                <img
                  src="${imgUrl}"
                  alt=""
                />
                <p class="mt-1">Sizning rolingiz</p>
                <p class="fair-text mt-1">${capitalizeFirstLetter(role)}</p>
              </div>
              <div class="profile-info-right pt-5">
                <h2 class="fair-text">${firstName} ${lastName}</h2>
                <p>Tavallud: <span class="text-muted">${moment(
                  date_of_birth
                ).format("ll")}</span></p>
                <p>Manzili: <span class="text-muted">Uzbekistan</span></p>
                <p>
                  Phone:
                  <span class="text-muted">${phone} </span>
                </p>
              </div> `;

  profilWrapper.innerHTML = html;
}

export function displayShelfBooks(data) {
  const homeBooksDom = document.querySelector(".profile-book-row");
  let contentDom = "";
  data?.shelf?.forEach((book = {}) => {
    const { title, author, comments, _id, imageLink, rate } = book;
    const { firstName, lastName } = author;
    const imgUrl = imageLink?.url ? imageLink.url : DEFAULT_IMG;
    contentDom += `
    <div class="card" data-id= ${_id}>
    <a href="book.html">
      <img src="${imgUrl}" alt="${title}" />
    </a>
    <div class="card-body pt-2">
      <a href="books.html" class="card-title">${title}</a>
      <div class="card-text pt-1">${firstName} ${lastName}</div>
    </div>
    <div class="card-footer pt-1">
      <i class="fa-solid fa-star"></i>
      ${rate} - ${comments?.length ? comments.length : "0"} ta fikrlar
    </div>
    <button class="remove-btn">Remove Book</button>
  </div>`;
  });
  homeBooksDom.innerHTML = contentDom;
}

export function displayMyBooks(data) {
  const homeBooksDom = document.querySelector(".profile-mybooks-row");
  let contentDom = "";
  data?.docs?.forEach((book) => {
    const { title, author, comments, _id, image, rate } = book;
    const { firstName, lastName } = author;
    const imgUrl = image?.url ? image.url : DEFAULT_IMG;
    contentDom += `
        <div class="card" data-id= ${_id}>
        <a href="book.html">
          <img src="${imgUrl}" alt="${title}" />
        </a>
        <div class="card-body pt-2">
          <a href="books.html" class="card-title">${title}</a>
          <div class="card-text pt-1">${firstName} ${lastName}</div>
        </div>
        <div class="card-footer pt-1">
          <i class="fa-solid fa-star"></i>
          ${rate} - ${comments?.length ? comments.length : "0"} ta fikrlar
        </div>
        <button class="delete-book-btn">Delete Book</button>
        <button class="update-btn">Update Book</button>
      </div>`;
  });
  let modalContent = `
  <div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <form class="form-updatebook row" action="">
      <div class="container-upload-img col-md-6">
        <img class="upload-bookimg" src="" alt="Book's image" />
        <label class="btn-lg" for="up-book-img">Upload cover</label>
        <input
          type="file"
          name="photo"
          id="up-book-img"
          onchange="previewFileUpBook()"
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
      <div class="container-form-updatebook col-md-6">
        <div>
          <h1 class="form-title pb-2">Update book</h1>
          <input
            class="mt-1"
            type="text"
            name="title"
            placeholder="Title"
          />
          <input
            class="mt-3"
            type="number"
            name="pages"
            placeholder="Pages"
          />
          <input
            class="mt-3"
            type="text"
            name="year"
            placeholder="Year"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
          />
          <input
            class="mt-3"
            type="number"
            name="price"
            placeholder="Price"
          />
          <select class="mt-3" name="category">
            <option class="text-muted category-option" value="">
              Category
            </option>
            <option value="classic">Classic</option>
            <option value="biography">Biography</option>
            <option value="science">Science</option>
          </select>
          <select class="mt-3 countries-list" name="country">
            <option class="country-item" value="">Country</option>
          </select>
          <input
            class="mt-3"
            type="text"
            name="language"
            placeholder="Language"
          />
          <textarea
            class="mt-3"
            name="description"
            id="description"
            placeholder="Description"
          ></textarea>
          <button class="mt-5 btn-sm updatebook-submit">Submit</button>
        </div>
      </div>
    </form>
  </div>
</div>
  `;
  homeBooksDom.innerHTML = modalContent + contentDom;
}
export const modalToggler = () => {
  let modal = document.getElementById("myModal");
  let btn = document.querySelectorAll(".update-btn");
  let span = document.getElementsByClassName("close")[0];
  btn.forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.parentElement.dataset.id;
      const { book } = await getBooksById(id);
      modal.style.display = "flex";
      modal.dataset.id = id;
      const { title, author, comments, _id, image, country, category, rate } =
        book;
      // const { firstName, lastName } = author;
      const imgUrl = image?.url ? image.url : DEFAULT_IMG;
      const form = document.querySelector(".form-updatebook");
      const inputsNodeList = form.querySelectorAll("[name]");
      console.log(book, "sbdhbshdbshbdhbs");
      inputsNodeList.forEach((input) => {
        const blackList = ["country", "category", "photo"];
        if (!blackList.includes(input.name)) {
          const value = book[input.name];
          input.value = value || "";
        } else {
          if (input.name == "photo") {
            const img = document.querySelector(".upload-bookimg");
            img.src = imgUrl;
          } else {
            const option = document.querySelector(
              `select[name="category"] > option[value="${category}"]`
            );
            const option1 = document.querySelector(
              `select[name="country"] > option[value="${country}"]`
            );
            console.log(option, option1, country);
            if (option && option1) {
              option.selected = true;
              option1.selected = true;
            }
          }
        }

        // console.log(input, "inputs njhdsjh", input?.name);
        // console.log(book?.book[input?.name], "book[input?.name]", input);
      });
    };
  });
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};
export function updateBookHandler() {
  const formUpdateBook = document.querySelector(".form-updatebook");
  let updateBtn = document.querySelectorAll(".update-btn");
  // updateBtn.forEach((btn) => {
  //   btn.addEventListener("click", async (e) => {
  //     getBooksById(bookId).then((book) => {});
  formUpdateBook.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const form = e.target;
      const bookId = form?.closest("[data-id]").dataset.id;
      console.log(form, "form", bookId);
      const data = {
        title: form.title.value.trim(),
        pages: form.pages.value.trim(),
        year: form.year.value.trim(),
        price: form.price.value.trim(),
        category: form.category.value.trim(),
        country: form.country.value.trim(),
        language: form.language.value.trim(),
        description: form.description.value.trim(),
      };
      for (const key in data) {
        if (!data[key]) {
          delete data[key];
        }
      }
      const formData = new FormData();
      formData.append(
        "oldImg",
        getBooksById(bookId).then((book) => book.imageLink)
      );
      const updateBookData = { ...data };
      if (form.photo.files[0]) {
        for (const file of form.photo.files) {
          formData.append("files", file);
        }
        const imageResponse = await fileUpload(formData);
        const { _id: image } = imageResponse?.data.payload[0];
        updateBookData.image = image;
      }
      const response = await updateBook(bookId, updateBookData);
      form.reset();
      toast({
        title: "Success",
        text: "Your information has updated successfully",
        type: "success",
        icon: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        text: error?.message,
        type: "error",
        icon: "error",
      });
    }
  });
  //   });
  // });
}

export function deleteBookFromShelfHandler() {
  let deleteBtn = document.querySelectorAll(".remove-btn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const bookId = e.target.parentElement.dataset.id;
      getBooksById(bookId).then((book) => {});

      deleteBookFromShelf(bookId)
        .then((response) => {
          toast({
            title: "Success",
            text: "Book has removed successfully",
            type: "success",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          toast({
            title: "Error",
            text: error?.response?.data,
            type: "error",
            icon: "error",
          });
        });
    });
  });
}

export function deleteBookHandler() {
  let deleteBtn = document.querySelectorAll(".delete-book-btn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const bookId = e.target.parentElement.dataset.id;
      deleteBook(bookId)
        .then((response) => {
          toast({
            title: "Success",
            text: "Book has deleted successfully",
            type: "success",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          toast({
            title: "Error",
            text: error?.response?.data,
            type: "error",
            icon: "error",
          });
        });
    });
  });
}

export function fileUpload(file) {
  return axios.post(`/files`, file, {
    headers: file.headers,
  });
}

export class ProfileUI {
  profileEvents() {
    const addBookForm = document.querySelector(".form-addbook");
    addBookForm.addEventListener("submit", this.addBook);
  }

  async addBook(e) {
    try {
      e.preventDefault();
      const form = e.target;
      const data = {
        title: form?.title?.value,
        description: form?.description?.value,
        country: form?.country?.value,
        language: form?.language?.value,
        link: form?.link?.value,
        pages: form?.pages?.value,
        year: form?.year?.value,
        rate: form?.rate?.value,
        price: form?.price?.value,
        category: form?.category?.value,
        isPublished: form?.isPublished?.value,
        isFeatured: form?.isFeatured?.value,
      };
      for (const key in data) {
        if (!data[key]) {
          delete data[key];
        }
      }
      for (const key in data) {
        if (typeof data[key] === "string") {
          data[key] = data[key].trim();
        }
      }

      const formData = new FormData();
      if (form.photo.files[0]) {
        for (const file of form.photo.files) {
          formData.append("files", file);
        }
        const fileResponse = await fileUpload(formData);
        const { _id: image } = fileResponse?.data.payload[0];
        data.image = image;
      }
      console.log(data, "sata from book");
      await createBook(data);
      toast({
        title: "Success",
        text: "Book added successfully",
        type: "success",
        icon: "success",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        text: err.response.data.error,
        type: "error",
        icon: "error",
      });
    }
  }
}
