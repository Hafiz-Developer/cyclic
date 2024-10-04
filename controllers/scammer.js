const Scammer = require('../models/scammer');

// Handle file upload and save to database
exports.uploadScammerImages = async (req, res) => {
  try {
    // Check if required fields are provided
    const { sName, sContactNumber, sCountry, sAccountdeal, sDealingTime , sLink1 , sLink2 } = req.body;
    if (!sName || !sContactNumber || !sCountry || !sAccountdeal || !sDealingTime || !sLink1) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    if (!req.files || req.files.length <= 1) {
      return res.status(400).json({ message: 'At least 5 images are required' });
    }

    const images = req.files.map(file => file.path); // This should be an array of image URLs

    const scammer = new Scammer({
      sName,
      sContactNumber,
      sCountry,
      sAccountdeal,
      sDealingTime,
      sLink1,
      sLink2,
      sPics: images, // This should be an array of URLs
    });

    await scammer.save();
    res.status(201).json({ message: 'Scammer data saved successfully', scammer });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading scammer data', error });
  }
};

// Get all scammers
exports.getAllScammers = async (req, res) => {
  try {
    const scammers = await Scammer.find().sort({createdAt : -1});
    res.status(200).json(scammers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving scammers', error });
  }
};

// Delete a scammer by ID
exports.deleteScammer = async (req, res) => {
  try {
    const { id } = req.params; // Get the scammer ID from the URL parameters
    const result = await Scammer.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ message: 'Scammer not found' });
    }

    res.status(200).json({ message: 'Scammer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting scammer', error });
  }
};
