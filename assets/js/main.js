// API key
const API_KEY = "/lsbbchjdH/xlhJQrxBlhg==LFqRnEqoNckyoY5n";

// once the quote box is checked, the hobbies box is going to be false
document.getElementById("quotes-box").addEventListener("change", function () {
    if (this.checked) {
        document.getElementById("hobbies-box").checked = false;
    }
});
// once the hobbies box is checked, the quotes box is going to be false
document.getElementById("hobbies-box").addEventListener("change", function () {
    if (this.checked) {
        document.getElementById("quotes-box").checked = false;
    }
});

// Fetch data from the API
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "X-Api-Key": API_KEY,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unknown error occurred.");
        }

        const data = await response.json();
        console.log("API Response:", data); //debug
        return data;
    } catch (error) {
        showError(error.message);
        return null; //return null to stop process
    }
}

//make the API call
document.getElementById("get-response").addEventListener("click", async function () {
    const quotesChecked = document.getElementById("quotes-box").checked;
    const hobbiesChecked = document.getElementById("hobbies-box").checked;
    const userInput = document.getElementById("user-input").value.trim();

    if (!quotesChecked && !hobbiesChecked) {
        showError("Please select Quotes or Hobbies.");
        return;
    }

    clearError();
    clearResponse();

    let apiUrl = "";
    if (quotesChecked) {
        apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${encodeURIComponent(userInput)}`;
    } else if (hobbiesChecked) {
        apiUrl = `https://api.api-ninjas.com/v1/hobbies?category=${encodeURIComponent(userInput)}`;
    }

    const data = await fetchData(apiUrl);
    if (data) {
        displayResponse(data, quotesChecked ? "quotes" : "hobbies");
    }
});

// display API response
function displayResponse(data, type) {
    const responseDiv = document.getElementById("response");
    responseDiv.style.display = "block";

    if (type === "quotes") {
        if (Array.isArray(data)) {
            const quotesHtml = data
                .map(
                    (quote) =>
                        `<p><strong>${quote.quote}</strong> - ${quote.author}</p>`
                )
                .join("");
            responseDiv.innerHTML = quotesHtml || "No quotes found.";
        } else {
            responseDiv.innerHTML = "Unexpected data format for quotes.";
        }
    } else if (type === "hobbies") {

        console.log("Hobbies API Data Structure:", data); // debug

        if (data && typeof data === "object") {
            const hobbyHtml = `
                <p><strong>Hobby:</strong> ${data.hobby}</p>
                <p><strong>Category:</strong> ${data.category}</p>
                <p><strong>Learn more:</strong> <a href="${data.link}" target="_blank">${data.link}</a></p>
            `;
            responseDiv.innerHTML = hobbyHtml;
        } else {
            responseDiv.innerHTML = "Unexpected data format for hobbies.";
        }
    }
}

//display the errors...
function showError(message) {
    const errorDiv = document.getElementById("error");
    errorDiv.style.display = "block";
    errorDiv.textContent = message;
}

//clear the prior errors
function clearError() {
    const errorDiv = document.getElementById("error");
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
}

//clear the previous response
function clearResponse() {
    const responseDiv = document.getElementById("response");
    responseDiv.style.display = "none";
    responseDiv.innerHTML = "";
}

//The code below has been added to clear the user input whenever a different checkbox is clicked, so that
//the user can input a new word.
// once the quote box is checked, the hobbies box is going to be false
document.getElementById("quotes-box").addEventListener("change", function () {
    if (this.checked) {
        document.getElementById("hobbies-box").checked = false;
        document.getElementById("user-input").value = ""; // This line cleans th category input
    }
});
// once the hobbies box is checked, the quotes box is going to be false
document.getElementById("hobbies-box").addEventListener("change", function () {
    if (this.checked) {
        document.getElementById("quotes-box").checked = false;
        document.getElementById("user-input").value = ""; // This line cleans the category input
    }
});
