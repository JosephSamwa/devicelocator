        const paybill = document.getElementById('pay2');
        const STK = document.getElementById('pay1');
        const payments = document.getElementById('payments');
        const Alert = document.getElementById('alert');
        const intro = document.getElementById('intro');
        const terms = document.getElementById('terms');
        const Container = document.getElementById('container');
         let ID;
        const accept = document.getElementById('accept');
        const userInfoBt = document.getElementById('userInfoBt');
        const userContainer = document.getElementById('userContainer');
        const ARR = document.getElementById('Arr');
        const FORM = document.getElementById('Form');
        const ErrMsg = document.getElementById('erR');
        const codeSelect = document.getElementById('code');
        const imeiForm = document.getElementById('imeiInput');
        const ipForm = document.getElementById('ipInput');
        const payment = document.getElementById('payment');
        const locateBt = document.getElementById('locateBt');
        const locationInfo = document.getElementById('location-info');
        const viewLocationButton = document.getElementById('view-location');
        const Alert1 = document.getElementById('firstAlert');
        const Alert2 = document.getElementById('secondAlert');
        const space= " "
        var text =`This service allows you trace a device using either its IMEI number or IP address.  Make sure you are using this site for legal purposes!.${space}  Accept the terms and conditions to continue.
        `; 
var word = text.split("");
var i = 0;
var interval = setInterval(writeText, 40 );
function writeText() {
    var p = document.getElementsByTagName("b")[0];
    var ff = document.getElementById('ff');
    if (i < word.length) {
        p.innerHTML += word[i];
        i++;
    } else {
        clearInterval(interval);
        ff.style.backgroundColor ="lightblue";
        ff.style.padding='10px';
        ff.style.borderRadius ='20px';
        
        document.getElementById('s').style.display="block";
    }
}
accept.addEventListener('click', () => {
    const userName = document.getElementById('userName').value;
    const deviceBrand = document.getElementById('deviceBrand').value;
    if (userName.length > 0 && deviceBrand.length > 0) {
        userContainer.style.display = 'none';
        Container.style.display = 'block';
    } else {
        document.getElementById('userAlert').style.display = 'block';
        function hide() {
            document.getElementById('userAlert').style.display = 'none';
        }
        setTimeout(hide, 2000);
    }
});
userInfoBt.addEventListener('click', () => {
    if (terms.checked) {
        intro.style.display = 'none';
        userContainer.style.display = 'block';
    } else {
        Alert.style.display = 'block';
        function hide() {
            Alert.style.display = 'none';
        }
        setTimeout(hide, 2000);
    }
});
codeSelect.addEventListener('change', () => {
    if (codeSelect.value === 'IMEI') {
        Container.style.display = 'none';
        FORM.style.display = 'block';
        ipForm.style.display = 'none';
        imeiForm.style.display = 'block';
        codeSelect.style.display = 'none';
    } else if (codeSelect.value === 'IP address') {
        FORM.style.display = 'block';
        Container.style.display = 'none';
        imeiForm.style.display = 'none';
        ipForm.style.display = 'block';
        codeSelect.style.display = 'none';
    } else {
        imeiForm.style.display = 'none';
        ipForm.style.display = 'none';
    }
    viewLocationButton.style.display = 'block'; // Show the "View Location" button
});

