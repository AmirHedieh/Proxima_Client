package com.beacon;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.nearit.connectivity.RNConnectivityStatusPackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import it.innove.BleManagerPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.mackentoch.beaconsandroid.BeaconsAndroidPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeFirebaseMessagingPackage(),
            new ReactNativeFirebaseAppPackage(),
            new VectorIconsPackage(),
            new RNConnectivityStatusPackage(),
            new AndroidOpenSettingsPackage(),
            new BleManagerPackage(),
            new NetInfoPackage(),
            new BeaconsAndroidPackage(),
            new LottiePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
