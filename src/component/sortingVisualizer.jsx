import React, { Component, PureComponent } from "react";
import "../css/global.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { memo } from "react";
import Col from "react-bootstrap/Col";
import * as mergeSortingAlgo from "../sortingAlgorithm/mergeSortingAlgo";
import * as insertoinSortingAlgo from "../sortingAlgorithm/insertionSortingAglo";
import * as bubbleSortingAlgo from "../sortingAlgorithm/bubbleSortAlgo";
import * as selectoinSortAlgo from "../sortingAlgorithm/selectionSortAlgo";
import * as quickSortAlgo from "../sortingAlgorithm/quickSortAlgo";
import * as heapSortAglo from "../sortingAlgorithm/heapSort";
import * as countSortAlgo from "../sortingAlgorithm/countingSort";
import * as radixSortAlgo from "../sortingAlgorithm/radixSort";
import NavBar from "./navComponent/navBar.js";
import { createBrowserHistory } from "@remix-run/router";
import { createRef } from "react";
import { useRef } from "react";
class sorting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      bars: this.props.onNumberOfBar,
      firstSelection: "Insertion",
      btn: false,
      dual: true,
      visualizationSpeed: this.props.onVisualizatoinSpeed,
      coloringSpeed: this.props.coloringSpeed,
      defaultColor: this.props.defaultColor,
      chosenColor: this.props.chosenColor,
      coloringColor: this.props.coloringColor,
      testCounter: 5,
      transition: this.props.onTransition[0],
      linear: this.props.onTransition[1],
    };
  }

  setSelection = (selection) => {
    this.setState({ firstSelection: selection });
  };

  Sort = async (dropDownSelect) => {
    let selection = dropDownSelect.toLowerCase();
    if (selection == "bubble") {
      this.bubbleSort();
    } else if (selection == "selection") {
      this.selectionSort();
    } else if (selection == "insertion") {
      this.insertionSort();
    } else if (selection == "merge") {
      this.mergeSort();
    } else if (selection == "quick") {
      this.quickSort();
    } else if (selection == "heap") {
      this.heapSort();
    } else if (selection == "radix") {
      this.radixSort();
    } else if (selection == "count") {
      this.countSort();
    }
  };

  // generating the random numbers
  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result = Math.floor(Math.random() * (max - min) + min);
    return result;
  }

  async componentDidMount() {
    await this.setState({ array: this.props.array });
  }

  resetTheArray() {
    const temp = [];
    for (let i = 0; i < this.state.bars; i++) {
      temp.push(this.randomNumber(5, 750));
    }
    // must use this method to concatinate the new element to the array inside the state
    this.setState({ array: temp });
  }

  Reset() {
    this.resetTheArray();
    let theBar = document.getElementsByClassName("theBar");
    for (let i = 0; i < this.state.bars; i++) {
      theBar[i].style.backgroundColor = "blue";
    }
  }
  //testing if the sorting method is working or not
  mergeSortTest() {
    const jsArray = this.state.array.slice().sort((a, b) => a - b);
    const testSort = this.mergeSort(this.state.array);
    console.log(jsArray);
    console.log(testSort);
    if (JSON.stringify(jsArray) === JSON.stringify(testSort))
      console.log("yes");
    else console.log("no");
  }

  handleReset = () => {
    this.Reset();
  };

  render() {
    const { array } = this.state;
    return (
      <Container>
        <h1>{`${this.props.type}`}</h1>
        <div className="theContainer">
          <div className="theContainerChild">
            {array.map((value, idx) => (
              <div
                className={"theBar " + this.props.id}
                key={idx}
                style={{
                  height: `${value}px`,
                  width: `${this.props.onBarCss[0]}px`,
                  margin: `${this.props.onBarCss[1]}px`,
                  transition: `${this.state.transition}s linear, text-shadow ${this.state.linear}s linear`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </Container>
    );
  }

  giveMeStateOfBtn = () => {
    return this.state.btn;
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  cal = (length) => {
    let counter = 0;
    const { visualizationSpeed } = this.state;

    for (let i = 0; i < length; i++) {
      let second = i * visualizationSpeed;
      counter += Math.abs(counter - second);
    }
    return counter;
  };

  calColorSpeed = (length) => {
    let counter = 0;
    const { coloringSpeed } = this.state;
    for (let i = 0; i < length; i++) {
      let second = i * coloringSpeed;
      counter += Math.abs(counter - second);
    }
    return counter;
  };

  calDisableTime = (length) => {
    let counter = 0;
    const { coloringSpeed } = this.state;
    for (let i = 0; i < length; i++) {
      let second = i * coloringSpeed;
      counter += Math.abs(counter - second);
    }
    return counter;
  };
  millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  handleBtnChange = async () => {
    console.log("yes");
    await this.sleep(2000);
    console.log("no");
  };

  color = () => {
    const { coloringSpeed } = this.state;
    let theBar = document.getElementsByClassName("theBar " + this.props.id);
    for (let i = 0; i < this.state.bars; i++) {
      setTimeout(() => {
        theBar[i].style.backgroundColor = `#${this.state.coloringColor}`;
      }, i * coloringSpeed);
    }
  };

  countSort = async () => {
    const { visualizationSpeed } = this.state;
    console.log(visualizationSpeed);
    const animation = await countSortAlgo.countSort(this.props.array);
    console.log(animation.length);
    let limit = await this.cal(animation.length);
    let totalLimit =
      limit + (await this.calColorSpeed(this.state.array.length));
    await this.props.onchangeStateOfHidden(totalLimit);

    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName(
        "theBar " + this.props.id
      );
      const flag = animation[i][1];
      if (flag == false) {
        // const secondBarIndex = animation[i][0];
        const firstBarIndex = animation[i][0];
        // const secondBar = arrayBar[secondBarIndex].style;
        const firstBar = arrayBar[firstBarIndex].style;

        let targetColor = `#${this.state.defaultColor}`;
        let defaultColor = `#${this.state.chosenColor}`;
        if (animation[i][2] === "set") {
          setTimeout(() => {
            // secondBar.backgroundColor = targetColor;
            firstBar.backgroundColor = targetColor;
          }, i * visualizationSpeed);
        } else {
          setTimeout(() => {
            //   secondBar.backgroundColor = defaultColor;
            firstBar.backgroundColor = defaultColor;
          }, i * visualizationSpeed);
        }
      } else {
        const targetBarIndex = animation[i][0];
        const targetBarValue = animation[i][2];
        const targetBar = arrayBar[targetBarIndex].style;
        setTimeout(() => {
          targetBar.height = `${targetBarValue}px`;
        }, i * visualizationSpeed);
      }
    }
    await this.sleep(limit);
    this.color();
  };

  heapSort = async () => {
    const { visualizationSpeed } = this.state;
    const animation = await heapSortAglo.heapSort(this.props.array);
    let limit = await this.cal(animation.length);
    let totalLimit =
      limit + (await this.calColorSpeed(this.state.array.length));
    await this.props.onchangeStateOfHidden(totalLimit);

    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName(
        "theBar " + this.props.id
      );
      const flag = animation[i][1];
      if (flag == false) {
        const secondBarIndex = animation[i][0];
        const firstBarIndex = animation[i][0];
        const secondBar = arrayBar[secondBarIndex].style;
        const firstBar = arrayBar[firstBarIndex].style;

        let targetColor = `#${this.state.defaultColor}`;
        let defaultColor = `#${this.state.chosenColor}`;
        if (animation[i][2] === "set") {
          setTimeout(() => {
            secondBar.backgroundColor = targetColor;
            firstBar.backgroundColor = targetColor;
          }, i * visualizationSpeed);
        } else {
          setTimeout(() => {
            secondBar.backgroundColor = defaultColor;
            firstBar.backgroundColor = defaultColor;
          }, i * visualizationSpeed);
        }
      } else {
        const targetBarIndex = animation[i][0];
        const targetBarValue = animation[i][2];
        const targetBar = arrayBar[targetBarIndex].style;
        setTimeout(() => {
          targetBar.height = `${targetBarValue}px`;
        }, i * visualizationSpeed);
      }
    }
    await this.sleep(limit);
    this.color();
  };

  testPerformance = () => {
    console.time("yes");
    for (let i = 0; i < 100000; i++) {
      for (let j = 0; j < i + i; j++) {}
    }
    console.timeEnd("yes");
  };

  mergeSort = async () => {
    const { visualizationSpeed } = this.state;
    // hide the navbar here

    const animation = await mergeSortingAlgo.mergeSort(this.state.array);
    //console.log(animation);
    let limit = await this.cal(animation.length);
    let totalLimit =
      limit + (await this.calColorSpeed(this.state.array.length));
    //  await this.props.onSortingInfo(   "O(n²)",  "O¹", this.millisToMinutesAndSeconds(limit) );
    await this.props.onchangeStateOfHidden(totalLimit);
    console.log("this is the limit ", totalLimit);
    let one = 0;
    let two = 0;
    let three = 0;
    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName(
        "theBar " + this.props.id
      );
      // const arrayBar = document.querySelectorAll(".theBar-1");
      const flag = animation[i][1];
      if (flag == false) {
        const secondBarIndex = animation[i][0];
        const firstBarIndex = animation[i][2];
        const secondBar = arrayBar[secondBarIndex].style;
        const firstBar = arrayBar[firstBarIndex].style;

        let targetColor = `#${this.state.defaultColor}`;
        let defaultColor = `#${this.state.chosenColor}`;
        console.log("target color ", targetColor);
        if (animation[i][3] == "set") {
          setTimeout(() => {
            //   this.props.onHelper(i);
            secondBar.backgroundColor = targetColor;
            firstBar.backgroundColor = targetColor;
          }, i * visualizationSpeed);
        } else {
          setTimeout(() => {
            //   this.props.onHelper(i);
            secondBar.backgroundColor = defaultColor;
            firstBar.backgroundColor = defaultColor;
          }, i * visualizationSpeed);
        }
      } else {
        const targetBarIndex = animation[i][0];
        const targetBarValue = animation[i][2];
        const targetBar = arrayBar[targetBarIndex].style;
        setTimeout(() => {
          // this.props.onHelper(i);
          targetBar.height = `${targetBarValue}px`;
        }, i * visualizationSpeed);
      }
    }
    await this.sleep(limit);
    this.color();
  };

  radixSort = async () => {
    const { visualizationSpeed } = this.state;

    const animation = await radixSortAlgo.radixSort(this.state.array);

    let limit = await this.cal(animation.length);
    let totalLimit =
      limit + (await this.calColorSpeed(this.state.array.length));
    await this.props.onchangeStateOfHidden(totalLimit);

    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName(
        "theBar " + this.props.id
      );

      // const arrayBar = document.querySelectorAll(".theBar-1");
      const flag = animation[i][1];
      if (flag == false) {
        const secondBarIndex = animation[i][0];
        const firstBarIndex = animation[i][2];
        const secondBar = arrayBar[secondBarIndex].style;
        const firstBar = arrayBar[firstBarIndex].style;

        let targetColor = `#${this.state.defaultColor}`;
        let defaultColor = `#${this.state.chosenColor}`;
        if (animation[i][3] == "set") {
          setTimeout(() => {
            secondBar.backgroundColor = targetColor;
            firstBar.backgroundColor = targetColor;
          }, i * visualizationSpeed);
        } else {
          setTimeout(() => {
            secondBar.backgroundColor = defaultColor;
            firstBar.backgroundColor = defaultColor;
          }, i * visualizationSpeed);
        }
      } else {
        const targetBarIndex = animation[i][0];
        const targetBarValue = animation[i][2];
        const targetBar = arrayBar[targetBarIndex].style;
        setTimeout(() => {
          targetBar.height = `${targetBarValue}px`;
        }, i * visualizationSpeed);
      }
    }
    await this.sleep(limit);
    this.color();
  };

  insertionSort = async () => {
    const { visualizationSpeed } = this.state;
    const animation = await insertoinSortingAlgo.insertionSort(
      this.state.array
    );
    let limit = await this.cal(animation.length);
    let totalLimit =
      limit + (await this.calColorSpeed(this.state.array.length));
    await this.props.onchangeStateOfHidden(totalLimit);
    // await this.props.onSortingInfo(  "O(n²)",  "O¹",  this.millisToMinutesAndSeconds(limit) );
    let one = 0;
    let two = 0;
    let three = 0;

    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName(
        "theBar " + this.props.id
      );
      // const arrayBar = document.querySelectorAll(".theBar-1");
      const flag = animation[i][1];
      if (flag == false) {
        const secondBarIndex = animation[i][0];
        const firstBarIndex = animation[i][2];
        const secondBar = arrayBar[secondBarIndex].style;
        const firstBar = arrayBar[firstBarIndex].style;

        let targetColor = `#${this.state.defaultColor}`;
        let defaultColor = `#${this.state.chosenColor}`;
        if (animation[i][3] == "set") {
          setTimeout(() => {
            //     this.props.onHelper(i);
            secondBar.backgroundColor = targetColor;
            firstBar.backgroundColor = targetColor;
          }, i * visualizationSpeed);
        } else {
          setTimeout(() => {
            //   this.props.onHelper(i);
            secondBar.backgroundColor = defaultColor;
            firstBar.backgroundColor = defaultColor;
          }, i * visualizationSpeed);
        }
      } else {
        const targetBarIndex = animation[i][0];
        const targetBarValue = animation[i][2];
        const targetBar = arrayBar[targetBarIndex].style;
        setTimeout(() => {
          // this.props.onHelper(i);
          targetBar.height = `${targetBarValue}px`;
        }, i * visualizationSpeed);
      }
    }
    await this.sleep(limit);
    this.color();
  };

  bubbleSort = async () => {
    const { visualizationSpeed } = this.state;
    const animation = await bubbleSortingAlgo.bubbleSort(this.state.array);
    let limit = await this.cal(animation.length);
    let totalLimit =
      limit + (await this.calColorSpeed(this.state.array.length));
    await this.props.onchangeStateOfHidden(totalLimit);

    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName(
        "theBar " + this.props.id
      );

      const flag = animation[i][1];
      if (flag == false) {
        const secondBarIndex = animation[i][0];
        const firstBarIndex = animation[i][2];

        const secondBar = arrayBar[secondBarIndex].style;
        const firstBar = arrayBar[firstBarIndex].style;

        let targetColor = "white";
        let defaultColor = "blue";
        if (animation[i][3] == "set") {
          setTimeout(() => {
            secondBar.backgroundColor = targetColor;
            firstBar.backgroundColor = targetColor;
          }, i * visualizationSpeed);
        } else {
          setTimeout(() => {
            secondBar.backgroundColor = defaultColor;
            firstBar.backgroundColor = defaultColor;
          }, i * visualizationSpeed);
        }
      } else {
        const targetBarIndex = animation[i][0];
        const targetBarValue = animation[i][2];
        const targetBar = arrayBar[targetBarIndex].style;
        setTimeout(() => {
          targetBar.height = `${targetBarValue}px`;
        }, i * visualizationSpeed);
      }
    }
    await this.sleep(limit);
    this.color();
  };

  selectionSort = async () => {
    const { visualizationSpeed } = this.state;
    const animation = selectoinSortAlgo.selectionSort(this.state.array);
    let limit = await this.cal(animation.length);
    let totalLimit =
      limit + (await this.calColorSpeed(this.state.array.length));
    await this.props.onchangeStateOfHidden(totalLimit);
    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName(
        "theBar " + this.props.id
      );
      const flag = animation[i][1];
      if (flag == false) {
        const secondBarIndex = animation[i][0];
        const firstBarIndex = animation[i][2];
        const secondBar = arrayBar[secondBarIndex].style;
        const firstBar = arrayBar[firstBarIndex].style;

        let targetColor = "white";
        let defaultColor = "blue";
        if (animation[i][3] == "set") {
          setTimeout(() => {
            secondBar.backgroundColor = targetColor;
            firstBar.backgroundColor = targetColor;
          }, i * visualizationSpeed);
        } else {
          setTimeout(() => {
            secondBar.backgroundColor = defaultColor;
            firstBar.backgroundColor = defaultColor;
          }, i * visualizationSpeed);
        }
      } else {
        const targetBarIndex = animation[i][0];
        const targetBarValue = animation[i][2];
        const targetBar = arrayBar[targetBarIndex].style;
        setTimeout(() => {
          targetBar.height = `${targetBarValue}px`;
        }, i * visualizationSpeed);
      }
    }
    await this.sleep(limit);
    this.color();
  };

  quickSort = async () => {
    let counter = 1;
    const { visualizationSpeed } = this.state;
    const animation = await quickSortAlgo.quickSort(
      this.state.array,
      0,
      this.state.bars - 1
    );
    console.log(animation);
    let limit = await this.cal(animation.length);
    let totalLimit =
      limit + (await this.calColorSpeed(this.state.array.length));
    await this.props.onchangeStateOfHidden(totalLimit);
    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName(
        "theBar " + this.props.id
      );
      const flag = animation[i][1];
      if (flag == false) {
        const secondBarIndex = animation[i][0];
        const firstBarIndex = animation[i][2];
        const secondBar = arrayBar[secondBarIndex].style;
        const firstBar = arrayBar[firstBarIndex].style;

        let targetColor = `#${this.state.defaultColor}`;
        let defaultColor = `#${this.state.chosenColor}`;
        if (animation[i][3] == "set") {
          setTimeout(() => {
            secondBar.backgroundColor = targetColor;
            firstBar.backgroundColor = targetColor;
          }, i * visualizationSpeed);
        } else {
          setTimeout(() => {
            secondBar.backgroundColor = defaultColor;
            firstBar.backgroundColor = defaultColor;
          }, i * visualizationSpeed);
        }
      } else {
        const targetBarIndex = animation[i][0];
        const targetBarValue = animation[i][2];
        const targetBar = arrayBar[targetBarIndex].style;
        setTimeout(() => {
          targetBar.height = `${targetBarValue}px`;
        }, i * visualizationSpeed);
      }
    }
    await this.sleep(limit);
    this.color();
  };
}

export default memo(sorting);
