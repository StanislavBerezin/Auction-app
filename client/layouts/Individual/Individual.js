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

    let result = Auction.find({ _id: id });

    let maxBid = [];

    console.log(result.collection);

    try {
      result.map(eachBidObject => {
        result.title = `Auction began for ${eachBidObject.title}`;

        if (!eachBidObject.bids) throw Error;

        eachBidObject.bids.map(eachRating => {
          console.log(eachRating.bid);
          maxBid.push(eachRating.bid);
        });
      });

      maxBid = Math.max.apply(Math, maxBid);
      result.maxBid = `Highest bid is $${maxBid} `;
    } catch (e) {
      result.map(eachBidObject => {
        result.title = `Auction hasn't started: ${eachBidObject.title}`;
      });
      result.maxBid = "Item has no bids";
    }

    return result;

    // let maxBid = [];

    // let result = Auction.findOne({ _id: id });

    // if (result.bids === undefined) {
    //   result.maxBid = "The item has not been traded yet";
    // } else {
    //   result.bids.map(each => {
    //     maxBid.push(each.bid);
    //   });
    //   maxBid = Math.max.apply(Math, maxBid);
    //   result.maxBid = `Highest bid is $${maxBid} `;
    // }

    // return result;
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
