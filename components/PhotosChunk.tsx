import {PhotoIdentifier} from '@react-native-community/cameraroll';
import {View} from 'native-base';
import React from 'react';
import {Animated, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {event} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {reduxState} from '../types/interfaces';

interface Props {
  date: string;
  photos: Array<PhotoIdentifier>;
  opacity: Animated.AnimatedInterpolation;
  numCol: 2 | 3 | 4;
  setWrapperHeight: Function;
}

const renderPhotos = (
  photos: Array<PhotoIdentifier>,
  opacity: Animated.AnimatedInterpolation,
  numCol: 2 | 3 | 4,
  loading: boolean,
) => {
  let result = [];

  for (let photo of photos) {
    result.push(
      <Animated.View
        // <Animated.Image
        // source={{uri: photo.node.image.uri}}
        key={photo.node.image.uri}
        style={{
          height: 200,
          backgroundColor: loading ? 'blue' : 'red',
          margin: 3,
          opacity: opacity,
          width: `${90 / numCol}%`,
        }}
        // width={200}
        // height={200}
      />,
    );
  }

  return result;
};

const PhotosChunk: React.FC<Props> = (props) => {
  const loading = useSelector((state: reduxState) => state.loading);

  return (
    <Animated.View
      key={props.date}
      style={{width: '100%'}}
      onLayout={(event) => {
        let {height} = event.nativeEvent.layout;
        props.setWrapperHeight(height);
      }}>
      <Animated.Text style={{opacity: props.opacity}}>
        {props.date}
      </Animated.Text>
      <View
        style={{
          flexDirection: 'row',
          // flex: 1,
          flexWrap: 'wrap',
          width: '100%',
          height: "auto",
          // minHeight: SCREEN_HEIGHT,
          flexGrow: 1,
        }}>
        {renderPhotos(props.photos, props.opacity, props.numCol, loading)}
      </View>
    </Animated.View>
    // <FlatList
    //   data={props.photos}
    //   keyExtractor={(photo) => photo.node.image.uri}
    //   ListHeaderComponent={() => <Text>{props.date}</Text>}
    //   renderItem={({item}) => (
    //     <Animated.Image source={{uri: item.node.image.uri}} />
    //   )}
    // />
  );
};

export default PhotosChunk;
