import { header, details, footer, disclaimer, style } from '@pdf';

function renderCards(cards) {
  var cardsHtml = `
        <div class="questions">
            ${cards
              .map((card, cID) => {
                const { question, selectedLevel, star } = card;
                const answerList = [
                  'Skipped',
                  'Not Important',
                  'Somewhat Important',
                  'Very Important'
                ];
                var response = answerList[selectedLevel + 1];
                return `
                    <div>
                        <h4 class="question">Q${cID + 1}: ${question}</h4>
                        <span>${response}</span>
                    </div>
                `;
              })
              .join('')}
        </div>`;
  return cardsHtml;
}

export function getSharingHTMLFromResult(cardGame) {
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
                <h3 class="cardGameTitle">${cardGame.title}</h3>
                <p class="cardGameDescription">${cardGame.description}</p>
                ${renderCards(cardGame.cards)}
                ${footer}
            </body>
        </html>
    `;
  return html;
}
