import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

import { Auction } from "../../../imports/api/Auction";

Template.HomeLayout.onCreated(function bodyOnCreated() {
  Meteor.subscribe("auctions");
});

Template.HomeLayout.helpers({
  items() {
    return Auction.find({});
  }
});

Template.HomeLayout.events({
  "submit .new-auction"(event) {
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const title = target.text.value;

    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    let isValid = false;

    isValid = format.test(title);

    if (!isValid) {
      Meteor.call("auction.insert", title);
    } else {
      alert("No weird symbols");
    }

    target.text.value = "";
  }
});
