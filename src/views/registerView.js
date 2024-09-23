import { html, render, page } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";
import * as userService from "../data/user.js"


const temp = (handler) => html`
<!-- Register Page (Only for Guest users) -->
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit=${handler}class="login-form">
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`

export function showRegisterView() {
    render(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
    if (!data.email || !data.password || data.password !== data['re-password']) {
        return alert('All fields are required!')
    }

    await userService.register(data.email, data.password);
    updateNav();
    page.redirect('/')
}