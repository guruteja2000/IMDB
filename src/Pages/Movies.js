import { useState, useEffect, Fragment } from "react";
import Genere from '../Generes/Genere'
import Content from "../content/content";
import Custompagination from "../pagination/Custompagination";
import axios from 'axios'
import './trending.css'
import useGenere from "../Hooks/useGenere";

const Movies = () => {
    const api_key='94b54178d9155d59c5263d6e896f12f0'
    const [pages,setpages]=useState(1);
    const [content, setcontent]=useState([]);
    const [noofpages, setnoofpages]=useState();
    const [generes, setgeneres] = useState([]);
    const [selectedGeneres, setselectedGeneres]= useState([]);
    const genreforurl= useGenere(selectedGeneres);

    const fetchMovies = async() =>{
        const {data}= await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pages}&with_genres=${genreforurl}`
        );
        setcontent(data.results);
        setnoofpages(data.total_pages);
    }

    useEffect(()=>{
        window.scroll(0,0);
        fetchMovies();
        // eslint-disable-next-line
    },[pages, genreforurl]);

    return (
    <div >
        <span className="pageTitle" >Movies</span>
        <div className='trending'>
        <Genere 
        type="movie" 
        selectedgeneres={selectedGeneres}
        setselectedgeneres={setselectedGeneres}
        generes={generes}
        setgeneres={setgeneres}
        setPage={setpages}
        />
        {
            content && content.map((data)=>{
                return (
                <span className='trending' >
                    <Content key={data.id} 
                    id={data.id} 
                    poster={data.poster_path} 
                    title={data.title || data.name} 
                    date={data.first_air_date || data.release_date} 
                    media_type='movie'
                    vote_average={data.vote_average}
                    />
                </span>
                );
            })
        } 
        </div>
        <Custompagination setPage={setpages} noofpages={noofpages} />      
    </div>
    );
};

export default Movies;