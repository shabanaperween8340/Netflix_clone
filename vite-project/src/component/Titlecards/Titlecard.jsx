import React, { useEffect, useRef, useState } from 'react'
import './Titlecard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const Titlecard = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2UzYTJhNDdkNTNmOTc4NWMwOTA1ZGQ2NGE1ZTBkNCIsIm5iZiI6MTc1NjA1NTI4OC42MDgsInN1YiI6IjY4YWI0NmY4YzBjZGIyMzE0YTQ0OGIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iK3LP6xzFRk7hWaND8OM7X5lxWbc5j7luwhFQk5tOVI'
  }
};




const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div className='title-cards'>
      <h1>{title?title:"Popular on Netflix"}</h1>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
           return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={ `https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
           </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecard
