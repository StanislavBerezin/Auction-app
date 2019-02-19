import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
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
  bids: { type: [Bid] }
});

Meteor.methods({
  "auction.insert"(title) {
    check(title, String);

    Auction.insert({
      title
    });
  }
});

// createdAt:{
//     type: Date,
//     label: "Created at"

// }

// Auction.attachSchema(AuctionSchema);

// console.log(AuctionSchema);
// export default AuctionSchema;
