import AllEntry from '../data/data';

export default class Entry {
  static create(req, res) {
    const userId = req.payload.id;
    const newEntry = {
      entryID: AllEntry.entries.length + 1,
      title: req.body.title,
      description: req.body.description,
      userId
    };
    newEntry.createdOn = new Date();
    AllEntry.entries.push(newEntry);

    return res.status(201).json({
      status: 201,
      message: 'Entry successfully created',
      data: {
        createdOn: newEntry.createdOn,
        entryID: newEntry.entryID,
        title: newEntry.title,
        description: newEntry.description
      }
    });
  }

  static getAll(req, res) {
    const owner = AllEntry.entries.filter((userof) => userof.userId === req.payload.id);

    if (owner.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'No Entry Found'

      });
    }

    const sortedEntries = owner.sort((a, b) => b.createdOn - a.createdOn);
    return res.status(200).json({
      status: 200,
      message: 'All Entries',
      data: sortedEntries
    });
  }
}
