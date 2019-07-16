import React from 'react';
import {Animated, View, FlatList, Text, TouchableOpacity, I18nManager} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const KeyboardView = ({keyboardOnPress, keyboardViewStyle, keyboardViewTextStyle, pinLength, onComplete, bgColor, returnType, textColor, animatedDeleteButton, deleteText, animatedDeleteButtonOnPress, styles}) => {
  let data;
  if(I18nManager.isRTL) {
    data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", deleteText, "0", null].reverse();

  } else {
    data = [{number: "1", text: null},{number: "2", text: "Abc"},{number: "3", text: "DEF"},{number: "4", text: "GHI"}, {number: "5", text: "JKL"},
     {number: "6", text: "MNO"}, {number: "7", text: "PQRS"}, {number: "8", text: "TUV"},{number: "9", text: "WXYZ"}, deleteText,{number: "0", text: null} ];
  }
  const renderItem = ({item, index}) => {
    let style;
    let onPressInactive;
    if(item === deleteText) {
      onPressInactive = animatedDeleteButtonOnPress;
      style = [styles[0], {
        opacity: animatedDeleteButton
      }]
    } else {
      onPressInactive = false;
      style = [styles[0]]
    }
    const width = wp('16.8%');

    return (
        <TouchableOpacity 
            key={"key-item-" + index}
            activeOpacity={0.9}
            onPress={() => keyboardOnPress(item, returnType, pinLength, onComplete)}
            disabled={onPressInactive}>
          <Animated.View style={[style, {
            backgroundColor: bgColor,
            borderColor: '#fff',
            borderWidth: 1,
            width :width,height:width,borderRadius :  width/2,
          
            marginBottom: hp('1.4%')
          }, keyboardViewStyle]}>
            
            {item === deleteText ? (
              <View>
                <Text style={[styles[1], {
              color  : textColor,
              opacity: 1,
              
            }, keyboardViewTextStyle]}>{item}</Text>
              </View>
            ): 
              <View style={{alignItems: 'center',justifyContent: 'center'}}>
                <Text style={[styles[1], {
              color  : textColor,
              opacity: 1,
              fontSize: RFValue(22),
              color: '#fff',
              padding: 0,
              fontFamily:'roboto-thin'

            }]}>{item.number}</Text>
                {item.text !== null && <Text style={[styles[1], {
              color  : textColor,
              opacity: 1,
              color: '#fff',
            }, keyboardViewTextStyle]} >{item.text}</Text>}
              </View>
            }
          </Animated.View>
        </TouchableOpacity>
    )
  };
  return (
      <FlatList
          contentContainerStyle={{
            flexDirection: I18nManager.isRTL ? 'column-reverse' : 'column',
            alignItems   : I18nManager.isRTL ? 'flex-end' : 'flex-start',
          }}
          scrollEnabled={false}
          horizontal={false}
          vertical={true}
          numColumns={3}
          renderItem={renderItem}
          data={data}
          keyExtractor={(val, index) => "pinViewItem-" + index}
      />
  )
};
export default KeyboardView
