import { message } from 'antd';
var language = 'en';

var getLanguage = () => {
    return language;
};

var setLanguage = (lang) => {
    language = lang;
};

var showSuccess = (msg) => {
    message.success(msg);
}

var showInfo = (msg) => {
    message.info(msg);
}

var showError = (msg) => {
    message.error(msg);
}



export default {
    showSuccess, 
    showInfo, 
    showError, 
    getLanguage, 
    setLanguage, 
};