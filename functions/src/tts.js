const functions = require('firebase-functions');
const admin = require('firebase-admin');
const textToSpeech = require('@google-cloud/text-to-speech');

var client = new textToSpeech.v1beta1.TextToSpeechClient({
  credential: admin.credential.applicationDefault()
});

const process = input => {
  return new Promise((resolve, reject) => {
    var voice = {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-F',
      ssmlGender: 'FEMALE'
    };
    var audioConfig = {
      audioEncoding: 'OGG_OPUS'
    };
    var request = {
      input: input,
      voice: voice,
      audioConfig: audioConfig
    };
    client
      .synthesizeSpeech(request)
      .then(responses => {
        var response = responses[0];
        resolve(response);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

module.exports.tts = functions.https.onRequest((request, response) => {
  const input = request.body.input;

  if (input) {
    process(input).then(audioBase64 => {
      response.status(200).send({
        audioBase64
      });
    });
  } else {
    response.status(400).send('Invalid request. Payload "input" in missing in body.');
  }
});
