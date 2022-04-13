const { db } = require("./fb");
const AlbumsRef = db.collection("albums");
const axios = require('axios')
const { validateAlbum } = require("./models/album.js")

const DISCOG_TOKEN = "xjGbogmOiYBEENfKKHMsCfwNsKMTYWOUvGCealOq";
const DISCOG_ENDPOINT = "http://api.discogs.com/database/search";

axios
    .get(DISCOG_ENDPOINT + "?type=release&page=1&per_page=5", {
        headers: {
            'Authorization': `Discogs token=${DISCOG_TOKEN}`
        }
    })
    .then(async res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res.data.results)
        let albums = [];
        for (let album in res.data.results) {
            let a = res.data.results[album];
            if (a.resource_url) {
            axios
                .get(a.resource_url, {
                    headers: {
                        'Authorization': `Discogs token=${DISCOG_TOKEN}`
                    }
                })
                .then(async albumdata => {
                    let data = albumdata.data;
                    // console.log(data);
                    let artists = data.artists?.map(a => a.name);
                    let songs = data.tracklist?.map(t => {
                        let length = t.duration.split(':');
                        length = Number(length[0]*60) + Number(length[1]);
                         return { title: t.title, length: length }
                        })
                    let newAlbum = {
                        title: data.title,
                        artists: artists,
                        description: data.notes.substring(0, 3000),
                        year: data.year,
                        genres : data.genres,
                        songs: songs
                    }

                    console.log(newAlbum);
                
                    console.log("pushing");
                    let valid = validateAlbum(newAlbum);
                    if (valid) await AlbumsRef.add(newAlbum);
                    albums.push(newAlbum);
                });
            }
        };

        // albums.forEach(async a => {
        //     let valid = validateAlbum(a);
        //     if (valid) {
        //         let resp = await AlbumsRef.add(a);
        //         if (resp.status(201)) {
        //             console.log("Success");
        //         }
        //         else {
        //             console.log(resp);
        //         }
        //     };
        // });

    })
    .catch(error => {
        console.error(error)
    })
