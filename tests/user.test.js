// use the path of your model
const User = require('../models/userModel');
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
        const user = {
            'fname': 'dummy name',
            'lname': 'dummy name',
            'email': 'dummy1234@gmail.com',
            'password': "dummy",
            'image': 'noimg'
        };

        return User.create(user)
            .then((pro_ret) => {
                expect(pro_ret.fname).toEqual('dummy name');
            });
    })

    it('to test the update', async () => {
        return User.findOneAndUpdate({ _id: Object('607d622b3ef72d33741d9d02') },
            { $set: { fname: 'dummy name' } })
            .then((pp) => {
                expect(pp.fname).toEqual('dummy name')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await User.deleteOne({_id: '607d622b3ef72d33741d9d02'});
        expect(status.ok).toBe(1);
    })
})