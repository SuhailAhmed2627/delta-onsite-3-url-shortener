const toggleCustomURLDOM = document.getElementById("toggle-custom-url");
const customURLFieldDOM = document.getElementById("custom-url-field");
const urlInputDOM = document.getElementById("url");
const shortUrlInputDOM = document.getElementById("short-url");
const messageDOM = document.getElementById("message");

const toggleCustomURL = () => {
   if (toggleCustomURLDOM.innerText == "Add Custom URL") {
      customURLFieldDOM.style.display = "flex";
      toggleCustomURLDOM.innerText = "Remove Custom URL";
   } else {
      customURLFieldDOM.style.display = "none";
      toggleCustomURLDOM.innerText = "Add Custom URL";
   }
};

const handleResponse = (data) => {
   if (!data.includes("http")) {
      data = JSON.parse(data);
   }
   if (!data.message) {
      messageDOM.innerText = `URL Created: ${data}`;
      urlInputDOM.value = "";
   } else {
      messageDOM.innerText = data.message;
   }
   shortUrlInputDOM.value = "";
};

const createURL = () => {
   const request = {
      url: urlInputDOM.value,
      shortenedUrl: shortUrlInputDOM.value,
   };
   fetch("http://localhost:3000/url/create", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
   })
      .then((response) => {
         return response.text();
      })
      .then((data) => handleResponse(data));
};
