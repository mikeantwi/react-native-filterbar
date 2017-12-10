# react-native-filterbar

Install
npm i react-native-filterbar --save


Usage

import { Filterbar } from 'react-native-filterbar';
import data from './data';

export default class ExampleApp extends Component {
    constructor(props) {
        this.state = {
            itemSelected,
            visible
        }
    };


    render() {
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
                visible={this.state.typeVisible}
                onSelect={this.typeSelected}
                onCancel={this.typeCancelled}
                options={oneType}
            > 
        );
    }

     onVisible = () => {
            this.setState({ visible: true });
     }


      onSelect = (selected) => {
        this.setState({
          itemSelected: selected,
          visible: false
        })
      }
      

      onCancel = () => {
        this.setState({
          visible: false
        });
      }
}
