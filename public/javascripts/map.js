var map = L.map('main_map').setView([-34.60548328404713, -58.493011531268195], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href= "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-34.60548328404713, -58.493011531268195]).addTo(map);
L.marker([-34.603332593746835, -58.498896460139385]).addTo(map);
L.marker([-34.60524005501132, -58.48670850337339]).addTo(map);