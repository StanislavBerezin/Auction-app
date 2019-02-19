import { Meteor } from "meteor/meteor";
import { Auction } from "../imports/api/Auction";
Meteor.startup(() => {
  Meteor.publish("auctions", function auctionPublication() {
    //can can access Auction.find in component that is subscribed to it
    return Auction.find();
  });

  Meteor.publish("bids", function auctionPublication(id) {
    return Auction.findOne({ _id: id });
  });
});
