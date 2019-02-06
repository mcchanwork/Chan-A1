var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      var i,len,text;
      //rewrite specify words for x amount of letter in word
      for (i=0, len = query['word'].length; i < len; i++)
      {
        res.write('<pre>'+query['word'] + '</pre>');
      }
      res.end('');
    }
    
    
    
    else if (query['cmd'] == 'dotted')
    {
      console.log("Handling a request");
      console.log(query);
      var len1 = query['word1'].length;
      var len2 = query['word2'].length;
      var remainder;
      remainder = 30 - (len1 + len2);
      //output first word
      res.write('<pre>'+query['word1']);
      //repeat periods in accordance with variable remainder
      for(var i = 0; i < remainder; i++)
      {
        res.write('.');
      }
      //output second word
      res.write(query['word2']+'<pre>');
      res.end('');
    }
    
    
    
    else if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var sum = 0;
      var average;
      var max, min;
      max = 0;
      min = 100;
      //loop to find sum
      for ( var i in query['grades'])
      {
        sum = sum + parseInt(query['grades'][i]);
      }
      //loop to find min/max
      for(var i in query['grades'])
      {
        if(query['grades'][i] < min)
        {
          min = query['grades'][i];
        }
        if(query['grades'][i] > max)
        {
          max = query['grades'][i];
        }
      }
      average = sum / query['grades'].length;
      res.write('<pre>Ave: '+average +' Min: '+ min + ' Max: ' + max + '</pre>');
      res.end('');
    }
    
    else
    {
      res.end('');
    }
}