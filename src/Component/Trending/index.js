import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, PermissionsAndroid, ActivityIndicator } from 'react-native'
import { darkBlue, darkGrey, lightGrey, offWhite, textBlack, white } from '../../Colors'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob'
import { SliderBox } from "react-native-image-slider-box";
import ImageSlider from 'react-native-image-slider';

const Recent = (props) => {
    const [isLoading, setLoading] = React.useState(false)

    const iosDownload = (fileUrl) => {
        setLoading(true)
        var date = new Date();
        var url = fileUrl;
        var encoded = encodeURI(url)
        var ext = extention(encoded);
        ext = "." + ext[0];
        const localFile = RNFS.DocumentDirectoryPath + "/Myhookah_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext;

        const options = {
            fromUrl: encoded,
            toFile: localFile
        };
        RNFS.downloadFile(options).promise
            .then(() => FileViewer.open(localFile, { showOpenWithDialog: true }))
            .then(susscess => {
                console.log("Download Successfull => ", susscess)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            });
    }
    const download = (fileUrl) => {
        setLoading(true)
        var date = new Date();
        var url = fileUrl;
        var ext = extention(url);
        ext = "." + ext[0];
        const { config, fs } = RNFetchBlob
        let DownloadDir = fs.dirs.DownloadDir
        //this.setState({ isOpen: true })
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: DownloadDir + "/Myhookah_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description: 'Myhookah'
            }
        }
        config(options).fetch('GET', url)
            .then((res) => {
                console.log("my download response ==>", res)
                setLoading(false)
            })
            .catch(error => {
                console.log("my download response error ==>", error)
                setLoading(false)
            })
    }
    const extention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }
    const requestPermission = async (url) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Agefred',
                    message:
                        'Agefred App needs access to your Storage ' +
                        'so you can download and save any files.',
                    //buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                download(url)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }


    return (
        <View style={styles.container}>
            {!props.images || !props.images.length ?
                <View />
                : <ImageSlider
                    images={props.images}
                    onPress={({ index }) => alert(index)}
                    customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View
                            key={index}
                            style={[
                                style,
                                styles.customSlide,
                                {
                                    backgroundColor: index % 2 === 0 ? 'white' : 'white',
                                    width: width - widthPercentageToDP(12)
                                },
                            ]}
                        >
                            <FastImage
                                source={{ uri: item }}
                                style={styles.img}>
                                {index == 0 &&
                                    <FastImage
                                        source={props.rank == 1 ?
                                            require('../../Images/1.png')
                                            : props.rank == 2 ?
                                                require('../../Images/2.png')
                                                : props.rank == 3 ?
                                                    require('../../Images/3.png')
                                                    : require('../../Images/2.png')
                                        }
                                        style={{
                                            width: widthPercentageToDP(15),
                                            height: widthPercentageToDP(15),
                                            position: "absolute",
                                            top: "6%",
                                            right: "2%"
                                        }}
                                    />
                                }
                                <AntDesign
                                    name='download'
                                    color={white}
                                    size={30}
                                    style={{
                                        position: "absolute",
                                        bottom: "3%",
                                        right: "5%",
                                        zIndex: 3
                                    }}
                                    onPress={() => {
                                        if (Platform.OS === 'ios') {
                                            iosDownload(item)
                                        } else {
                                            requestPermission(item)
                                        }
                                    }}
                                />
                            </FastImage>
                        </View>
                    )}
                    customButtons={(position, move) => (
                        <View style={styles.buttons}>
                            {props.images.map((image, index) => {
                                return (
                                    <View style={position === index
                                        ? styles.buttonSelected
                                        : styles.buttonUnSelected}
                                    />
                                );
                            })}
                        </View>
                    )}
                />
            }
            <Text style={styles.title}>
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(88),
        height: heightPercentageToDP(54),
        backgroundColor: offWhite,
        borderRadius: widthPercentageToDP(3),
        //alignItems: "center",
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(1),
        alignSelf: "center",
        //alignItems: "center",
        //padding: 2,
        //alignSelf: "center",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: Platform.OS == 'ios' ? 3 : 5,
        shadowOpacity: 1.0,
        elevation: Platform.OS == 'ios' ? 2 : 4,
    },
    buttons: {
        zIndex: 1,
        height: heightPercentageToDP(4),
        //marginTop: -25,
        marginBottom: heightPercentageToDP(8),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor:"red"
    },
    buttonSelected: {
        width: widthPercentageToDP(3),
        height: widthPercentageToDP(3),
        borderRadius: widthPercentageToDP(3) / 2,
        backgroundColor: darkBlue,
        marginRight: widthPercentageToDP(2)
    },
    buttonUnSelected: {
        width: widthPercentageToDP(3),
        height: widthPercentageToDP(3),
        borderRadius: widthPercentageToDP(3) / 2,
        backgroundColor: "#cccccc",
        marginRight: widthPercentageToDP(2)
    },
    customSlide: {
        padding: 0,
        //backgroundColor: 'green',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    img: {
        width: "100%",
        height: heightPercentageToDP(40),
        borderTopLeftRadius: widthPercentageToDP(3),
        borderTopRightRadius: widthPercentageToDP(3),
    },
    title: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Bold",
        color: textBlack,
        marginTop: heightPercentageToDP(1),
        textAlign: "left",
        position: "absolute",
        bottom: "5%",
        left: "4%"
    },
    normalTxt: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: "Montserrat-Light",
        color: textBlack,
        textAlign: "center",
        marginLeft: widthPercentageToDP(17)
    },
    semiBoldTxt: {
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-SemiBold",
        color: textBlack,
        textAlign: "left",
        paddingLeft: widthPercentageToDP(5)
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "space-around",
        marginTop: heightPercentageToDP(2)
    },
    roundImg: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
        borderRadius: widthPercentageToDP(10) / 2,
        marginLeft: widthPercentageToDP(4)
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Recent



