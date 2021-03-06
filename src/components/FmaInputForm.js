// FmaInputForm.js
import React from 'react';
import FmaFormRow from './FmaFormRow'
import DownloadCSV from './DownloadCSV'

class FmaInputForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {rows: props.data, subID: '', date: new Date()}
		this.props = props;
		this.getCSVData = this.getCSVData.bind(this);
		this.scoreChanged = this.scoreChanged.bind(this);
		this.subjectChanged = this.subjectChanged.bind(this);
		this.dateChanged = this.dateChanged.bind(this);
		this.getComment = this.getComment.bind(this);
		this.calculateFmaLeTotal = this.calculateFmaLeTotal.bind(this);
		this.calculateFmaUeTotal = this.calculateFmaUeTotal.bind(this);
		this.calculateFmaSenseTotal = this.calculateFmaSenseTotal.bind(this);
		this.getExtremityType = this.getExtremityType.bind(this);
		this.getCurrentDate = this.getCurrentDate.bind(this);
	}

	subjectChanged(event) {
		this.setState({subID: event.target.value});
	}

	dateChanged(event) {
		this.setState({date: event.target.value});
	}

	scoreChanged(item_no, value) {
		var new_rows = this.state.rows;
		if (item_no > 17 && item_no < 51) {
			item_no += 1;
		}
		else if (item_no > 50) {
			item_no += 2;
		}
		new_rows[item_no]['score'] = value
		this.setState({rows: new_rows});
	}

	getComment(score, comments) {
		return comments.hasOwnProperty(score) ? comments[score] : comments['default'];
	}

	calculateFmaLeTotal() {
		var total = 0;
		for (var i = 0; i < this.state.rows.length ; i++) {
			var item_no = Number(this.state.rows[i]['item_no']);
			if (item_no >= 1 && item_no <= 17 && item_no !== -1) {
				total += Number(this.state.rows[i]['score']);
			}
		}
		return total;
	}

	calculateFmaUeTotal() {
		var total = 0;
		for (var i = 0; i < this.state.rows.length; i++) {
			var item_no = Number(this.state.rows[i]['item_no']);
			if (item_no >= 18 && item_no <= 50 && item_no !== -1) {
				total += Number(this.state.rows[i]['score']);
			}
		}
		return total;
	}

	calculateFmaSenseTotal() {
		var total = 0;
		for (var i = 0; i < this.state.rows.length; i++) {
			var item_no = Number(this.state.rows[i]['item_no']);
			if (item_no >= 51 && item_no <= 62 && item_no !== -1) {
				total += Number(this.state.rows[i]['score']);
			}
		}
		return total;
	}

	getExtremityType(item_no) {
		if (item_no <= 17) {
			return "LE";
		}
		else if (item_no <= 50){
			return "UE";
		}
		else {
			return "SENSE";
		}
	}

	getCSVData() {
		var date = this.state.date;
		var date_obj = new Date(date);
		var day = date_obj.getDate() + 1;
		var month = date_obj.getMonth() + 1;
		var year = date_obj.getFullYear();

		var subID = this.state.subID;
		var total_le = this.calculateFmaLeTotal();
		var total_ue = this.calculateFmaUeTotal();
		var total_sense = this.calculateFmaSenseTotal();
		var total_score = total_le + total_ue + total_sense;

		var data = this.state.rows.map(function(item) { 
			var new_item = {
				SubID: subID,
				Date: date,
				Year: year,
				Month: month,
				Day: day,
				Item_no: item.item_no,
				Category: item.category,
				Posture: item.posture,
				Movement: item.movement,
				Score: item.score,
				Comment: this.getComment(item.score, item.comments),
				Scale: this.getExtremityType(item.item_no),
				FMA_UE_Total: total_le,
				FMA_LE_Total: total_ue,
				FMA_SENSE_Total: total_sense,
				FMA_Total: total_score
			};
			return new_item; 
		}, this, subID, day, month, year, date);

		data = data.filter(function (item) {
			return Number(item.Item_no) !== -1;
		});

		return data;
	}

	getCurrentDate() {
		var d = new Date(),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}

	render() {
		var rows = [];
		for (var i = 0; i < this.state.rows.length; i++) {
			var data = this.state.rows[i];
		  rows.push(<FmaFormRow data={data} getComment={this.getComment} scoreChanged={this.scoreChanged}/>);
		}

		return(
			<div className="container" style={{marginTop: 100 + 'px'}}>
				<div className="form-title">
					<h1>FUGL-MEYER ASSESSMENT {this.props.extremity}</h1>
				</div>
				<div className="basic-info">
					<div className="subject_div">
						<label>Subject Id</label>
						<input type="text" className="form-control is-valid" placeholder="Subject Id" value={this.state.subID} onChange={this.subjectChanged} required />
					</div>
					<div className="date_div">
						<label>Date</label>
						<input type="date" className="form-control" value={this.getCurrentDate()} placeholder="Date" min="2010-01-01" max="2099-12-31" onChange={this.dateChanged} required />
					</div>
				</div>

				<table className="table table-bordered">
					<thead>
						<tr>
							<th className="row-index">Item</th>
							<th>Category</th>
							<th>Posture</th>
							<th>Movement</th>
							<th>Score</th>
							<th>Comments</th>
						</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</table>
				<div className="download-btn">
					<DownloadCSV dataHandler={this.getCSVData} filename={"FMA_" + this.props.extremity.replace(/ +/g, "_")+ ".csv"} is_enabled={this.state.subID !== '' && this.state.date !== ''}/>
				</div>
			</div>
			);
	}
}

export default FmaInputForm;
