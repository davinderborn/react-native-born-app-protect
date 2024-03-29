import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-born-app-protect' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const BornAppProtect = NativeModules.BornAppProtect
  ? NativeModules.BornAppProtect
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function enableViewSecuring(enabled: boolean): Promise<void> {
  return BornAppProtect.enabledSecuring(enabled);
}

export function iOSScreenRecordingMirroring(
  interval: number
): Promise<boolean> {
  return BornAppProtect.startScreenMirroringStatusPolling(interval);
}
