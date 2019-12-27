import React from "react";
import { Html } from "dashboard";
import { Download } from "dashboard";


export default class App extends React.Component {
    render () {
        return <div>
            <Html>{"<b>Hola</b><br><i>Como estas</i>"}</Html>
            <Download src="" />
        </div>;
    }
}
