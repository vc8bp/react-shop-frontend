const addscript = (url) => {
    return new Promise((resolve) => {

        const script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);
        script.onload = ()=> {
            resolve = true;
        }
        script.onerror = () => {
            resolve = false;
        }
    })
        
}

export default addscript;