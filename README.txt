# Socket.io Live Plot Demo 

A simple demonstration of realtime plot for the NOAH water tunnel captive
trajectory system using Socket.io and Dygraphs.

The demo consists of a test_client and a test_server. 

The test client is proxy for the captive trajectory program. It generates data
(a sine wave) and sends it, using socket.io, to the test server.

The test server recieves the data and broadcasts it to all other connected
clients e.g. a web browser.  The test severs listens on port 3000 where users
can connect to veiw the live plot in a web browser client. 

Installation
------------

1. Install the test_client by running "npm install" in the test_client
directory. 

2. Install the test_server by running "npm install" in the test_server
directory.


Running
-------

1. Start the test server by running "node test_server.js" in the test_server
directory.

2. Connect to the server at port 3000 using a web browser.

3. Start the test client by running "node test_client.js" in the test_client
sub-directory.  You should be able to stop and re-start the test_client
without issues.







