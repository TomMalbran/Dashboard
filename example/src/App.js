import React from "react";

// Components
import Result from "dashboard/dist/Components/Result";
import Drawer from "dashboard/dist/Components/Drawer";
import Html   from "dashboard/dist/Components/Html";



export default class App extends React.Component {
    render () {
        return <div>
            <Result open message="Hola" />
            <Drawer open>
                <Html>{"<b>Hola</b><br><i>Como estas</i>"}</Html>
            </Drawer>
        </div>;
    }
}
