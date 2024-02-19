const Learning = require("../model/learning");

  exports.getLearning = async (req, res) => {
    try {
      const learnings = await Learning.findAll();
      res.json(learnings);
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des Learning' });
    }
  };

  exports.createLearning = async (req, res) => {
    const { isValid, date} = req.body;
    try {
      const newLearning = await Learning.create({
        isValid,
        date,
      });
      res.status(201).json(newLearning);
    } catch (err) {
      console.error(err);
    }
  };

  exports.updateLearning = async (req, res) => {
    const { id } = req.params;
    const { isValid, date } = req.body;
    try {
      const [updated] = await Learning.update({ isValid, date }, { where: { id } });
      if (updated) {
        const updatedLearning = await Learning.findByPk(id);
        res.status(200).json(updatedLearning);
      } else {
        res.status(404).send("Learning non trouvé.");
      }
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du Learning.' });
    }
  };

  exports.patchLearning = exports.updateLearning; 

  exports.deleteLearning = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Learning.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send(); 
      } else {
        res.status(404).send("Learning non trouvé.");
      }
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du Learning.' });
    }
  };
  
  exports.getLearningById = async (req, res) => {
    const { id } = req.params;
    try {
      const learning = await Learning.findByPk(id);
      if (learning) {
        res.status(200).json(learning);
      } else {
        res.status(404).send("Learning non trouvé.");
      }
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération du Learning.' });
    }
  };
  
  