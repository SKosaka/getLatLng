var map = L.map('mapid', {
    center: [34.689395721666386, 135.1957223987668],
    zoom: 17,
}); // 神戸市役所を中心にマップ描写
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
});
tileLayer.addTo(map);

// 十字マークを地図中央に表示
var crossIcon = L.icon({
    iconUrl: 'https://maps.gsi.go.jp/image/map/crosshairs.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});
var crossMarker = L.marker(map.getCenter(), {
    icon: crossIcon,
    zIndexOffset: 1000,
    interactive: false
}).addTo(map);
map.on('move', function (e) {
    crossMarker.setLatLng(map.getCenter());
});

function onLocationError(e) {
    alert(e.message);
}

var parantExistanceFlag = true;

function getgeo() {

    // 親ウィンドウの存在チェック
    if (!window.opener || window.opener.closed) {
        window.alert('親ウィンドウがありません。');
        return false;
    }
    //親画面に値を挿入
    if (parantExistanceFlag) {
        const lat = "緯度: " + map.getCenter().lat;
        const lng = "経度: " + map.getCenter().lng;
        const latlng = lat + "," + lng;
        console.log(latlng);
        window.opener.document.getElementById("latlng").innerHTML = latlng;
    }
    //ウィンドウを閉じる
    window.close();
}