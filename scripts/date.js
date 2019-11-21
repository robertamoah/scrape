const makeDate = () => {
    let d = new Date();

    formattedDate += (d.getMonth() + 1 ) + "_";

    formattedDate += d.getDate() + "_";

    return fromattedDate;

};


module.exports =  makeDate;