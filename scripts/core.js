'use strict';
var dateErr = new Error();
dateErr.name = 'Date error';
dateErr.message = 'Check the date.';

function CompileConfig(config) {
    if (config.hasOwnProperty('AppInfo') && config.hasOwnProperty('Packages')) {
        if (!config.AppInfo.hasOwnProperty('AppName') || !config.AppInfo.hasOwnProperty('AppIcon') || !config.AppInfo.hasOwnProperty('Version')) {
            console.error("The AppInfo property should have AppName, AppIcon and Version properties.");
            return (false);
        } else if (!config.Packages.hasOwnProperty('length')) {
            console.error("The Packages property should be an array");
            return (false);
        } else if (config.Packages.hasOwnProperty('length')) {
            var i = 0;
            while (i < config.Packages.length) {
                if (!config.Packages[i].hasOwnProperty('Name') || !config.Packages[i].hasOwnProperty('Path') || !config.Packages[i].hasOwnProperty('Type')) {
                    console.error("The object " + (i + 1) + "is not of type package, a package object should have the Name, Path and Type propreties.");
                    return (false);
                }
                i++;
            }
        }
        return (true);
    } else {
        console.error("The configuration object should have the AppInfo and Packages properties.");
        return (false);
    }
}
let ver;

function ReadConfig() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', ('config.json'), true);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            var config = JSON.parse(xhr.response),
                favico = document.createElement('link');
            if (CompileConfig(config)) {
                document.title = config.AppInfo.AppName;
                favico.rel = "icon";
                favico.type = "image/png";
                favico.href = config.AppInfo.AppIcon;
                document.head.appendChild(favico);
                ver = config.AppInfo.Version;
                var i = 0;
                while (i < config.Packages.length) {
                    var pack;
                    if (config.Packages[i].Type == 'script') {
                        pack = document.createElement('script');
                        pack.type = 'text/javascript';
                        pack.src = config.Packages[i].Path;
                        pack.id = config.Packages[i].Name;
                        document.head.appendChild(pack);
                    } else if (config.Packages[i].Type == 'style') {
                        pack = document.createElement('link');
                        pack.type = 'text/css';
                        pack.href = config.Packages[i].Path;
                        pack.rel = 'stylesheet';
                        pack.id = config.Packages[i].Name;
                        document.head.appendChild(pack);
                    } else {
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
const hyperFrame = {
    checkDateFormat(date) {
        let slashFormat = new RegExp('^[0-9]{2}/[0-9]{2}/[0-9]{4}$'),
            hyphenFormat = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$');
        if (slashFormat.test(date) || hyphenFormat.test(date)) {
            let dateArr = date.split('/'),
                day = parseInt(dateArr[0]),
                month = parseInt(dateArr[1]),
                year = parseInt(dateArr[2]);
            if (month > 12 || month < 1) {
                console.error('Month should be an integer value between 1 and 12');
                return false;
            } else if (year > 9999 || year < 1) {
                console.error('Year should be an integer value between 1 and 9999');
                return false;
            } else {
                switch (month) {
                    case 1:
                        if (day < 1 || day > 31) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 2:
                        if (year % 100 != 0 && (year % 4 == 0 || year % 400 == 0)) {
                            if (day < 1 || day > 29) {
                                console.error(dateErr.stack);
                                return false;
                            }
                        } else {
                            if (day < 1 || day > 28) {
                                console.error(dateErr.stack);
                                return false;
                            }
                        }
                        break;
                    case 3:
                        if (day < 1 || day > 31) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 4:
                        if (day < 1 || day > 30) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 5:
                        if (day < 1 || day > 31) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 6:
                        if (day < 1 || day > 30) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 7:
                        if (day < 1 || day > 31) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 8:
                        if (day < 1 || day > 31) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 9:
                        if (day < 1 || day > 30) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 10:
                        if (day < 1 || day > 31) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 11:
                        if (day < 1 || day > 30) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                    case 12:
                        if (day < 1 || day > 31) {
                            console.error(dateErr.stack);
                            return false;
                        }
                        break;
                }
            }
        } else {
            console.error('Date format should be like "DD/MM/YYYY" or "DD-MM-YYYY"');
            return false;
        }
        return true;
    },
    timeSpan(date1, date2) {
        if (date1.getTime() !== undefined && date2.getTime() !== undefined) {
            return Math.abs(date1.getTime() - date2.getTime()) / 1000;
        }
    },
    timeSpanEntity(date1, date2) {
        let span = this.timeSpan(date1, date2),
            entity = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        entity.days = Math.floor(span / 86400);
        span -= entity.days * 86400;
        entity.hours = Math.floor(span / 3600);
        span -= entity.hours * 3600;
        entity.minutes = Math.floor(span / 60);
        span -= entity.minutes * 60;
        entity.seconds = Math.floor(span);
        return entity;
    }
};