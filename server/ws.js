var net = require('net');
var fs = require('fs');
//var sys = require('util');
var crypto = require('crypto');
var StompFrame = require('./frame').StompFrame;
var StompFrameEmitter = require('./parser').StompFrameEmitter;


var StompClientCommands = [
    'CONNECT',
    'SEND',
    'SUBSCRIBE',
    'UNSUBSCRIBE',
    'BEGIN',
    'COMMIT',
    'ACK',
    'ABORT',
    'DISCONNECT',
];

function StompSubscription(stream, session, ack) {
    this.ack = ack;
    this.session = session;
    this.stream = stream;
};

StompSubscription.prototype.send = function (stompFrame) {
    stompFrame.send(this.stream);
};

function StompQueueManager() {
    this.queues = {};
    this.msgId = 0;
    this.sessionId = 0;
};

StompQueueManager.prototype.generateMessageId = function () {
    return this.msgId++;
};

StompQueueManager.prototype.generateSessionId = function () {
    return this.sessionId++;
}

StompQueueManager.prototype.subscribe = function (queue, stream, session, ack) {
    if (!(queue in this.queues)) {
        this.queues[queue] = [];
    }
    this.queues[queue].push(new StompSubscription(stream, session, ack));
};

StompQueueManager.prototype.publish = function (queue, message) {
    if (!(queue in this.queues)) {
        throw new StompFrame({
            command: 'ERROR',
            headers: {
                message: 'Queue does not exist',
            },
            body: 'Queue "' + frame.headers.destination + '" does not exist',
        });
    }
    var message = new StompFrame({
        command: 'MESSAGE',
        headers: {
            'destination': queue,
            'message-id': this.generateMessageId(),
        },
        body: message,
    });
    this.queues[queue].map(function (subscription) {
        subscription.send(message);
    });
};

StompQueueManager.prototype.unsubscribe = function (queue, session) {
    if (!(queue in this.queues)) {
        throw new StompFrame({
            command: 'ERROR',
            headers: {
                message: 'Queue does not exist',
            },
            body: 'Queue "' + frame.headers.destination + '" does not exist',
        });
    }
    // TODO: Profile this
    this.queues[queue] = this.queues[queue].filter(function (subscription) {
        return (subscription.session != session);
    });
};

function StompStreamHandler(stream, queueManager) {
    var frameEmitter = new StompFrameEmitter(StompClientCommands);
    var authenticated = true;
    var sessionId = -1;
    var subscriptions = [];
    var transactions = {};

    
    stream.on('data', function (data) {
        frameEmitter.handleData(data);
         
    });

    stream.on('end', function () {
        subscriptions.map(function (queue) {
            queueManager.unsubscribe(queue, sessionId);
        });
        stream.end();
        console.log("Connect Ends.");
    });

    frameEmitter.on('frame', function (frame) {
        console.log('Received Frame: ' + frame);
        if (!authenticated && frame.command != 'CONNECT') {
            new StompFrame({
                command: 'ERROR',
                headers: {
                    message: 'Not connected',
                },
                body: 'You must first issue a CONNECT command',
            }).send(stream);
            return;
        }
        if (frame.command != 'CONNECT' && 'receipt' in frame.headers) {
            new StompFrame({
                command: 'RECEIPT',
                headers: {
                    'receipt-id': frame.headers.receipt,
                },
            }).send(stream);
        }
        try {
            switch (frame.command) {
                case 'CONNECT':
                    // TODO: Actual authentication
                    authenticated = true;
                    sessionId = queueManager.generateSessionId();
                    new StompFrame({
                        command: 'CONNECTED',
                        headers: {
                            session: sessionId,
                        }
                    }).send(stream);
                    break;

                case 'SUBSCRIBE':
                    queueManager.subscribe(frame.headers.destination,
                        stream, sessionId,
                        frame.headers.ack || "auto");
                    subscriptions.push(frame.headers.destination);
                    console.log("Subscribe!");
                    break;

                case 'UNSUBSCRIBE':
                    queueManager.unsubscribe(frame.headers.destination, sessionId);
                    break;

                case 'SEND':
                    queueManager.publish(frame.headers.destination, frame.body);
                    break;

                case 'BEGIN':
                    if (frame.headers.transaction in transactions) {
                        throw new StompFrame({
                            command: 'ERROR',
                            headers: {
                                message: 'Transaction already exists',
                            },
                            body: 'Transaction "' + frame.headers.transaction + '" already exists',
                        });
                    }
                    transactions[frame.headers.transaction] = [];
                    break;

                case 'COMMIT':
                    // TODO: Actually apply the transaction, this is just an abort
                    delete transactions[frame.headers.transaction]
                    break;

                case 'ABORT':
                    delete transactions[frame.headers.transaction]
                    break;

                case 'DISCONECT':
                    subscriptions.map(function (queue) {
                        queueManager.unsubscribe(queue, sessionId);
                    });
                    stream.end();
                    break;
            }
        }
        catch (e) {
            e.send(stream);
        }
    });

    frameEmitter.on('error', function (err) {
        var response = new StompFrame();
        response.setCommand('ERROR');
        response.setHeader('message', err['message']);
        if ('details' in err) {
            response.appendToBody(err['details']);
        }
        response.send(stream);
    });
};

function StompServer(port) {
    this.port = port;
    var queueManager = new StompQueueManager();
    /*
    this.server = net.createServer({},function (stream) {
        stream.on('connect', function () {
            console.log('Received Unsecured Connection');
            new StompStreamHandler(stream, queueManager);
        });
    });*/
    this.server = net.createServer((c) => {
        // 'connection' listener
        console.log('client connecting');
        new StompStreamHandler(c, queueManager);
        //c.write('hello\r\n');
        c.pipe(c);
    });
}

StompServer.prototype.listen = function () {
    this.server.listen(this.port, '10.42.1.247');

};

StompServer.prototype.stop = function (port) {
    this.server.close();
};

//new SecureStompServer(8124, credentials).listen();
new StompServer(8192).listen();
console.log("Start listening at 8192");