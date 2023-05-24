const request = require("supertest");
var assert = require("assert");
const routes = require('./routes');
const makeCountClear = require("./junk")

it("Количество в наличии должно быть в штуках", function () {

    var count = 5
    const expected = '5 шт.'
    assert.equal(makeCountClear(5), expected)
});

it("Ядро приложения должно быть доступно", function () {

    request(routes)
        .get("/book")
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
        })
});

