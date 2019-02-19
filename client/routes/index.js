require("../layouts/import");

FlowRouter.route("/", {
  name: "home",
  // what happens when we hit this route
  action() {
    BlazeLayout.render("HomeLayout");
  }
});

FlowRouter.route("/item/:_id", {
  name: "individual.item",
  // what happens when we hit this route
  action() {
    BlazeLayout.render("IndividualLayout");
  }
});
