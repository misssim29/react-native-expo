# React native expo

## 패키지 생성

npx create-expo-app '프로젝트네임'

## 실행

npx expo start

## 에뮬레이터 키는법

터미널에서 i(ios)
android studio에서 device manager 실행시키고 터미널에서 a(android)

## debugger 모드 키는법

터미널에서 M열면 메뉴 열리는데 debugger모드 클릭

## Route(네비)

### 문서

https://docs.expo.dev/router/installation/

### 설치

npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler

```
// package.json
{
  "main": "expo-router/entry"
}
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel'],
  };
};
```

### 페이지 만들기

app 폴더 안에 생성

app/index.tsx 는 루트 /

app/home.tsx는 루트 /home

app/category/[id]는 /category/id -> id값은 받아와서 사용

### 레이아웃 경로 생성

```
import { Slot } from 'expo-router';

export default function HomeLayout() {
  return     <>
      <Header />
      <Slot />
      <Footer />
    </>;
}

```

### 페이지간 이동

버튼형은 asChild를 꼭 써야한다

```
//기본형
 <Link href="/about">About</Link>
//버튼형
<Link href="/other" asChild>
  <Pressable>
    <Text>Home</Text>
  </Pressable>
</Link>
```

### param값 불러오기

const params = useLocalSearchParams();

### 번들러 캐시 지우기

npx expo start -c

## 태그 설명

### View와 Text

View는 div, Text는 span인데 모든 텍스트는 Text로 감싸고 있어야한다

### StatusBar

핸드폰 상단의 status를 표시하는부분, style을 light을 주면 내용을 안보이게 할 수 있다

```
import { StatusBar } from 'expo-status-bar';
<StatusBar style="light">
```

### SafeAreaView

statusBar와 겹치지 않게 해주는 태그

### ScrollView

스크롤이 가능한 view

#### 속성1. horizontal (옆으로 스와이프하는기능 기존의 swiper)

horizontal을 사용할 경우 style 대신 contentContainerStyle을 사용해야한다.

#### 속성2. pagingEnabled

가운데정렬로 swipe, freemode 제거 (SCREEN값 구한걸 width값으로 먼저 줘야함)

## SCREEN width, height값 구하는법

const { width , height } = Dimension.get("window");

## 절대경로 설정하기

```
npm i babel-plugin-module-resolver
// babel.config.js
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            "@": "./",
          },
        },
      ],
    ],
//tsconfig.json
  "compilerOptions": {
    "module": "ES6",
    "moduleResolution": "Node",
    "baseUrl": "./",
    "paths": {
      "@/*": ["./*"]
    }
  },

```

## base64 사용법(한글)

npm i @craftzdog/react-native-buffer react-native-quick-base64

```
import { Buffer } from '@craftzdog/react-native-buffer'

Buffer.from("base64변환된코드", 'base64').toString('utf8')
```

## styled-component (css 효율적으로 운용가능하게하는 라이브러리)

npm i styled-components

npm i --save-dev babel-plugin-styled-components @types/styled-components @types/styled-components-react-native

babel.config.js 에 plugins에 babel-plugin-styled-components 추가

