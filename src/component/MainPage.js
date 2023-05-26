
import React, { Component, useEffect } from "react";
import "../css/global.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as mergeSortingAlgo from "../sortingAlgorithm/mergeSortingAlgo";
import * as insertoinSortingAlgo from "../sortingAlgorithm/insertionSortingAglo";
import * as bubbleSortingAlgo from "../sortingAlgorithm/bubbleSortAlgo";
import * as selectoinSortAlgo from "../sortingAlgorithm/selectionSortAlgo";
import * as quickSortAlgo from "../sortingAlgorithm/quickSortAlgo";
import * as heapSortAglo from "../sortingAlgorithm/heapSort";
import NavBar from "./navComponent/navBar.js";
import { createBrowserHistory } from "@remix-run/router";
import Sorting, { MemoizedMovie } from "./sortingVisualizer";
import { countSort } from "../sortingAlgorithm/countingSort";
import { MDBTabs } from 'mdb-react-ui-kit'
import ReactSwitch from "react-switch";
import BenchMark from "./benchMark";
class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            numberOfArrays: [1],
            keyCount: -1,
            dual: false,
            selection: ["insertion", "insertion"],
            hidden: false,
            numberOfBar: 25,
            visualizationSpeed: 250,
            coloringSpeed: 100,
            limit: 0,
            barWidth: 10,
            barMargin: 3,
            transition: 0,
            linear: 0,
            Theme: "light",
            coloringColor: "C92C6D",
            chosenColor: "865DFF",
            defaultColor: "FFB84C",
            animation: false,
            huge: false,
            timeComplexity: "null",
            spaceComplexty: "",
            realTimeExecution: "",
            AnimationTimeExecution: "",
        };
        this.keyCount = 0;
        this.secondKeyCount = 234;
        this.getKey = this.getKey.bind(this);
        this.navBarChild = React.createRef();
        // dual array 
        this.childs = React.createRef([]);
        this.childs.current = [];
        // dual benchmark 

        this.temp = 0;
        this.ThemeContext = React.createContext(null)
    }
    handleVisualSpeed = async (speed, flag, fast) => {
        if (flag == null) {
            if (this.state.numberOfBar <= 50) {
                let temp = speed * 10;
                temp = Math.abs(100 * 10 - temp);
                if (temp == 0 && fast == true) {
                    console.log("safasd")
                    temp = 1000;
                } else if (temp == 0 && fast == null) {
                    temp = 0;
                }
                temp /= 2;
                await this.setState({ visualizationSpeed: temp })
            } else {
                let temp = speed;
                temp = Math.abs(100 - temp);
                temp /= 10;


                await this.setState({ visualizationSpeed: temp })
            }
        } else {
            let temp = ((1000 - (2 * speed)) / 10);
            await this.setState({ visualizationSpeed: temp })
        }

    }
    handleVisualSpeedReverse = async (speed) => {



        if (this.state.numberOfBar > 50) {
            let temp = speed * 10;
            temp = Math.abs(100 * 10 - temp);
            temp /= 2;

            await this.setState({ visualizationSpeed: temp })
        } else {
            let temp = speed;
            temp = Math.abs(100 - temp);
            temp /= 10;
            await this.setState({ visualizationSpeed: temp })
        }

    }
    // generating the random numbers
    getKey() {
        return this.keyCount++;
    }
    getSecondKay() {
        return this.secondKeyCount++;
    }
    resetTheLimit = () => {
        this.setState({ limit: 0 });
    }
    randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let result = Math.floor(Math.random() * (max - min) + min);
        return result;
    }

    async componentDidMount() {
        // must wait for the array to be full before passing the array to the children
        await this.resetTheArray();
        //  console.log("yah i am mounting ", this.state.hidden)
    }

    resetTheArray = () => {
        const temp = [];
        //console.log(this.childs.current[0].current)
        for (let i = 0; i < this.state.numberOfBar; i++) {
            temp.push(this.randomNumber(5, 750));

        }
        // replacing the state array with the new temporarily array 
        this.setState({ array: temp });
    }

    triggerSort = () => {
        this.state.numberOfArrays.map((element, index) => {
            this.childs.current[index].current.Sort(this.state.selection[index])
            console.log(this.childs.current)
        })
    }

    helper = (Operations) => {
        this.state.numberOfArrays.map((element, index) => {
            this.benchMarkChild.current[index].current.handleChange(Operations)
        })
    }
    printIt = () => {
        const temp = this.childs.current[0].current.giveMeStateOfBtn();
    }


    changeStateOfHidden = async (elementState) => {
        if (elementState > global.config.i18n.welcome.en) {
            global.config.i18n.welcome.en = elementState;
        }
        await this.navBarChild.current.helper(global.config.i18n.welcome.en, this.state.animation, this.state.huge);
        // console.log("from the limit state ", this.state.limit);
    };
    HandleSelectionChange = async (selectValue) => {
        console.log("from here ", selectValue);
        const temp = [...this.state.selection];
        if (selectValue[1] == 1) {
            temp[0] = selectValue[0];
        } else {
            temp[1] = selectValue[0];
        }
        await this.setState({ selection: temp })


    }

    handleDual = (dualState) => {
        console.log(dualState);
        if (dualState == true) {
            this.setState({ numberOfArrays: [1, 2] })
        } else {
            this.setState({ numberOfArrays: [1] })
        }
        console.log(this.state.numberOfArrays)


    }


    handleHuge = async (HugeState) => {
        if (HugeState == true) {
            await this.setState({ numberOfBar: 900, barWidth: 0.5, barMargin: 0.01, coloringSpeed: 3, huge: true });
            await this.resetTheArray();
        } else {
            await this.setState({ numberOfBar: 25, barWidth: 10, barMargin: 3, coloringSpeed: 20, huge: false });
            await this.resetTheArray();
        }

    }
    handleAnimation = async (animationState) => {
        if (animationState == true) {
            this.setState({ transition: 0.5, linear: 5.8, animation: true })
        } else {
            this.setState({ transition: 0, linear: 0, animation: false })
        }
    }





    sortingInfo = async (complexity, auxiliarySpace, timeTaken) => {
        await this.setState({ timeComplexity: complexity, spaceComplexty: auxiliarySpace, AnimationTimeExecution: timeTaken })
        console.log(complexity, " ", timeTaken, " ", auxiliarySpace);
    }

    handleTheme = async () => {
        if (this.state.Theme == "light") {
            await this.setState({ Theme: "dark", defaultColor: "FCE700", chosenColor: "EA047E", coloringColor: "FCE700" });
        } else {
            await this.setState({ Theme: "light", defaultColor: "865DFF", chosenColor: "FFB84C", coloringColor: "C92C6D" });
        }
    }


    render() {
        console.log(this.state.dual);
        return (
            <this.ThemeContext.Provider value={this.state.Theme, this.toggleTheme}>
                <div id={this.state.Theme}>
                    <NavBar onhandleTheme={this.handleTheme} onResetTheLimit={this.resetTheLimit} onhandleAnimation={this.handleAnimation} onLimit={this.state.limit} onHandleVisualSpeed={this.handleVisualSpeed} onReset={this.resetTheArray} onhandleHuge={this.handleHuge} onhandleDual={this.handleDual} onHandleSelectionChange={this.HandleSelectionChange} ref={this.navBarChild} stateOfElement={this.state.hidden} sendData={this.getData} onTriggerSort={this.triggerSort}  ></NavBar>

                    <div className="myBody">
                        <div className="sortingContainer">
                            {this.state.numberOfArrays.map((element, index) => <Sorting {...this.state} onTransition={[this.state.transition, this.state.linear]} onColoringSpeed={this.state.coloringSpeed} onBarCss={[this.state.barWidth, this.state.barMargin]} onSortingInfo={this.sortingInfo} onHelper={this.helper} onTest={this.state.visualizationSpeed} onVisualizatoinSpeed={this.state.visualizationSpeed} onNumberOfBar={this.state.numberOfBar} onchangeStateOfHidden={this.changeStateOfHidden} key={this.getKey()} id={element} ref={this.childs.current[index]} type={this.state.selection[index]} array={[...this.state.array]}>
                                {
                                    this.childs.current = Array(this.state.numberOfArrays.length).fill().map((_, i) => this.childs.current[i] || React.createRef())
                                }
                            </Sorting>)}
                        </div>


                    </div>
                </div >

            </this.ThemeContext.Provider>
        )
    }

}

export default MainPage;

