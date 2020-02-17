import React, { Component } from 'react';
import {
    StyleSheet, Text,
    View, TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { SearchBar } from 'react-native-elements';

export default class ListCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            tableHead: ['Biển số', 'Tên xe', 'Màu', 'Chủ',''],
            tableData: []
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
                    <Cell data={state.tableData[i].Plate} textStyle={styles.text} />
                    <Cell data={state.tableData[i].name} textStyle={styles.text} />
                    <Cell data={state.tableData[i].color} textStyle={styles.text} />
                    <Cell data={state.tableData[i].manaUsername} textStyle={styles.text} />
                    <Cell data={listBtn} />
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
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    lockBtn: {
        position: 'relative',
        top: 4,
    },
    deleteBtn: { position: 'relative', top: 4 },
    detailBtn: { position: 'relative', top: 4 },
    btnContainer: { flex: 1, flexDirection: 'row' }

});