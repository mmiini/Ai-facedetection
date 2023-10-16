# BITS - 카쉐어링 서비스에 활용 가능한 ArcFace 알고리즘 기반 실시간 운전자 얼굴 식별 모델 플랫폼 개발 


## 📜 목차
1. [프로젝트 소개] (#📋-프로젝트-소개)
2. [주요기능] (#2장.주요-기능)

---
## 📋 프로젝트 소개

 본 프로젝트는 블랙박스로 촬영한 이미지를 실시간으로 분석하여 등록된 운전자 여부를 확인하는 AI 기반 시스템입니다. 웹 어플리케이션을 통해 이미지 업로드 및 처리가 이루어지며 결과는 사용자에게 실시간으로 표시됩니다. 이는 카쉐어링 및 운전자 관리 분야에서 보다 안전하고, 효율적인 관리 시스템을 개발하고자 합니다.
*
*

---
## 2장. 주요 기능


ArcFace 모델을 다운로드하려면 다음 링크를 사용하세요:

[https://github.com/serengil/deepface_models/releases](https://github.com/serengil/deepface_models/releases)

이 링크에서 pretrained된 ArcFace 모델(arcface_weights.h5)을 다운로드하고 프로젝트에서 사용할 수 있습니다.
그 후 arcface_weights.h5파일을 lambda_final 폴더로 붙여넣으세요

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
