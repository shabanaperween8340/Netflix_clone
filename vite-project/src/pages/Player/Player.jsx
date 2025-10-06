import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })

  
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2UzYTJhNDdkNTNmOTc4NWMwOTA1ZGQ2NGE1ZTBkNCIsIm5iZiI6MTc1NjA1NTI4OC42MDgsInN1YiI6IjY4YWI0NmY4YzBjZGIyMzE0YTQ0OGIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iK3LP6xzFRk7hWaND8OM7X5lxWbc5j7luwhFQk5tOVI'
  }
};

useEffect(()=>{ 
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate(-1)}}/>
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`}  width='90%' height='90%'  title='trailer' frameBorder={0} allowFullScreen ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>

    </div>
  )
}

export default Player
