export const saveuser = ()=>{
    if(typeof window!='undefined'){
        localStorage.setItem('user',true);
    }
}

export const deleteuser = ()=>{
    if(typeof window !='undefined'){
        localStorage.removeItem('user');
    }
}
export const isUser =()=>{
    if(typeof window !='undefined'){
        if(localStorage.getItem('user')){
            return true;
        }
    }
    return false;
}