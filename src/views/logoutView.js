import * as userService from "../data/user.js";
import { page } from "../lib.js";
import { updateNav } from "../util.js";

export async function showLogoutView() {
    await userService.logout()
    updateNav()
    page.redirect('/')
}