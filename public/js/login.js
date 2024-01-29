import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();


const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", async () => {
    const user = document.getElementById("username").value.toUpperCase();
    const password = document.getElementById("password").value;
    // console.log("user: " + user);

    // Get request to see if user exists and password is correct
    const response = await fetch(`/user/login`);
    // const data = await response.json();
    console.log(response);

    // If user exists and password is correct, redirect to home page
    if (data.length > 0) {
        window.location.href = "/index.html";
    } else {
        alert("Invalid username or password");
        
    }
}
);

