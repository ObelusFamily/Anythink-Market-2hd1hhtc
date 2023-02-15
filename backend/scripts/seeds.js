const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
require("../models/User.js");
require("../models/Item.js");
require("../models/Comment.js");
const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

const main = async () => {
  // add 100 users, items, comments

  for(let i=0; i<100; i++) {
    const newUser = await User.create({
        username: `username${i}`,
        email: `some-username-${i}@yopmail.com`,
        bio: `Mambo number ${i}`,
        image: '',
        role: 'user',
        favorites: [],
        following: [],
    });

    const newItem = await Item.create({
        slug: `item_slug_${i}`,
        title: `item number ${i} title`,
        description: `some lovely description`,
        image: '',
        seller: newUser
    });

    // create a new comment and link it to the user + item
    const newComment = await Comment.create({
        body: 'Fancy!',
        seller: newUser,
        item: newItem,
    });


    newItem.comments.push(newComment);
    newItem.save();
  }
}
  

main()
  .then(() => {
    console.log("Finished");
    process.exit(0);
  })
  .catch((err) => {
    console.log(`Error while running script: ${err.message}`);
    process.exit(1);
  });
