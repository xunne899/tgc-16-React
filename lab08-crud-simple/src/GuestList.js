import React from 'react'

export default class GuestList extends React.Component {
    state = {
        guests: ["Tony Stark", "Peter Parker", "MJ"],
        newGuest: ''
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addGuest = () => {

        // ultra short form:
        // this.setState({
        //     'guests': [...this.state.guests, this.state.newGuest]
        // })

        // clone
        let clone = this.state.guests.slice();

        // modify
        clone.push(this.state.newGuest);

        // replace
        this.setState({
            'guests': clone
        })
    }

    editGuest = (originalGuest) => {
        let newGuestName = prompt("Enter the replacement for " + originalGuest)

        // make a clone of the guests array in the state
        let clone = this.state.guests.slice();

        // find the index to replace
        let indexToReplace = this.state.guests.findIndex(g => g == originalGuest);

        // replace the index inside the cloned array with the new guest
        clone[indexToReplace] = newGuestName;

        // replace the clone into the guest array
        this.setState({
            'guests': clone
        })
    }

    deleteGuest = (guestToDelete) => {
        // clone
        let clone = this.state.guests.slice()
        // modify
        let indexToRemove = this.state.guests.findIndex((guest) => {
            return guest === guestToDelete
        })
        clone.splice(indexToRemove, 1);

        // replace
        this.setState({
            'guests': clone
        })
    }

    render() {
        return (
            <React.Fragment>
                <ul>
                    {
                        this.state.guests.map(g => <li key={g}>
                            {g}
                            <button style={{
                                'marginLeft': '10px'
                            }} onClick={() => {
                                this.editGuest(g)
                            }}>Edit</button>
                            <button style={{ 'marginLeft': '10px' }}
                                onClick={() => {
                                    this.deleteGuest(g)
                                }}
                            >Delete</button>
                        </li>)
                    }
                </ul>
                <label>Guest List:</label>
                <input type="text"
                    name="newGuest"
                    value={this.state.newGuest}
                    onChange={this.updateFormField}
                />
                <button onClick={this.addGuest}>Add</button>
            </React.Fragment>

        )
    }
}