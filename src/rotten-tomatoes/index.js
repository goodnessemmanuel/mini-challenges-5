//declaration and initialization of global variables
const freshTomatoe = 1;
const rottenTomatoe = 2;
let timeToRotInMinute;
let tomatoes = [];

function rottenTomatoes(grid) 
{
    //check to ensure input is a valid parameter
    if (!Array.isArray(grid) || grid.length === 0)
    {
        throw `Please enter a valid input`;
    }

    //record all the fresh tomatoes available in the grid
    const totalFreshTomatoes = countFreshTomatoes(grid);
    
    //copy the input grid items to tomatoes 
    tomatoes = grid.map(items => items);
    timeToRotInMinute = 0;//set initial time in minutes to zero
    
    //array object to queue all current rotten tomatoes about to spread infection
    let rottenTomatoesObjArray = [];
    
    //loop through entire tomatoes, target rotten tomatoes and store their index
    for (let row = 0; row < tomatoes.length; row++)
    {
        for(let col = 0; col < tomatoes[row].length; col++)
        {
            if (tomatoes[row][col] === rottenTomatoe)
            {
                //javascript object uses key-value pair i.e. {key: value}
                rottenTomatoesObjArray.push({row: row, col: col});
            }
        }
    }    
    //this will evaluate to total fresh tomatoes count that got infected
    let infectedTomatoes = 0;
    
    //contaminate fresh tomatoes near rotten tomatoes until it is no longer possible or no more fresh tomatoes
    let contagion = contaminateFreshTomatoes(rottenTomatoesObjArray, infectedTomatoes, totalFreshTomatoes);
    return contagion;
}

//helper function to keep count of all fresh tomatoes
function countFreshTomatoes(tomatoes)
{ 
    let count = 0;
    //loop through each tomatoe of the tomatoes and count the fresh ones
    tomatoes.forEach(tomatoes => 
        tomatoes.forEach(function(tomatoe){
            if(tomatoe === freshTomatoe) { count++; }
    }));
    return count;//return the total count
}

//function to spread infection from rotten to neighbouring fresh tomatoes
function contaminateFreshTomatoes(rottenTomatoesObjArray, infectedTomatoes, totalFreshTomatoes)
{
    if (infectedTomatoes === totalFreshTomatoes)
    {
        return timeToRotInMinute;
    }
    if (rottenTomatoesObjArray.length === 0 && totalFreshTomatoes - infectedTomatoes > 0)
    {
        return -1;
    }
    if (rottenTomatoesObjArray.length === 0 && countFreshTomatoes(tomatoes) === 0)
    {
        return 0;
    }
    //queue array object of next rotten tomatatoes inline to spread infection
    let newRottenTomatoesObjArray = [];

    for (let obj of rottenTomatoesObjArray)//loop through rotten tomatotoes container array...
    {
        //get the stored reference index of the rotten tomatoes from the queued object array
        let row = obj['row'];
        let col = obj['col'];

        //check for the following constraint, if met, perform the underly operation
        if (row - 1 >= 0 && row - 1 < tomatoes.length && tomatoes[row -1][col] === freshTomatoe)
        {
            tomatoes[row -1][col] = rottenTomatoe;//infect the fresh tomatoe
            infectedTomatoes++; //increase the number of infected fresh tomatoes  by 1
            newRottenTomatoesObjArray.push({row: row - 1, col: col});//add index to queue for next spread 
        }

        if (row + 1 >= 0 && row + 1 < tomatoes.length && tomatoes[row + 1][col] === freshTomatoe)
        {
            tomatoes[row + 1][col] = rottenTomatoe;
            infectedTomatoes++;
            newRottenTomatoesObjArray.push({row: row + 1, col: col}); 
        }

        if (col + 1 >= 0 && col + 1 < tomatoes[row].length && tomatoes[row][col + 1] === freshTomatoe)
        {
            tomatoes[row][col + 1] = rottenTomatoe;
            infectedTomatoes++;
            newRottenTomatoesObjArray.push({row: row, col: col + 1}); 
        }

        if (col - 1 >= 0 && col - 1 < tomatoes[row].length && tomatoes[row][col - 1] === freshTomatoe)
        {
            tomatoes[row][col - 1] = rottenTomatoe;
            infectedTomatoes++;
            newRottenTomatoesObjArray.push({row: row, col: col - 1}); 
        }

    }
    //increase the time by 1 when all four(4) directions are checked
    timeToRotInMinute++;
    
    //recursively repeat the contamination process if there are more fresh tomatoes
    //yet to be infected but with the new rotten tomatoes in the queue container
    return contaminateFreshTomatoes(newRottenTomatoesObjArray, infectedTomatoes, totalFreshTomatoes);

}
module.exports = rottenTomatoes;
