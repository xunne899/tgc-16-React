import React from 'react'

class SurveyForm extends React.Component {
    // begin state
    state = {
        'name': '',
        'colour': '',
        'country': '',
        'fruits':[]
    }
    // end state

    colours = [
        {
            'display':'赤',
            'value':'red'
        },
        {
            'display':'Green',
            'value': 'green'
        },
        {
            'display':'Blue',
            'value':'blue'
        },
        {
            'display': 'Yellow',
            'value': 'yellow'
        }
    ]

    countries = [
        {
            'display':'Singapore',
            'value':'singapore'
        },
        {
            'display':'Malaysia',
            'value':'malaysia'
        },
        {
            'display':'Indonesia',
            'value':'indonesia'
        }
    ]


    fruits = [
        {
            'display':'Apple',
            'value':'apple'
        },
        {
            'display':'Banana',
            'value':'banana'
        },
        {
            'display':'Orange',
            'value':'orange'
        }
    ]
    renderCountries() {

        /*
            <select name="country" value={this.state.country}>
                <option value="singapore">Singapore</option>
                <option value="malaysia">Malaysia</option>
                <option value="indonesia">Indonesia</option>
            </select>
        */

        let countryOptions = this.countries.map(function(eachCountry){
            return <option key={eachCountry.value} value={eachCountry.value}>{eachCountry.display}</option>
        })
        return countryOptions;
    }

    renderColours(){
       let allRadioButtons = []; // to store all the created radio buttons
       for (let eachColour of this.colours) {

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

    // begin render
    render() {
        return (<React.Fragment>
            <h1>Survey Form</h1>
            <div>
                <label>Name:</label>
                <input type="text" value={this.state.name} name="name" onChange={this.updateFormField} />
            </div>
            <div>
                <label>Colours:</label>
                { this.renderColours()}
            </div>
            <div>
                <label>Country:</label>
                <select name="country" value={this.state.country} onChange={this.updateFormField}>
                    {this.renderCountries()}    
                </select>
            </div>
            <div>
                <label>Check your favourite fruits:</label>
                { this.fruits.map((eachFruit)=>{
                    return <React.Fragment key={eachFruit.value}>
                        <input type="checkbox"
                                name="fruits"
                                value={eachFruit.value}
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
            [e.target.name] : e.target.value
        })
    }
   

    // end updateformfield
    updateFruits = (e) => {

      
        if (this.state.fruits.includes(e.target.value)) {
              // case 1: the value is already in the array
              let indexToRemove = this.state.fruits.findIndex((eachFruit)=>{
                  return eachFruit.value === e.target.value
              })
              console.log("indexToRemove")
              let cloned =[
                  ...this.state.fruits.slice(0,indexToRemove),
                  ...this.state.fruits.slice(indexToRemove+1)
              ] ;
                this.setState({
                'fruits':cloned
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