console.log('module');

async function start(num, ms) {
  let numThroughTime = new Promise(resolve => {
    setTimeout(() => {
      resolve(`number: ${num}`)
    }, ms);
  })
  console.log(`number without 'await': ${numThroughTime}`);
  console.log(`number with 'await': ${await numThroughTime}`);
  console.log(await numThroughTime);
}

start(666, 2000)

