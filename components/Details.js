import React, { Component } from 'react';
import {
    StyleSheet, Text, Modal, TouchableHighlight,
    Image, View, TouchableOpacity, Alert, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-date-ranges';
import { PieChart } from 'react-native-chart-kit';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { SearchBar } from 'react-native-elements';
import { Button } from 'react-native-paper';
const unixTS = require('unix-timestamp');
const { width: WIDTH } = Dimensions.get('window')

function getImage(obj) {
    let unixStr = obj.date + " " + obj.time;
    let unixTime = unixTS.fromDate(unixStr);
    let url = `http://apismarttraffic.servehttp.com/img/${obj.Plate}_${unixTime}.jpg`;
    console.log("abc");
    return (<Image
        style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
        source={{ uri: url }}
    />)
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
function Detail(props) {
    let modalVisible = false;
    const openModal = () => {
        modalVisible = true;
        console.log(modalVisible);
    }
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={{ position: 'relative', top: 4 }}
                onPress={openModal.bind(this)}>
                <View style={{ alignItems: 'center', backgroundColor: '#78B7BB' }}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Xem</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20
            }} >
                <Modal animationType={"slide"} transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => { modalVisible = false }}>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: '#2196f3',
                        justifyContent: 'center',
                        padding: 10
                    }}>
                        <getImage obj={props.obj} />
                        <Text style={{ textAlign: 'center' }}>Lỗi vị phạm : {getFaultByType(props.obj.type)}</Text>
                        <Text>Thời gian: {props.obj.date} - {props.obj.time}</Text>
                        <Text>Tên :{props.obj.user.length > 0 ? props.obj.user[0].name : ""}</Text>
                        <Text>CMND:{props.obj.user.length > 0 ? props.obj.user[0].CMND : ""}</Text>
                        <TouchableHighlight style={{
                            width: '70%',
                            padding: 10,
                            backgroundColor: '#f06292',
                            marginBottom: 10,
                            marginTop: 30
                        }}
                            onPress={() => { modalVisible = false }}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Đóng</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        </View>)
}

export default Detail;