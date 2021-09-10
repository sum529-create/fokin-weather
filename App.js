import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "c46d5600e9d0d59ddc391937e35cfe2a";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    // setState -> state객체에 대한 업데이틀 실행. state가 변경되면 컴포넌트는 리렌더링됨
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
    });
  };
  getLocation = async () => {
    try {
      // throw Error(); // 에러발생시킴
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      // this.setState({ isLoading: false });
      // Send to API and get Weather
    } catch (e) {
      // user가 허가를 거절했을시
      Alert.alert(
        "위치정보 찾기 실패",
        "위치 정보는 허가를 해야 사용할 수 있어염"
      );
    }
  };
  // componentDidMount() 즉시 setState()를 호출함 or render 후에 실행됨
  componentDidMount() {
    this.getLocation();
  }
  // extends로 받은 React 컴포넌트 | 클래스 컴포넌트에서 반드시 구현돼야 할 유일한 메소드
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}
// render에서 isLoading값이 state에서 true이기 때문에 Loading.js로 넘어가서 실행 된 후
// componentDidMount()로 넘어가서 getLocation이 실행 사용자의 허락 받고 위치 정보 받아와서
// getWeather의 api를 통해서 받아오고 각각 setState로 isLoading, temp, condition의 값을 받아온다.
// isLoading값이 false이니까 Weather.js가 실행 temp과 condition을 props로 넘겨준다.
// Weather.js에서 WeatherOption에 맞게 각각 설정되고 propsType로 props의 타입이 일치하는 지 확인 후에
// 화면에 나타나게 된다.

/* react lifeCycle
constructor -> componentWillMount -> render -> componentDidMount 
*/
