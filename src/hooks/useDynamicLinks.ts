import { useCallback, useEffect } from 'react';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import { Linking } from 'react-native';

export const useDynamicLinks = () => {
  const navigateFromDeepLink = useCallback((url: string | null | undefined) => {
    console.log('Deep link url', url);
  }, []);

  const handleDynamicLink = useCallback(
    (link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
      // Handle dynamic link inside your own application
      navigateFromDeepLink(link?.url);
    },
    [navigateFromDeepLink],
  );

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    dynamicLinks().getInitialLink().then(handleDynamicLink);

    Linking.getInitialURL()
      .then(navigateFromDeepLink)
      .catch(err => console.error('An error occurred', err));

    Linking.addEventListener('url', ({ url }) => navigateFromDeepLink(url));

    return () => unsubscribe();
  }, [handleDynamicLink, navigateFromDeepLink]);
};
