/**
 * 💬 WhatsApp Message Parser
 *
 * Chintu ek WhatsApp chat analyzer bana raha hai. Usse raw WhatsApp
 * exported message line parse karni hai aur usme se date, time, sender,
 * aur message alag alag extract karna hai.
 *
 * WhatsApp export format:
 *   "DD/MM/YYYY, HH:MM - Sender Name: Message text here"
 *
 * Rules:
 *   - Date extract karo: string ke start se pehle ", " (comma-space) tak
 *   - Time extract karo: ", " ke baad se " - " (space-dash-space) tak
 *   - Sender extract karo: " - " ke baad se pehle ": " (colon-space) tak
 *   - Message text extract karo: pehle ": " ke baad (after sender) sab kuch, trimmed
 *   - wordCount: message ke words count karo (split by space, filter empty strings)
 *   - Sentiment detection (case-insensitive check on message text):
 *     - Agar message mein "😂" ya ":)" ya "haha" hai => sentiment = "funny"
 *     - Agar message mein "❤" ya "love" ya "pyaar" hai => sentiment = "love"
 *     - Otherwise => sentiment = "neutral"
 *     - Agar dono match hote hain, "funny" gets priority
 *   - Hint: Use indexOf(), substring()/slice(), includes(), split(),
 *     trim(), toLowerCase()
 *
 * Validation:
 *   - Agar input string nahi hai, return null
 *   - Agar string mein " - " nahi hai ya ": " nahi hai (after sender), return null
 *
 * @param {string} message - Raw WhatsApp exported message line
 * @returns {{ date: string, time: string, sender: string, text: string, wordCount: number, sentiment: string } | null}
 *
 * @example
 *   parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Bhai party kab hai? 😂")
 *   // => { date: "25/01/2025", time: "14:30", sender: "Rahul",
 *   //      text: "Bhai party kab hai? 😂", wordCount: 5, sentiment: "funny" }
 *
 *   parseWhatsAppMessage("01/12/2024, 09:15 - Priya: I love this song")
 *   // => { date: "01/12/2024", time: "09:15", sender: "Priya",
 *   //      text: "I love this song", wordCount: 4, sentiment: "love" }
 */
export function parseWhatsAppMessage(message) {
  // Your code here
  if (
    typeof message !== "string" ||
    message === null ||
    message === undefined
  ) {
    return null;
  }

  if (message.indexOf('-') < 0) {
    return null;
  }
  const firstColonIndex = message.indexOf(':');

  if (message.indexOf(':', firstColonIndex + 1) < 0) {
    return null;
  }

  let messageHyphenItems = message.split(" - ");

  const dateTime = messageHyphenItems[0].trim();
  const messageBody = messageHyphenItems[1].trim();

  const dateTimeArr = dateTime.split(", ");
  const date = dateTimeArr[0].trim();
  const time = dateTimeArr[1].trim();

  const messageBodyArr = messageBody.split(": ");
  const sender = messageBodyArr[0].trim();
  const msgBody = messageBodyArr[1].trim();

  const msgWordsArray = msgBody.toLowerCase().split(" ");
  const filteredMsgWordsArray = msgWordsArray.filter((word) => word.length);

  const wordCount = filteredMsgWordsArray.length;
  const text = msgBody;

  const funnyWords = new Array("😂", ":)", "haha");
  const sentimentalWords = new Array("❤", "love", "pyaar");

  let statementIsFunny = false;
  let statementIsSentimental = false;

  let sentiment = "";

  for (const word of funnyWords) {
    if (filteredMsgWordsArray.includes(word)) {
      statementIsFunny = true;
      sentiment = "funny";
      break;
    }
  }

  if (!statementIsFunny) {
    for (const word of sentimentalWords) {
      if (filteredMsgWordsArray.includes(word)) {
        statementIsSentimental = true;
        sentiment = "love";
        break;
      }
    }
  }

  if (!statementIsSentimental && !statementIsFunny) {
    sentiment = "neutral";
  }

  const parsedObject = {
    date,
    time,
    sender,
    text,
    wordCount,
    sentiment,
  };


  return parsedObject;
}
