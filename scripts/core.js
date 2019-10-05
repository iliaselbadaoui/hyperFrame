'use strict';
function include(package_path){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",package_path,true);
    xhr.onreadystatechange = function(){
        if (xhr.status==200&&xhr.readyState==4) {
            
        }
    };
    xhr.send();
}
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
                        pack.media = 'screen';
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
    timeSpan(start, end) {
        if (start.getTime() !== undefined && end.getTime() !== undefined) {
            return Math.abs(start.getTime() - end.getTime()) / 1000;
        }
    },
    DateDiffEntity(start, end) {
        let span = this.timeSpan(start, end),
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
    },
    setUpCountDown(parentId, start) {
        let container = document.createElement('div'),
            days = document.createElement('span'),
            hours = document.createElement('span'),
            minutes = document.createElement('span'),
            seconds = document.createElement('span'),
            DV = document.createElement('span'),
            HV = document.createElement('span'),
            MV = document.createElement('span'),
            SV = document.createElement('span'),
            days_sticker  = document.createElement('span'),
            hours_sticker  = document.createElement('span'),
            minutes_sticker  = document.createElement('span'),
            seconds_sticker  = document.createElement('span'),
            parent = document.getElementById(parentId),
            countEntity,
            CountDown;
        for (let i = 0; i < parent.childNodes.length; i++) {
            if(parent.childNodes[i].tagName === 'COUNTDOWN')
            {
                CountDown = parent.childNodes[i];
                break;
            }
        }
        container.appendChild(days);
        days.appendChild(DV);
        days.appendChild(days_sticker);
        hours.appendChild(HV);
        hours.appendChild(hours_sticker);
        minutes.appendChild(MV);
        minutes.appendChild(minutes_sticker);
        seconds.appendChild(SV);
        seconds.appendChild(seconds_sticker);
        container.appendChild(hours);
        container.appendChild(minutes);
        container.appendChild(seconds);
        if (CountDown !== undefined) {
            parent.replaceChild(container,CountDown);
        }
        days_sticker.textContent = "Days";
        hours_sticker.textContent = "Hours";
        minutes_sticker.textContent = "Minutes";
        seconds_sticker.textContent = "Seconds";
        container.id = 'CountDown';
        days.className = "CD_Sticker";
        hours.className = "CD_Sticker";
        minutes.className = "CD_Sticker";
        seconds.className = "CD_Sticker"; 
        DV.id = 'CD_days';
        HV.id = 'CD_hours';
        MV.id = 'CD_minutes';
        SV.id = 'CD_seconds';
        setInterval(function () {
            countEntity = hyperFrame.DateDiffEntity(start, new Date())
            if (countEntity.days < 10) {
                DV.textContent = '0' + countEntity.days;
            } else {
                DV.textContent = countEntity.days;
            }
            if (countEntity.hours < 10) {
                HV.textContent = '0' + countEntity.hours;
            } else {
                HV.textContent = countEntity.hours;
            }
            if (countEntity.minutes < 10) {
                MV.textContent = '0' + countEntity.minutes;
            } else {
                MV.textContent = countEntity.minutes;
            }
            if (countEntity.seconds < 10) {
                SV.textContent = '0' + countEntity.seconds;
            } else {
                SV.textContent = countEntity.seconds;
            }
        }, 1000);
    },
    onReady(callback) {
        document.onreadystatechange = function () {
            if (document.readyState == 'complete') {
                callback();
            }
        }
    },
    on(id,event,callback){
        document.getElementById(id).addEventListener(event,function(){window.event.stopPropagation(); callback();});
    },
    changeClassName(id,oldClass,newClass){
        let element = document.getElementById(id),
            classname = element.className;
        if (classname.includes(oldClass)) {
            classname = classname.split(' ');
            for (let i = 0; i < classname.length; i++) {
                if(classname[i] === oldClass){
                    classname[i] = newClass;
                    break;
                }
            }
            classname = classname.join(' ');
            element.className = classname;
        }
        else{
            console.error(classErr.message);
        }
    }
};