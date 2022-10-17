const addscript = async (url) => {
    // return new Promise((resolve) => {

    //     const script = document.createElement("script");
    //     script.src = url;
    //     document.body.appendChild(script);
    //     script.onload = ()=> {
    //         console.log("scrit loaderd")
    //         resolve = true;
    //     }
    //     script.onerror = () => {
    //         console.log("scrit loaderd failed")
    //         resolve = false;
    //     }
    // })
    try {
        const script = await document.createElement("script");
        script.src = url;
        await document.body.appendChild(script);
        console.log("script success to load")
        return true
    } catch (error) {
        console.log("script failed to load")
        console.log(error)
    }
    
        
}

export default addscript;