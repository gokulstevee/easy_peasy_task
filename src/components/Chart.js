import React, { useState } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';

const UserData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

const Chart = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained',
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <h1 className="my-4 text-center font-weight-bold ">Charts</h1>
      <div className="chart_body">
        <div style={{ width: 500 }}>
          <BarChart chartData={userData} />
        </div>
        <div style={{ width: 500 }}>
          <LineChart chartData={userData} />
        </div>
      </div>
    </>
  );
};

export default Chart;
