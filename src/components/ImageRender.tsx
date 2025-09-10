import React, { type FC, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import {
  type AndroidImageResizeMode,
  FasterImageView,
  type IOSImageResizeMode,
} from '@candlefinance/faster-image';
import _ from 'lodash';

interface IImageRenderProps {
  errors?: any;
  style: any;
  uri: string;
  resizeMode?: IOSImageResizeMode | AndroidImageResizeMode;
  shouldPaused?: boolean;
  shouldVideoPaused?: boolean;
}

const ImageRender: FC<IImageRenderProps> = ({
  errors = undefined,

  style,
  uri: linkURI,
  resizeMode = 'cover',
}) => {
  const [isError, setError] = useState<boolean>();
  const [uri, setURI] = useState(linkURI);

  const onErrorImage = () => {
    setError(true);
  };

  useEffect(() => {
    setURI(linkURI);
  }, [linkURI]);

  if (_.size(uri) > 0) {
    const isWebsite = uri.includes('http') || uri.includes('https');
    if (isWebsite) {
      const isReplaceWithDefault = _.get(errors, 'check') && isError;

      return (
        <View style={[styles.overFlow, style]}>
          {isReplaceWithDefault ? (
            <View style={style}>{_.get(errors, 'default')}</View>
          ) : (
            <FasterImageView
              style={[styles.overFlow, style]}
              onError={onErrorImage}
              source={{
                url: uri,
                transitionDuration: 0.3,
                cachePolicy: 'discWithCacheControl',
                showActivityIndicator: true,
                failureImage: _.get(errors, 'defaultImage'),
                resizeMode: resizeMode,
                allowHardware: false,
              }}
            />
          )}
        </View>
      );
    } else {
      // @ts-ignore
      return <Image source={{ uri }} resizeMode={resizeMode} style={style} />;
    }
  } else {
    return _.get(errors, 'defaultImage') ? (
      <Image
        source={_.get(errors, 'defaultImage')}
        // @ts-ignore
        resizeMode={resizeMode}
        style={style}
      />
    ) : (
      <View style={style}>{_.get(errors, 'default')}</View>
    );
  }
};

const styles = StyleSheet.create({
  overFlow: {
    overflow: 'hidden',
  },
});

export default React.memo(ImageRender);
