const API = "http://localhost:8000/data";

const res = document.querySelector(".res");
const inpAddUrl = document.querySelector(".inpUrl");
const inpAddName = document.querySelector(".inpName");
const inpAddSur = document.querySelector(".inpSur");
const inpAddNumb = document.querySelector(".inpNumb");
const inpAddEmg = document.querySelector(".inpEmg");
const btnSave = document.querySelector(".btn-primary");
const btnClose = document.querySelector(".btn-secondary");
const form = document.querySelector("form");

let newData = {};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  newData = {
    image: inpAddUrl.value,
    name: inpAddName.value,
    surName: inpAddSur.value,
    numb: inpAddNumb.value,
    email: inpAddEmg.value,
  };

  addData(newData);
});

async function addData() {
  if (
    !newData.image.trim() ||
    !newData.name.trim() ||
    !newData.surName.trim() ||
    !newData.numb.trim() ||
    !newData.email.trim()
  ) {
    alert("fill input");
    return;
  }
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  } catch (error) {
    console.log(error);
  }
  newData.image = "";
  newData.name = "";
  newData.surName = "";
  newData.email = "";
  newData.numb = "";
  inpAddUrl.value = "";
  inpAddName.value = "";
  inpAddSur.value = "";
  inpAddNumb.value = "";
  inpAddEmg.value = "";
  // newData.url = "";
  // newData.Name = "";
  // newData.Surname = "";
  // newData.Number = "";
  // newData.email = "";
  getData();
}
// console.log(newData, "obj");

btnSave.addEventListener("click", addData);

async function getData() {
  try {
    let res = await fetch(`${API}?q=${searchValue}`);
    let data = await res.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
}

function render(data) {
  res.innerHTML = "";
  data.forEach((item) => {
    res.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img src=${item.image} class="card-img-top" alt="error">
  <div class="card-body">
    <h4 class="card-title">${item.name}</h4>
    <h4 class="card-title">${item.surName}</h4>
    <h6 class="card-title">${item.numb}</h6>
    <h5 class="card-title">${item.email}</h5>
    <button class='btn-delete' onclick="deleteData(${item.id})">delete</button>
    </div>
  </div>
`;
  });
}

getData();

async function deleteData(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.log(error);
  }
  getData();
}

const searchInp = document.querySelector(".search");
searchInp.addEventListener("input", (e) => {
  searchValue = e.target.value;
  getData();
});
