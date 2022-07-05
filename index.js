// Conexão com o banco de dados, imprimindo todos os dados

var pg = require('pg');

var conString = "postgres://unhjcoun:xtdJDOq6srtqoNtWIvgGKyURT1mj4drA@kesavan.db.elephantsql.com/unhjcoun" 
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

client.query("SELECT * from temperatura ORDER BY id", (err, res) => {
  console.table(res.rows);
  
}); 
});

//conexão mqtt

const mqtt = require('mqtt')

const host = '157.230.89.7'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const Client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'mqtt',
  password: 'oriva_mqtt',
  reconnectPeriod: 1000,
})


	
const topic = 'teste'
var msgMqtt = ''; 

Client.on('connect', () => {
  console.log('Connected')
  Client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  
})

Client.on('message', (topic, payload) => {
  console.log('Mensagem recebida do tópico ', topic, ': ', payload.toString())
  msgMqtt = payload.toString()
	client.query('INSERT INTO datahora (temp) VALUES ($1)',[msgMqtt])
	
})

const express = require('express');

const app = express();




app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});


	
