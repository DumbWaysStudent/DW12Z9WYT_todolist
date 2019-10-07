import React, { Component } from 'react';
import { Container, Content, List, ListItem, Button, Text, Input, Item, Body } from 'native-base';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      lists: ['work','swim','study','sleep','run'],
      data: ''
    }// Array diubah karena id tidak diperlukan
  }

  show = () => {
    return this.state.lists.map((list, index) => {
      return (
        <ListItem key={index}>
          <Text>{list}</Text>
        </ListItem>
      );
    });
  }

  onPress = () => {
    const input = this.state.lists.concat(this.state.data);
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
                value={this.state.data} />
            </Item>
            <Button bordered onPress={this.onPress} style={styles.inputContent} >
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

const styles={
    inputContent: {
        flexDirection: 'row',
    },
    input: {
        flex:8
    },
    body: {
        flex: 2
    }
}