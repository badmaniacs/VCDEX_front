import Chart from 'react-apexcharts';
import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import WatchList from './WatchList';
import { useOutletContext } from 'react-router-dom';
import ReplyList from './ReplyList';

const MakeChart = () => {
  const [target,setTarget] = useState('vcdex');
  const selectChart = useRef();
  const [charttime,setCharttime] = useState((Date.now())+32400000-21600000);
  const [charttimeb,setCharttimeb] = useState("6H")
  const [lastdata,setLastdata] = useState('');
  const {nickname,id,islogin} = useOutletContext();

  const active = "px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const inactive = "px-3 py-2 text-sm font-medium text-center text-black bg-white-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  const chartOption = {
  options: {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    title: {
      text: target,
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      min: function(min) {return min},
      max: function(max) {return max},
      labels: {
        formatter: function (val) {
          return val.toFixed(3);
        },
      },
      title: {
        text: 'Value'
      },
    },
    xaxis: {
      type: 'datetime',
      min: charttime,
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val;
        }
      }
    }
  },}
  const [series,setSeries] = useState([{
    name: target,
    data : []
  }]);

  useEffect(()=>{
    axios.get("/api/index/dataf")
    .then((res) => {
      setSeries([{ name : target,
        data : res.data.map(item=>{return [Date.parse(item.writedate)+32400000,item[target]]})
      }])
      setLastdata(
        res.data.pop()
      )
    })
    const source = new EventSource("/api/index/data");
    source.onmessage = (e) =>{
        console.log(e.data)
      const data = JSON.parse(e.data)
      setSeries([{name : target,
        data : data.map(item=>{return [Date.parse(item.writedate)+32400000,item[target]]})
      }])
      setLastdata(
        data.pop()
      )
    }
    return () => source.close();
  },[target])


  const one_hour_Handler = () => {
    setCharttime((Date.now())+32400000-3600000);
    setCharttimeb("1H")
  }
  const six_hour_Handler = () => {
    setCharttime((Date.now())+32400000-21600000);
    setCharttimeb("6H")
  }
  const one_day_Handler = () => {
    setCharttime((Date.now())+32400000-86400000);
    setCharttimeb("1D")
  }
  const one_week_Handler = () => {
    setCharttime((Date.now())+32400000-604800000);
    setCharttimeb("1W")
  }
  const one_month_Handler = () => {
    setCharttime((Date.now())+32400000-2629800000);
    setCharttimeb("1M")
  }
  const all_Handler = () => {
    setCharttime('');
    setCharttimeb("ALL")
  }

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="">
            <button className={charttimeb==="1H" ? active : inactive} id="one_hour" onClick={one_hour_Handler}>
            1H
            </button>
            <button className={charttimeb==="6H" ? active : inactive} id="six_hour" onClick={six_hour_Handler}>
            6H
            </button>
            <button className={charttimeb==="1D" ? active : inactive} id="one_day" onClick={one_day_Handler}>
            1D
            </button>
            <button className={charttimeb==="1W" ? active : inactive} id="one_week" onClick={one_week_Handler}>
            1W
            </button>
            <button className={charttimeb==="1M" ? active : inactive} id="one_month" onClick={one_month_Handler}>
            1M
            </button>
            <button className={charttimeb==="ALL" ? active : inactive} id="all" onClick={all_Handler}>
            ALL
            </button>
        </div>
        <div className="grid grid-cols-4 gap-4 h-40">
          <div className="col-span-3 border rounded-lg border-gray-300">
            <Chart
            type="area"
            options={chartOption.options}
            series={series}
            height={350}
            ref={selectChart}
            />
          </div>
          <div className="col-span-1 border rounded-lg border-gray-300 overflow-scroll overflow-x-auto">
            <WatchList target={target} lastdata={lastdata} setTarget={setTarget}/>
          </div>
        <div className='col-span-4'>
          <ReplyList target={target} id={id} nickname={nickname} islogin={islogin}/>
         </div>   
        </div>
  
    </div>
    </>
  );
}

export default MakeChart;
