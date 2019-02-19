import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

import { Auction } from "../../../imports/api/Auction";

Template.HomeLayout.onCreated(function bodyOnCreated() {
  Meteor.subscribe("auctions");
});

Template.HomeLayout.helpers({
  tasks() {
    return Auction.find({});
  }
});

Template.HomeLayout.events({
  "submit .new-auction"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.text.value;
    console.log(title);

    Meteor.call("auction.insert", title);

    target.text.value = "";
  }
});
