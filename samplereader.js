// app.js

data = `{
    "success": true,
    "apps": [
      {
        "app_name": "FB",
        "app_type": "Social Network",
        "app_unit": "1"
      },
      {
        "app_name": "Paypal",
        "app_type": "Payment",
        "app_unit": "2"
      },
      {
        "app_name": "Netflix",
        "app_type": "Media",
        "app_unit": "3"
      }]
  }`
  
  let jsonData = JSON.parse(data);
  for (let i = 0; i < jsonData.apps.length; i++) {
    let app = jsonData.apps[i];
    console.log(app.app_name);
  }