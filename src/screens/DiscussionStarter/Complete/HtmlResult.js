import { header, details, footer, disclaimer, style } from '@pdf';

function renderActivities(activities) {
  var activitiesHtml = activities
    .map((activity, aID) =>
      activity.isStarted
        ? `
        <div>
            <h3 class="activityTitle">Activity ${aID + 1}: ${
            activity.stage
          }</h3>
            <p class="activityPrecomment">${activity.pre_commencement_text}</p>
            <div class="questions">
                ${activity.questions
                  .map((questionData, qID) => {
                    const {
                      question,
                      question_type,
                      question_choices,
                      answerData,
                      otherData,
                      answerLater,
                      neverAnswer
                    } = questionData;
                    const answerList = question_choices.split('\r\n');
                    var response = '';
                    if (
                      (answerData != null && answerData != '') ||
                      answerData == 0
                    )
                      switch (question_type) {
                        case 'freetext':
                          response = `<span>${answerData}</span>`;
                          break;
                        case 'choices':
                          response = `<ul><li>${
                            answerList[answerData]
                          }</li></ul>`;
                          break;
                        case 'manychoices':
                          var selectedChoices = (response = `
                                    <ul>
                                        ${answerData
                                          .map(i => `<li>${answerList[i]}</li>`)
                                          .join('')}
                                    </ul>
                                `);
                        case 'choices_plus_other':
                          var responseObject = (response = `
										<ul><li>${answerList[answerData]}</li></ul>
										${otherData ? `Other: ${otherData}` : ''}
									`);
                          break;
                        case 'manychoices_plus_other':
                          var responseObject = (response = `
										<ul>
											${answerData.map(i => `<li>${answerList[i]}</li>`).join('')}
										</ul>
										${otherData ? `Other: ${otherData}` : ''}
									`);
                          break;
                        default:
                          break;
                      }

                    return `
                        <div>
                            <h4 class="question">${question}</h4>
                            ${response}
                            <div>
                                ${
                                  answerLater
                                    ? '<br />I want to think about this'
                                    : neverAnswer
                                    ? '<br />I don’t want to talk about this'
                                    : ''
                                }
                            </div>
                        </div>
                    `;
                  })
                  .join('')}
            </div>
        </div>
    `
        : ''
    )
    .join('');
  return activitiesHtml;
}

// bring the page together
export function getSharingHTMLFromResult(discussionStarter) {
  var html = `
        <html>
            <head>
                <style>
                  ${style}
                </style>
            </head>
            <body>
                ${header}
                ${details}
                ${disclaimer}
                ${renderActivities(discussionStarter.discussion_starter)}
                ${footer}
            </body>
        </html>
    `;
  return html;
}
