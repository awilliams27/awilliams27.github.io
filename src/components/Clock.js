import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Clock extends Component {
	constructor(props) {
		super(props);


		let timeZone = localStorage.getItem('timeZone') || 0;
		this.state = {
			firstClock: new Date(),
			secondClock: new Date(),
			timeZone: timeZone
		};
	}

	//init date objects for clocks
	setClocks = (firstClock, secondClock) => {
		this.setState({
			firstClock: firstClock,
			secondClock: secondClock
		});
	}

	//@param time to add to clocks in seconds
	updateClocks = (timeToAdd) => {
		this.setState({
			firstClock: new Date(this.state.firstClock.getTime() + timeToAdd * 1000),
			secondClock: new Date(this.state.secondClock.getTime() + timeToAdd * 1000)
		});
	}

	//@param timezone set in UTC (e.g. -5 for UTC-5, 3 for UTC+3)
	updateTimeZone = () => {
		const newFirstDate = new Date();
		let newSecondDate = new Date();
		newSecondDate.setTime(newSecondDate.getTime() + Number(this.state.timeZone) * 1000 * 60 * 60);
		this.setState({
			firstClock: newFirstDate,
			secondClock: newSecondDate
		});
	}

	setTimeZone = (event, index, value) => {
		const newFirstDate = new Date();
		let newSecondDate = new Date();
		newSecondDate.setTime(newSecondDate.getTime() + Number(value) * 1000 * 60 * 60);
		this.setState({
			firstClock: newFirstDate,
			timeZone: value,
			secondClock: newSecondDate
		});
		localStorage.setItem('timeZone', value);
	}

	addZero = i => {
	    if (i < 10) {
	        i = "0" + i;
	    }
    	return i;
	}

	componentWillMount() {
		this.updateTimeZone();
	}

	render() {
		const tableStyle = {
			textAlign: 'center',
			justifyContent: 'center'
		};

		const firstHours = this.addZero(this.state.firstClock.getHours() % 12 || 12);
		const firstMinutes = this.addZero(this.state.firstClock.getMinutes());
		const secondHours = this.addZero(this.state.secondClock.getHours() % 12 || 12);
		const secondMinutes = this.addZero(this.state.secondClock.getMinutes());

		let twentyFour = Array(12).fill().map((e,i)=>i+1);

		let firstClockBlowOut = twentyFour.map((i) => {
			let newFirstTime = new Date(this.state.firstClock.getTime() + 15 * i * 60000);
			let newSecondTime = new Date(this.state.secondClock.getTime() + 15 * i * 60000);
			let newFirstHours = newFirstTime.getHours() % 12 || 12;
			const newFirstMinutes = this.addZero(newFirstTime.getMinutes());
			let newSecondHours = newSecondTime.getHours() % 12 || 12;
			const newSecondMinutes = this.addZero(newSecondTime.getMinutes());
			newFirstHours = this.addZero(newFirstHours);
			newSecondHours = this.addZero(newSecondHours);
			return (
				<TableRow key={i}>
			        <TableRowColumn>{newFirstHours}:{newFirstMinutes}</TableRowColumn>
			        <TableRowColumn>{newSecondHours}:{newSecondMinutes}</TableRowColumn>
      			</TableRow>
			)
		});

		let secondClockBlowOut = twentyFour.map((i) => {
			let newFirstTime = new Date(this.state.firstClock.getTime() + 15 * i * 60000);
			let newSecondTime = new Date(this.state.secondClock.getTime() + 15 * i * 60000);
			let newFirstHours = newFirstTime.getHours() % 12 || 12;
			const newFirstMinutes = this.addZero(newFirstTime.getMinutes());
			let newSecondHours = newSecondTime.getHours() % 12 || 12;
			const newSecondMinutes = this.addZero(newSecondTime.getMinutes());
			newFirstHours = this.addZero(newFirstHours);
			newSecondHours = this.addZero(newSecondHours);
			return (
				<TableRow key={i}>
			        <TableRowColumn>{newSecondHours}:{newSecondMinutes}</TableRowColumn>
			        <TableRowColumn>{newFirstHours}:{newFirstMinutes}</TableRowColumn>
      			</TableRow>
			)
		});

		const clockStyle = {
  			border: '4px solid #0088cc',
  			borderRadius: '50%',
  			height: '250px',
  			width: '250px',
  			margin: '0px auto'
  		};

		let firstClockHourDegrees = {
			transform: 'rotate(' + Number(firstHours / 12 * 360 + firstMinutes * 6 / 12) + 'deg)',
			margin: '-75px -2px 0',
  			padding: '75px 2px 0'
		};

		let secondClockHourDegrees = {
			transform: 'rotate(' + Number(secondHours / 12 * 360 + secondMinutes * 6 / 12) + 'deg)',
			margin: '-75px -2px 0',
  			padding: '75px 2px 0'
		};
		let firstClockMinuteDegrees = {
			transform: 'rotate(' + Number(firstMinutes * 6) + 'deg)',
			margin: '-100px -2px 0',
  			padding: '100px 2px 0'
		};

		let secondClockMinuteDegrees = {
			transform: 'rotate(' + Number(secondMinutes * 6) + 'deg)',
			margin: '-100px -2px 0',
  			padding: '100px 2px 0'
		};
		return (
			<div className="wrapper">
				<SelectField
					floatingLabelText="Select other person's time zone"
					value={this.state.timeZone}
			        onChange={this.setTimeZone}
			        maxHeight={200}
			        className="select-field"
			      >
			        <MenuItem value={-10.5} primaryText="-10.5" />
			        <MenuItem value={10.5} primaryText="+10.5" />
      			</SelectField>
      			<div className="clock-container">
      				<div style={clockStyle} className="clock">
	      				<span style={firstClockHourDegrees} className="clock-one__hour clockhand"></span>
	      				<span style={firstClockMinuteDegrees} className="clock-one__minutes clockhand"></span>
      				</div>
      				<div>Your Current Time: {firstHours}:{firstMinutes}</div>
      			</div>

      			<div className="clock-container">
      				<div style={clockStyle} className="clock">
	      				<span style={secondClockHourDegrees} className="clock-two__hour clockhand"></span>
	      				<span style={secondClockMinuteDegrees} className="clock-two__minutes clockhand"></span>
      				</div>
      				<div>Their Current Time: {secondHours}:{secondMinutes}</div>
      			</div>
				<div style={tableStyle} className="table">	
					
					<Table>
					    <TableHeader>
					      <TableRow>
					        <TableHeaderColumn>Your Time</TableHeaderColumn>
					        <TableHeaderColumn>Their Time</TableHeaderColumn>
					      </TableRow>
					    </TableHeader>
					    <TableBody>
							{firstClockBlowOut}
						</TableBody>
					</Table>
				</div>
				<div style={tableStyle} className="table">
					
					<Table>
					    <TableHeader>
					      <TableRow>
					        <TableHeaderColumn>Their Time</TableHeaderColumn>
					        <TableHeaderColumn>Your Time</TableHeaderColumn>
					      </TableRow>
					    </TableHeader>
					    <TableBody>
							{secondClockBlowOut}
						</TableBody>
					</Table>
				</div>
			</div>
		)
	}
}

export default Clock;