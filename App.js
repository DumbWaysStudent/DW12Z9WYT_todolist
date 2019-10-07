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
      data: '',
      update: {
        condition: false,
        index: 0
      }
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
          this.changeButtonValue(true, ids);
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
            <CheckBox color='green' checked={list.status} onPress={() => this.onCek(index)}/>
            {/* checked untuk melihat status lalu fungsi oncek dijalankan ketika tombol dipencet */}
          </Left>
          <Body>
            <Text style={{margin:5}}>{list.job}</Text>
            {/* menampilkan list yang telah diupdate */}
          </Body>
            {/* <Button bordered onPress={() => this.onDelete(index)}>
                <Text>Delete</Text>
            </Button> */}
            <ListItem icon>
            <Right>
              <TouchableOpacity  style={{marginRight:5}} onPress={() => this.onEdit(index)} >
                <Icon style={{color:'black',fontSize:25}}type="FontAwesome" name="pencil" /> 
                {/* Mengambil ikon dari fontawesome dengan gambar ikon pencil */}
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => this.onDelete(index)} >
                <Icon style={{color:'red',fontSize:25}} type="FontAwesome" name="trash-o" />
              </TouchableOpacity>
            </Right>
            </ListItem>
        </ListItem>
      );
    });
  }

  onPress = () => {
    if (!this.state.data)
      return;
    const datas = {
        job: this.state.data,
        checked: false
    };
    let input;
    if (this.state.update.condition) {
      this.state.lists.splice(this.state.update.index, 1, datas);
      this.changeButtonValue(false, 0);
      input = this.state.lists;
    } else
      input = this.state.lists.concat(datas);
    this.setState({lists: input}, () => {
      this.clear();
    });
  }

  changeTextValue = (input) => {
    this.setState({data: input});
  }

  changeButtonValue = (input, ids) => {
    const data = {
      condition: input,
      index: ids
    };
    this.setState({update: data});
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
                value={this.state.data} style={{borderWidth:2}}
              />
            </Item>
            <Button  style={styles.body} onPress={this.onPress}>
              <Text>{this.state.update.condition ? 'EDIT' : 'ADD'}</Text>
            </Button>
          </Body>
          <List>
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
    padding:5
  },
  input: {
    flex: 8,
  },
  body: {
    flex: 2,
    marginLeft:5,
  },
}