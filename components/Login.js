import React, { Component } from 'react';
import {
    StyleSheet, Text,
    View, ImageBackground,
    Image, TextInput,
    Dimensions, TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import bgImg from '../assets/bg.jpeg';
import logo from '../assets/logo.png';
import AppProvider from './Context';
const { width: WIDTH } = Dimensions.get('window')

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPass: false,
            username: "",
            password: "",
        }
    }

    showPass = () => {
        if (this.state.showPass) {
            this.setState({ showPass: false })
        } else {
            this.setState({ showPass: true })
        }
    }
    navigate = (page) => {
        this.props.navigation.navigate(page, { username: this.state.username });
    }
    login = () => {
        fetch('http://apismarttraffic.servehttp.com/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(response => response.json())
            .then((resJson) => {
                if (resJson.success) {
                    this.props.onChange(resJson.plate);
                    resJson.role == 0 ? this.navigate('Admin') : this.navigate('User');
                } else {
                    alert('Vui lòng thử lại!');
                }
            })
    }
    render() {
        return (
            <ImageBackground source={bgImg} style={styles.bgContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>SMART TRAFFIC</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name={'ios-person'} size={28}
                        color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Username'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({ username })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name={'ios-lock'} size={28}
                        color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })}

                    />
                    <TouchableOpacity style={styles.eyeBtn}
                        onPress={this.showPass.bind(this)}
                    >
                        <Ionicons name={this.state.showPass ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={this.login.bind(this)}>
                    <Text style={styles.loginText}>Đăng nhập</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
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
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        width: 120,
        height: 120,
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        fontWeight: '500',
        opacity: 0.5
    },
    inputContainer: {
        marginTop: 10
    },
    textInput: {
        width: WIDTH - 75,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    eyeBtn: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    loginBtn: {
        width: WIDTH - 200,
        height: 45,
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

const WrapperContext = (props) => {
    return (<AppProvider.Consumer>
        {context => { return <Login {...props} {...context}></Login> }}
    </AppProvider.Consumer>)
}
export default WrapperContext;