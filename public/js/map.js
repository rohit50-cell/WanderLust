
    // let mapToken=mapToken; // Here mapToken is access  from the show.ejs file and then store in the mapToken 
    // console.log(mapToken);
    mapboxgl.accessToken=mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://styles/mapbox/streets-v12",
        center:listing.geometry.coordinates , // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9// starting zoom
    });


    //console.log(coordinates);
     const marker= new mapboxgl.Marker({color:'Red'})// to point the mark of cordiante of address
        .setLngLat(listing.geometry.coordinates)//Listing.geometry.coordiante
        .setPopup( new mapboxgl.Popup({offset: 25}).setHTML(
            `<h4>${listing.title}</h4><p>Exact Location Will be  Provided After Booking</p>`))
        .addTo(map);
