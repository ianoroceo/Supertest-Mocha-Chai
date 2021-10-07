const { request, expect } = require("../conf/conf");

describe("GET /airports", function () {
  it("returns all airports, limited to 30 per page", async function () {
    const response = await request.get("/airports");

    expect(response.status).to.eql(200);
    expect(response.body.data.length).to.eql(30);

    const fs = require("fs");
    const res = JSON.stringify(response.body.data, null, "\t");
    fs.writeFile(
      "./tests/apiOutput/airportResponseData.json",
      res,
      function (err) {
        if (err) {
          console.log("Error on Creating File " + err);
        } else {
          console.log("File Created Successfully ");
        }
      }
    );
  });
});

describe("POST /airports/distance", function () {
  it("calculates the distance between two airports", async function () {
    const response = await request
      .post("/airports/distance")
      .send({ from: "KIX", to: "SFO" });

    expect(response.status).to.eql(200);

    const attributes = response.body.data.attributes;
    expect(attributes).to.include.keys("kilometers", "miles", "nautical_miles");
    expect(attributes.kilometers).to.eql(8692.066508240026);
    expect(attributes.miles).to.eql(5397.239853492001);
    expect(attributes.nautical_miles).to.eql(4690.070954910584);
  });
});
