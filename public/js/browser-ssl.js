// modified to use SSL port 9002

var zones = document.getElementById("zone");
var drivers = document.getElementById("driver-list");
var variables = document.getElementById("variable-List");
var devices = document.getElementById("dev-name");
var client

// modified to use SSL port 9002
// var host_ip = "66.113.234.146"
var host_ip = "meshdev.microgrow-world.com"
var host_ssl_port = 9002;
var clientID = "clientID-" + parseInt(Math.random() * 100);
var isSSL = 1;


function mqttClient_publish(topic, message) {
    client.send(topic, message);
    console.log("Request Sent : " + message);
}

function mqttClient_subscribe(topic) {
    client.subscribe(topic);
}

function mqttClient_onFailure() {
    console.log("Failed To Connect");
}

function mqttClient_onMessageArrived(message) {
    console.log("Response Recieved : " + message.payloadString);
    responseParser(message.payloadString)
}

function mqttClient_onConnect() {
    console.log("connected succfully");
    mqttClient_subscribe('mesh/MESH-MAS/toCloud');
    get_mesh_devices = localStorage.getItem('get_mesh_devices');
    mqttClient_publish('mesh/MESH-MAS/toDevice', get_mesh_devices);
    zones.onchange = onChangeZone; /**add Callback To on change Zone */
    drivers.onchange = onChangeDriver; /**add Callback To on change driver */
    onChangeZone(); /*get selected zone on page load */
    document.addEventListener("click", btnClickCallback, true);/*add a button CallBack on any Click */
}

function mqttClient_OpenConnection() {
	// Move/Open SSL Port MAS 111122
    console.log("connecting with SSL: " +host_ip+ ":"+ host_ssl_port +" as "+ clientID);
    //client = new Paho.MQTT.Client(host_ip, 9001, "clientID_1");
    client = new Paho.MQTT.Client(host_ip, Number(host_ssl_port), clientID);
	
    //client.connect({ onSuccess: mqttClient_onConnect, onFailure: mqttClient_onFailure });
    client.connect({ useSSL: true, onSuccess: mqttClient_onConnect, onFailure: mqttClient_onFailure });
	
    client.onMessageArrived = mqttClient_onMessageArrived;
}

function addDriverList(driverList, devAddr) {
    //  document_removeList(drivers);
    for (driver in driverList) {
        driverList[driver] = driverList[driver].IOA_name.toString();
        document_addDriver(driverList[driver], devAddr.toString());
    }
    onChangeDriver();
}

function addVariableList(variableList, devName) {
    document_removeList(variables);

    for (variable in variableList) {
        //variableList[variable] = variableList[variable].variable.toString();
        document_addVariableDetails(variableList[variable], devName);
    }
}

function responseParser(jsonResp) {
    jsonResp = JSON.parse(jsonResp);
    switch (jsonResp.data.mg_response) {
        case 'get_IOA_zone_list':
            if (typeof (jsonResp.data.IOA_list) != 'undefined') {
                addDriverList(jsonResp.data.IOA_list, jsonResp.addr);
            } else {
                //document_removeList(drivers);
                //document_removeList(variables);
                console.log("Zone Has No Drivers Added");
            }
            break;
        case 'set_value_driver':
            
            break;
        case 'get_value_driver':
          /*  if (jsonResp.data.err_msg == "MG_OK") {
                alert(JSON.stringify(jsonResp.data.variable) + " = " + JSON.stringify(jsonResp.data.value));
            } else {
                alert(JSON.stringify(jsonResp.data.err_msg));
            }*/
            document_refershVariableValue(jsonResp.data.variable,jsonResp.data.value)
            break;
        case 'get_IOA_driver_info':
            addVariableList(jsonResp.data.variable_list, jsonResp.data.from_device_name);
            break;
        case 'get_mesh_devices':
            console.log(jsonResp)
            break;
    }
}

