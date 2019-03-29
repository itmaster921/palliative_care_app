// /**
//  * @providesModule @helppdf
//  */

// import React, { Component } from 'react';
// import { Share } from 'react-native';
// import { Colors, Images } from '@theme';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';

// const style = `
//   html, body {
//     font-family: Arial, Helvetica, sans-serif;
//     margin: 0;
//     padding: 0.5rem;
//   }
//   .header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 1rem;
//   }
//   .header-description p {
//     font-size: 0.875rem;
//     color: ${Colors.Navy};
//     margin-bottom: 1rem;
//   }
//   .header-title {
//     margin-right: 1rem;
//   }
//   .header-title h1 {
//     font-size: 2rem;
//     color: ${Colors.Navy};
//     margin-bottom: 0.125rem;
//   }
//   .header-logo img {
//     width: 120px;
//     height: 90px;
//     display: block;
//     margin: 0;
//   }
//   .footer {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 2rem 0 1rem;
//     padding-top: 1rem;
//     border-top: solid 1px ${Colors.Navy};
//   }
//   .footer .logo-rfds img {
//     margin-right: 2rem;
//   }
//   .faq-question {
//     color: ${Colors.red};
//   }
// `;

// // bring the page together
// export function getSharingHTML(title, body, faqs = []) {
//   const header = `
//         <div class='header'>
//             <div class='header-title'>
//             <h1>${title}</h1>
//             </div>
//             <div class='header-logo'><img src=${
//               Images.base64_dtt_logo
//             } alt='' /></div>
//         </div>
//     `;

//   const footer = `
//         <div class='footer'>
//             <div class='logo-pca'>
//             <img src=${Images.base64_pca_logo} alt='' width='225' height='85' />
//             </div>
//         </div>
//     `;

//   const faqsHtml = faqs
//     .map(
//       (faq, i) => `
//         <div class='faq'>
//             <h3 class="faq-question">${i + 1}. ${faq.question}</h3>
//             <p class="faq-answer">${faq.answer}</p>             
//         </div>
//     `
//     )
//     .join('');

//   var html = `
//         <html>
//             <head>
//                 <style>
//                   ${style}
//                 </style>
//             </head>
//             <body>
//                 ${header}
//                 ${body}
//                 ${faqsHtml}
//                 ${footer}
//             </body>
//         </html>
//     `;
//   return html;
// }

// // bring the page together
// export async function exportHelpPdf(title, body, faqs) {
//   var html = getSharingHTML(title, body, faqs);
//   let options = {
//     html: html,
//     fileName: 'results',
//     directory: 'docs'
//   };
//   let file = await RNHTMLtoPDF.convert(options);

//   try {
//     let res = await Share.share({
//       title: 'Care Compass',
//       message: 'Care Compass',
//       url: file.filePath
//     });
//     if (res.action == 'sharedAction') {
//     }
//   } catch (error) {
//     console.log('An error happened');
//   }
// }
