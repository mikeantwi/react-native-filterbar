# react-native-filterbar


react-native-filterbar is  a cross-platform filter bar which is easy to integrate into a project


## Install
```bash
npm i react-native-filterbar --save
```


##### Usage
```jsx
import { Filterbar } from 'react-native-filterbar';

export const courses = [
  {
    key: 'Computer Engineering',
    label: 'Computer Engineering',
   
  },
  {
    key: 'Biomedical Engineering',
    label: 'Biomedical Engineering',
   
  }
];

export default class ExampleApp extends Component {
    constructor(props) {
        this.state = {
            selected,
            visible
        }
    }


    render() {
    	return (
        <View style={{flex: 1, backgroundColor: '#ede', justifyContent: 'space-around}}> 
           
           {this.renderFilterbar(data)}
           
            <TouchableOpacity 
                onPress={this.onShow} 
                style={filterBarStyle.touchable}>
                <Text style={{ textAlign: 'center', color: this.state.visible ? '#333' : '#c9c9c9'}}>{this.state.picked}</Text>
            </TouchableOpacity> 
        </View>
    }

    renderFilterbar() {
        return (
            <Filterbar
                visible={this.state.visible}
                onSelect={this.onSelect}
                onCancel={this.onCancel}
                options={courses}
            > 
        );
    }

     onVisible = () => {
        this.setState({ visible: true });
     }


      onSelectItems = (selected) => {
        this.setState({
          selected: selected,
          visible: false
        })
      }
      

      onCancel = () => {
        this.setState({
          visible: false
        });
      }
}
```

## Props
```
|-------------------------|--------------------------------------------|-------------|-------------|
|        name             |      description                           |  type       |   default   |
|-------------------------|--------------------------------------------|-------------|-------------|
| visible                 | filterbar visible                          | bool        | true        |
|-------------------------|--------------------------------------------|-------------|-------------|
|androidUnderlineColor    | underline color                            | string      | transparent |
|-------------------------|--------------------------------------------|-------------|-------------|
|placeholderText          | filter bar placeholder                     | string      | search here |
|-------------------------|--------------------------------------------|-------------|-------------|
|listContainerStyle       | style the list container                   | any         |             |
|-------------------------|--------------------------------------------|-------------|-------------|
|overlayStyle             | style filter bar overlay                   | any         |             |
|-------------------------|--------------------------------------------|-------------|-------------|
|cancelButtonSTyle        | style the cancel button                    | any         |             |
|-------------------------|--------------------------------------------|-------------|-------------|
|cancelButtonText         | text for cancel button                     | string      | cancel      |
|-------------------------|--------------------------------------------|-------------|-------------|
|onSelectItems            | filter bar items selected                  | func        |             |
|-------------------------|--------------------------------------------|-------------|-------------|
|onCancel                 | items cancelled                            | func        |             |
|-------------------------|--------------------------------------------|-------------|-------------|
|options                  | list of items to select from               | array       |             |
|-------------------------|--------------------------------------------|-------------|-------------|
|title                    | filter bar title                           | string      |             |
|-------------------------|--------------------------------------------|-------------|-------------|
|modal                    |                                            | object      |             |
|-------------------------|--------------------------------------------|-------------|-------------|

```


#### Copyright and License 
```
BSD License

copyright 2017 Michael kojo-zil. All rights reserved