[참조](https://hyeon.pro/dev/react-native%EC%97%90%EC%84%9C-styled-components-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)

```
import styled form 'styled-components/native';
import { Text, View } from 'react-native';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const MainText = styled(Text)`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: red;
`;
```

### 자동완성 기능

vscode plugin : vscode-styled-components

## 이미지 가져오는법 Image

### 로컬

```
<Image source={require('/src/~)} />
```

### 서버

```
<Image source={{url:"http://~~"}}>
```

## v-html의 역할

npm i react-native-render-html

```
import HTML from 'react-native-render-html';
<HTML source={{html:htmlContent}}>
```

## text-overflow: ellipsis의 역할

Text 태그에 아래와같이 추가한다. 단, android에서는 가로값 100%가 제대로 먹히지 않을 수 있는데 그럴땐 Dimensions을 이용해 가로값을 구해주고 width값을 조정해준다.

```
numberOfLines={1}
ellipsizeMode="tail"
```

## Dimensions

디바이스의 가로값, 세로값

```
import { Dimensions } from "react-native";
const DeviceWidth = Dimensions.get("window").width;
const DeviceHeight = Dimensions.get("window").height;
```

## REDUX

npm install @reduxjs/toolkit react-redux

## EAS UPDATE (코드푸시기능)

npx expo install expo-updates

https://velog.io/@strawsunny/expo%EC%97%90%EC%84%9C-update-%EA%B8%B0%EB%8A%A5-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

```
// app.json이나 app/_layout.tsx
import * as Updates from "expo-updates";
async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    alert(`Error fetching latest Expo Update : ${error}`);
  }
}

useEffect(() => {
  onFetchUpdateAsync();
}, []);
//app.json
"plugins": [
  [
    "expo-updates",
    {
      "username": "misssim29"
    }
  ]
],
"runtimeVersion": {
  "policy": "appVersion"
},
"updates": {
  "url": "https://u.expo.dev/de558927-9287-41e0-9945-e39be07db7a6"
}
```

-> de558927-9287-41e0-9945-e39be07db7a6 이부분은 https://expo.dev/accounts/misssim29/projects/my-app 여기서 Id값

eas update --branch preview --message "Updating the app"

-> update는 빌드할때 버전과 같아야한다

## eas build

eas login

eas build -p ios --profile preview

eas build -p android --profile preview

\*\* build시에 \_layout.tsx에 있는 onFetchUpdateAsync(); 활성화시켜줘야한다.(그래야 update가 가능해짐)

## 스플래시 화면 제어하기

[참고자료](https://velog.io/@hsg5533/React-Native-Expo-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-Splash-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0)

npx expo install expo-splash-screen

## 카메라 기능

npx expo install expo-camera

[참고자료](https://docs.expo.dev/versions/latest/sdk/camera/)

npx expo install expo-image-picker

[참고자료](https://docs.expo.dev/tutorial/image-picker/)

## 편집기

npm i react-native-pell-rich-editor

[참고자료](https://github.com/wxik/react-native-rich-editor)

## 키보드 높이 구하기

npm i react-native-use-keyboard-height

## Image 컴포넌트

npx expo install expo-image

react-native의 기본버전보다 expo버전으로 쓰는게 더 좋다

## IconFont 적용

npm install --save react-native-vector-icons --save-dev @types/react-native-vector-icons

```
// _layout.tsx
import * as Font from "expo-font";

await Font.loadAsync({
  customIcon: require("@/assets/customIcon.ttf"),
});
useEffect(() => {
  loadFonts();
}, []);
async function loadFonts() {
  await Font.loadAsync({
    customIcon: require("@/assets/customIcon.ttf"),
  });
}
// component/icon.tsx
import icoMoonConfig from "@/assets/selection.json";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";

const Icon = createIconSetFromIcoMoon(icoMoonConfig, "customIcon");

export default Icon;

// Page
import Icon from "@/components/Icon";
<Icon name="cafe" size={50} color="#222" />

```

[svg -> iconfont로 변환하기](https://icomoon.io/app/#/select/font)
[설명참조](https://velog.io/@tata-v_vlelog/RN-%EC%BB%A4%EC%8A%A4%ED%85%80-Icon-Font-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-expo)

변환할때 icon 변환 잘 됐는지 모양 확인해야함.. 제대로 안될때 있음

## animation 애니메이션

npx expo install react-native-reanimated

```
//babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

## 로컬스토리지 (storage)

엑스포 시큐어스토어 (보안이 높고 안전하게 저장하는 방법을 제공하는 라이브러리)

npx expo install expo-secure-store

```
// app.json
"expo": {
    "ios": {
      "config": {
        "usesNonExemptEncryption": false
      }
      ...
    }
  }

```

## webview 웹뷰

npx expo install react-native-webview

## 패키지명 변경하는법

- app.json에서 이름 바꾸기
- npx expo prebuild --clean

## android studio에서 google 로그인 안되는 문제

애초에 google store가 가능한 디바이스로 다운받고 실행해야함

## 카카오 로그인

https://github.com/crossplatformkorea/react-native-kakao-login?tab=readme-ov-file

npm i @react-native-seoul/kakao-login 하고 npx pod-install

```
// ios/앱이름/info.plist
 <key>CFBundleURLTypes</key>
 <array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>kakao{카카오 네이티브앱 아이디를 적어주세요}</string>
    </array>
  </dict>
 </array>
 <key>CFBundleVersion</key>
 <string>1</string>
 <key>KAKAO_APP_KEY</key>
 <string>{카카오 네이티브앱 아이디를 적어주세요}</string>
 <key>KAKAO_APP_SCHEME</key> // 선택 사항 멀티 플랫폼 앱 구현 시에만 추가하면 됩니다
 <string>{카카오 앱 스킴을 적어주세요}</string> // 선택 사항
 <key>LSApplicationQueriesSchemes</key>
 <array>
   <string>kakaokompassauth</string>
   <string>storykompassauth</string>
   <string>kakaolink</string>
 </array>

// android/build.gradle
맨아래
maven { url 'https://devrepo.kakao.com/nexus/content/groups/public/'}
// android/app/src/main/AndroidManifest.xml
<activity
   android:name="com.kakao.sdk.auth.AuthCodeHandlerActivity"
   android:exported="true">
  <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />

      <!-- Redirect URI: "kakao{NATIVE_APP_KEY}://oauth“ -->
      <data android:host="oauth"
          android:scheme="kakao{카카오 네이티브 앱 key를 입력해주세요}" />
  </intent-filter>
</activity>

// android/app/src/main/res/values/strings.xml
<resources>
    <string name="app_name">KakaoLoginExample</string>
+   <string name="kakao_app_key">your_app_key</string>
</resources>
```

### 릴리즈된 키해시 추출 방법

키해시 추출 : keytool -exportcert -alias <RELEASE_KEY_ALIAS> -keystore <RELEASE_KEY_PATH> | openssl sha1 -binary | openssl base64

[참조](https://ssilook.tistory.com/entry/RN-React-Native-%ED%82%A4-%ED%95%B4%EC%8B%9CKey-Hash-%EC%96%BB%EB%8A%94-%EB%B0%A9%EB%B2%95)

### preview 키해시 추출 방법

expo 사이트에서 project settings -> Credentials 들어가서 sha-1 Fingerprint 확인

[링크](https://tomeko.net/online_tools/hex_to_base64.php) 여기 들어가서 변환

## naver 네이버 로그인

[참조](https://github.com/crossplatformkorea/react-native-naver-login)

npm install @react-native-seoul/naver-login --save

```
//Info.plist
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>naversearchapp</string>
  <string>naversearchthirdlogin</string>
</array>

```

## facebook 페이스북 로그인

[참조](https://docs.expo.dev/guides/facebook-authentication/)

npm install --save react-native-fbsdk-next

```
app.json
{
  "expo": {
    "plugins": [
      [
        "react-native-fbsdk-next",
        {
          "appID": "48127127xxxxxxxx",
          "clientToken": "c5078631e4065b60d7544a95xxxxxxxx",
          "displayName": "RN SDK Demo",
          "scheme": "fb48127127xxxxxxxx",
          "advertiserIDCollectionEnabled": false,
          "autoLogAppEventsEnabled": false,
          "isAutoInitEnabled": true,
          "iosUserTrackingPermission": "This identifier will be used to deliver personalized ads to you."
        }
      ]
    ]
  }
}
```

이거 추가하고 prebuild 해주면 됨 그래서 sns 구현의 경우 facebook 먼저해서 prebuild해주고 카카오,네이버 설정해주는게 좋음

- android에서 url 어쩌고하면서 안될경우 : facebook 개발자 내 앱 들어가서 기본설정 - 플랫폼추가 android해서 키해시 넣어줘야함

## Apple 애플 로그인

npx expo install expo-apple-authentication

[참조](https://docs.expo.dev/versions/latest/sdk/apple-authentication/#login)

```
//app.json
{
  "ios": {
    "usesAppleSignIn": true
  }

  "plugins": ["expo-apple-authentication"]
}

```

prebuild나 eas build했을 경우 : xcode 가서 생성된 ios폴더 열어서 signing & Capabilities에서 team 설정 유료결제된 계정으로 바꿔야됨..(현재 퓨쳐다임 꼽사리껴잇음)

# 써드파티라이브러리 써서 prebuild 해야하는것들 정리 (prebuild떄문에 맨 마지막에 구현해야 덜 귀찮음)

카카오로그인, 네이버로그인

## prebuild

[참조](https://docs.expo.dev/workflow/prebuild/)

npx expo prebuild

npx expo run:android

npx expo run:ios

### android prebuild하면 생기는 sdk 관련문제

prebuild시에 생기는 android폴더 내에 local.properties파일을 생성

sdk.dir = /Users/내정보명(ex : simjuyeon)/library/Android/sdk

android 폴더 들어가서 ./gradlew clean

그런다음 npx expo run:android

### prebuild시 주의점

1. app.json에서 plugin을 추가해주면 prebuild를 다시해줘야 적용된다..... (android, ios 설정 다시해야함 ^^...)
2. 먼저 윗 내용대로 local.properties부터 설정해줘야함
3. 그리고 android, ios 설정 다시해주자

#### Managed Workflow와 Bare Workflow의 차이

> Managed Workflow는 prebuild를 하기 전 상태, 즉 android와 ios를 컨트롤할수 없는 상태로 개발자가 네이티브 코드를 건드릴 필요가 없다. Managed 상태에서 expo 기능들을 추가한 후 prebuild를 하면 그에 맞춰 Bare Workflow로 변경돼 ios와 android파일들이 생긴다. 처음부터 Bare Workflow로 개발할 수도 있지만 그러면 기본적으로 자동제공되는 expo의 라이브러리들을 간편하게 적용하기 어렵고 적용할때마다 서드파티라이브러리들처럼 ios와 android파일들을 설정해줘야한다. (심지어 제공이 안되는 경우도 있다)그래서 expo 기본제공 라이브러리들을 설치한 후, prebuild해 써드파티라이브러리들을 적용하는것이 베스트(plugin추가시 코드병합이 안된다.. 걍 지우고 다시 prebuild해야함). 아직 네이티브 코드를 건드려야하는 써드파티라이브러리들은 카카오,네이버 로그인뿐이라 플러그인 추가해서 재 prebuild를 할 시엔 얘네만 다시 적용해서 테스트 꼭 해주자..

## 푸시알림 push notification

[참조](https://documentation.onesignal.com/docs/react-native-expo-sdk-setup)

> ios

[참조](https://fomaios.tistory.com/entry/iOS-OneSignal%EC%9C%BC%EB%A1%9C-%ED%91%B8%EC%89%AC%EC%95%8C%EB%A6%BC-%EB%B3%B4%EB%82%B4%EB%B3%B4%EA%B8%B0OneSignal-Push-Notification)

[애플개발자 certificate](https://developer.apple.com/account/resources/certificates/list) 가서 키체인 발급받고 위 참조 내용대로 진행

onesiganl에서 등록시 p12로 등록하기 선택해야함

> Android

[참조](https://documentation.onesignal.com/docs/android-sdk-setup)

firebase에서 프로젝트 추가하고 json받아서 등록해줘야한다 [firebase sdk.json 받는방법](https://documentation.onesignal.com/docs/generate-firebase-credentials)

[참조](https://documentation.onesignal.com/docs/mobile-sdk#get-user-consent-for-data-collection)

```
  OneSignal.initialize("App key");
  OneSignal.Notifications.requestPermission(true);

  //밖에서 클릭
  OneSignal.Notifications.addEventListener("click", (event) => {
    router.replace(`/article/${event.notification.rawPayload?.custom.a.id}`);
  });

  //인앱일때
  OneSignal.Notifications.addEventListener("foregroundWillDisplay", (event) => {
    router.replace(`/article/${event.notification.rawPayload?.custom.a.id}`);
  });
```

## Expo Go버전인지, build 버전인지 구분하는법

```
import Constants, { ExecutionEnvironment } from "expo-constants";
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
```

prebuild에서만 작동하는 기능을 넣었을떄 expo를 작동하면 오류가 나는데 이렇게 구분해주면 expo 테스트시에 오류가 나지않는다. [참조](https://docs.expo.dev/bare/using-expo-client/)
