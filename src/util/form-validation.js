const formValidation = () => {
  const inputContainers = document.querySelectorAll(".input-container");
  const form = document.querySelector(".form");
  const userName = document.querySelector("#form__username");
  const cardNum = document.querySelector("#form__usercard-num");
  const cvcInput = document.querySelector(".cvc-input");
  const mmInput = document.querySelector(".exp-mm-input");
  const yyInput = document.querySelector(".exp-yy-input");

  mmInput.addEventListener("input", validateExpDate);
  yyInput.addEventListener("input", validateExpDate);

  //card labels
  const cardBackCVC = document.querySelector(".header__img-back-label");
  const cardNameInput = document.querySelector(".header__card-name");

  inputContainers.forEach((input) => {
    if (!input.classList.contains("error")) {
      input.removeAttribute("data-error");
    }
  });

  //prevent form submission
  form.addEventListener("submit", (e) => {
    if (userName.value === "" && cvcInput.value.length < 3) {
      e.preventDefault();
    }

    inputContainers.forEach((input) => {
      if (input.classList.contains("error")) {
        e.preventDefault();
        input.dataset.error = input.dataset.error;
      }
    });
  });

  //check username input
  userName.addEventListener("input", (e) => {
    const parentDiv = e.target.closest("div");
    userName.style.textTransform = "capitalize";

    //if username contains numbers or other special characters
    if (/[\d@#$%^*&+--=`,|.~!(\\)/]/.test(userName.value)) {
      parentDiv.classList.add("error");
      parentDiv.dataset.error = "Sorry, names can only be alphabets";
    } else if (userName.value === "") {
      parentDiv.classList.add("error");
      parentDiv.dataset.error = "Can't be blank";
    } else {
      parentDiv.classList.remove("error");
      parentDiv.removeAttribute("data-error");
      cardNameInput.textContent = userName.value;
    }
  });

  const cardNumberInput = document.querySelector("#form__usercard-num");
  const cardNumberSpans = document.querySelectorAll(
    ".header__card-label-container span"
  );

  // Listen for changes in the card number input field
  cardNumberInput.addEventListener("input", updateCardNumberLabels);

  function updateCardNumberLabels() {
    const cardNumber = this.value.trim().padEnd(16, "0"); // Pad the input with zeros to ensure it's 16 characters long
    for (let i = 0; i < 4; i++) {
      cardNumberSpans[i].textContent = cardNumber.substr(i * 4, 4);
    }
  }

  //check card number input
  cardNum.addEventListener("input", (e) => {
    const cardNumber = cardNum.value.replace(/\s/g, ""); //Remove any white space
    const parentDiv = e.target.closest("div");
    if (cardNumber.length === 16 && /^\d+$/.test(cardNumber)) {
      //Input contains only numbers
      parentDiv.classList.remove("error");
      parentDiv.removeAttribute("data-error");
    } else if (cardNumber.length < 16) {
      parentDiv.classList.add("error");
      parentDiv.dataset.error = "must be 16 characters long";
    } else if (cardNumber === "") {
      parentDiv.classList.add("error");
      parentDiv.dataset.error = "This field cannot be blank";
    } else {
      //Input contains non-numeric characters
      parentDiv.classList.add("error");
      parentDiv.dataset.error = "Wrong format, numbers only";
    }
  });

  function validateExpDate() {
    const parentDiv = document.querySelector(".form__card-exp-input");
    const mmValue = mmInput.value.trim();
    const yyValue = yyInput.value.trim();
    const currentYear = new Date().getFullYear();

    //card labels
    const expMonthInput = document.querySelector(".header__card-expiry-month");
    const expYearInput = document.querySelector(".header__card-expiry-year");

    if (mmValue === "" || yyValue === "") {
      parentDiv.classList.add("error");
      parentDiv.dataset.error = "Can't be blank";
    } else if (mmValue < 1 || mmValue > 12) {
      parentDiv.classList.add("error");
      parentDiv.dataset.error = "Invalid month";
    } else if (yyValue < currentYear % 100) {
      parentDiv.classList.add("error");
      parentDiv.dataset.error =
        "Invalid year, cannot be less than the current year.";
    } else {
      parentDiv.classList.remove("error");
      parentDiv.removeAttribute("data-error");
      expMonthInput.textContent = mmValue.padStart(2, "0");
      expYearInput.textContent = yyValue;
    }
  }

  //validate cvc input
  cvcInput.addEventListener("input", (e) => {
    const parentDiv = e.target.closest("div");

    if (cvcInput !== "" && cvcInput.value.length === 3) {
      parentDiv.classList.remove("error");
      parentDiv.removeAttribute("data-error");
      cardBackCVC.textContent = cvcInput.value;
    } else {
      parentDiv.classList.add("error");
      parentDiv.dataset.error = "Can't be blank";
      cardBackCVC.textContent = "";
    }
  });
};

export default formValidation;
