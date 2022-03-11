import React from 'react'
import axios from 'axios'
class SurveyForm extends React.Component {
    // begin state
    state = {
        'name': '',
        'colour': '',
        'country': '',
        'fruits': [],
        'allColours': [],
        'allFruits': [],
        'allCountries': [],
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
                'key': 'colours',
                'req': axios.get('colours.json')
            }, 
            {
                'key': 'fruits',
                'req': axios.get('fruits.json')
            },
            {
                'key':'countries',
                'req':  axios.get('countries.json')
            }
        ];

        let responses = {};
        for (let req of requests) {
            responses[req.key] = await req.req
        }



        this.setState({
            'allColours': responses['colours'].data,
            'allFruits': responses['fruits'].data,
            'allCountries': responses['countries'].data,
            'loaded': true
        })
    }

    renderCountries() {

        /*
            <select name="country" value={this.state.country}>
                <option value="singapore">Singapore</option>
                <option value="malaysia">Malaysia</option>
                <option value="indonesia">Indonesia</option>
            </select>
        */

        let countryOptions = this.state.allCountries.map(function (eachCountry) {
            return <option key={eachCountry.value} value={eachCountry.value}>{eachCountry.display}</option>
        })
        return countryOptions;
    }

    renderColours() {
        let allRadioButtons = []; // to store all the created radio buttons
        for (let eachColour of this.state.allColours) {

            // create the radio button JSX 
            let rb = <React.Fragment key={eachColour.value}>
                <input type="radio"
                    name="colours"
                    checked={this.state.colour === eachColour.value}
                    value={eachColour.value}
                    onChange={this.updateFormField}

                />
                <span>{eachColour.display}</span>
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
            <h1>Survey Form</h1>
            <div>
                <label>Name:</label>
                <input type="text" value={this.state.name} name="name" onChange={this.updateFormField} />
            </div>
            <div>
                <label>Colours:</label>
                {this.renderColours()}
            </div>
            <div>
                <label>Country:</label>
                <select name="country" value={this.state.country} onChange={this.updateFormField}>
                    {this.renderCountries()}
                </select>
            </div>
            <div>
                <label>Check your favourite fruits:</label>
                {this.state.allFruits.map((eachFruit) => {
                    return <React.Fragment key={eachFruit.value}>
                        <input type="checkbox"
                            name="fruits"
                            value={eachFruit.value}
                            onChange={this.updateFruits}
                            checked={this.state.fruits.includes(eachFruit.value)}
                        />
                        <span>{eachFruit.display}</span>
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

    updateFruits = (e) => {
        if (this.state.fruits.includes(e.target.value)) {

            // case 1: the value is already in the array
            let indexToRemove = this.state.fruits.findIndex((eachFruit) => {
                return eachFruit === e.target.value
            })

            let cloned = [
                ...this.state.fruits.slice(0, indexToRemove), // slice up but excluding the index that we want to remove
                ...this.state.fruits.slice(indexToRemove + 1) // slice starting one after the index to remove
            ];
            this.setState({
                'fruits': cloned
            })
        } else {
            // case 2: the value is not in the array
            let cloned = [...this.state.fruits, e.target.value];
            this.setState({
                'fruits': cloned
            })
        }



    }
}

export default SurveyForm;