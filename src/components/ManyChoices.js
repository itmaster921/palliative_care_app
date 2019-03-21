/**
 * @providesModule @manychoices
 */

import React, { Component } from 'react';
import {
    FlatList,
} from 'react-native';

import Choice from '@choice'
import { copy } from "@utils";

export default class ManyChoices extends Component {
    constructor(props) {
        super(props);
        var {data, selectedIndexes} = props

        this.state = {
            choiceData: this.getChoiceData(data, selectedIndexes)
        }
    }

    getChoiceData(data, selectedIndexes){

        var choiceData = data.map((text, index) => {
            var odd = index % 2 == 0
            if(selectedIndexes.includes(index)){
                return {
                    index: index,
                    text: text,
                    selected: true,
                    disabled: false,
                    odd: odd,
                }
            }else{
                return {
                    index: index,
                    text: text,
                    selected: false,
                    disabled: false,
                    odd: odd,
                }                        
            }
        })

        return choiceData
    }

    onItemPressed(choiceIndex){
        var choiceData = copy(this.state.choiceData)
        var choiceItem = choiceData[choiceIndex]
        choiceData[choiceIndex].selected = !choiceItem.selected
        
        this.setState({
            choiceData: choiceData
        })    

        //react bug Not render until scroll
        // this.flatList.scrollToOffset({offset: -1})
        // this.flatList.scrollToOffset({offset: 1})

        var selectedIndexes = []
        
        for (const choiceItem of choiceData) {
            if(choiceItem.selected) selectedIndexes.push(choiceItem.index)            
        }

        this.props.onChangedAnswer(this.props.questionIndex, selectedIndexes)
    }

    render() {
        return (
            <FlatList
                ref = {ref=>this.flatList = ref}
                scrollEnabled={false}
                data = {this.state.choiceData}
                renderItem = {({item, index})=>
                    <Choice {...item} onPress={this.onItemPressed.bind(this)}/>
                }
                keyExtractor = {(item, index) => index.toString()}
            />
        )
    }
}

