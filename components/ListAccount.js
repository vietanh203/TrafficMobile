import React, { Component } from 'react';
import {
    StyleSheet, Text, Dimensions,
    TextInput, Modal, TouchableHighlight,
    View, TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { SearchBar } from 'react-native-elements';
const { width: WIDTH } = Dimensions.get('window')

export default class ListAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            showPass: false,
            tableHead: ['Name', 'CMND', 'SDT', ''],
            tableData: [],
            modalVisible: false,
            user: {
                username: "",
                name: "",
                SDT: "",
                CMND: "",
                password: "",
                Plate: [],
                rule: "1"
            }
        }
    }
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    updateSearch = search => {
        this.setState({ search });
        if (search != null) {
            this.setState({ search });
            const searchData = [];
            for (var i in this.state.tableData) {
                if (this.state.tableData[i].CMND == search || this.state.tableData[i].SDT == search) {
                    searchData.push(this.state.tableData[i]);
                }
            }
            this.setState({ tableData: searchData });
        }
    };
    deleteUser = username => {
        fetch(`http://apismarttraffic.servehttp.com/users/${username}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        fetch("http://apismarttraffic.servehttp.com/users", {
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
    showPass = () => {
        if (this.state.showPass) {
            this.setState({ showPass: false })
        } else {
            this.setState({ showPass: true })
        }
    }
    update = (username) => {
        const url = 'http://apismarttraffic.servehttp.com/users/' + username;
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
    addUser = () => {
        console.log(this.state.user);
        fetch(`http://apismarttraffic.servehttp.com/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.user)
        }).then(response => response.json())
            .then((resJson) => {
                console.log(resJson);
            })
            .catch(error => console.log(error))
    }

    render() {
        const state = this.state;
        const listBtn = (obj) => (
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.deleteBtn}>
                    <Ionicons name={'ios-close-circle'} size={22} color={'rgba(298,20,20,0.7)'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editBtn}
                    onPress={() => { this.toggleModal(!this.state.modalVisible) }}>
                    <Ionicons name={'ios-create'} size={22} color={'rgba(20,20,198,0.7)'} />
                </TouchableOpacity>
                <View style={styles.popupContainer} >
                    <Modal animationType={"slide"} transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { console.log("Modal has been closed.") }}>
                        <View style={styles.modal}>
                            <View style={styles.logoContainer}>
                                <Text style={styles.logoText}>THÔNG TIN TÀI KHOẢN</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Ionicons name={'ios-person'} size={28}
                                    color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    value={obj.name}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(name) => this.setState(currentState => ({ user: { ...currentState.user, name } }))}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Ionicons name={'ios-card'} size={28}
                                    color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    value={obj.CMND}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(CMND) => currentState => ({ user: { ...currentState.user, CMND } })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Ionicons name={'ios-call'} size={28}
                                    color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    value={obj.SDT}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(SDT) => currentState => ({ user: { ...currentState.user, SDT } })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Ionicons name={'ios-lock'} size={28}
                                    color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    value={obj.password}
                                    secureTextEntry={this.state.showPass}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(password) => currentState => ({ user: { ...currentState.user, password } })}

                                />
                                <TouchableOpacity style={styles.eyeBtn}
                                    onPress={this.showPass.bind(this)}
                                >
                                    <Ionicons name={this.state.showPass ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.loginBtn}>
                                <Text style={styles.loginText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableHighlight style={styles.touchableButton}
                                onPress={() => { this.toggleModal(!this.state.modalVisible) }}>
                                <Text style={styles.btnText}>Đóng</Text>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>
            </View>
        );
        const table = [];
        for (var i in state.tableData) {
            row = (
                <TableWrapper key={i} style={styles.row}>
                    <Cell data={state.tableData[i].name} style={{ width: (WIDTH - 60) / 3 }} textStyle={{ textAlign: 'center' }} />
                    <Cell data={state.tableData[i].CMND} style={{ width: (WIDTH - 60) / 3 }} textStyle={{ textAlign: 'center' }} />
                    <Cell data={state.tableData[i].SDT} style={{ width: (WIDTH - 60) / 3 }} textStyle={{ textAlign: 'center' }} />
                    <Cell data={listBtn(state.tableData[i])} style={{ width: 60 }} />
                </TableWrapper>);
            table.push(row);
        }
        const widthArr = [(WIDTH - 60) / 3, (WIDTH - 60) / 3, (WIDTH - 60) / 3, 60];
        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Tìm SĐT hoặc CMND"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
                    <Row data={state.tableHead} style={styles.head} widthArr={widthArr} textStyle={styles.text} />
                    {table}
                </Table>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Thêm tài khoản</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View >
                        <Ionicons name={'ios-person'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Tên đăng nhập"
                            underlineColorAndroid='transparent'
                            onChangeText={(username) => this.setState(currentState => ({ user: { ...currentState.user, username } }))}
                        />
                    </View>
                    <View>
                        <Ionicons name={'ios-lock'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Mật khẩu"
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState(currentState => ({ user: { ...currentState.user, password } }))}

                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View >
                        <Ionicons name={'ios-barcode'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Họ tên"
                            underlineColorAndroid='transparent'
                            onChangeText={(name) => this.setState(currentState => ({ user: { ...currentState.user, name } }))}
                        />
                    </View>
                    <View>
                        <Ionicons name={'ios-barcode'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="CMND"
                            underlineColorAndroid='transparent'
                            onChangeText={(CMND) => this.setState(currentState => ({ user: { ...currentState.user, CMND } }))}

                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View >
                        <Ionicons name={'ios-barcode'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Số điện thoại"
                            underlineColorAndroid='transparent'
                            onChangeText={(SDT) => this.setState(currentState => ({ user: { ...currentState.user, SDT } }))}
                        />
                    </View>
                    <View>
                        <Ionicons name={'ios-barcode'} size={28}
                            color={'rgba(298,20,20,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Biển số"
                            underlineColorAndroid='transparent'
                            onChangeText={(Plate) => this.setState(currentState => ({ user: { ...currentState.user, Plate: [Plate] } }))}

                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={this.addUser.bind(this)}>
                    <Text style={styles.loginText}>Thêm</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 40, backgroundColor: '#fff' },
    head: { height: 35, backgroundColor: '#808B97' },
    text: { margin: 4, textAlign: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1', height: 30 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    lockBtn: {
        position: 'relative',
        top: 4,
    },
    deleteBtn: { position: 'relative', left: 3 },
    editBtn: { position: 'relative', left: 10 },
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
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        padding: 10,
    },
    touchableButton: {
        width: '70%',
        padding: 10,
        backgroundColor: '#f06292',
        marginBottom: 10,
        marginTop: 30,
    },

});