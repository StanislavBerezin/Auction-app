import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import "./IndividualLayout.html";
import { Auction } from "../../../imports/api/Auction";

Template.IndividualLayout.onCreated(() => {
  let id = FlowRouter.getParam("_id");

  //subscribing and fetching data
  Meteor.subscribe("bids", id);
});

Template.IndividualLayout.helpers({
  bids() {
    let id = FlowRouter.getParam("_id");

    // using find because it returns collection, tried findOne but is giving errors on the back-end
    //for not being a cursor
    let result = Auction.find({ _id: id });

    let maxBid = [];

    try {
      //going through the collection received upon find Auction.find
      result.map(eachBidObject => {
        result.title = `Auction began for ${eachBidObject.title}`;

        //if there is no bids in the collection then throw error
        if (!eachBidObject.bids) throw Error;

        //if there are bids then merge them into an arry
        eachBidObject.bids.map(eachRating => {
          maxBid.push(eachRating.bid);
        });
      });
      //get the max number in the array
      maxBid = Math.max.apply(Math, maxBid);
      result.maxBid = `Highest bid is $${maxBid} `;
    } catch (e) {
      // in case there was an error, then it means there are no bids
      //so change the titles
      result.map(eachBidObject => {
        result.title = `Auction hasn't started: ${eachBidObject.title}`;
      });
      result.maxBid = "Item has no bids";
    }

    return result;
  }
});

Template.IndividualLayout.events({
  "submit .new-bid"(event) {
    event.preventDefault();
    const pattern = /^\d+$/;
    const target = event.target.text.value;
    let id = FlowRouter.getParam("_id");
    let isValid = false;
    let amount = Number(target);

    //checking if this a number
    isValid = pattern.test(amount);
    if (isValid) {
      Meteor.call("auction.bids", id, amount);
    } else {
      alert("Is not a number!");
    }

    // Clear form
    event.target.text.value = "";
  }
});
