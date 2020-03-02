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
import Detail from './Details';
const unixTS = require('unix-timestamp');
const { width: WIDTH } = Dimensions.get('window')

function FaultTable(props) {
    const table = [];
    const detail = (data) => (
        <Detail obj={data}/>
    );
    for (var i in props.tableData) {
        row = (
            <TableWrapper key={i} style={{ flexDirection: 'row', backgroundColor: '#FFF1C1', height: 30 }} >
                <Cell data={props.tableData[i].date} style={{ width: ((WIDTH - 100) / 3) }} textStyle={{ textAlign: 'center' }} />
                <Cell data={props.tableData[i].time} style={{ width: ((WIDTH - 100) / 3) }} textStyle={{ textAlign: 'center' }} />
                <Cell data={props.tableData[i].Plate} style={{ width: ((WIDTH - 100) / 3) }} textStyle={{ textAlign: 'center', color: 'red' }} />
                <Cell data={props.tableData[i].user.length > 0 ? props.tableData[i].user[0].username : ""} style={{ width: 60 }} textStyle={{ textAlign: 'center' }} />
                <Cell data={detail(props.tableData[i])} style={{ width: 40 }} />
            </TableWrapper>);
        table.push(row);
    }
    return (<View>
        {table}
    </View>);
}
export default FaultTable;