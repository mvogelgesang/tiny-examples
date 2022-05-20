var Spinner = require('cli-spinner').Spinner;
 
/**
 * Calculates a random number between 0 and 10.0 with a two second delay
 * @returns Promise<number>
 */
function getRandomNumber(): Promise<number> {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            const val = Math.round(Math.random()*100)/10;
            //console.log(val);
            resolve(val);
        }, 2000);
    });
}

/**
 * Loops from 0 - 99 producing a list of random numbers from the getRandomNumber function and finally summing them up
 * @returns Promise<number> - sum of the random numbers 
 */
function go(): Promise<number> {
    // promisesArray holds each promise from getRandomNumber
    let promisesArray: Promise<number>[] = [];
    let total: number = 0;

    for (let i = 0; i<100; i++){
        // as we loop, the promisesArray recieves a Promise until the result arrives
        promisesArray.push(getRandomNumber().then(value => value));
    } 
    // now that the loop has completed, we must wait for all promises to resolve
    return Promise.all(promisesArray).then((arr) => {
        // the resulting array needs to be summed and can be returned from the function
        return arr.reduce(
            (previousValue: number, currentValue: number ) => previousValue + currentValue,
            total
          );
    })
}

// this automatically executes the function
(() => {
    // create a spinner to make the CLI experience a bit better
    const spinner = new Spinner('processing.. %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();
    // call the funtion
    go().then((total) => {
        // now that it has resolved, stop the spinner
        spinner.stop();
        process.stdout.write('\n');
        // print the result
        console.log(`completed, total is: ${total}`);
    })
})();


