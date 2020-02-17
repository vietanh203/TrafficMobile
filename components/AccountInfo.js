import React, { Component } from 'react';
import {
    StyleSheet, Text,
    View, ImageBackground,
    Image, TextInput,
    Dimensions, TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import bgImg from '../assets/bg.jpeg';

const { width: WIDTH } = Dimensions.get('window')
export default class AccountInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPass: false,
            user: {
                username: this.props.route.name,
                name: "",
                SDT: "",
                CMND: "",
                password: "",
                rule: "",
                Plate: []
            }
        }
    }
    showPass = () => {
        if (this.state.showPass) {
            this.setState({ showPass: false })
        } else {
            this.setState({ showPass: true })
        }
    }
    changeText = value => {
        this.setState({ value })
    }
    update = () => {
        const url = 'http://apismarttraffic.servehttp.com/users/' + this.props.route.name;
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.user)
        }).then(response => response.json())
            .then((resJson) => {
                if (resJson) {
                    alert('update successful');
                } else {
                    alert('Update fail.Try again!');
                }
            })
            .catch(error => console.log(error))

    }
    componentDidMount() {
        const url = 'http://apismarttraffic.servehttp.com/users/' + this.props.route.name;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    user: responseJson[0]
                })
            })
            .catch(error => console.log(error))

    }
    render() {
        // console.log(this.state.user);
        return (
            <ImageBackground source={bgImg} style={styles.bgContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>ACCOUNT INFOMATION</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name={'ios-person'} size={28}
                        color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.textInput}
                        value={this.state.user.name}
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => this.setState(currentState => ({ user: {...currentState.user, name } }))}
                    />
                </View><View style={styles.inputContainer}>
                    <Ionicons name={'ios-card'} size={28}
                        color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.textInput}
                        value={this.state.user.CMND}
                        underlineColorAndroid='transparent'
                        onChangeText={(CMND) => currentState => ({ user: {...currentState.user, CMND } })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name={'ios-call'} size={28}
                        color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.textInput}
                        value={this.state.user.SDT}
                        underlineColorAndroid='transparent'
                        onChangeText={(SDT) => currentState => ({ user: {...currentState.user, SDT } })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name={'ios-lock'} size={28}
                        color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.textInput}
                        value={this.state.user.password}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => currentState => ({ user: {...currentState.user, password } })}

                    />
                    <TouchableOpacity style={styles.eyeBtn}
                        onPress={this.showPass.bind(this)}
                    >
                        <Ionicons name={this.state.showPass ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={this.update.bind(this)}>
                    <Text style={styles.loginText}>Save</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        marginTop: 0,
        fontWeight: '500',
        opacity: 0.5
    },
    inputContainer: {
        marginTop: 10
    },
    textInput: {
        width: WIDTH - 75,
        height: 35,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 4,
        left: 37
    },
    eyeBtn: {
        position: 'absolute',
        top: 4,
        right: 37
    },
    loginBtn: {
        width: WIDTH - 200,
        height: 35,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: '#003366',
        marginTop: 20
    },
    loginText: {
        color: 'rgba(255,225,255,0.7)',
        fontSize: 16,
        textAlign: "center"
    }
});