viewLocationButton.addEventListener('click', () => {
    const ipInputValue = document.getElementById('ip').value;
    let imeiInputValue = document.getElementById('imei').value;
    const inputType = codeSelect.value;

    // Determine which input to validate based on the selected code type
    if (codeSelect.value === 'IMEI') {
        ID = convertToIpAddress(imeiInputValue);
    } else if (codeSelect.value === 'IP address') {
        ID = ipInputValue;
    }
    console.log(`the ${inputType} is ${ID}`);

    let isValid = false;

    // Validate the input based on the selected type
    if (codeSelect.value === 'IMEI') {
        isValid = imeiInputValue.length > 14; // Add more specific IMEI validation if needed
    } else if (codeSelect.value === 'IP address') {
        isValid = validateIPAddress(ipInputValue);
    }
console.log(isValid);
    const resultElement = document.getElementById('validationResult');

    // Display validation result
    resultElement.textContent = isValid
        ? `Valid ${inputType.toUpperCase()}! 🎉`
        : `Invalid ${inputType.toUpperCase()}. 😕`;

    // Proceed only if the input is valid
    if (isValid) {
        const userName = document.getElementById('userName').value;
    const deviceBrand = document.getElementById('deviceBrand').value;
    /*deviceBrand.style.display='highlight';
    userName.style.display='highlight';*/
    Alert2.textContent=`Hi ${userName}! Your ${deviceBrand} was succesfuly located! Complete the payment to view the location of your device`;
        FORM.style.display = 'none';
        ipForm.style.display = 'none';
        imeiForm.style.display = 'none';
        viewLocationButton.style.display = 'none';
        ARR.style.display = 'block';
        Alert1.style.display = 'block';

        setTimeout(() => {
            
            Alert1.style.display = 'none';
            Alert2.style.display = 'block';
            payment.style.display = 'block';
        }, 5000);
    } else {
        ErrMsg.style.display = 'block';
        setTimeout(() => { ErrMsg.style.display = 'none' }, 2000);
    }
});
function validateIPAddress(Address) {
    const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipFormat.test(Address);
}
function convertToIpAddress(num) {
   /* if (isNaN(num) || num < 0 || num.length < 14) {
        return 'Invalid input. Please enter a number between 0 and 4294967295.';
    }
*/
    // Convert the number to binary and pad with zeros
    let binaryString = num.toString(2).padStart(64, '0');

    // Split the binary string into four octets
    let octets = [];
    for (let i = 0; i < 4; i++) {
        octets.push(parseInt(binaryString.slice(i * 10, (i + 1) * 10), 2));
    }
ID = octets.join('.');
console.log(`the converted Imei is ${ID}`);
    // Join the octets to form the IP address
    return octets.join('.');
}
locateBt.addEventListener('click', () => {
    Alert2.style.display = 'none';
    ARR.style.display = 'none';
    payments.style.display = 'block';
});
STK.addEventListener('click', () => {
document.getElementById('mpesaCode').style.display = 'none';
   document.getElementById('label3').style.display = 'none';
    document.getElementById('label').style.display = 'block';
document.getElementById('label2').style.display = 'block';
    document.getElementById('tel').style.display = 'block';
   document.getElementById('amount').style.display = 'block';
    const phone = document.getElementById('tel').value;
    if(phone.length > 1){
   document.getElementById('payAlert3').style.display= 'block';
    document.getElementById('payAlert1').style.display= 'none'; 
    document.getElementById('payAlert2').style.display= 'none';
    document.getElementById('payAlert4').style.display= 'none';
document.getElementById('payAlert5').style.display= 'none';
setTimeout(()=>{
        document.getElementById('payAlert3').style.display= 'none';
        Locate();
    },3000);
   }
   else{
     document.getElementById('payAlert1').style.display= 'block';
     document.getElementById('payAlert2').style.display= 'none';
     document.getElementById('payAlert3').style.display= 'none'; 
    document.getElementById('payAlert4').style.display= 'none';
document.getElementById('payAlert5').style.display= 'none';
     setTimeout(()=> {document.getElementById('payAlert1').style.display= 'none'},3000);
   }
});
paybill.addEventListener('click', () => {
   document.getElementById('label3').style.display = 'block';
   const mpesaCode = document.getElementById('mpesaCode');
   mpesaCode.style.display = 'block';
   document.getElementById('label').style.display = 'none';
   document.getElementById('label2').style.display = 'none';
   document.getElementById('tel').style.display = 'none';
   document.getElementById('amount').style.display = 'none';
   const CODE = mpesaCode.value;
   paybill.textContent='Validate code';
document.getElementById('payAlert4').style.display= 'block';
document.getElementById('payAlert1').style.display= 'none'; 
document.getElementById('payAlert3').style.display= 'none';
if(CODE){
    document.getElementById('payAlert2').style.display= 'block';
    document.getElementById('payAlert4').style.display= 'none';
    setTimeout(()=>{
        document.getElementById('payAlert2').style.display= 'none';
        Locate();
    },3000);
}else{
    document.getElementById('payAlert5').style.display= 'block';
    setTimeout(()=> {document.getElementById('payAlert5').style.display= 'none'},3000);
}
});
 function Locate() {
    getLocation(ID).then(location => {
        if (!location.error) {
            locationInfo.style.display = 'block';
            payments.style.display = 'none';
            document.getElementById('country').textContent = location.country;
            document.getElementById('region').textContent = location.region;
            document.getElementById('city').textContent = location.city;
            document.getElementById('latitude').textContent = location.latitude;
            document.getElementById('longitude').textContent = location.longitude;
            document.getElementById('timezone').textContent = location.timezone;
            document.getElementById('isp').textContent = location.isp;

            const liveLocationUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
            document.getElementById('live-location').href = liveLocationUrl;
        } else {
        payments.style.display = 'none';
        locationInfo.style.display = 'block';
        locateBt.style.display = 'none';
        document.getElementById('location-info').textContent = location.error;
        }
    });
 }
