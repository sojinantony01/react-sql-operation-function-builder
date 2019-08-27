import React from 'react';

const dev = 'de';
const langnow = '';

// function evalTemplate(strans, params) {
//     let tString = strans;
//     if (_.isObject(params) && _.isObject(params.S)) {
//         Object.keys(params.S).forEach((k) => {
//             tString = tString.replace(`\${S.${k}}`, params.S[k]);
//         });
//     }
//     return tString;
// }

export function i18Get(key, lang, S) {
    // const state = Store.getState();
    // const trans = state.translations.data.translations? state.translations.data.translations[lang] : '';
    // try {
    //     let transText = key;
    //     if (!_.isEmpty(trans) && key in trans) {
    //         transText = trans[key];
    //     } else if (key in this.dev) {
    //         transText = this.dev[key];
    //     }
    //     // transText = '' + transText + '';
    //     return evalTemplate(transText, { S });
    // } catch (err) {
    //     // console.log(err)
    //     // nothing to catch
    // }
    return key;
}

class I18 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const key = this.props.tkey;
        const language = 'en';
        const S = this.props.params;
        return i18Get(key, language, S);
    }
}

export default I18;
