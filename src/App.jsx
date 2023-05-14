import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [row, setRow] = useState([]);

  useEffect(() => {
    console.log('mount or update');
    return () => {
      console.log('unmount');
    }
  });

  useEffect(() => {
    console.log('mount only');

    fetch("http://openapi.seoul.go.kr:8088/78636e4e496269673634556a795559/json/RealtimeCityAir/1/25").then(
      (res2) => {
        res2.json().then((res3) => {
          setRow(res3.RealtimeCityAir.row);
        })
      }
    )
  }
    , []);

  useEffect(() => {
    console.log('update only', row);
  }, [row]);



  return (
    <>
      {/* 여기부터 */}
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>PM10</th>
            <th>O3</th>
            <th>상태</th>
          </tr>

        </thead>
        <tbody>
          {
            row.map((gu, index) => {
              return <tr key={index}>
                <td>{gu.MSRSTE_NM}</td>
                <td>{gu.PM10}</td>
                <td>{gu.O3}</td>
                <td>{gu.IDEX_NM}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App
