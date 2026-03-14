/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  // Your code here
  if (
    passenger === null ||
    passenger === undefined ||
    !(Object.prototype === Object.getPrototypeOf(passenger))
  ) {
    return "INVALID PASS";
  }

  const objProperties = new Array("name", "from", "to", "classType");

  for (const property of objProperties) {
    if (!passenger.hasOwnProperty(property)) {
      return "INVALID PASS";
    }

    if (!passenger[property].length) {
      return "INVALID PASS";
    }
  }

  switch (passenger["classType"].toLowerCase()) {
    case "first":
      break;

    case "second":
      break;

    default:
      return "INVALID PASS";
  }

  let formattedPass = "MUMBAI LOCAL PASS";

  formattedPass = formattedPass.concat("\n", "---");

  formattedPass = formattedPass.concat("\n", `Name: ${passenger["name"].toUpperCase()}`);

  const fromCharArray = passenger["from"].toLowerCase().split("");
  fromCharArray[0] = fromCharArray[0].toUpperCase();
  const fromTitleCase = fromCharArray.join("");

  const toCharArray = passenger["to"].toLowerCase().split("");
  toCharArray[0] = toCharArray[0].toUpperCase();
  const toTitleCase = toCharArray.join("");

  formattedPass = formattedPass.concat("\n", `From: ${fromTitleCase}`);
  formattedPass = formattedPass.concat("\n", `To: ${toTitleCase}`);
  formattedPass = formattedPass.concat("\n", `Class: ${passenger["classType"].toUpperCase()}`);

  let passId = passenger["classType"][0].toUpperCase();
  passId = passId.concat("", passenger["from"].slice(0, 3).toUpperCase());
  passId = passId.concat("", passenger["to"].slice(0, 3).toUpperCase());

  formattedPass = formattedPass.concat("\n", `Pass ID: ${passId}`);

  return formattedPass;

}
