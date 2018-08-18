export function AddTranslation(jason: any, translationKey: string){
    const [ location, translation ] = translationKey.split(':');

    const keys = location.split('.');

    const languages = Object.keys(jason);

    languages.forEach((k, i) => {
        if(languages.length - 1 === i){
            jason[k] = addKey(jason[k], keys.slice(0), `${translation} (test)`);
        }
        else {
            jason[k] = addKey(jason[k], keys.slice(0), translation);
        }
    });

    return jason;
}

function addKey(jason: any, keys: string[], translation: string){
    if(keys.length === 0){
        throw new Error('key array empty');
    }
    
    const key = keys.shift();

    if(!key){
        throw new Error('no key error');
    }

    if(keys.length > 0) {
        if(jason[key]){
            jason[key] = addKey(jason[key], keys, translation);
        }
        else {
            jason[key] = addKey({}, keys, translation);
        }
    }
    else {
        jason[key] = translation;
    }

    return jason;
}