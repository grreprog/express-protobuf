
'use stricts';

const express = require('express');
const fs = require('fs');

console.log(__dirname);

const packet = require('../protocol-js/protocol_pb');
const pb_enum = require('../protocol-js/enum_pb');


const port = 3000;
global.app = express();

// npm proto?
// preLaunchTask : npm install -g protocol-buffers

// ptorocol-proto
//  1. protoc -I../protocol-proto --js_out=import_style=commonjs,binary:../protocol-js ../protocol-proto/*.proto
//  2. protoc -I../protocol-proto --csharp_out=../protocol-cs/ ../protocol-proto/*.proto

function server() {
  app.get('/test', (req, res, next) => {

    let pTest = new packet.PT_Test();
    pTest.setFnum(10);
    pTest.setPayload('namanopsso');
    pTest.setEvalue(pb_enum.eGuild.EGUILD_THREE);    

    let sbin = pTest.serializeBinary();
    
    res.send(sbin);

    let pRecv = packet.PT_Test.deserializeBinary(sbin);
    console.log(pRecv.getFnum());
    console.log(pRecv.getPayload());
    console.log(pRecv.getEvalue());
  })
  
  app.listen(port, () => {
    console.log(`listening ... port(${port})`);
  })
}

server();





