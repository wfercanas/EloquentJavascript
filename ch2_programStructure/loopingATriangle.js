/*
Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######

*/

const fullOutput = '#######';
let currentOutput = '';

for (let i = 0; i < fullOutput.length; i++) {
  currentOutput += fullOutput[i];
  console.log(currentOutput);
}