import Chip from '@material-ui/core/Chip';
import axios from "axios";
import { useEffect } from 'react';

const api_key='94b54178d9155d59c5263d6e896f12f0';


const Genere =({
    selectedgeneres,
    setselectedgeneres,
    generes,
    setgeneres,
    type,
    setPage
}) =>{

    const handleadd = (genere) =>{
        setselectedgeneres([...selectedgeneres, genere]);
        setgeneres(generes.filter((g) => g.id !== genere.id));
        setPage(1);
    }

    const handleRemove= (genere) =>{
        setselectedgeneres(selectedgeneres.filter((selected)=>genere.id!==selected.id));
        setgeneres([...generes, genere]);
        setPage(1);
    }

    const fetchGeneres = async() =>{
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=en-US`
        );
        setgeneres(data.genres);
        console.log(data.genres);
    }

    useEffect(()=>{
        fetchGeneres();
        return ()=>{
            setgeneres({});
        }
    },[]);

    return(
        <div style={{padding:"6px 0"}}>
            {
                selectedgeneres.map((genere)=> (
                    <Chip
                        style={{margin:2}}
                        label={genere.name}
                        key={genere.id}
                        color="primary"
                        clickable
                        size="small"
                        onDelete={()=>handleRemove(genere)}
                    />
                ))
            }
            {
                generes.map((genere)=> (
                    <Chip
                        style={{margin:2}}
                        label={genere.name}
                        key={genere.id}
                        clickable
                        size="small"
                        onClick={()=>handleadd(genere)}
                    />
                ))
            }
        </div>
    );
};

export default Genere;