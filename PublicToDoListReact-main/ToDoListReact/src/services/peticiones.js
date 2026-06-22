import { URL_BACK } from "./constantes.js";

export async function post({ruta, data = {}, token = {}}){
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    }
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
    const response = await fetch(`${URL_BACK}${ruta}`, options);

    if(!response.ok){
        throw new Error(response.status);
    }
    return await response.json();
}


export async function get({ruta, token = {}}){
    const headers = {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    }
    const options = {
        method: "GET",
        headers: headers
    }
    const response = await fetch(`${URL_BACK}${ruta}`, options);

    if(!response.ok){
        throw new Error(response.status);
    }
    return await response.json();
}

export async function patch({ruta, id, data = {}, token = {}}){
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({id, data})
    }
    const response = await fetch(`${URL_BACK}${ruta}`, options);

    if(!response.ok){
        throw new Error(response.status);
    }
    return await response.json();
}

export async function del({ruta, data = {}, token = {}}){
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({data})
    }

    const response = await fetch(`${URL_BACK}${ruta}`, options);

    if(!response.ok){
        throw new Error(response.status);
    }
    return await response.json();  
}


