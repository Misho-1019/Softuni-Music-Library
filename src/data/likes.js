import { getUserData } from "../util.js"
import { get, post } from "./api.js"


const endpoints = {
    like: '/data/likes',
    likeByAlbumId: (id) => `/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`,
    likeByUserId: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function likeAlbum(albumId) {
    return await post(endpoints.like, {albumId})
}

export async function getLikesByAlbumId(albumId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.likeByAlbumId(albumId))
    ]

    if (userData) {
        requests.push(get(endpoints.likeByUserId(albumId, userData._id)))
    }

    const [likes, hasLiked] = await Promise.all(requests)

    return {
        likes,
        hasLiked: Boolean(hasLiked)
    }
}