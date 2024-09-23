import { del, get, post, put } from "./api.js"


const endpoints = {
    allAlbums: '/data/albums?sortBy=_createdOn%20desc',
    albums: '/data/albums'
}

export async function getAllAlbums() {
    return await get(endpoints.allAlbums)
}

export async function createAlbum(data) {
    return await post(endpoints.albums, data)
}

export async function getAlbumById(id) {
    return await get(endpoints.albums + `/${id}`)
}

export async function upgradeAlbum(id, data) {
    return await put(endpoints.albums + `/${id}`, data)
}

export async function deleteAlbum(id) {
    return await del(endpoints.albums + `/${id}`)
}