import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"
import { createSubmitHandler } from "../util.js";


const temp = (handler, album) => html`
<!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form @submit=${handler}class="edit-form">
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${album.singer}>
        <input type="text" name="album" id="album-album" placeholder="Album" .value=${album.album}>
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${album.imageUrl}>
        <input type="text" name="release" id="album-release" placeholder="Release date" .value=${album.release}>
        <input type="text" name="label" id="album-label" placeholder="Label" .value=${album.label}>
        <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${album.sales}>

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`
let id = null
export async function showEditView(ctx) {
    id = ctx.params.id
    const album = await dataService.getAlbumById(id)
    render(temp(createSubmitHandler(onSubmit), album))
}

async function onSubmit(data, form) {
    if (!data.singer || !data.album || !data.imageUrl || !data.release || !data.label || !data.sales) {
        return alert('All fields are required!')
    }

    await dataService.upgradeAlbum(id, data)
    page.redirect(`/details/${id}`)
}