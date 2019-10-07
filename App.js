import React, { Component } from 'react';
import { Container, Content, List, ListItem, Button, Text, Input, Item, Body, Right, Icon, Left, CheckBox } from 'native-base';

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

  show = () => {
    return this.state.lists.map((list, index) => {
        // proses pembuatan array baru dari data awal lists menjadi list
      return (
        <ListItem icon key={index}>
          <Left>
            <CheckBox checked={list.status} onPress={() => this.onCek(index)}/>
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
              <Button style={{ backgroundColor: "#FF9501" }} onPress={() => this.onDelete(index)} >
                <Icon active name="trash" />
              </Button>
            </Right>
            </ListItem>
        </ListItem>
      );
    });
  }

  onPress = () => {
    const plus = {
      job: this.state.data,
      status: false
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
    this.setState({data: ''});
  }

  render() {
    return (
      <Container>
        <Content>
          <Body style={styles.inputContent}>
            <Item style={styles.input}>
              <Input placeholder='Type Something'
                onChangeText={text => {this.changeTextValue(text)}}
                value={this.state.data}
              />
            </Item>
            <Button bordered style={styles.body} onPress={this.onPress}>
              <Text>Add</Text>
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
  },
  input: {
    flex: 8,
  },
  button: {
    flex: 2,
  },
}