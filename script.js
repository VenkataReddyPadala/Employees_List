const form = document.querySelector("form");
const profession = document.querySelector("#profession");
const userName = document.querySelector("#name");
const age = document.querySelector("#age");
const msg = document.querySelector(".msg");
const row = document.querySelector(".row");
const emptyEmp = document.querySelector("#emptyEmp");

let inputError = false;
let empData = [];
function resetForm() {
  userName.value = "";
  age.value = "";
  profession.value = "";
}

function failedMsg() {
  msg.textContent =
    "Error :Please Make sure All the field before adding in an emplyee";
  if (msg.classList.contains("success")) msg.classList.remove("success");
  msg.className += " error";
}
function successMsg() {
  if (inputError === false && empData.length > 0) {
    msg.textContent = "Success : Message Added";
    if (msg.classList.contains("error")) msg.classList.remove("error");
    msg.className += " success";
    emptyEmp.style.display = "none";
  } else {
    msg.style.display = "none";
  }
  resetForm();
}

function deleteEmp(id) {
  empData = empData.filter((emp) => emp.id !== id);
  updateEmpData();
}

function updateEmpData() {
  if (empData.length > 0) emptyEmp.style.display = "none";
  else emptyEmp.style.display = "block";
  row.innerHTML = empData
    .map((emp, ind) => {
      return `
    <div class="employees">
          <div class="empdata">
            <p>${ind + 1}.</p>
            <p>Name:${emp.Name}</p>
            <p>Profession:${emp.Profession}</p>
            <p>Age:${emp.Age}</p>
          </div>
          <button id="deleteUser" onclick="deleteEmp('${
            emp.id
          }')">Delete User</button>
        </div>`;
    })
    .join("");
  successMsg();
}

function formSubmit(e) {
  e.preventDefault();
  if (
    userName.value.trim() === "" ||
    age.value.trim() === "" ||
    profession.value.trim() === ""
  ) {
    inputError = true;
  } else {
    inputError = false;
    let newEmp = {
      id: crypto.randomUUID(),
      Name: userName.value.trim(),
      Profession: profession.value.trim(),
      Age: parseInt(age.value.trim()),
    };
    empData.push(newEmp);
    updateEmpData();
  }
  if (inputError) {
    failedMsg();
  } else {
    successMsg();
  }
}

form.addEventListener("submit", formSubmit);
