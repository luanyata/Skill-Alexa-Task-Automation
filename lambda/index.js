// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const admin = require("firebase-admin");
const typeCategory = require('typeCategories')

const serviceAccount = require("firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_URL //URL FireStore
})

const db = admin.firestore();

const uuid = 'Hhet0A56dokPAQ6MCs7W';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Olá bem vindo ao Yata, em que eu posso ajudar?';

        const repromptText = 'Eu sei abrir programas no seu computador, o que você quer que eu abra?'
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptText)
            .getResponse();
    }
};


const OpenProgramIntentHandle = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
        && Alexa.getIntentName(handlerInput.requestEnvelope) === "OpenProgram"
    },
    
    async handle(handlerInput){
        
        const term = Alexa.getSlotValue(handlerInput.requestEnvelope,'program')
        
        let speakOutput =""
        
        try{
        const response= await db.collection('users').doc(uuid).collection('commands')
            .add({ 
                program: term,
                type: typeCategory.OPEN_PROGRAM,
                dateExecute: admin.firestore.FieldValue.serverTimestamp()
            }) 
          
          speakOutput = `abrindo ${term} ...`
          
        }catch(err){
            speakOutput = `Não consegui abrir o ${term}`
        }
        
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    }
}

const CloseProgramIntentHandle = {
     canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
        && Alexa.getIntentName(handlerInput.requestEnvelope) === "CloseProgram"
    },
    
    async handle(handlerInput){
        
        const term = Alexa.getSlotValue(handlerInput.requestEnvelope,'program')
        
        let speakOutput =""
        
        try{
        const response= await db.collection('users').doc(uuid).collection('commands')
            .add({
                program:term,
                type: typeCategory.CLOSE_PROGRAM, 
                dateExecute: admin.firestore.FieldValue.serverTimestamp()
            }) 
          
          console.log(response)
          speakOutput = `Fechando ${term} ...`
          
        }catch(err){
            speakOutput = `Não consegui fechar o ${term}`
        }
        
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        OpenProgramIntentHandle,
        CloseProgramIntentHandle,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
