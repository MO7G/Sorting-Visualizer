import React, { Component, Fragment, useState } from 'react'
import { Button } from 'bootstrap';
import '../../css/global.css'
export default class SelectDropDown extends Component {
    constructor() {
        super();
    }

    // Handles state change
    handleChange = (event) => {
        this.props.onHandleSelectionChange([event.target.value, this.props.id]);
    }


    render() {
        return (
            <div>
                <select disabled={this.props.onDisable} onChange={this.handleChange} id="colours">
                    <option value="Insertion">Insertion</option>
                    <option value="Bubble">Bubble</option>
                    <option value="Selection">Selection</option>
                    <option value="Merge">Merge Sort</option>
                    <option value="Quick">Quick Sort</option>
                    <option value="Heap">Heap Sort</option>
                    <option value="Radix">Radix Sort</option>
                    <option value="count">count Sort</option>
                </select>
            </div >
        );
    }
}