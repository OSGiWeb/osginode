import Reflux from 'reflux'

import LanguageActions from './LanguageActions'

let data = {
    language: {
        "key": "cn",
        "alt": "China",
        "title": "中文"
    },
    languages: [],
    phrases: {}
};

let  LanguageStore = Reflux.createStore({
    listenables: LanguageActions,
    getData: function(){
        return data
    },
    onInitCompleted: function (_data) {
        data.languages = _data;
        this.trigger(data)
    },
    onSelectCompleted: function (_data) {
        data.phrases = _data;
        this.trigger(data)
    },
    setLanguage: function(_lang){
        data.language = _lang
    }
});

export default LanguageStore;

