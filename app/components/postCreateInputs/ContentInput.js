import React, {useEffect, useRef} from "react";
import {StyleSheet, TextInput} from "react-native";
import ParsedText from "react-native-parsed-text";
import {URL_REGEX} from "../../api/constants";
import {useTheme} from "react-native-paper";


const ContentInput = ({content, setContent, placeholder, minHeight=undefined}) => {
    const theme = useTheme()

    const createPostInput = useRef(null)


    useEffect(() => {
        createPostInput && setTimeout(() => createPostInput.current.focus(), 150);
    }, []);


    return (
        <TextInput
            ref={createPostInput}
            placeholder={placeholder || "Write your post here..."}
            placeholderTextColor={theme.colors.disabled}
            style={[styles.input, {textAlignVertical: "top", minHeight}]}
            multiline
            onChangeText={(text) => setContent(text)}
        >
            <ParsedText
                style={{color: theme.colors.text}}
                parse={[
                    {
                        pattern: /@(\w+)/,
                        style: {color: theme.colors.primary},
                    },
                    {
                        pattern: URL_REGEX,
                        style: {color: theme.colors.primary},
                    },
                    {
                        pattern: /#(\w+)/,
                        style: {color: theme.colors.primary},
                    },
                ]}
                childrenProps={{allowFontScaling: false}}
            >
                {content}
            </ParsedText>
        </TextInput>

    )
}

export default ContentInput;

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        minHeight: 32,
        paddingHorizontal: 8,
        paddingBottom: 12,
        flex: 1,
        marginBottom:12
    },
})