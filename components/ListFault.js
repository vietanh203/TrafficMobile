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
import FaultTable from './FaultTable';
import { State } from 'react-native-gesture-handler';

const unixTS = require('unix-timestamp');
const { width: WIDTH } = Dimensions.get('window')

export default class ListFault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            tableHead: ['Ngày', 'Giờ', 'Biển số', 'Chủ xe', ''],
            tableData: [],
            modalVisible: false,
            chartData: {}
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
    setDates = value => {
        const dataFilter = []
        for (var i in this.state.tableData) {
            if (value.startDate < this.state.tableData[i].date && this.state.tableData[i].date < value.endDate) {
                dataFilter.push(this.state.tableData[i]);
            }
        }
        this.setState({ tableData: dataFilter });
    };

    updateSearch = search => {
        this.setState({ search });
        const searchData = [];
        for (var i in this.state.tableData) {
            if (this.state.tableData[i].Plate == search || this.state.tableData[i].user[0].username == search) {
                searchData.push(this.state.tableData[i]);
                console.log(searchData);
            }
        }
        if (searchData.length >= 1 && searchData != undefined) {
            this.setState({ tableData: searchData });
        }
    };
    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }
    getCount = () => {
        fetch("http://apismarttraffic.servehttp.com/fails/count", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    chartData: responseJson
                })
            })
            .catch(error => console.log(error))
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
            .catch(error => console.log(error))
    }
    count = 1;
    render() {
        console.log(this.count++);
        const state = this.state;
        const data = [
            {
                name: "Không đội mũ",
                population: 4,
                color: "#f6c23e",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Vượt đèn đỏ",
                population: 4,
                color: "#36b9cc",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Vi phạm 2 lỗi",
                population: 1,
                color: "red",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }];

        const widthArr = [(WIDTH - 100) / 3, (WIDTH - 100) / 3, (WIDTH - 100) / 3, 60, 40];

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Tìm biển số hoặc chủ xe"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <DatePicker
                    style={{ width: WIDTH, height: 35 }} // optional 
                    returnFormat={'YYYY/MM/DD'}
                    outFormat={'YYYY/MM/DD'}
                    ButtonText={'OK'}
                    markText={'Chọn ngày'}
                    centerAlign // optional text will align center or not
                    allowFontScaling={false} // optional
                    placeholder={'Tìm lỗi theo ngày'}
                    mode={'range'}
                    onConfirm={value => this.setDates(value)}
                />
                <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
                    <Row data={state.tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
                    <FaultTable tableData={state.tableData} />
                </Table>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>THỐNG KÊ</Text>
                <PieChart
                    data={data}
                    width={WIDTH}
                    height={100}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 10
                        },
                        propsForDots: {
                            r: "10",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    absolute
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 40, backgroundColor: '#fff', height: 35 },
    head: { height: 30, backgroundColor: '#808B97' },
    text: { margin: 0, textAlign: 'center' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1', height: 30 },
    btn: { alignItems: 'center', backgroundColor: '#78B7BB' },
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