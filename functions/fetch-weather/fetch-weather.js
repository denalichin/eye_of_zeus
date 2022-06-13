// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method


//NETLIFY FUNCTION CALLS API CALLS TO KEEP API KEYS SECRET
const axios = require('axios');

const handler = async (event) => {
  
  
  try {
    const {data} = await axios.get(process.env.REACT_APP_NASA_EONET);

    // console.log(data);
    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
      // body: data
    }

  } catch (error){
    const {status, statusText, headers, data} = error.response;
    return {
      statusCode: status,
      test: data,
      // status,
      body: JSON.stringify({status, statusText, headers, data})
      // body: error.toString()
    }
  }



  
  // const fetchEvents = () => {
  //   setLoading(true);
  //   const res = fetch(NASA_EONET)
  //     .then(res => {
  //       if(res.ok){
  //         console.log("res.ok")
  //         console.log(res);
  //         return res.json();
  //       } else {
  //         console.log('not successful');
  //       }
  //     })
  //     .then(data => {
  //       // console.log(data);
  //       const { events } = data;
  //       console.log(events);
  //       setEventData(events);
  //       setLoading(false);
  //     })
  //     .catch(error => console.log('ERROR FOUND: ' + error));
  // }
  
  
  
  
  // try {
  //   const subject = event.queryStringParameters.name || 'World'
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ message: `Hello ${subject}` }),
  //     // // more keys you can return:
  //     // headers: { "headerName": "headerValue", ... },
  //     // isBase64Encoded: true,
  //   }
  // } catch (error) {
  //   return { statusCode: 500, body: error.toString() }
  // }
}

module.exports = { handler }
