// Front-end JavaScript

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");
const freeTry_element = document.getElementById("freeTry");
const remove_element = document.getElementById("form_input_data");

let loadInterval;

function loader(element) {
    element.textContent = "";
    loadInterval = setInterval(() => {
        element.textContent += ".";
        if (element.textContent === "....") {
            element.textContent = "";
        }
    }, 300);
}

function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index); // Fixed typo here
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
}

function generateUniqueID() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueID) {
    return `
        <div class="wrapper ${isAi ? "ai" : ""}">
            <div class="chat">
                <div class="profile">
                    <img src="${isAi ? "assets/bot.svg" : "assets/user.svg"}" alt="${isAi ? "bot" : "user"}" />
                </div>
                <div class="message" id="${uniqueID}">${value}</div>
            </div>
        </div>
    `;
}

export const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
    form.reset();
    const uniqueID = generateUniqueID();
    chatContainer.innerHTML += chatStripe(true, "", uniqueID);
    const messageDiv = document.getElementById(uniqueID);

    loader(messageDiv);

    const response = await fetch("http://localhost:4000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: data.get("prompt"),
        }),
    });

    clearInterval(loadInterval);
    messageDiv.innerHTML = "";

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();
        typeText(messageDiv, parsedData);
    }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e);
    }
});
