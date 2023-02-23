var get_IOA_zone_info = {
    "addr": ["ffffffffffff"],/*broadcast Message*/ 
    "type": "json",
    "data":
    {
        "request": "mg_api",
        "mg_action": "get_IOA_zone_list",
        "zone": "",
        "verbose": 0
    }
}
var get_mesh_devices  = {
    "addr": ["ff0000010000"],/*root Message*/
    "type": "json",
    "data":
    {
        "request":"mg_api",
        "mg_action":"get_mesh_devices",
    }
}

var set_value_driver = {
    "addr": [],
    "type": "json",
    "data":
    {
        "request": "mg_api",
        "mg_action": "set_value_driver",
        "IOA_name": "",
        "variable": "",
        "value": ""
    }
}
var get_value_driver = {
    "addr": [],
    "type": "json",
    "data":
    {
        "request": "mg_api",
        "mg_action": "get_value_driver",
        "IOA_name": "",
        "variable": ""
    }
}
var get_IOA_driver_info = {
    "addr": [],
    "type": "json",
    "data":
    {
        "request": "mg_api",
        "mg_action":"get_IOA_driver_info",
        "IOA_name": ""
    }
}

/** Save Api requests in browser storage */
localStorage.clear()
localStorage.setItem('get_IOA_driver_info',JSON.stringify(get_IOA_driver_info))
localStorage.setItem('get_value_driver',JSON.stringify(get_value_driver)) 
localStorage.setItem('set_value_driver',JSON.stringify(set_value_driver))
localStorage.setItem('get_IOA_zone_info',JSON.stringify(get_IOA_zone_info))
localStorage.setItem('get_mesh_devices',JSON.stringify(get_mesh_devices))
