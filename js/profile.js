import axios from "./axios";

export async function getAccaountData() {
    const config = {
        headers: { authorization: `${JSON.parse(localStorage.getItem("token"))}` }
    };
    console.log(config);
   try {
        const response = await axios.get(
            "/users",
            config
            );
            return response
    } catch (error) {
        throw new Error(error);
    }
  }


export function displayAccaountData(data) { 
  let {user} = data;
  let {firstName, lastName, phone, image, email,} = user;
  const imgUrl = image?.url ? image.url : DEFAULT_IMG;
  const profilWrapper = document.querySelector('.profile-about-content');
  let html = "";
    html += `
    <div class="profil-info-left pe-3">
              <img
                src="${imgUrl}"
                alt=""
              />
              <p class="fair-text mt-1">Oltin kitobxon</p>
              <p class="mt-1">186 ta kitob o'qigan</p>
            </div>
            <div class="profile-info-right pt-5">
              <h2 class="fair-text">${firstName} ${lastName}</h2>
              <p>Tavallud: <span class="text-muted">February 08, 1999</span></p>
              <p>Manzili: <span class="text-muted">Jizzax</span></p>
              <p>
                Bio:
                <span class="text-muted">Graphic designer and Developer</span>
              </p>
            </div> `;
 
    profilWrapper.innerHTML = html;
}