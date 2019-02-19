import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import "./IndividualLayout.html";
import { Auction } from "../../../imports/api/Auction";

Template.IndividualLayout.onCreated(() => {
  let id = FlowRouter.getParam("_id");

  Meteor.subscribe("bids", id);
});

Template.IndividualLayout.helpers({
  bids() {
    let id = FlowRouter.getParam("_id");

    let maxBid = [];

    let result = Auction.findOne({ _id: id });

    if (result.bids === undefined) {
      result.maxBid = "The item has not been traded yet";
    } else {
      result.bids.map(each => {
        maxBid.push(each.bid);
      });
      maxBid = Math.max.apply(Math, maxBid);
      result.maxBid = `Highest bid is $${maxBid} `;
    }

    return result;
  }
});

Template.IndividualLayout.events({
  "submit .new-bid"(event) {
    // Prevent default browser form submit
    event.preventDefault();
    let id = FlowRouter.getParam("_id");
    // Get value from form element
    const target = event.target.text.value;
    let amount = Number(target);

    Meteor.call("auction.bids", id, amount);

    // Clear form
    event.target.text.value = "";
  }
});
