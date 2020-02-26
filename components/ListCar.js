import React, { Component } from 'react';
import {
    StyleSheet, Text, Dimensions,
    View, TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { SearchBar } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('window')
export default class ListCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            tableHead: ['Biển số', 'Tên xe', 'Màu', 'Chủ xe', ''],
            tableData: [],
            car: {
                Plate: "",
                label: "",
                color: "",
                number: "",
                manaUsername: "",
                name: ""
            }
        }
    }
    updateSearch = search => {
        this.setState({ search });
        const url = "http://apismarttraffic.servehttp.com/cars/" + search;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    tableData: responseJson
                })
            })
            .catch(error => console.log(error))
    };
    addCar = () => {
        fetch('http://apismarttraffic.servehttp.com/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.car)
        }).then(response => response.json())
            .then((resJson) => {
                console.log(resJson);
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        fetch("http://apismarttraffic.servehttp.com/cars", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    tableData: responseJson
                })
            })
            .catch(error => console.log(error))
    }

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    render() {
        const state = this.state;
        const listBtn = (
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.deleteBtn}>
                    <Ionicons name={'ios-close-circle'} size={26} color={'rgba(298,20,20,0.7)'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailBtn}>
                    <Ionicons name={'ios-information-circle'} size={26} color={'rgba(0,0,0,0.7)'} />
                </TouchableOpacity>
            </View>
        );
        const table = [];
        for (var i in state.tableData) {
            row = (
                <TableWrapper key={i} style={styles.row}>
                    <Cell data={state.tableData[i].Plate} textStyle={{ width: 85, color: 'red', fontSize: 13 }} />
                    <Cell data={state.tableData[i].name} textStyle={{ width: 85, paddingLeft: 1 }} />
                    <Cell data={state.tableData[i].color} textStyle={styles.text} />
                    <Cell data={state.tableData[i].manaUsername} textStyle={styles.text} />
                    <Cell data={listBtn} />
                </TableWrapper>);
            table.push(row);
        }

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Nhập biển số hoặc chủ xe"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }} >
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    {table}
                </Table>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Thêm xe mới</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View >
                        <Ionicons name={'ios-person'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Chủ xe"
                            underlineColorAndroid='transparent'
                            onChangeText={(manaUsername) => this.setState(currentState => ({ car: { ...currentState.car, manaUsername } }))}
                        />
                    </View>
                    <View>
                        <Ionicons name={'ios-barcode'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Biển số"
                            underlineColorAndroid='transparent'
                            onChangeText={(Plate) => this.setState(currentState => ({ car: { ...currentState.car, Plate } }))}

                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View >
                        <Ionicons name={'ios-card'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Hãng xe"
                            underlineColorAndroid='transparent'
                            onChangeText={(label) => this.setState(currentState => ({ car: { ...currentState.car, label } }))}
                        />
                    </View>
                    <View>
                        <Ionicons name={'ios-card'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Tên xe"
                            underlineColorAndroid='transparent'
                            onChangeText={(name) => this.setState(currentState => ({ car: { ...currentState.car, name } }))}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View >
                        <Ionicons name={'ios-color-palette'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Màu sắc"
                            underlineColorAndroid='transparent'
                            onChangeText={(color) => this.setState(currentState => ({ car: { ...currentState.car, color } }))}
                        />
                    </View>
                    <View>
                        <Ionicons name={'ios-card'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Số"
                            underlineColorAndroid='transparent'
                            onChangeText={(number) => this.setState(currentState => ({ car: { ...currentState.car, number } }))}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={this.addCar.bind(this)}>
                    <Text style={styles.loginText}>Thêm</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 40, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 0, textAlign: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1', height: 35 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    lockBtn: {
        position: 'relative',
        top: 4,
    },
    deleteBtn: { position: 'relative', top: 4 },
    detailBtn: { position: 'relative', top: 4 },
    btnContainer: { flex: 1, flexDirection: 'row' },
    logoText: {
        color: 'black',
        fontSize: 20,
        marginTop: 10,
        fontWeight: '500',
        opacity: 0.5,
        textAlign: 'center'
    },
    inputContainer: {
        marginTop: 10,
        flexDirection: 'row'
    },
    textInput: {
        width: WIDTH / 2 - 25,
        height: 35,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 35,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 12
    },
    inputIcon: {
        position: 'absolute',
        top: 4,
        left: 20
    },
    loginBtn: {
        width: WIDTH / 2 - 100,
        height: 25,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: '#003366',
        marginTop: 20,
        alignItems: 'center',
        marginLeft: WIDTH / 2 - 45
    },
    loginText: {
        color: 'rgba(255,225,255,0.7)',
        fontSize: 16,
        textAlign: "center"
    }

});