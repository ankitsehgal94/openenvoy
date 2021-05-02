function isComment(line, fileType) {
 if (line[0] === line[1]) {
  if (line[1] === "" && fileType == "PY") return true;
  else if (line[1] === "/" && fileType != "PY") return true;
 }
 return false;
}

function isBlank(line) {
 if (line.length === 1 && line.charCodeAt(0) === 13) {
  return true;
 }
 return false;
}

function readLines(file, fileType) {
 let remaining = "";

 let noOfComments = 0;
 let noOfBlankLines = 0;
 let noOfCodeLines = 0;
 let totalLines = 0;

 remaining += file;
 let index = remaining.indexOf("\n");

 while (index > -1) {
  let line = remaining.substring(0, index);
  let lineWithoutSpaces = line.trim();
  remaining = remaining.substring(index + 1);

  if (isBlank(line)) {
   noOfBlankLines++;
  } else if (isComment(lineWithoutSpaces, fileType)) {
   noOfComments++;
  } else {
   noOfCodeLines++;
  }
  index = remaining.indexOf("\n");
 }

 remaining = remaining.trim();

 if (remaining === "") {
  noOfBlankLines++;
 } else if (isComment(remaining)) {
  noOfComments++;
 } else {
  noOfCodeLines++;
 }

 totalLines = noOfComments + noOfBlankLines + noOfCodeLines;

 return {
  comment: noOfComments,
  blank: noOfBlankLines,
  code: noOfCodeLines,
  total: totalLines,
 };
}

export default readLines;
