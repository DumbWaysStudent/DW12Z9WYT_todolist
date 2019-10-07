import React, { Component } from 'react';
import { Container, Content, List, ListItem, Button, Text, Input, Item, Body, Right, Icon} from 'native-base';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      lists: ['work','swim','study','sleep','run'],//Array awal
      data: ''
    }// Array diubah karena id tidak diperlukan, karena bertumpu pada index array
  }

  onDelete = (index) => {
    const deleteObj = this.state.lists.filter((value, choosenid, arr) => {
          return (index != choosenid);// filter memilih index yang kita pilih dan menampilkan yang tidak kita pilih
    });
    this.setState({lists: deleteObj});//List yang lama diupdate oleh array baru yang telah di filter
  }

  show = () => {
    return this.state.lists.map((list, index) => {
        // proses pembuatan array baru dari data awal lists menjadi list
      return (
        <ListItem icon key={index}>
          <Body>
            <Text>{list}</Text>
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
    const input = this.state.lists.concat(this.state.data);
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