async function getLocation(ipAddress) {
    const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
    const data = await response.json();
    if (data.status === 'success') {
        const MyipAddress = data.ip;
        console.log(`User's IP address: ${MyipAddress}`);
        return {
            country: data.country,
            region: data.regionName,
            city: data.city,
            latitude: data.lat,
            longitude: data.lon,
            timezone: data.timezone,
            isp: data.isp
        };
    } else {
        console.log(data.error); // Log error message
        return { error: 'Unable to get location' }; // Return error
    }
}
/*
var VisitorAPI = function(projectID, ipAddress, successHandler, errorHandler) {
    var request = new XMLHttpRequest();
    request.open('GET', "https://visitorapi-dev.uc.r.appspot.com/api/?pid=" + projectID + "&ip=" + ipAddress);
    request.setRequestHeader('Accept', 'application/json');
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                successHandler(JSON.parse(this.responseText).data);
            } else {
                errorHandler(this.status, JSON.parse(this.responseText).result);
            }
        }
    };
    request.send();
};

// Example usage:
var specifiedIP = "8.8.8.8"; // Replace with the desired IP address
VisitorAPI("YOUR_PROJECT_ID",
    specifiedIP,
    function(data) {
        console.log("Location data for IP " + specifiedIP + ":");
        console.log(data);
    },
    function(errorCode, errorMessage) {
        console.log("Error: " + errorCode + ", Message: " + errorMessage);
    }
);
*/




/*
async function getLocation(ipAddress) {
    try {
        const response = await fetch(`https://api.ipdata.co/${ipAddress}?api-key=YOUR_API_KEY`);
        const data = await response.json();
        if (data.status === 'success') {
            console.log(`User's IP address: ${data.ip}`);
            console.log(`Country: ${data.country_name}`);
            console.log(`Region: ${data.region}`);
            console.log(`City: ${data.city}`);
            console.log(`Latitude: ${data.latitude}`);
            console.log(`Longitude: ${data.longitude}`);
            console.log(`Timezone: ${data.time_zone}`);
            console.log(`ISP: ${data.asn.name}`);
        } else {
            console.error('Error fetching data:', data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Example usage:
const ipAddress = '8.8.8.8'; // Replace with the desired IP address
getLocation(ipAddress);

*/




