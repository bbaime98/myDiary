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
}
