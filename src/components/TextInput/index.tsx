import React, { useEffect, useState } from 'react';
import {
  Image, TextInput,
  TouchableOpacity, View,
  TouchableWithoutFeedback
} from 'react-native';
import { CTextInput } from './model';
import { styles } from './styles';

const ic_close = require('../../assets/close.png');

const TextInputComponent: CTextInput = ({
  fontFamily,
  style = {},
  value = '',
  autoSearchFoundOnly,
  placeholderTextColor = '#000',
  placeholder = '',
  showIcon = true,
  inputStyle,
  iconStyle,
  onChangeText = (_value: string) => { },
  renderLeftIcon,
  renderRightIcon,
  ...restProps
}) => {
  const [text, setText] = useState<string>('');
  const searchInputRef = React.useRef<TextInput>(null);

  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);

  const onChange = (text: string) => {
    setText(text);
    onChangeText(text);
  };

  const _renderRightIcon = () => {
    if (showIcon) {
      if (renderRightIcon) {
        return renderRightIcon();
      }
      if (text.length > 0) {
        return (
          <TouchableOpacity onPress={() => onChange('')}>
            <Image source={ic_close} style={[styles.icon, iconStyle]} />
          </TouchableOpacity>
        );
      }
      return null;
    }
    return null;
  };

  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily
      };
    } else {
      return {};
    }
  };

  useEffect(() => {
    if (!autoSearchFoundOnly) return;
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoSearchFoundOnly]);

  return (
    <TouchableWithoutFeedback>
      <View style={[style]}>
        <View style={styles.textInput}>
          {renderLeftIcon?.()}
          <TextInput
            ref={searchInputRef}
            style={[styles.input, inputStyle, font()]}
            value={text}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChange}
            {...restProps}
          />
          {_renderRightIcon()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TextInputComponent;
