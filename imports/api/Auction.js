import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Auction = new Mongo.Collection("auction");

Bid = new SimpleSchema({
  bid: {
    type: Number,
    label: "Bid"
  },
  timeStamp: {
    type: Date,
    label: "Created at"
  }
});

AuctionSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Name"
  },
  bids: {
    type: [Bid],
    optional: true
  },
  maxBid: {
    type: Number,
    optional: true
  }
});

Meteor.methods({
  "auction.insert"(title) {
    check(title, String);

    Auction.insert({
      title
    });
  },

  "auction.bids"(_id, amount) {
    check(amount, Number);

    Auction.update(_id, {
      $push: { bids: { bid: amount, timeStamp: new Date() } }
    });
  }
});

Auction.attachSchema(AuctionSchema);
