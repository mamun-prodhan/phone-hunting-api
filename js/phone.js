const loadPhone = async (phone, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // first 12
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
      alt="phoneImage"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button onclick = "handleshowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>    
    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleSpinner(false);
};

// handleSearch click handler
const handleSearch = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById("input-field");
  const searchValue = searchField.value;
  // searchField.value = "";
  loadPhone(searchValue, isShowAll);
};

// toggle spinner funciton
const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// show all card function
function handleShowAll() {
  handleSearch(true);
}

// show details button onclick function
function handleshowDetails(id) {
  phoneLoad(id);
}
// load data based on id
const phoneLoad = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const singlePhone = data.data;
  console.log(singlePhone);
  displayModal(singlePhone);
};
// function for display data
function displayModal(singlePhone) {
  my_modal_5.showModal();
  const modalInfo = document.getElementById("modal-info");
  modalInfo.innerHTML = `
    <img class="w-[50%] mx-auto" src="${singlePhone.image}" alt="">
    <h2 class="text-4xl text-center my-4">${singlePhone.name}</h2>
    <p class= "text-center">${singlePhone.mainFeatures.storage}</p>
  `;
}
loadPhone("iphone");
