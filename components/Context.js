import React from 'react';
const AppContext = React.createContext({ plate: [] });


class AppProvider extends React.Component {
    static Consumer = AppContext.Consumer;
    state = {
        plate: []
    }

    onChange = (plate) => {
        console.log('123', plate);
        this.setState({
            plate
        });
    }
    render() {
        return (
            <AppContext.Provider value={{ plate: this.state.plate, onChange: this.onChange }}>
                {this.props.children}
            </ AppContext.Provider>
        )
    }

}
export default AppProvider;