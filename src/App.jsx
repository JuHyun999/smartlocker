import './App.css'
import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";


function App() {
  const [location, setLocation] = useState({ 
    lat: 33.37537615391804,
    lng: 123.63265870059978 
  });

  useEffect(() => {
    // Firebase 설정
    const firebaseConfig = {
      databaseURL: "https://esp32-b954f-default-rtdb.asia-southeast1.firebasedatabase.app",
    };

    // Firebase 초기화
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const locationRef = ref(database, 'location');

    //위치
    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      console.log('새로운 위치 데이터:', data); //테스트
      if (data) {
        setLocation({
          lat: data.lat,
          lng: data.lng
        });
      }
    });

    const kakao = window.kakao;
    kakao.maps.load(() => {
    });
  }, []);

  return (
    <div className="max-w-md min-h-screen mx-auto bg-gray-50">
      <header className="flex items-center justify-between p-4">
        <div className="text-lg font-bold">인천대 자전거</div>
      </header>
      <Map
        center={location}
        className="border-1 rounded-3xl w-full h-140 md:h-100 lg:h-[500px] xl:h-[600px]"
        level={2}
      >
        <MapMarker 
          position={location}
        />
      </Map>
    </div>
  );
}

export default App