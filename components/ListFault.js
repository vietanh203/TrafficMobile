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
                                <Text>Thời gian: {obj.date} - {obj.time}</Text>
                                <Text>Tên :{obj.user[0].name}</Text>
                                <Text>CMND:{obj.user[0].CMND}</Text>
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
                <TableWrapper key={i} style={styles.row} >
                    <Cell data={state.tableData[i].date} textStyle={{ width: 130, fontSize: 13 }} />
                    <Cell data={state.tableData[i].time} textStyle={{ width: 65, paddingLeft: 4 }} />
                    <Cell data={state.tableData[i].Plate} textStyle={{ color: 'red', width: 130, fontSize: 13 }} />
                    <Cell data={state.tableData[i].user[0].username} textStyle={{ width: 45, paddingLeft: 8 }} />
                    <Cell data={listBtn(state.tableData[i])} textStyle={{ width: 15 }} />
                </TableWrapper>);
            table.push(row);
        }

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Tìm biển số hoặc chủ xe"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <DatePicker
                    style={{ width: WIDTH, height: 35 }}
                    customStyles={{
                        placeholderText: { fontSize: 20 }, // placeHolder style
                    }} // optional 
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
                <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}
                    widthArr={[130, 65, 130, 45, 15]}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    {table}
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