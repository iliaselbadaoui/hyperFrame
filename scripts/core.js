'use strict';
var root = document.location.host;
function CompileConfig (config)
{
    if (config.hasOwnProperty('AppInfo') && config.hasOwnProperty('Packages'))
    {
        if (!config.AppInfo.hasOwnProperty('AppName') || !config.AppInfo.hasOwnProperty('AppIcon') || !config.AppInfo.hasOwnProperty('Version'))
        {
            console.error("The AppInfo property should have AppName, AppIcon and Version properties.");
            return (false);
        }
        else if (!config.Packages.hasOwnProperty('length'))
        {
            console.error("The Packages property should be an array");
            return (false);
        }
        else if (config.Packages.hasOwnProperty('length'))
        {
            var i = 0;
            while (i < config.Packages.length)
            {
                if (!config.Packages[i].hasOwnProperty('Name') || !config.Packages[i].hasOwnProperty('Path') || !config.Packages[i].hasOwnProperty('Type'))
                {
                    console.error("The object "+(i + 1)+"is not of type package, a package object should have the Name, Path and Type propreties.");
                    return (false);
                }
                i++;
            }
        }
        return (true);
    }
    else
    {
        console.error("The configuration object should have the AppInfo and Packages properties.");
        return (false);
    }
}
let ver;
function ReadConfig()
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET',('config.json'),true);
    xhr.onreadystatechange = function ()
    {
        if (xhr.status == 200 && xhr.readyState == 4)
        {
            var config = JSON.parse(xhr.response),
                favico = document.createElement('link');
            if (CompileConfig(config))
            {
                document.title = config.AppInfo.AppName;
                favico.rel = "icon";
                favico.type = "image/png";
                favico.href = config.AppInfo.AppIcon;
                document.head.appendChild(favico);
                ver = config.AppInfo.Version;
                var i = 0;
                while (i < config.Packages.length)
                {
                    var pack;
                    if (config.Packages[i].Type == 'script')
                    {
                        pack = document.createElement('script');
                        pack.type = 'text/javascript';
                        pack.src = root + "/"+config.Packages[i].Path;
                        pack.id = config.Packages[i].Name;
                        document.head.appendChild(pack);
                    }
                    else if (config.Packages[i].Type == 'style')
                    {
                        pack = document.createElement('link');
                        pack.type = 'text/css';
                        pack.href = root + "/"+config.Packages[i].Path;
                        pack.rel = 'stylesheet';
                        pack.id = config.Packages[i].Name;
                        document.head.appendChild(pack);
                    }
                    else
                    {
                        console.error("Type should be 'script' or 'style' and nothing else.");
                    }
                    i++;
                }
            }
        }
    };
    xhr.send();
}
ReadConfig();
const hyperFrame = 
{
    checkDateFormat(date)
    {

        let slashFormat = new RegExp('^[0-9]{2}/[0-9]{2}/[0-9]*$'),
            hyphenFormat = new RegExp('^[0-9]{2}/[0-9]{2}/[0-9]*$');
        if (slashFormat.test(date) || hyphenFormat.test(date))
        {
            
        }
        else
        {
            console.error('Date format should be like "DD/MM/YYYY" or "DD-MM-YYYY"');
        }
    },
    countDown(GoalDate)
    {

    }
};