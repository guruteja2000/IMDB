const useGenere =(selectedGenere) =>{

    if(selectedGenere.length< 1) return "";

    const GenereId=selectedGenere.map((g)=>{
        return g.id;
    })
    return GenereId.reduce((acc, curr) =>acc + "," + curr);
}

export default useGenere;