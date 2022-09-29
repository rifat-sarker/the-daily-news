const getCategoryName = async (id) => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    try {
      const res = await fetch(url);
      const data = await res.json();
      displayAllCategory(data.data.news_category);
    } catch (err) {
      console.log(err);
    }
  };
  
  const displayAllCategory = (categories) => { 
    const categoryContainer = document.getElementById("category-container");
    categories.forEach((category) => {
      const { category_id, category_name } = category;
      const categoryDiv = document.createElement("div");
      categoryContainer.classList.add("d-flex","justify-content-lg-between", "mb-5","fs-5", "fw-semibold");
      categoryDiv.innerHTML = `
           <div class="category-container">
              <li class="nav-item mx-3 list-style">
                <a onclick="loadNewsByCategory('${category_id}')" class="nav-link active" aria-current="page" href="#">${category_name}</a>
              </li>
           </div>
           
           `;
      categoryContainer.appendChild(categoryDiv);
    });
  
  };
  
  const loadNewsByCategory = async (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      displayNewsCategory(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const displayNewsCategory = (users) => {
    toggleLoader(true);
  
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";
    const noData = document.getElementById("items-count");
    const number = users.length;
    noData.innerText = `${
      number <= 0 ? "No data found" : number+ "items Found"
    }`;
    for (const user of users) {
      console.log(user);
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.classList.add("mb-3");
      cardDiv.innerHTML = `
          
    <div class="row g-0 author-align" onclick="loadPost('${user._id}')" data-bs-toggle="modal" data-bs-target="#modal-container">
          <div class="col-md-4" >
            <img src="${user.thumbnail_url}" class="w-100 " >
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title mb-5">${
                user.title ? user.title : "tile not found"}
              </h3>
              <p class="card-text"><small class="text-muted">${user.details.slice(0,500)} 
              <a href="#">See More...</a></small></p>  
          <div class="container text-center">
            <div class="row">
              <div class="col-md-8 mt-5 d-flex">
                <img src="${user.author.img}" class="img-fluid author-custom h- rounded-circle" alt="...">
              <b class="card-title m-2">${
                user.author.name ? user.author.name : "Author name not found"}</b>
                <p class="m-2"><i class="fa-solid fa-eye"></i></p>
                <p class="card-text m-2"> ${user.total_view ? user.total_view : "No data ableable"} </p>
                   </div>
                  </div>
                </div>
               </div>
            </div>
              
              
              `;
  
      cardContainer.appendChild(cardDiv);
    }
    toggleLoader(false);
  };
  
  const loadPost = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${id}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      displayNewsModal(data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  
  const displayNewsModal = (news) => {
    const modalTitle = document.getElementById("modal-Title");
  
    modalTitle.innerText = `${news.title ? news.title : "title not found"}`;
    const modalBody = document.getElementById("modal-bdy");
    modalBody.innerHTML = `
      <img class="img-fluid" src="${news.image_url}" alt="">
        <p>${news.details ? news.details : "details not found"}</p>
      
        <div class="col-md-8  d-flex">
        <img src="${
          news.author.img
        }" class="img-fluid author-custom h- rounded-circle" alt="...">
      <b class="card-title m-4">${
          news.author.name ? news.author.name : "name found!"
        }</b>
      
        <p class="m-4"><i class="fa-solid fa-eye"></i></p>
      <p class="card-text m-4">${
        news.total_view ? news.total_view : "Rating not fund"
      }</p>
      
      </div>
  
  `;
  };
  
  const toggleLoader = (isLoading) => {
    const loaderContainer = document.getElementById("loader-container");
    if (isLoading) {
      loaderContainer.classList.remove("d-none");
    } else {
      loaderContainer.classList.add("d-none");
    }
  };
  
  loadNewsByCategory("01");
  getCategoryName();
  