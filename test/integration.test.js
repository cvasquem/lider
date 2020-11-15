const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const url = "https://cvasquem-walmart.herokuapp.com";
//const url = "http://localhost:3000";
const expect = require("chai").expect;

describe("/GET productos Walmart", () => {

  it("deberia obtener todos los productos", (done) => {
      chai.request(url)
      .get("/productosTest")
      .end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("totalrows");
				expect(res.body.data.length).to.be.equal(9);
				expect(res.body.totalrows).to.be.equal(3000);
				done();
			});
  });

  it("deberia obtener 1 producto con descuento", (done) => {
		chai.request(url)
			.get("/productosTest?buscar=181")
			.end(function (err, res) {
        expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("totalrows");
				expect(res.body.data.length).to.be.equal(1);
				expect(res.body.totalrows).to.be.equal(1);
				done();
			});
	});

  it("deberia obtener 1 producto sin descuento", (done) => {
		chai.request(url)
			.get("/productosTest?buscar=12")
			.end(function (err, res) {
        expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("totalrows");
				expect(res.body.data.length).to.be.equal(1);
				expect(res.body.totalrows).to.be.equal(1);
				done();
			});
	});

  it("deberiamos obtener muchos productos con descuento", (done) => {
		chai.request(url)
			.get("/productosTest?buscar=nvn")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("totalrows");
				expect(res.body.data.length).to.be.lessThan(11);
				done();
			});
	});

  it("deberiamos obtener muchos productos sin descuento", (done) => {
		chai.request(url)
			.get("/productosTest?buscar=asfub")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body).to.haveOwnProperty("totalrows");
				expect(res.body.data.length).to.be.lessThan(12);
				done();
			});
	});
});
