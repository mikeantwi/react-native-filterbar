/**
 * @author kojo.zil
 * @email miantwimi@gmail.com
 * @create date 2017-10-15 10:17:42
 * @modify date 2017-10-15 10:17:42
 * @desc [description]
*/

import React, { Component, PropTypes } from 'react'
import { Modal, View, ListView, TouchableOpacity, Text, TextInput } from 'react-native'
import { filterStyle } from './styles';


FilterBar.propTypes = {
  overlayStyle: PropTypes.any,
  options: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  androidUnderlineColor: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool,
  modal: PropTypes.object,
  renderOption: PropTypes.func,
  renderCancelButton: PropTypes.func,
  cancelButtonStyle: PropTypes.any,
  listContainerStyle: PropTypes.any,
  optionTextStyle:PropTypes.any,
}

export class FilterBar extends Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      filter: '',
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.key !== r2.key
      }).cloneWithRows(props.options)
    }
  }

  componentWillReceiveProps (newProps) {
    if ((!this.props.visible && newProps.visible) || (this.props.options !== newProps.options)) {
      this.setState({
        filter: '',
        ds: this.state.ds.cloneWithRows(newProps.options),
      })
    }
  }

  render () {
    const {
      title,
      titleTextStyle,
      overlayStyle,
      cancelContainerStyle,
      renderList,
      renderCancelButton,
      visible,
      modal,
    } = this.props

    const renderedTitle = (!title) ? null : (
      <Text style={titleTextStyle || filterStyle.titleTextStyle}>{title}</Text>
    )

    return (
      <Modal {...modal}  animationType={'slide'} visible={visible} supportedOrientations={['portrait', 'landscape']}>
        <View style={overlayStyle || filterStyle.overlay}>
          {renderedTitle}
          {(renderList || this.renderList)()}
          <View style={cancelContainerStyle || filterStyle.cancelContainer}>
            {(renderCancelButton || this.renderCancelButton)()}
          </View>
        </View>
      </Modal>
    )
  }

  renderList = () => {
    const {
      showFilter,
      listContainerStyle,
      androidUnderlineColor,
      placeholderText,
      placeholderTextColor,
      filterTextInputContainerStyle,
      filterTextInputStyle
    } = this.props

    const filter = (!showFilter) ? null : (
      <View style={filterTextInputContainerStyle || filterStyle.filterTextInputContainer}>
        <TextInput
          onChangeText={this.onItemsChange}
          autoCorrect={false}
          blurOnSubmit={true}
          autoCapitalize="none"
          underlineColorAndroid={androidUnderlineColor}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholderText}
          style={filterTextInputStyle || filterStyle.filterTextInput} />
      </View>
    )

    return (
      <View style={listContainerStyle || filterStyle.listContainer}>
        {filter}
        {this.renderOptionList()}
      </View>
    )
  }

  renderOptionList = () => {
    const {
      noResultsText,
      listViewProps,
    } = this.props

    const { ds } = this.state

    if (1 > ds.getRowCount()) {
      return (
        <ListView
          enableEmptySections={false}
          {...listViewProps}
          dataSource={ds.cloneWithRows([{ key: '_none' }])}
          renderRow={() => (
            <View style={filterStyle.noResults}>
              <Text style={filterStyle.noResultsText}>{noResultsText}</Text>
            </View>
          )}
        />
      )
    } else {
      return (
        <ListView
          enableEmptySections={false}
          {...listViewProps}
          dataSource={ds}
          renderRow={this.renderOption}
        />
      )
    }
  }

  renderOption = (rowData) => {
    const {
      selectedOption,
      renderOption,
      optionTextStyle,
      selectedOptionTextStyle
    } = this.props

    const { key, label } = rowData

    let style = filterStyle.optionStyle
    let textStyle = optionTextStyle||filterStyle.optionTextStyle

    if (key === selectedOption) {
      style = filterStyle.selectedOptionStyle
      textStyle = selectedOptionTextStyle ||filterStyle.selectedOptionTextStyle
    }

    if (renderOption) {
      return renderOption(rowData, key === selectedOption)
    } else {
      return (
        <TouchableOpacity activeOpacity={0.7}
          style={style}
          onPress={() => this.props.onSelectItem(key)}
        >
          <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
      )
    }
  }

  renderCancelButton = () => {
    const {
      cancelButtonStyle,
      cancelButtonTextStyle,
      cancelButtonText
    } = this.props

    return (
      <TouchableOpacity onPress={this.props.onCancel}
        activeOpacity={0.7}
        style={cancelButtonStyle || filterStyle.cancelButton}
      >
        <Text style={cancelButtonTextStyle || filterStyle.cancelButtonText}>{cancelButtonText}</Text>
      </TouchableOpacity>
    )
  }

  onItemsChange = (text) => {
    const { options } = this.props

    const filter = text.toLowerCase();
    const filtered = (!filter.length)
      ? options
      : options.filter(({ searchKey, label, key }) => (
        0 <= label.toLowerCase().indexOf(filter) ||
          (searchKey && 0 <= searchKey.toLowerCase().indexOf(filter))
      ))

    this.setState({
      filter: text.toLowerCase(),
      ds: this.state.ds.cloneWithRows(filtered)
    })
  }
}

FilterBar.defaultProps = {
  placeholderText: 'Search here',
  placeholderTextColor: '#5D6D7E',
  androidUnderlineColor: 'rgba(0,0,0,0)',
  cancelButtonText: 'Cancel',
  noResultsText: 'No matches',
  visible: true,
  showFilter: true,
}
