import React, { Component } from 'react';
import {
    StyleSheet, Text, Modal, TouchableHighlight,
    Image, View, TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { SearchBar } from 'react-native-elements';
const unixTS = require('unix-timestamp');
export default class ListFault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            tableHead: ['Ngày', 'Giờ', 'Biển số', 'Chủ xe', ''],
            tableData: [],
            modalVisible: false,
        }
    }
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    getImage = obj => {
        let unixStr = obj.date + " " + obj.time;
        let unixTime = unixTS.fromDate(unixStr);
        console.log(`http://apismarttraffic.servehttp.com/img/${obj.Plate}_${unixTime}.jpg`)
        return (`http://apismarttraffic.servehttp.com/img/${obj.Plate}_${unixTime}.jpg`)

    }
    getFaultByType = type => {
        switch (type) {
            case 0:
                return ('Vượt đèn đỏ + Không nón bảo hiểm');
                break;
            case 1:
                return ('Vượt đèn đỏ');

                break;
            case 2:
                return ('Không nón bảo hiểm');
                break;
            default:
                return '';
        }
    }
    updateSearch = search => {
        this.setState({ search });
        const url = "http://apismarttraffic.servehttp.com/fails/" + search;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    tableData: responseJson.data
                })
            })
            .catch(error => console.log(error))
    };
    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }
    componentDidMount() {
        fetch("http://apismarttraffic.servehttp.com/fails", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    tableData: responseJson.data
                })
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }

    render() {
        const state = this.state;
        const listBtn = (obj) =>
            (
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.detailBtn}
                        onPress={() => { this.toggleModal(!this.state.modalVisible) }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Chi tiết</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.popupContainer} >
                        <Modal animationType={"slide"} transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => { console.log("Modal has been closed.") }}>

                            <View style={styles.modal}>
                                <Image
                                    style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
                                    source={{ uri: this.getImage(obj) }}
                                />
                                <Text style={styles.text}>Lỗi vị phạm : {this.getFaultByType(obj.type)}</Text>
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
                    <Cell data={state.tableData[i].date} textStyle={styles.text} />
                    <Cell data={state.tableData[i].time} textStyle={styles.text} />
                    <Cell data={state.tableData[i].Plate} textStyle={styles.text} />
                    <Cell data={state.tableData[i].user[0].username} textStyle={styles.text} />
                    <Cell data={listBtn(state.tableData[i])} />
                </TableWrapper>);
            table.push(row);
        }

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    {table}
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 55, backgroundColor: '#808B97' },
    text: { margin: 5 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { marginTop: 4, width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    deleteBtn: { position: 'relative', top: 4 },
    detailBtn: { position: 'relative', top: 4 },
    btnContainer: { flex: 1, flexDirection: 'row' },
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