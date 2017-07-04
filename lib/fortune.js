// array of fortuine cookies
var fortunes = [
    "Conqure your fears or they will conqure you.",
    "Rivers need springs.",
    "Do not fear what you don't know",
    "You will have a pleasent surprise",
    "Whenever possible, keep it simple."
];

// allows function to be accesed outside of module
exports.getFortune = function() {
    var idx = Math.floor(Math.random() * fortunes.length);
    return fortunes[idx];
};