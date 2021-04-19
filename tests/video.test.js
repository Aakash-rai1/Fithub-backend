// use the path of your model
const Video = require('../models/videoModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://127.0.0.1:27017/Fithub';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Register Schema test anything', () => {
    // the code below is for insert testing
    it('Add User testing anything', () => {
        const vid = {
            'vname': 'dummy name',
            'link': 'dummy name',
            'image': 'dummy',
            
            
        };

        return Video.create(vid)
            .then((pro_ret) => {
                expect(pro_ret.vname).toEqual('dummy name');
            });
    })

    it('to test the update', async () => {
        return Video.findOneAndUpdate({ _id: Object('607d622a6cfdb233745bd5ed') },
            { $set: { vname: 'dummy name' } })
            .then((pp) => {
                expect(pp.vname).toEqual('dummy name')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Video.deleteOne({_id: '607d622a6cfdb233745bd5ed'});
        expect(status.ok).toBe(1);
    })
})