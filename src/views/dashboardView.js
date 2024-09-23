import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"


const temp = (albums) => html`
<!-- Dashboard page -->
  <section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
      <!-- Display a li with information about every post (if any)-->
      ${albums.map(album => albumTemp(album))}
    </ul>

    <!-- Display an h2 if there are no posts -->
    ${albums.length === 0 ? html`<h2>There are no albums added yet.</h2>` : ''}
  </section>
`

const albumTemp = (album) => html`
      <li class="card">
        <img src=${album.imageUrl} alt="travis" />
        <p>
          <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
        </p>
        <p>
          <strong>Album name: </strong><span class="album">${album.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
        <a class="details-btn" href=/details/${album._id}>Details</a>
      </li>
`

export async function showDashboardView() {
    const albums = await dataService.getAllAlbums();
    render(temp(albums))
}