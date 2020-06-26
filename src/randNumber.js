// jshint esversion:8

exports.randNo = res => {
    const totalResponses = res.data.length;
    const responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
    const responseFinal = res.data[responseIndex];

    return responseFinal;
};