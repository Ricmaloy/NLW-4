import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string,
        colors: {
            white: string,
            background: string,
            grayLine:string,
            text: string,
            textHighlight: string,
            title: string,
            warning: string,
            correct: string,
            button:string,
            blueDark:string,
            blueTwitter:string,
        }
    }
}