function onChangeZone() {
    document_removeList(drivers);
    document_removeList(variables);
    var get_IOA_zone_info = localStorage.getItem('get_IOA_zone_info');
    get_IOA_zone_info = JSON.parse(get_IOA_zone_info);
    get_IOA_zone_info.data.zone = zones.options[zones.selectedIndex].text;
    var message = JSON.stringify(get_IOA_zone_info);
    mqttClient_publish('mesh/MESH-MAS/toDevice', message);
}

function onChangeDriver() {
    var get_IOA_driver_info = localStorage.getItem('get_IOA_driver_info');
    get_IOA_driver_info = JSON.parse(get_IOA_driver_info);
    get_IOA_driver_info.addr.push(drivers.options[drivers.selectedIndex].id.toString());
    get_IOA_driver_info.data.IOA_name = drivers.options[drivers.selectedIndex].text;
    var message = JSON.stringify(get_IOA_driver_info);
    mqttClient_publish('mesh/MESH-MAS/toDevice', message);
}

function btnClickCallback(event) {
    if (event.target.classList.contains("set-value")) {
        newValue = prompt("Enter Variable New Value")
        if (newValue.trim().length != 0) {
            var set_value_driver = localStorage.getItem('set_value_driver')
            set_value_driver = JSON.parse(set_value_driver)
            set_value_driver.addr.push(drivers.options[drivers.selectedIndex].id.toString());
            set_value_driver.data.IOA_name = drivers.options[drivers.selectedIndex].text;
            set_value_driver.data.variable = event.target.id;
            set_value_driver.data.value = newValue;
            var message = JSON.stringify(set_value_driver);
            mqttClient_publish('mesh/MESH-MAS/toDevice', message);
            document_refershVariableValue(set_value_driver.data.variable , newValue)
        }
    }
    else if (event.target.classList.contains("get-value")) {
        var get_value_driver = localStorage.getItem('get_value_driver')
        get_value_driver = JSON.parse(get_value_driver)
        get_value_driver.addr.push(drivers.options[drivers.selectedIndex].id.toString());
        get_value_driver.data.IOA_name = drivers.options[drivers.selectedIndex].text;
        get_value_driver.data.variable = event.target.id;
        var message = JSON.stringify(get_value_driver);
        mqttClient_publish('mesh/MESH-MAS/toDevice', message);
    }
}

function document_addVariable(mg_variable, devName) {
    let list_item = ` <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="text-success col-md-2" id="${mg_variable}"> ${mg_variable} </span>
    <div>
        <button class="set-value btn btn btn-success btn-md mr-1 background" id =${mg_variable}>set Value</button>
        <button class="get-value btn btn btn-success btn-md mr-1 background" id = ${mg_variable} >get Value</button>
    </div>
    </li> `
    variables.insertAdjacentHTML(where = "beforeend", list_item);
    devices.value = devName;
}

function document_addDriver(mg_driver, deviceAddr) {
    let dropdown_item = `<option id ="${deviceAddr}" value="${mg_driver}">${mg_driver}</option>`
    drivers.insertAdjacentHTML(where = "beforeend", dropdown_item);
}
function document_addVariableDetails(variableList, devName) {
    let table_row = `
<tr>
  <td  class  = "label">${variableList.variable.toString()}</td>
   <td class = "label">${variableList.value.toString()}</td>
   <td class = "label">NA</td>
   <td class = "label">NA</td>
   <td class = "label">NA</td>
  <td> <button class="set-value btn btn btn-success btn-md mr-1 background" id =${variableList.variable.toString()}>set Value</button>
  <button class="get-value btn btn btn-success btn-md mr-1 background" id = ${variableList.variable.toString()} >Refersh Value</button></td> 
</tr>  
 `
    variables.insertAdjacentHTML(where = "beforeend", table_row);
    devices.value = devName;
}
function document_refershVariableValue(variableName,newValue){

    let variable = (variables.getElementsByTagName('tr'));
    for (let i = 0 ; i < variable.length ; i++) {
        if(variable[i].children[0].innerHTML.localeCompare(variableName) == 0 ) {
            variable[i].children[1].innerHTML = newValue
            break ; 
       }
    }    
}
function document_removeList(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

mqttClient_OpenConnection();
