


import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
export default class rangeSlider extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: 50
        }
    }


    handleOnChange = async (speed) => {
        await this.setState({
            value: speed
        })
        this.props.onHandleVisualSpeed(this.state.value);
    }

    render() {
        let { value } = this.state
        return (
            <Slider
                min={0}
                max={100}
                value={value}
                orientation="horizontal"
                onChange={this.handleOnChange}
            />
        )
    }
}