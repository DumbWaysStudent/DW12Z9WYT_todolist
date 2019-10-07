import React, { Component } from 'react';
import { Container, Content, List, ListItem, Button, Text, Input, Item, Body, Right, Icon, Left, CheckBox } from 'native-base';
import {TouchableOpacity} from 'react-native'
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      lists: [
        {
          job:'work',
          status: false
        },
        {
          job:'swim',
          status: false
        },
        {
          job:'study',
          status: false
        },
        {
          job:'sleep',
          status: false
        },
        {
          job:'run',
          status:false
        }
      ],//Array diubah menjadi array object untuk mendapatkan boolean true or false
      data: ''
    }// Array diubah karena id tidak diperlukan, karena bertumpu pada index array
  }

  onDelete = (index) => {
    const deleteObj = this.state.lists.filter((value, choosenid, arr) => {
          return (index != choosenid);// filter memilih index yang kita pilih dan menampilkan yang tidak kita pilih
    });
    this.setState({lists: deleteObj});//List yang lama diupdate oleh array baru yang telah di filter
  }

  onCek = (index) => {
    const cek = this.state.lists.map((list, ids) => {
        if (index == ids)
          list.status = !list.status;//Untuk melihat status jika true maka diubah ke false begitupula sebaliknya
        return list;
    });
    this.setState({lists: cek});
  }

  onEdit = (index) => {
    const edit = this.state.lists.map((list, ids) => {
        if (index == ids) { //menyesuaikan index dengan id yg kita pilih
          this.changeTextValue(list.job);
        }
        return list;
    });
    this.setState({lists: edit});
  }//menampilkan nama pekerjaan yang kita pilih untuk di edit di kolom Textinput

  show = () => {
    return this.state.lists.map((list, index) => {
        // proses pembuatan array baru dari data awal lists menjadi list
      return (
        <ListItem icon key={index}>
          <Left>
            <CheckBox checked={list.status} onPress={() => this.onCek(index)} color='green'/>
            {/* checked untuk melihat status lalu fungsi oncek dijalankan ketika tombol dipencet */}
          </Left>
          <Body>
            <Text>{list.job}</Text>
            {/* menampilkan list yang telah diupdate */}
          </Body>
            {/* <Button bordered onPress={() => this.onDelete(index)}>
                <Text>Delete</Text>
            </Button> */}
            <ListItem icon>
            <Right>
              <TouchableOpacity  style={{marginRight:5}} onPress={() => this.onEdit(index)} >
                <Icon type="FontAwesome" name="pencil" /> 
                {/* Mengambil ikon dari fontawesome dengan gambar ikon pencil */}
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => this.onDelete(index)} underlayColor='red'  >
                <Icon color='red' type="FontAwesome" name="trash-o"  />
              </TouchableOpacity>
            </Right>
            </ListItem>
        </ListItem>
      );
    });
  }

  onPress = () => {
    const plus = {
      job: this.state.data,//memasukkan job baru sesuai dengan kata yang diinput
      status: false // memasukkan checkbox bernilai kosong/false
  };
    const input = this.state.lists.concat(plus);
    //Menggunakan concat karena menggunakan push error
    this.setState({lists: input}, () => {
      this.clear();
    });
  }

  changeTextValue = (input) => {
    this.setState({data: input});
  }

  clear = () => {
    this.setState({data: ''}); //Mengembalikan data kembali menjadi string kosong setelah tombol ditekan
  }

  render() {
    return (
      <Container>
        <Content>
          <Body style={styles.inputContent}>
            <Item style={styles.input}>
              <Input placeholder='Type Something'
                onChangeText={text => {this.changeTextValue(text)}}
                value={this.state.data} style={{borderWidth:2, marginRight:5}}
              />
            </Item>
            <Button bordered style={styles.body} onPress={this.onPress}>
              <Text>Add</Text>
            </Button>
          </Body>
          <List >
            {this.show()}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  inputContent: {
    flexDirection: 'row',
    padding: 15
  },
  input: {
    flex: 8,
  },
  body: {
    flex: 2
  },
}