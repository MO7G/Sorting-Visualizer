import React, { Component, Fragment, useState } from 'react'
import { Button } from 'bootstrap';
import "../css/fonts.css";
export default class benchMark extends Component {
    constructor() {
        super();
        this.state = {
            Operations: 0
        }
    }

    handleChange = (Operations) => {
        //    this.setState({ Operations: Operations })

        const temp = document.getElementsByClassName("Bar " + this.props.id);
        temp.style.width = `${Operations}px`;
        temp.style.backgroundColor = "green"
        console.log(temp.style.width);
    }

    render() {
        return (

            <div>
                <body >
                    <div class="main-content">
                        <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
                            <div class="container-fluid">
                                <h2 class="mb-5 text-white">Stats Card</h2>
                                <div class="header-body">
                                    <div class="row">
                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col" >
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Time complexity</h5>
                                                            <span class="h2 font-weight-bold mb-0"><p className={"Bar " + this.props.id}>timeCompexity</p></span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                                <i class="fas fa-chart-bar"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span class="text-nowrap">Since last month</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Animation Array Length</h5>
                                                            <span class="h2 font-weight-bold mb-0"><p className="animatoinTime"></p></span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                                <i class="fas fa-chart-pie"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span>
                                                        <span class="text-nowrap">Since last week</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Number Of Operations</h5>
                                                            <span class="h2 font-weight-bold mb-0">{this.state.Operations}</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                                <i class="fas fa-users"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-warning mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span>
                                                        <span class="text-nowrap">Since yesterday</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Real Time Execution </h5>
                                                            <span class="h2 font-weight-bold mb-0"><p>{this.props.AnimationTimeExecution}</p></span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                                                <i class="fas fa-percent"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                                                        <span class="text-nowrap">Since last month</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Real Time Execution </h5>
                                                            <span class="h2 font-weight-bold mb-0">49,65%</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                                                <i class="fas fa-percent"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                                                        <span class="text-nowrap">Since last month</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </div >

        );
    }
}