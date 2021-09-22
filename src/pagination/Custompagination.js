import Pagination from  '@material-ui/lab/Pagination';
import {createTheme, ThemeProvider} from '@material-ui/core'

const darktheme = createTheme({
    palette:{
        type:'dark',
    },
});

const Custompagination = ({setPage, noofpages=10}) =>{

    const handlePagechange = (page) =>{
        setPage(page);
        window.scroll(0,0);
    }

    return (
        <div style={{
            width:"100%",
             display:"flex",
             justifyContent:"center",
             marginTop:"10px",
            }}>
            <ThemeProvider theme={darktheme} >
                <Pagination 
                count={noofpages}
                onChange={(e)=>{
                    handlePagechange(e.target.textContent);
                }}
                color={'primary'}
                hideNextButton
                hidePrevButton
                />
            </ThemeProvider>
        </div>
    );
}

export default Custompagination;