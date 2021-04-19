// use the path of your model
const Workout = require('../models/workoutModel');
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
            'wname': 'dummy name',
            'program': 'dummy name',
            'image': 'dummy',
            
            
        };

        return Workout.create(vid)
            .then((pro_ret) => {
                expect(pro_ret.wname).toEqual('dummy name');
            });
    })

    it('to test the update', async () => {
        return Workout.findOneAndUpdate({ _id: Object('607d622aa319d13b189d65bc') },
            { $set: { vname: 'dummy name' } })
            .then((pp) => {
                expect(pp.wname).toEqual('dummy name')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Workout.deleteOne({_id: '607d622aa319d13b189d65bc'});
        expect(status.ok).toBe(1);
    })
})