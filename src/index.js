document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#table-body");
    const form = document.querySelector("#dog-form");
    let dogs = [];
  
    // Fetch all dogs and render them in a table row
    function fetchDogs() {
      fetch("http://localhost:3000/dogs")
        .then((response) => response.json())
        .then((data) => {
          dogs = data;
          renderDogs();
        })
        .catch((error) => console.error(error));
    }
  
    function renderDogs() {
      tableBody.innerHTML = "";
      dogs.forEach((dog) => {
        const tr = document.createElement("tr");
        tr.dataset.id = dog.id;
        tr.innerHTML = `
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button>Edit</button></td>
        `;
        tableBody.appendChild(tr);
      });
    }
  
    // Populate the form with the selected dog's information
    function populateForm(dog) {
      form.dataset.id = dog.id;
      form.name.value = dog.name;
      form.breed.value = dog.breed;
      form.sex.value = dog.sex;
    }
  
    // Update the dog information on form submit
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const id = form.dataset.id;
      const name = form.name.value;
      const breed = form.breed.value;
      const sex = form.sex.value;
  
      fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, breed, sex }),
      })
        .then(() => {
          form.reset();
          fetchDogs();
        })
        .catch((error) => console.error(error));
    });
  
    // Edit a dog's information
    tableBody.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        const tr = event.target.closest("tr");
        const id = tr.dataset.id;
        const dog = dogs.find((dog) => dog.id === parseInt(id));
        populateForm(dog);
      }
    });
  
    // Fetch dogs on page load
    fetchDogs();
  });
  