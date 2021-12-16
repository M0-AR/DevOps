import axios from 'axios'

const KEYS ={
    services:'services',
    serviceId:'employeeId'
}


const baseUrl = "https://bookus.comit.dev/"

export function insertService(data) {
    let services=getAllServices();
    services.push(data)
    axios.post(baseUrl + "api/v1/go-mongo/dashboard/add", data)
          .then(res=> {
              console.log(res)
          })
          .catch(err=>{
              console.log(err)
          })
    localStorage.setItem(KEYS.services,JSON.stringify(services))
}



export function updateService(data) {
    let services = getAllServices();
    let recordIndex = services.findIndex(x => x.service_title === data.service_title);
    services[recordIndex] = { ...data }
     axios.put(baseUrl + "api/v1/go-mongo/dashboard/edit", data)
          .then(res=> {
              console.log(res)
          })
          .catch(err=>{
              console.log(err)
          })
    localStorage.setItem(KEYS.services, JSON.stringify(services));
}

export function deleteService(data) {
    let services = getAllServices();
    services = services.filter(x => x.service_id !== data.service_id);
    axios.post(baseUrl + "api/v1/go-mongo/dashboard/delete", data)
    .then(res=> {
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
    localStorage.setItem(KEYS.services, JSON.stringify(services));
}

export function getAllServices() {
    return JSON.parse(localStorage.getItem(KEYS.services));
}
