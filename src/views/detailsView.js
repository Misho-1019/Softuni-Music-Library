import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"
import { getUserData, hasOwner } from "../util.js";
import { getLikesByAlbumId, likeAlbum } from "../data/likes.js";


const temp = (album, likes, hasUser, hasLiked, owner) => html`
<!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src=${album.imageUrl} alt="example1"/>
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
        <p>
          <strong>Album name:</strong><span id="details-album">${album.album}</span>
        </p>
        <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

      ${hasUser ? html`
        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
      ${owner ? html`
      <a href=/edit/${album._id} id="edit-btn">Edit</a>
      <a href="#" @click=${onDelete} data-id=${album._id} id="delete-btn">Delete</a>` : ""}

        ${hasLiked ? "" : html`
        <a href="#" @click=${onLike} data-id=${album._id} id="like-btn">Like</a>
        `}
        </div>`
       : ""}
       </div>
    </div>
  </section>
`;

let id = null;
export async function showDetailsView(ctx) {
    id = ctx.params.id
    const [album, likesInfo] = await Promise.all([dataService.getAlbumById(id), getLikesByAlbumId(id)])
    const userData = getUserData();
    const owner = hasOwner(album._ownerId)
    const hasLiked = likesInfo.hasLiked || owner;
    render(temp(album, likesInfo.likes, Boolean(userData), hasLiked, owner))
}

async function onLike(e) {
    await likeAlbum(id)

    page.redirect(`/dashboard/${id}`)
}

async function onDelete(e) {
    e.preventDefault()
    const id = e.target.dataset.id
    const confirmRes = confirm('Are you sure you want to delete this album?')

    if (!confirmRes) {
        return
    }

    await dataService.deleteAlbum(id)
    page.redirect('/dashboard')
}

