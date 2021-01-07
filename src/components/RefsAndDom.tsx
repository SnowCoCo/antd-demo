import React, { Component,createRef } from 'react';

export default class RefsAndDom extends React.Component { //class name 首字母要大写
    // constructor(){
    //     super();
    //     // this.RefDiv=createRef();
    //     this.setState({
    //         RefDiv:React.createRef()
    //     })
    // }

    // componentDidMount(){
    //     this.state.RefDiv.current.style.color='green';
    // }

    render() {
        return (
            <div>
                Refs Dom
            </div>
        )
    }
}
