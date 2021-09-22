import "./header.css"


const Header = () => {
    return(
        <span className='header' onClick={()=>{window.scrollTo(0,0)}} >🎬 Entertainment Hub 🎥
        </span>
    );
}

export default Header;