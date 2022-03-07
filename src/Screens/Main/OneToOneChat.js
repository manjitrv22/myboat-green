import React, { PureComponent } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";
import { Colors, FontFamily } from "../../Constants/Constants";
import ChatBubble from "./ChatBubble";
import { Icon } from "react-native-elements";
import Header from "../../Components/Header";
import { ActivityIndicator } from "react-native-paper";


const { width, height } = Dimensions.get("window");

class OneToOneChat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 1,
          text: "My boat owner",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Prince",
          },
        },
      ],
      // data:
      isLoading: false,
    };
  }
  renderChats = (props) => {
    return <ChatBubble {...props} />;
  };



  onSend = (messages = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  render() {
    const { messages } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          headerHeight={30}
        />
        <View
          style={{
            backgroundColor: Colors.orange,
            height: 100,
            alignItems: "flex-start",
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          activeOpacity={0.8}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon
              name="arrow-back"
              type="ionicons"
              size={24}
              color={Colors.white}
              style={{
                paddingHorizontal: 10,
                marginVertical: 10,
              }}
            />
          </TouchableOpacity>
          <View style={{ top: 12, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: Colors.orange }}>
            <TouchableOpacity
              style={{ backgroundColor: Colors.orange, alignSelf: 'center', alignItems: 'center', marginRight: 14, justifyContent: 'center', height: 40, width: 40, borderRadius: 50 }}>
              <Image source={require('../../../assets/icons/inbox_not_found.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', marginRight: 15, width: '50%' }}>
              <Text numberOfLines={1} style={{ color: Colors.white, textAlign: 'left', fontSize: 16, bottom: 2, fontFamily: FontFamily.bold, }} > Jhon Doe</Text>
              <Text numberOfLines={1} style={{ color: Colors.white, textAlign: 'left', fontSize: 12, fontFamily: FontFamily.bold, }}> online </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ top: 13, backgroundColor: Colors.orange, alignItems: 'center', marginRight: 14, justifyContent: 'center', height: 40, width: 40, borderRadius: 50 }}>
            <Icon
              name="dots-three-vertical"
              type="entypo"
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
        <View style={{
          backgroundColor: Colors.white,
          borderTopLeftRadius: 25,
          borderTopEndRadius: 25,
          marginTop: -30,
          // marginBottom:40,
          flex: 1
        }}
        >
          <GiftedChat
            messages={messages}
            onSend={(messages) => this.onSend(messages)}
            renderBubble={this.renderChats}
            user={{
              _id: 1,
            }}
            alwaysShowSend
            renderAvatar={null}
            keyboardShouldPersistTaps="handled"
            textInputStyle={styles.messageTextInput}
            placeholder="Type here"
            // renderChatFooter={() => <Text>Test</Text>}
            // renderActions={() => <Text>Test</Text>}
            // renderInputToolbar={renderInputToolbar}

            // }}
            minComposerHeight={40}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  name: {
    fontFamily: FontFamily.default,
    fontSize: 15,
    color: Colors.gray1,
  },
  backIconContainer: {
    height: width * 0.08,
    width: width * 0.08,
    overflow: "hidden",
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Platform.OS === "android" ? 10 : 0,
  },
  imageContainer: {
    height: width * 0.08,
    width: width * 0.08,
    borderWidth: 1,
    borderRadius: (width * 0.08) / 2,
    borderColor: Colors.white,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  iconContainer: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.white,
    overflow: "hidden",
  },
  separator: {
    width: "100%",
    marginVertical: 2,
  },
  themeHeading: {
    fontFamily: FontFamily.default,
    color: Colors.orange,
  },
  themeText: {
    fontFamily: FontFamily.default,
    fontSize: 12,
    color: Colors.orange,
  },

  messageTextInput: {
    backgroundColor: "#eaeaea",
    paddingTop: Platform.OS == "ios" ? 8 : undefined,
    borderRadius: 20,
    paddingRight: 5,
    textAlignVertical: "center",
    fontFamily: FontFamily.default,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
});

export default OneToOneChat;