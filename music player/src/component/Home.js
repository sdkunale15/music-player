import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import token from '../Util/token';  //access token
import Artist from './screens/Artist';
import Search from './screens/Search';

const URL = "https://api.spotify.com"; //master api , url address

// api headaers
const apiHeaders = new Headers();
apiHeaders.append("Authorization", `${token.id}`);//need to send authorization key

// properties
const reqOptions = {
    method: "GET",
    headers: apiHeaders,
    redirect: 'follow'
};

function Home() {
      const [artist, setArtist] =useState([]); //ooo
    useEffect(() => {
          searchHandler("Hamsalekha");
    }, []);

    //w.r.t artist name we need to implement the search operation

    const searchHandler = (artistName) => {
        fetch(`${URL}/v1/search?q=${artistName}&type=artist`, reqOptions)
        .then(res => res.json())
        .then(out => {
            console.log(`artist list =`, out);
            setArtist(out.artists.items); //ooo
        }).catch(err => toast.error(err.message));
    }
     return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12 text-center'>
                <h3 className='display-3'>React Music Player</h3>
            </div>
        </div>
        <div className='row'>
            <Search  search={searchHandler}/>
        </div>
        <div className='row'>
            {
                 artist.map((item, index) => {
                     return <Artist key={index} {...item}  />
                 })
            }
        </div>
    </div>
  )
}

export default Home