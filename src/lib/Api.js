/**
 * @providesModule @api
 */

import { AsyncStorage, NetInfo } from "react-native";
import { Platform, AsyncStorage, NetInfo } from "react-native";
// Backup file generated during build
import ApiBackup from "./ApiBackup";

// CONSTANTS
export const updateTimeInterval = 2; // Number of hours to cache response
const TIMEOUT_IN_MILLISECONDS = updateTimeInterval * 60 * 60 * 1000;

// ENDPOINTS
export const API_HTML_ROOT = "https://pca.techequipt.com.au";
const API_ROOT = "https://pca.techequipt.com.au/api";
const API_BUNDLE = API_ROOT + "/bundle/";
const API_DISCUSSION_STARTER = API_ROOT + "/discussion-starter/";
const API_DISCUSSION_STARTER_LOG_RESPONSE =
  API_ROOT + "/discussion-starter/log-response/";
const API_CARD_GAME = API_ROOT + "/card-game/";
const API_CARD_GAME_LOG_RESPONSE = API_ROOT + "/card-game/log-response/";
const API_RESOURCES = API_ROOT + "/resources/";
const API_USER_GUIDE = API_ROOT + "/user-guides/";
const API_GET_HELP = API_ROOT + "/get-help/";
const API_LOOKING_AFTER_YOURSELF = API_ROOT + "/looking-after-yourself/";
const API_PRIVACY_POLICY = API_ROOT + "/privacy-policy/";
const API_PRIVACY_COLLECTION = API_ROOT + "/privacy-collection/";
const API_ABOUT_THIS_APP = API_ROOT + "/about-this-app/";
const API_SPEECH_CONSTANTS = API_ROOT + "/speech-constants/";

export const ApiDefinitions = {
  // Mapping of Keys to URL's. Keys are used to cache the data.
  card_game: API_CARD_GAME,
  get_help: API_GET_HELP,
  discussion_starter: API_DISCUSSION_STARTER,
  resources: API_RESOURCES,
  user_guides: API_USER_GUIDE,
  looking_after_yourself: API_LOOKING_AFTER_YOURSELF,
  privacy_policy: API_PRIVACY_POLICY,
  privacy_collection: API_PRIVACY_COLLECTION,
  about_this_app: API_ABOUT_THIS_APP,
  bundle: API_BUNDLE,
  speech_constants: API_SPEECH_CONSTANTS
};

// NetInfo workaround due to iOS bug in react native
const onInitialNetConnection = isConnected => {
  NetInfo.isConnected.removeEventListener(onInitialNetConnection);
};

NetInfo.isConnected.addEventListener(
  "connectionChange",
  onInitialNetConnection
);

const createTimestampKey = key => {
  // Timeout tracking for the AsyncStorage
  return `timestamp.${key}`;
};

export async function getJSONwithCache(key, bypassCache) {
  /*
  Given a URL, will check if the data needed is in the cache
  (with a timeout of TIMEOUT_IN_MILLISECONDS). If cached data exists,
  will return the data.

  If the device is offline, it try and always use the cache.
  */
  const timestampKey = createTimestampKey(key);
  const url = ApiDefinitions[key] || key;
  let makeLiveCall = true; // Whether we need to call the live API or use cache.
  let json = null; // Will store the response

  var currentTimestamp = new Date().getTime();
  var cachedTimestamp = await AsyncStorage.getItem(timestampKey);
  if (
    cachedTimestamp &&
    currentTimestamp - cachedTimestamp < TIMEOUT_IN_MILLISECONDS
  ) {
    makeLiveCall = false;
  }

  if ((await NetInfo.isConnected.fetch()) === false) {
    console.log("NetInfo disconnected");
    makeLiveCall = false;
  }
  if (makeLiveCall || bypassCache) {
    console.log("calling live");
    try {
      const response = await fetch(url);
      json = await response.json();
      await AsyncStorage.setItem(key, JSON.stringify(json));
      await AsyncStorage.setItem(timestampKey, new Date().getTime().toString());
    } catch (error) {}
  }
  if (!json) {
    try {
      json = getJSONFromCache(key);
    } catch (error) {
      return null;
    }
  }
  return json;
}

async function getJSONFromCache(key) {
  /*
    Tries to get the data out of the device local cache.
    If it's not in the cache, it'll resort to the local backup
    created during the build process
  */
  const cached = await AsyncStorage.getItem(key);
  if (!cached) {
    return ApiBackup[key];
  }
  return JSON.parse(cached);
}

