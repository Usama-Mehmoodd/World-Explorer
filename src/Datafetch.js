import React from 'react'

export default function Datafetch() {

  const [data, setData] = React.useState([]);

  console.log(data);
    // async function fetchData() {
    // const response = await fetch("MOCK_DATA.json");
    // const jsonData = await response.json() 
    // const jsonData1 = await jsonData.text() 

    //   console.log(jsonData1);
    //   setData(jsonData1);
    
    // };

    function fetchData () 
    {
      // .then((response) => response.json())
      fetch('MOCJ_DATA.json')
      .then((response) => response.text())
      .then((data) => console.log(data))
      setData(data);
      
    }

  React.useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch("MOCK_DATA.json");
    // //   const jsonData = await response.text() 
    //   const jsonData = await response.json() 
    //   console.log(jsonData);
    //   setData(jsonData);
    // };
    fetchData();
  }, []);

  return (
    <div>
     <h1>Data</h1>
            {data?.map((v, i) => (
                <div key={v.id + i}>
                {v.name} - Age: {v.age}
                {v.last_name}
                </div>
            ))}
    </div>
  )
}
