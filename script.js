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
    const geoUrls = [
        `https://geo.ipify.org/api/v1?apiKey=at_9AmVz8EqulLVCSQpGAhA9JFPvBfC1&ipAddress=${ipAddressValue}`,
        `https://geo.ipify.org/api/v1?apiKey=at_9AmVz8EqulLVCSQpGAhA9JFPvBfC1&domain=${ipAddressValue}`,
        `https://geo.ipify.org/api/v1?apiKey=at_9AmVz8EqulLVCSQpGAhA9JFPvBfC1&email=${ipAddressValue}`
    ]

    Promise.all(geoUrls.map(url => 
        fetch(url)
        .then((res) => res.json())
        .catch((error) => console.log(error))
    ))
    .then((data) => {
        console.log(data)
        data.map((item) => {
            console.log(item)
            if (item.code == 422){
                return null 
            }else{

            ipAddress.innerHTML = item.ip
            locationDetails.innerHTML = `${item.location.city}, ${item.location.country} ${item.location.postalCode}`
            timezone.innerHTML = item.location.timezone
            isp.innerHTML = item.isp

            const lat = item.location.lat
            const lng = item.location.lng

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
        }
        })

    })
}

searchIpAddress()

//Event Listeners
searchIp.addEventListener("click", searchIpAddress)


