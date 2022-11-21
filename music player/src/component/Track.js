import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; //param hook
import { toast } from 'react-toastify'; //types imports{} . third party npm,const
import token from '../Util/token'; //default imports with out curly brackets
// .. out of the component

const url = "https://api.spotify.com";

const apiHeaders = new Headers();//we need to create API references
apiHeaders.append("Authorization",`${token.id}`);

const reqOptions = {
  method: "GET",
  headers: apiHeaders,
  redirect: 'follow'
};


function Track() {
  const [track,setTrack] = useState([]);//1*

  const[audio,setAudio] =useState(null);
  const[playing,setPlaying] = useState(false);
  const[preUrl,setPreUrl] = useState(null);
  
  //1
  const params = useParams();
  console.log(`params =`, params);

  useEffect(() => { //2**
     fetch(`${url}/v1/artists/${params.id}/top-tracks?market=IN`, reqOptions)
   .then(res => res.json())
   .then(out => {
     console.log('output =', out);
     setTrack(out.tracks);
   }).catch(err => toast.error(err.message));
  }, [])

  const trackIcon =(url) => {
    if(!url) return <span className='text-danger'>No Track</span>;
    if(playing && preUrl === url) return <button className='btn btn-warning btn-sm'>Pause</button>;
    return <button className='btn btn-success btn-sm'>Play</button> 
  };
  const playAudio =(url) => { 
      const myAudio = new Audio(url);
      if(!playing){
          myAudio.play();
          setPlaying(true);
          setAudio(myAudio);
          setPlaying(url);
      } else{
          //pause
          audio.pause();
          if(preUrl ===  url) {
              setPlaying(false);
          }else {
              //pause to play
              myAudio.play();
              setAudio(myAudio);
              setPreUrl(url);
          }
        
      }
  };
  
  //2
  return (
   <div className='container'>
     <div className='row'>
       <div className='col-md-12 text-center'>
         <h3 className='display-3'>Tracks</h3>
       </div>
     </div>

     <div className='row'>
       { //accessing the track
         track.map((item, index) => {
           const { name, album, preview_url} = item;
           return (
             <div className='col-md-3 mt-2 mb-2' key={index} >
                <div className='card' onClick={()=> playAudio(preview_url)}>
                   <img src={album.images[1].url} alt="no image found" className='card-img-top' />
                 
                  <div className='card-body'>
                     <h6 className='text-seconadry text-center'> {name} </h6>
                  </div>
                 
                 <div className='card-footer'>
                   {trackIcon(preview_url)}
                 </div>
                </div>
             </div>
           )
         })
       }
     </div>
   </div>
  )
}

export default Track