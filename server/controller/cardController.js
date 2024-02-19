const Cards = require("../model/card");

exports.createCard = async (req, res) => {
    const { question, answer, tag} = req.body;
    try {
      const newCard = await Cards.create({
          question,
          answer,
          tag
      });
      res.status(201).json(newCard);
    } catch (err) {
      console.error(err);
    }
};

exports.getCards = async (req, res) => {
  try {
    const cards = await Cards.findAll();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des cards' });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cards.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send("La carte a été supprimée.");
    } else {
      res.status(404).send("Carte non trouvée.");
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de la carte.' });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Cards.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedCard = await Cards.findOne({ where: { id } });
      res.status(200).json(updatedCard);
    } else {
      res.status(404).send("Carte non trouvée.");
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de la carte.' });
  }
};

exports.getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Cards.findByPk(id);
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).send("Carte non trouvée.");
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération de la carte.' });
  }
};
