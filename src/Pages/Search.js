import {
    Button,
    Tab,
    Tabs,
    TextField,
} from "@material-ui/core";
import {createTheme, ThemeProvider} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import Custompagination from "../pagination/Custompagination";
import Content from "../content/content";
import './trending.css'

const Search = () =>{
    const api_key='94b54178d9155d59c5263d6e896f12f0'
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const darktheme = createTheme({
        palette: {
            type:'dark',
            primary:{
                main:'#fff',
            }
        },
    }); 

    const fetchSearch =async() =>{
        try{
            const {data} = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
                    api_key
                  }&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
            setContent(data.results);
            setNumOfPages(data.total_pages);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        window.scroll(0,0);
        fetchSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type, page]);

    return (

        <div>
            <ThemeProvider theme={darktheme}>
            <div style={{display:'flex', margin:'15px 0'}}>
                <TextField
                    style={{flex:1}}
                    className='searchBox'
                    label='search'
                    variant='filled'
                    onChange = { (e)=>setSearchText(e.target.value)}
                />
                <Button
                    onClick={fetchSearch}
                    variant='contained'
                    style={{marginLeft:10}}
                >
                <SearchIcon fontSize='large'/>
                </Button>
            </div>
            <Tabs
                value={type}
                indicatorColor='primary'
                textColor='primary'
                onChange={(e, newValue) =>{
                    setType(newValue);
                    setPage(1);
                }}
                style={{paddingBottom :5}}
                aria-label="disabled tabs example"
            >
                <Tab style={{ width: "50%" }} label="Search Movies" />
                <Tab style={{ width: "50%" }} label="Search TV Series" />                
            </Tabs>
            </ThemeProvider>
            <div className="trending">
            {
                content && content.map((data)=>{
                    return (
                    <span className='trending' >
                        <Content key={data.id} 
                        id={data.id} 
                        poster={data.poster_path} 
                        title={data.title || data.name} 
                        date={data.first_air_date || data.release_date} 
                        media_type={type ? "tv" : "movie"}
                        vote_average={data.vote_average}
                        />
                    </span>
                    );
                })
            }
            {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPages > 1 && (
            <Custompagination setPage={setPage} numOfPages={numOfPages} />
        )}
        </div>
    );

}

export default Search;