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

## 카카오 로그인

https://github.com/crossplatformkorea/react-native-kakao-login?tab=readme-ov-file

위 내용의 expo버전대로 설정

https://docs.expo.dev/build/setup/

위 내용대로 EAS빌드하기

```
// eas.json
"preview": {
  "distribution": "internal",
  "ios": {
    "simulator": true
  },
  "android": {
    "buildType": "apk"
  }
},
```

eas build -p android --profile preview

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

https://hyeon.pro/dev/react-native%EC%97%90%EC%84%9C-styled-components-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/

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

### eas build

eas build -p ios --profile preview

eas build -p android --profile preview

앱 빌드시에 ios으로 빌드시, app.json에 "overrideKakaoSDKVersion": "2.9.0" 는 제거해줘야한다.

### 스플래시 화면 제어하기

[참고자료](https://velog.io/@hsg5533/React-Native-Expo-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-Splash-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0)

npx expo install expo-splash-screen

### 카메라 기능

npx expo install expo-camera

[참고자료](https://docs.expo.dev/versions/latest/sdk/camera/)

npx expo install expo-image-picker

[참고자료](https://docs.expo.dev/tutorial/image-picker/)

### 편집기

npm i react-native-pell-rich-editor

[참고자료](https://github.com/wxik/react-native-rich-editor)

### 키보드 높이 구하기

npm i react-native-use-keyboard-height