/*
<!doctype html>
<html lang="en"> 
 <head> 
  <meta charset="UTF-8"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  <link rel="stylesheet" href="js/style.css"> 
  <title>heyFIND.app | Phone tracker by Number - Find location by phone number</title> 
  <style>.popup_item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:25px}.popup_item .app_item-logo{margin-bottom:0}.popup_item span{white-space:nowrap;font-style:normal;font-weight:800;font-size:16px;line-height:150%;color:#000!important}.popup_item span b{color:#fc5260;font-size:21px;line-height:24px}.popup_area{position:fixed;top:0;left:0;z-index:1000;width:100%;height:100%;background-color:rgba(0,0,0,.4);overflow-y:auto;opacity:0;visibility:hidden;-webkit-transition:.3s;-o-transition:.3s;transition:.3s}.popup_area .popup_block{-webkit-transition:.3s;-o-transition:.3s;transition:.3s;-webkit-transform:translateY(-300px);-ms-transform:translateY(-300px);transform:translateY(-300px)}.popup_area.active{opacity:1;visibility:visible}.popup_area.active .popup_block{-webkit-transform:none;-ms-transform:none;transform:none}.popup_container{min-height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.popup_block{position:relative;background-color:#f6f8fe;max-width:895px;width:100%;padding:35px 70px;margin:0 15px;border-radius:10px}.popup_close{position:absolute;top:15px;right:15px;cursor:pointer}.popup_close img{width:32px}.popup_row{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;justify-content:space-between}.popup_title{font-weight:800;font-size:40px;line-height:1;margin-bottom:17px}.popup_text{margin-bottom:30px;text-align:center;font-weight:800;font-size:24px;line-height:194%;color:#ff1b17}.popup_text span{font-size:96px;line-height:96%;margin:-10px 0 -55px 0;display:block}.popup_column{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch}.popup_column>*{max-width:370px;text-align:center}.popup_subtitle{margin-bottom:18px;text-align:center;font-weight:400;font-size:16px;line-height:194%;color:#000}.popup_button{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-bottom:20px}.popup_button a.button{width:100%;text-decoration:none;padding:15px 40px 15px 40px;border-radius:72px;background-color:#192fdd;white-space:nowrap;max-width:360px}.popup_button .button{min-width:213px;width:100%;background:#0f6eff;border-radius:5px;white-space:nowrap}.popup_img{-webkit-box-flex:0;-ms-flex:0 0 44%;flex:0 0 44%;text-align:center;margin-right:-30px}.popup_img>img{margin-bottom:20px}.popup_img .app_rating-start{width:auto}.popup_img .popup_item{justify-content:center;grid-gap:20px}.popup_img .popup_item span{font-weight:400}.pack_timer-time{border-radius:10px;font-weight:700;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:10px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:center;-webkit-box-flex:1;-ms-flex:1 1 auto}.pack_timer-time>span{display:block;margin-top:0}.pack_timer-item{padding:0 10px;font-weight:700;text-align:center;position:relative;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-family:Montserrat;text-align:left}@media screen and (max-width:900px){.popup_column{margin:0 auto}.popup_block{padding-top:40px!important}.popup_block{padding:50px 25px 25px}}@media (max-width:767px){.popup_img{display:none}.popup_column>*{max-width:none}.popup_button a.button{white-space:wrap}}@media (max-width:500px){.popup_title{font-size:32px;margin-bottom:15px}.popup_block{padding:40px 26px}.popup_text span{font-size:75px;margin:-10px 0 -51px 0}.pack_timer-item{font-size:20px}.popup_close img{width:28px}.popup_text{font-size:20px;margin-bottom:20px}.pack_timer-item{font-size:20px}.popup_item .app_rating-start{display:none}}</style>
  <script type="137e84e384ac50f7e3c825fd-text/javascript">(function(i,s,o,g,r,a,m){i["esSdk"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://esputnik.com/scripts/v1/public/scripts?apiKey=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NTI0ZWZhYTJkYzI2MGRmYTM4YTE1NDBlMWE3YmU1M2QzYjExNDBlMmY0N2RlOTYwZmFjNDY3NmRlOGE0ZDE5MjNlZmYwMzc0MWY1ZTE2MjI3MGU2OGY5YzIyMWRiMGEyZWUyYTMwOTUyMzA3NGJiYjAzMDVjODMyNTFlZWEwMmQ4OWViZDNlMzc3NDYzNThhZDY4YWMzNGY2ZDgxZTQ1MTU4MWU1OTM5OTE4Njc1NmZhMDBhODkzOTRhZjgzY2IifQ.o7pNpL93ftK0Ct4Bf1Ct-ujqLMAl8cXg3s5lNOSSKOXXDQ77hA8qSrJ5p8onTEVMGTrUzS9IQGn-H3QzwNF2lw&domain=0F99ABCC-DCCF-4117-A294-C877B1C4BC13","es");es("pushOn");</script> 
  <script data-pagespeed-no-defer type="137e84e384ac50f7e3c825fd-text/javascript">(function(){function f(a,b,d){if(a.addEventListener)a.addEventListener(b,d,!1);else if(a.attachEvent)a.attachEvent("on"+b,d);else{var c=a["on"+b];a["on"+b]=function(){d.call(this);c&&c.call(this)}}};window.pagespeed=window.pagespeed||{};var g=window.pagespeed;function k(a){this.g=[];this.f=0;this.h=!1;this.j=a;this.i=null;this.l=0;this.b=!1;this.a=0}function l(a,b){var d=b.getAttribute("data-pagespeed-lazy-position");if(d)return parseInt(d,0);var d=b.offsetTop,c=b.offsetParent;c&&(d+=l(a,c));d=Math.max(d,0);b.setAttribute("data-pagespeed-lazy-position",d);return d}
function m(a,b){var d,c,e;if(!a.b&&(0==b.offsetHeight||0==b.offsetWidth))return!1;a:if(b.currentStyle)c=b.currentStyle.position;else{if(document.defaultView&&document.defaultView.getComputedStyle&&(c=document.defaultView.getComputedStyle(b,null))){c=c.getPropertyValue("position");break a}c=b.style&&b.style.position?b.style.position:""}if("relative"==c)return!0;e=0;"number"==typeof window.pageYOffset?e=window.pageYOffset:document.body&&document.body.scrollTop?e=document.body.scrollTop:document.documentElement&&
document.documentElement.scrollTop&&(e=document.documentElement.scrollTop);d=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;c=e;e+=d;var h=b.getBoundi