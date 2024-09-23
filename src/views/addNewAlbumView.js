import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import * as dataService from "../data/data.js"


const temp = (handler) => html`
<!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form @submit=${handler} class="create-form">
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
        <input type="text" name="release" id="album-release" placeholder="Release date" />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`

export function showNewAlbumView() {
    render(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
    if (!data.singer || !data.album || !data.imageUrl || !data.release || !data.label || !data.sales) {
        return alert('All fields are required!')
    }

    await dataService.createAlbum(data)
    page.redirect('/dashboard')
}