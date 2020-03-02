import React, { useState, useEffect } from 'react';
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
    const [isOpen, setVisiable] = useState(false);
    const getImage = obj => {
        let unixStr = obj.date + " " + obj.time;
        let unixTime = unixTS.fromDate(unixStr);
        return (`http://apismarttraffic.servehttp.com/img/${obj.Plate}_${unixTime}.jpg`);
    }
    useEffect(() => {
        console.log(isOpen);
    });
    const imageUrl = getImage(props.obj);
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={{ position: 'relative', top: 4 }}
                onPress={() => { setVisiable(!isOpen) }}>
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
                    visible={isOpen}
                    onRequestClose={() => { modalVisible = false }}>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: '#2196f3',
                        justifyContent: 'center',
                        padding: 10
                    }}>
                        <Image
                            style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
                            source={{ uri: imageUrl }}
                        />
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
                            onPress={() => { setVisiable(!isOpen) }}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Đóng</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        </View>)
}

export default Detail;