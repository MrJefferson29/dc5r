const express = require("express");
const multer = require("multer");
const Horse = require("../models/Horse");
const auth = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Multer in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: upload a single file buffer to Cloudinary
// Default folder changed from "horses" to "cars" to reflect new domain
const uploadToCloudinary = (fileBuffer, folder = "cars") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};

// GET /api/horses - list all horses
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    let query = Horse.find().sort({ createdAt: -1 });
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    const horses = await query.exec();
    res.json(horses);
  } catch (error) {
    console.error("Get horses error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/horses/:slug - get single horse by slug
router.get("/:slug", async (req, res) => {
  try {
    const horse = await Horse.findOne({ slug: req.params.slug });
    if (!horse) {
      return res.status(404).json({ message: "Horse not found" });
    }
    res.json(horse);
  } catch (error) {
    console.error("Get horse error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/horses - create car/spare part (protected)
// Expects multipart/form-data with fields and files "images"
router.post("/", auth, upload.array("images", 6), async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      views,
      price,
      description,
      componentType,
      condition,
      fits
    } = req.body;

    if (!name || !category || !price || !condition) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const needsSubcategory = category && category !== "Carbon fiber parts";
    if (needsSubcategory && !subcategory) {
      return res.status(400).json({ message: "Subcategory is required for this category" });
    }
    const conditionNormalized = String(condition).toLowerCase().trim();
    if (conditionNormalized !== "new" && conditionNormalized !== "used") {
      return res.status(400).json({ message: "Condition must be 'new' or 'used'" });
    }

    const files = req.files || [];
    if (!files.length) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Normalise fits: accept either newline-delimited string or array
    let fitsArray = [];
    if (Array.isArray(fits)) {
      fitsArray = fits.map((f) => String(f).trim()).filter(Boolean);
    } else if (typeof fits === "string") {
      fitsArray = fits
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file.buffer);
      imageUrls.push(url);
    }

    const horse = await Horse.create({
      name,
      category,
      subcategory: subcategory || "",
      views: views ? Number(views) : 0,
      price,
      description,
      componentType: componentType || "",
      condition: conditionNormalized,
      fits: fitsArray,
      images: imageUrls,
    });

    res.status(201).json(horse);
  } catch (error) {
    console.error("Create horse error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/horses/:slug - update car/spare part (protected)
// Accepts multipart/form-data. If new images are provided, replaces them; otherwise keeps existing images.
router.put("/:slug", auth, upload.array("images", 6), async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      views,
      price,
      description,
      componentType,
      condition,
      fits
    } = req.body;

    const horse = await Horse.findOne({ slug: req.params.slug });
    if (!horse) {
      return res.status(404).json({ message: "Horse not found" });
    }

    // Update basic fields if provided
    if (name) horse.name = name;
    if (category) horse.category = category;
    if (typeof subcategory !== "undefined") horse.subcategory = subcategory || "";
    if (typeof views !== "undefined") horse.views = Number(views);
    if (price) horse.price = price;
    if (typeof description !== "undefined") horse.description = description;

    if (componentType) horse.componentType = componentType;
    if (condition) {
      const conditionNormalizedPut = String(condition).toLowerCase().trim();
      if (conditionNormalizedPut === "new" || conditionNormalizedPut === "used") {
        horse.condition = conditionNormalizedPut;
      }
    }

    // Normalise fits updates
    if (typeof fits !== "undefined") {
      let fitsArray = [];
      if (Array.isArray(fits)) {
        fitsArray = fits.map((f) => String(f).trim()).filter(Boolean);
      } else if (typeof fits === "string") {
        fitsArray = fits
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean);
      }
      horse.fits = fitsArray;
    }

    const files = req.files || [];
    if (files.length) {
      const imageUrls = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file.buffer);
        imageUrls.push(url);
      }
      horse.images = imageUrls;
    }

    await horse.save();

    res.json(horse);
  } catch (error) {
    console.error("Update horse error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

