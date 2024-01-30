import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", async () => {
    const user = document.getElementById("username").value.toUpperCase();
    const password = document.getElementById("password").value;
    // console.log("user: " + user);
 
    // fetch the record with the matching username
    const url = `http://localhost:3003/user/login`;
    try {
        const response = await fetch(url, { method: "POST", mode: "cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user, password }) });
        if (response.status === 200) {
            window.location.href = "http://localhost:3003/index.html";
        } else {
            const errorMsg = document.getElementById("errorMsg");
            errorMsg.textContent = "Username or password is incorrect";
        }
    } catch (err) {
        console.log(err);
    }
}
);

