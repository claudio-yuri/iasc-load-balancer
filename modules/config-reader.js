//recibe la ruta del archivo de configuración
module.exports = function(configFileName){
    const fs = require('fs');

    //levanto el archivo de configuración
    console.log(configFileName);
    try
    {
        const configFile = fs.readFileSync(configFileName);
        config = JSON.parse(configFile.toString());
    }
    catch (err)
    {
        console.log(err, "no se pudo abrir el archivo de conifguración\n");
        process.exit();
    }
    console.log(config);

    //reviso que no falten parámetros de configuración ***********************
    if(config.hasOwnProperty("listenPort") === false){
        console.log("El archivo de configuración no cuenta con el parámetro listenPort.");
        process.exit();
    }

    if(config.hasOwnProperty("serverTimeout") === false){
        console.log("El archivo de configuración no cuenta con el parámetro serverTimeout.");
        process.exit();
    }

    if(config.hasOwnProperty("serverExclusionTime") === false){
        console.log("El archivo de configuración no cuenta con el parámetro serverExclusionTime.");
        process.exit();
    }

    if(config.hasOwnProperty("serverList") === false){
        console.log("El archivo de configuración no cuenta con el parámetro serverList.");
        process.exit();
    }

    if(config.serverList.length == 0){
        console.log("Debe haber al menos un servidor disponible");
        process.exit();
    }

    return config;
}