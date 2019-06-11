export default (url) => {

    if(!url){
        return;
    }

    const regex = /^\/([^?\/]+)/

    const matches = url.match(regex);

    if(!matches){
        return;
    }

    const [firstArg, language] = matches;

    switch (language) {
        case "es":
        case "en":
            return language;
        default:
            return "en";
    }

    
};