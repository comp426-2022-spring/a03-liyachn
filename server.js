import express from 'express' //call dependency - ES module
const app = express()

// Require minimist module (make sure you install this one via npm).
// Use minimist to process one argument `--port=` on the command line after `node server.js`.
import minimist from 'minimist'
const args = require('minimist')(process.argv.slice(2)) // splits, takes last input
// Define allowed argument name 'port'.
args['port']
// Define a const `port` using the argument from the command line. 
// Make this const default to port 3000 if there is no argument given for `--port`.
const port = args.port || process.env.PORT || 5000 // if defined => use args, if not defined => use env variable, else use 3000

const server = app.listen(port, () => {
    console.log('App running on port %PORT%').replace('%PORT%', port)
})



function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails'
}

function coinFlips(flips) {
  const output = [];
  for (let i = 0; i < flips; i++)
  {
      output[i] = coinFlip()
  }
  return output
}

function countFlips(array) {
    var heads = 0
    var tails = 0
    for (let i = 0; i < array.length; i++)
    {
      if (array[i] == 'heads')
      {
        heads++
      }
      else
      {
        tails++
      }
    }
    return {heads: heads, tails: tails}
}

function flipACoin(call) {
    var flip = coinFlip()
    var result = ""
    if (call == flip)
    {
      result = 'win'
    }
    else
    {
      result = 'lose'
    }
    return {call: call, flip: flip, result: result}
}



app.get('/app', (req, res) => { // root endpoint
    res.status(200).end('200 OK') // 200 = success
    res.type("text/plain")
})

app.get('/app/flip', (req, res) => { // returns results of random coin flip
    res.status(200).json({ 'flip' : coinFlip() }) // add 'flip' key => becomes json
    res.type("text/plain")
})

app.get('/app/flips/:number', (req, res) => { // returns json array of raw random flips + summary
    raw = coinFlips(req.params.number)
    res.status(200).json({ 'raw' : raw, 'summary' : countFlips(raw)})
    res.type("text/plain")
})

app.get('/app/flip/call/heads', (req, res) => { // returns result of random flip match against heads
    res.status(200).json(flipACoin('heads'))
    res.type("text/plain")
})

app.get('/app/flip/call/tails', (req, res) => { // returns result of random flip match against tails
    res.status(200).json(flipACoin('tails'))
    res.type("text/plain")
})

app.use(function(req, res) { // error if endpoint not found
    res.status(404).send("404 NOT FOUND")
    res.type("text/plain")
})