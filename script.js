const ipAddress = document.getElementById("ip-address");
const locationDetails = document.getElementById("location-details");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp")
const searchIp = document.getElementById("search-ip")
const searchInput = document.getElementById("search-input")
let addressMap = document.getElementById("address-map")



//Function to search IP address
const searchIpAddress = () => {
    ipAddressValue = searchInput.value; //ipAddressValue can be either ip address or domain or email address
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_9AmVz8EqulLVCSQpGAhA9JFPvBfC1&ipAddress=${ipAddressValue}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        ipAddress.innerHTML = data.ip
        locationDetails.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`
        timezone.innerHTML = data.location.timezone
        isp.innerHTML = data.isp

        const lat = data.location.lat
        const lng = data.location.lng
        
        // This checks if map is already initiated or not 
        var container = L.DomUtil.get('mapItem');
        if(container != null){
            container._leaflet_id = null;
        }

        // Creating map options
        let mapOptions = {
            center: [lat, lng],
            zoom: 13
        }

        // Creating a map object
        let map = L.map('mapItem', mapOptions);

        // Creating a layer object
        let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

        // Adding layer to map
        map.addLayer(layer);

        // Creating a marker
        let marker = L.marker([lat, lng]);

        // Adding Marker to Map
        marker.addTo(map);

        
    })
    .catch((error) => console.log(error))
}

searchIpAddress()

//Event Listeners
searchIp.addEventListener("click", searchIpAddress)


