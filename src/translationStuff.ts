export function AddTranslation(jason: any, translationKey: string){
    if(!translationKey){
        throw new Error('No translation key provided');
    }

    if(!jason){
        throw new Error('Translation file must be initialised and have some languages in it');
    }

    if(!translationKey.includes(':')){
        throw new Error('Key in wrong format. Must include a \':\'');
    }

    const [ location, translation ] = translationKey.split(':');

    const keys = location.split('.');

    const languages = Object.keys(jason);

    if(languages.length === 0){
        throw new Error('No languages in file');
    }

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
        throw new Error('Key array empty');
    }
    
    const key = keys.shift();

    if(!key){
        throw new Error('No key error');
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