var stompClient = null;



function connect(event){
	if (stompClient != null) {
    	stompClient.disconnect();
    }
	$('#latestBlock').prop('disabled', true);
	$('#disconnect').prop('disabled', false);
	var socket = new SockJS('http://192.168.1.71:7252/nulsWSocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
    	stompClient.subscribe("/"+event, function(message) {
			showLatestBlock(message.body);
		});
	}, function(error) {
		alert("STOMP error " + error);
	});
}

function connectForCoinBase(event){
	
	disconnect();
	var socket = new SockJS('http://192.168.1.71:7252/nulsWSocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
    	stompClient.subscribe(event, function(message) {
    		console.log(message);
    		showYellowCard(message.body);
		});
	}, function(error) {
		alert("STOMP error " + error);
	});
}



function showYellowCard(payload){
	
	var data = JSON.parse(payload);	
	
}

function showLatestBlock(payload){
	
	var data = JSON.parse(payload);	
	var height = data.data.height;
	var hash = data.data.hash;
	var time = data.data.time;
	console.log("height::"+data.data.height+" hash::"+hash+" Time:"+time);
	$('#height').html(height);
	$('#hash').html(hash);
	$('#time').html(time);
}


function disconnect() {
    if (stompClient != null) {
    	stompClient.disconnect();
    }
   // setConnected(false);
    console.log("Disconnected");
    $('#latestBlock').prop('disabled', false);
    $('#disconnect').prop('disabled', true);
    
}