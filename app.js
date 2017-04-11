

var builder = require('botbuilder');
var restify = require('restify');


var appId = process.env.MICROSOFT_APP_ID || "Missing APP ID";
var appPassword = process.env.MICROSOFT_APP_PASSWORD || "Missing APP PASSWORD";


//Connector to console
// always in active state
var connector = new builder.ConsoleConnector().listen();

// var appId = process.env.MY_ID || 'Missing app ID';
// var appPassword = process.env.MY_PASSWORD || 'Missing app password';







// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3080, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// //adding the dialogue
// bot.dialog('/',function(session){
//     //session.send('My name is Jeff');
//     var userMessage = session.message.text;
//     session.send('My name is Jeff and You said: ' + userMessage);
//<iframe src='https://webchat.botframework.com/embed/newsecBot?s=YOUR_SECRET_HERE'></iframe>
// });


// Create chat bot
var connector = new builder.ChatConnector
({ appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD }); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


//create dialogue
bot.dialog('/', new builder.SimpleDialog ( [function(session){
        builder.Prompts.text(session, 'what is your name') ;
},
function (session, result) {
    session.send('My name is Jeff Mr ' + result.response);
}
]));