export async function postJSONwithCache(url, json) {
  const cachedPostsKey = "cached_posts";
  const cached = await AsyncStorage.getItem(cachedPostsKey);
  let cachedPosts = JSON.parse(cached);
  let newCachedPosts = [];

  if (cachedPosts != null)
    for (const cachedPost of cachedPosts) {
      try {
        await fetch(cachedPost.url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cachedPost.json)
        });
      } catch (error) {
        newCachedPosts.push(cachedPost);
      }
    }

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    });
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log("error", error);
    var cachedPost = {};
    cachedPost.url = url;
    cachedPost.json = json;
    newCachedPosts.push(cachedPost);
  }
  await AsyncStorage.setItem(cachedPostsKey, JSON.stringify(newCachedPosts));
}

export async function postDiscussionAnswers(discussionStarter) {
  var answers = [];
  var activities = discussionStarter.discussion_starter;
  for (const activity of activities) {
    var questions = activity.questions;
    for (let qId = 0; qId < questions.length; qId++) {
      const questionData = questions[qId];

      const {
        question,
        question_type,
        question_choices,
        answerData
      } = questionData;
      if (answerData == null) continue;

      const answerList = question_choices.split("\r\n");

      var answer = {};
      if (question_type == "freetext") {
        answer.question = question;
        answer.question_id = "";
        answer.response = answerData;
      } else if (question_type == "choices") {
        answer.question = question;
        answer.question_id = "";
        answer.response = answerList[answerData];
      } else if (question_type == "manychoices") {
        var selectedChoices = answerData.map(i => answerList[i]);
        answer.question = question;
        answer.question_id = "";
        answer.response = selectedChoices;
      }
      answers.push(answer);
    }
  }
  try {
    var ansswerResponse = {};
    const uniqueId = DeviceInfo.getUniqueID();
    ansswerResponse.uuid = uniqueId;
    ansswerResponse.starter = discussionStarter.starterSlug;
    ansswerResponse.responses = answers;
    await postJSONwithCache(
      API_DISCUSSION_STARTER_LOG_RESPONSE,
      ansswerResponse
    );
  } catch (error) {}
}

export async function postCardGameAnswers(cardGame) {
  var answers = [];
  var cards = cardGame.cards;
  for (const card of cards) {
    const { question, selectedLevel, star } = card;

    let starred = star == true ? true : false;
    var answer = {};
    answer.question = question;
    answer.response = selectedLevel + 1; //{-1, 0, 1, 2} but response need {0, 1, 2, 3}
    answer.starred = starred;
    answers.push(answer);
  }
  try {
    var ansswerResponse = {};
    const uniqueId = DeviceInfo.getUniqueID();
    ansswerResponse.uuid = uniqueId;
    ansswerResponse.deck = cardGame.id;
    ansswerResponse.responses = answers;
    await postJSONwithCache(API_CARD_GAME_LOG_RESPONSE, ansswerResponse);
  } catch (error) {}
}

export async function getBundle() {
  // The bundle contains all other API calls and is used for priming the cache
  data = await getJSONwithCache(ApiDefinitions.bundle, true);
  var currentTimestamp = new Date().getTime(); // used to set timeout
  // Update the cache.

  await Object.keys(data).map(async key => {
    const timestampKey = createTimestampKey(key);
    AsyncStorage.setItem(key, JSON.stringify(data[key]));
    // Set the timeout for the key
    const currentTimestampString = currentTimestamp.toString();
    AsyncStorage.setItem(timestampKey, currentTimestampString);
  });
}

export async function getDiscussionStarter() {
  return await getJSONwithCache("discussion_starter");
}

export async function getCardGame() {
  return await getJSONwithCache("card_game");
}

export async function getResources() {
  return await getJSONwithCache("resources");
}

export async function getPrivacyPolicy() {
  return await getJSONwithCache("privacy_policy");
}

export async function getLookingAfterYourself() {
  return await getJSONwithCache("looking_after_yourself");
}

export async function getUserGuides() {
  return await getJSONwithCache("user_guides");
}

export async function getSpeechConstant(key) {
  // speech constants will usually only want 1 of them, so we will allow a key check.
  // To get all contants, don't pass a key
  const speechConstants = await getJSONwithCache(
    ApiDefinitions.speech_constants
  );
  if (key) {
    speechConstants.map(constant => {
      if (constant.key === key) {
        return key;
      }
    });
    return null;
  }
  return speechConstants;
}

export async function getApiData(key) {
  if (key in ApiDefinitions) {
    return await getJSONwithCache(key);
  }
  return null;
}
