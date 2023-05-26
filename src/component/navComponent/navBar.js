import React, { Component, useEffect } from 'react'
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import About from './about';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectDropDown from './selectNavBar'
import RangeSlider from './rangeSlider';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      selectValue: [],
      hidden: false,
      dual: false,
      hidden: false,
      sliderHidden: "auto",
      huge: false,
      animation: false
    };  // initial state valu
  }

  handleSelectionChange = (selectionValue) => {
    this.props.onHandleSelectionChange(selectionValue);
  }

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };


  helper = async (limit, animation, huge) => {
    console.log(limit);
    const sliderColor = document.getElementsByClassName("rangeslider__fill");
    sliderColor[0].style.backgroundColor = "gray";
    console.log(sliderColor[0].style)
    this.setState({ hidden: true, sliderHidden: "none" });
    // add more waiting time if animation is allowed for the delay 
    let counter = 0;
    if (huge == true && animation == true) {
      counter = 1400;
      console.log("yah from inside the condition")
    }
    setTimeout(() => {
      setTimeout(() => {
        this.setState({ hidden: false, sliderHidden: "auto" })
        sliderColor[0].style.backgroundColor = "#7cb342";
      }, global.config.i18n.welcome.en + counter);
    }, 10);

    setTimeout(() => {
      global.config.i18n.welcome.en = 0;
    }, 20);
  }

  handleToggleChangeDual = async (event) => {
    if (event.target.checked == true) {
      await this.setState({ dual: true });
    } else {
      await this.setState({ dual: false });
    }
    this.props.onhandleDual(this.state.dual);
  }

  handleToggleChangeHuge = async (event) => {
    if (event.target.checked == true) {
      //   await this.setState({ huge: true });
      this.props.onhandleHuge(true);
    } else {
      //  await this.setState({ huge: false });
      this.props.onhandleHuge(false);

    }
  }
  handleToggleTheme = async (evnet) => {
    this.props.onhandleTheme();
  }

  changeHiddenState = async (elementState) => {
    this.setState({ hidden: elementState })
  }

  handleVisualSpeed = (speed) => {
    this.props.onHandleVisualSpeed(speed)
  }

  handleHidding() {
    const sliderComponent = document.getElementsByClassName("rangeSlider");
    sliderComponent.style.color = "black"
  }

  handleAnimationChange = (event) => {

    if (event.target.checked == true) {
      this.props.onhandleAnimation(true);
    } else {
      this.props.onhandleAnimation(false);

    }
  }


  render() {

    return (
      <Router>
        <div>
          <Navbar bg="dark" variant='dark' expand="lg" >
            <Container>
              <Navbar.Brand href="/">Hajji Visualizer</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" >

                  <div>
                    <SelectDropDown onDisable={this.state.hidden} id={1} onHandleSelectionChange={this.handleSelectionChange} />
                  </div>
                  <button disabled={this.state.hidden} onClick={this.props.onTriggerSort}>Sort</button>
                  <button disabled={this.state.hidden} onClick={this.props.onReset}  >Reset</button>
                  <button disabled={this.state.hidden}  >temp</button>
                  <p style={{ color: "white" }}>Huge Set< /p>
                    <label className="switch" onChange={this.handleToggleChangeHuge}>
                      <input type="checkbox" disabled={this.state.hidden}></input>
                      <span class="slider"></span>
                    </label>
                    <p style={{ color: "white" }}>Animation< /p>
                      <label className="switch" onChange={this.handleAnimationChange}>
                        <input type="checkbox" disabled={this.state.hidden}></input>
                        <span class="slider"></span>
                      </label>
                      <p style={{ color: "white" }}>Dual Mode< /p>
                        <label className="switch" onChange={this.handleToggleChangeDual}>
                          <input type="checkbox" disabled={this.state.hidden}></input>
                          <span class="slider"></span>
                        </label>
                        <p style={{ color: "white" }}>Dark Mode< /p>
                          <label className="switch" onChange={this.handleToggleTheme}>
                            <input type="checkbox" disabled={this.state.hidden}></input>
                            <span class="slider" ></span>
                          </label>
                          {this.state.dual && <SelectDropDown id={2} onDisable={this.state.hidden} onHandleSelectionChange={this.handleSelectionChange} />}
                          <p style={{ color: "white" }}>Speed</p>
                          <div className='rangeSlider' style={{ pointerEvents: `${this.state.sliderHidden}` }} >
                            <RangeSlider onHandleVisualSpeed={this.handleVisualSpeed}></RangeSlider>
                          </div>

                        </Nav>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>

                </div>
              </Router >
              );
  }
}


