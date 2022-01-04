/*
  For each of the following items, write a regular expression to test whether any of the given substrings occur in a string. The regular expression should match only strings containing one of the substrings described. Do not worry about word boundaries unless explicitly mentioned. When your expression works, see whether you can make it any smaller.

    car and cat

    pop and prop

    ferret, ferry, and ferrari

    Any word ending in ious

    A whitespace character followed by a period, comma, colon, or semicolon

    A word longer than six letters

    A word without the letter e (or E)

*/

verify(/car|cat/, ['my car', 'bad cats'], ['camper', 'high art']);

verify(/pr?op/, ['pop culture', 'mad props'], ['plop', 'prrrop']);

verify(
  /ferr(et|y|ari)/,
  ['ferret', 'ferry', 'ferrari'],
  ['ferrum', 'transfer A']
);

verify(
  /.*(ious)\b/,
  ['how delicious', 'spacious room'],
  ['ruinous', 'consciousness']
);

verify(/\s(\.|,|:|;)/, ['bad punctuation .'], ['escape the period']);

verify(
  /\w{7,}/,
  ['Siebentausenddreihundertzweiundzwanzig'],
  ['no', 'three small words']
);

verify(
  /\b[^e ]+\b/i,
  ['red platypus', 'wobbling nest'],
  ['earth bed', 'learning ape', 'BEET']
);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == '...') return;
  for (let str of yes)
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  for (let str of no)
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
}
