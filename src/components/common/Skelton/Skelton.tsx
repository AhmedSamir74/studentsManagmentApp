import { COLORS } from '@assets/theme/theme';
import { selectIsDark } from '@store/slices/themSlice';
import { SCREEN_WIDTH } from '@utils/scaling';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';
import { CustomLayout } from '..';

export const Skelton = ({ type }: { type?: string }) => {
  const isDark = useSelector(selectIsDark);

  return (
    <CustomLayout>
      {Array.from({ length: type === 'chat' ? 15 : 6 }).map((_, index) => (
        <SkeletonPlaceholder
          key={index}
          backgroundColor={isDark ? COLORS.darkGray : COLORS.lightGray}>
          <SkeletonPlaceholder.Item
            marginTop={15}
            flexDirection="row"
            alignItems="center">
            <SkeletonPlaceholder.Item
              width={type === 'chat' ? 30 : 100}
              height={type === 'chat' ? 30 : 100}
              borderRadius={15}
            />
            <SkeletonPlaceholder.Item
              width={SCREEN_WIDTH * 0.7}
              height={type === 'chat' ? 30 : 100}
              borderRadius={6}
              marginLeft={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ))}
    </CustomLayout>
  );
};
