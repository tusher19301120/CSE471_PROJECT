const { Product } = require("../model/Product");
const { User } = require("../model/User");
const { sendMail, invoiceTemplate } = require("../services/common");

exports.createWishlist = (req, res) => {
  const { userId, productId } = req.body;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    Product.findById(productId, (err, product) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const wishlist = new Wishlist({
        user: user._id,
        product: product._id,
      });

      wishlist.save((err, savedWishlist) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json(savedWishlist);
      });
    });
  });
};

exports.deleteWishlist = (req, res) => {
  const { wishlistId } = req.params;

  Wishlist.findByIdAndDelete(wishlistId, (err, deletedWishlist) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!deletedWishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist deleted successfully" });
  });
};
