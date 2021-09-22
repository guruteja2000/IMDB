import { useState, useEffect } from "react";
import axios from "axios"
import Content from "../content/content";
import './trending.css'
import CustomPagination from "../pagination/Custompagination"; 
const api_key='94b54178d9155d59c5263d6e896f12f0'

const Trending = () => {
    const [content, setcontent]= useState([]);
    const [page, setpage]=useState('1');

    const fetchdata = async ()=>{
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`
        );
        setcontent(data.results);
    }

    useEffect( ()=>{
        fetchdata();
    },[page]);

    return (
    <div >
        <span className='pageTitle'>TRENDING TODAY</span>
        <div className='trending'>
        {
            content && content.map((data)=>{
                return (
                    <Content key={data.id} 
                    id={data.id} 
                    poster={data.poster_path} 
                    title={data.title || data.name} 
                    date={data.first_air_date || data.release_date} 
                    media_type={data.media_type}
                    vote_average={data.vote_average}
                    />
                );
            })
        }
        </div>
        <CustomPagination setPage={setpage} />
    </div>
    );
};

export default Trending;