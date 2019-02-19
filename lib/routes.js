require("../client/layouts/import");

FlowRouter.route("/", {
  name: "home",
  // what happens when we hit this route
  action() {
    BlazeLayout.render("HomeLayout", { main: "Test" });
  }
});

FlowRouter.route("/item/:_id", {
  name: "individual.item",
  // what happens when we hit this route
  action() {
    BlazeLayout.render("IndividualLayout", { main: "Auction" });
  }
});
