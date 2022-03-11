import React from 'react'
import axios from 'axios'
class BookingForm extends React.Component {
    // begin state
    state = {
        'firstname': '',
        'lastname': '',
        'seating': '',
        'smoking': '',
        'appetizer': [],
        'loaded': false
    }
    // end state

    async componentDidMount() {
        // let colourResponse = await axios.get('colours.json');
        // let fruitResponse = await axios.get('fruits.json');
        // let countryResponse = await axios.get('countries.json');

        // let colourRequest = axios.get('colours.json');
        // let fruitRequest= axios.get('fruits.json');
        // let countryRequest = axios.get('countries.json');

        // let colourResponse = await colourRequest;
        // let fruitResponse = await fruitRequest;
        // let countryResponse = await countryRequest;

        let requests = [
            {
                'key': 'seating',
                'req': axios.get('seating.json')
            }, 
            {
                'key': 'smoking',
                'req': axios.get('smoking.json')
            },
            {
                'key': 'appetizer',
                'req':  axios.get('appetizer.json')
            }
        ];

        let responses = {};
        for (let req of requests) {
            responses[req.key] = await req.req
        }



        this.setState({
            'allSeating': responses['seating'].data,
            'allSmoking': responses['smoking'].data,
            'allAppetizer': responses['appetizer'].data,
            'loaded': true
        })
    }

    renderSmoking() {

        /*
            <select name="country" value={this.state.country}>
                <option value="singapore">Singapore</option>
                <option value="malaysia">Malaysia</option>
                <option value="indonesia">Indonesia</option>
            </select>
        */

        let smokingOptions = this.state.allSmoking.map(function (eachSmoking) {
            return <option key={eachSmoking.value} value={eachSmoking.value}>{eachSmoking.display}</option>
        })
        return smokingOptions;
    }

    renderSeating() {
        let allRadioButtons = []; // to store all the created radio buttons
        for (let eachSeating of this.state.allSeating) {

            // create the radio button JSX 
            let rb = <React.Fragment key={eachSeating.value}>
                <input type="radio"
                    name="seating"
                    value={eachSeating.value}  
                    onChange={this.updateFormField}
                    checked={this.state.seating === eachSeating.value}

                />
                <span>{eachSeating.display}</span>
            </React.Fragment>

            // add the radio button to the array
            allRadioButtons.push(rb);
        }
        return allRadioButtons;
    }

    render() {
        if (this.state.loaded) {
            return this.renderForm();
        } else {
            return <React.Fragment>
                Loading, please wait...
            </React.Fragment>

        }
    }

    // begin renderForm
    renderForm() {
        return (<React.Fragment>
            {/* <h1>Booking Form</h1> */}
            <div>
                <label>FirstName:</label>
                <input type="text" value={this.state.name} name="firstname" onChange={this.updateFormField} />
            </div>
            <div>
                <label>LastName:</label>
                <input type="text" value={this.state.name} name="lastname" onChange={this.updateFormField} />
            </div>
            <div>
                <label>Seating:</label>
                {this.renderSeating()}
            </div>
            <div>
                <label>Smoking:</label>
                <select name="smoking" value={this.state.smoking} onChange={this.updateFormField}>
                    {this.renderSmoking()}
                </select>
            </div>
            <div>
                <label>Select your Appetizer:</label>
                {this.state.allAppetizer.map((eachAppetizer) => {
                    return <React.Fragment key={eachAppetizer.value}>
                        <input type="checkbox"
                            name="appetizer"
                            value={eachAppetizer.value}
                            onChange={this.updateAppetizer}
                            checked={this.state.appetizer.includes(eachAppetizer.value)}
                        />
                        <span>{eachAppetizer.display}</span>
                    </React.Fragment>
                })}
            </div>



        </React.Fragment>)
    }
    // end render

    // begin updateformfield
    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // end updateformfield

    updateAppetizer = (e) => {
        if (this.state.appetizer.includes(e.target.value)) {

            // case 1: the value is already in the array
            let indexToRemove = this.state.appetizer.findIndex((eachAppetizer) => {
                return eachAppetizer === e.target.value
            })

            let cloned = [
                ...this.state.appetizer.slice(0, indexToRemove), // slice up but excluding the index that we want to remove
                ...this.state.appetizer.slice(indexToRemove + 1) // slice starting one after the index to remove
            ];
            this.setState({
                'appetizer': cloned
            })
        } else {
            // case 2: the value is not in the array
            let cloned = [...this.state.appetizer, e.target.value];
            this.setState({
                'appetizer': cloned
            })
        }



    }
}

export default BookingForm;